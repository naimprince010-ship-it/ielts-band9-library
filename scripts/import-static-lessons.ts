import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SAMPLE_LESSONS } from '../src/data/sampleLessons';

function cleanEnv(value: string | undefined): string {
  return (value || '')
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/\\r\\n$/g, '')
    .trim();
}

// The last source entry wins when legacy data contains the same public slug.
const uniqueBySlug = [...new Map(SAMPLE_LESSONS.map((lesson) => [lesson.slug, lesson])).values()];
const usedIds = new Set<string>();

const rows = uniqueBySlug.map((lesson) => {
  let id = lesson.id;
  if (usedIds.has(id)) id = `${lesson.id}-${lesson.slug}`;
  usedIds.add(id);

  return {
    id,
    title: lesson.title,
    slug: lesson.slug,
    type: lesson.type,
    level: lesson.level,
    topic: lesson.topic,
    description: lesson.description || '',
    content: lesson.content,
    is_premium: lesson.is_premium,
    is_published: lesson.is_published,
    view_count: lesson.view_count || 0,
    courseId: lesson.courseId || null,
    moduleName: lesson.moduleName || null,
    created_at: lesson.created_at,
    updated_at: lesson.updated_at,
  };
});

if (process.argv.includes('--dry-run')) {
  console.log(`Validated ${SAMPLE_LESSONS.length} source lessons and ${rows.length} unique import rows.`);
  process.exit(0);
}

const sqlOutputIndex = process.argv.indexOf('--write-sql');
if (sqlOutputIndex !== -1) {
  const outputPath = process.argv[sqlOutputIndex + 1];
  if (!outputPath) throw new Error('--write-sql requires an output path');
  const literal = (value: unknown) => value === null || value === undefined
    ? 'NULL'
    : `'${String(value).replace(/'/g, "''")}'`;
  const statements = rows.map((row) => `INSERT INTO public.lessons (
  id, title, slug, type, level, topic, description, content, is_premium,
  is_published, view_count, "courseId", "moduleName", created_at, updated_at
) VALUES (
  ${literal(row.id)}, ${literal(row.title)}, ${literal(row.slug)}, ${literal(row.type)},
  ${literal(row.level)}, ${literal(row.topic)}, ${literal(row.description)},
  ${literal(JSON.stringify(row.content))}::jsonb, ${row.is_premium}, ${row.is_published},
  ${row.view_count}, ${literal(row.courseId)}, ${literal(row.moduleName)},
  ${literal(row.created_at)}::timestamptz, ${literal(row.updated_at)}::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  level = EXCLUDED.level,
  topic = EXCLUDED.topic,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  is_premium = EXCLUDED.is_premium,
  is_published = EXCLUDED.is_published,
  "courseId" = EXCLUDED."courseId",
  "moduleName" = EXCLUDED."moduleName",
  updated_at = EXCLUDED.updated_at;`);
  const sql = `BEGIN;\n${statements.join('\n')}\nCOMMIT;\n`;
  const resolvedPath = resolve(outputPath);
  writeFileSync(resolvedPath, sql, 'utf8');
  console.log(`Wrote ${rows.length} import rows to ${resolvedPath}`);
  process.exit(0);
}

const supabaseUrl = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const serviceRoleKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

for (let start = 0; start < rows.length; start += 25) {
  const batch = rows.slice(start, start + 25);
  const { error } = await supabase.from('lessons').upsert(batch, { onConflict: 'slug' });
  if (error) throw new Error(`Batch ${start / 25 + 1} failed: ${error.message}`);
  console.log(`Imported ${Math.min(start + batch.length, rows.length)}/${rows.length}`);
}

const { count, error: countError } = await supabase
  .from('lessons')
  .select('*', { count: 'exact', head: true });

if (countError) throw countError;
console.log(`Static lesson import complete. Database total: ${count}`);
