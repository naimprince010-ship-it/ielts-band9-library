import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!');
  console.log('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
  console.log('');
  console.log('Example:');
  console.log('  SUPABASE_URL=https://your-project.supabase.co SUPABASE_SERVICE_ROLE_KEY=your-key npx tsx scripts/upload-all-vocabulary.ts');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface VocabularyWord {
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
}

async function uploadVocabulary() {
  console.log('Starting vocabulary upload...');
  console.log('Supabase URL:', supabaseUrl);
  
  // Find all batch files
  const scriptsDir = path.join(__dirname);
  const files = fs.readdirSync(scriptsDir);
  const batchFiles = files.filter(f => f.startsWith('vocabulary-batch') && f.endsWith('.ts'));
  
  console.log(`Found ${batchFiles.length} batch files`);
  
  let totalUploaded = 0;
  let totalErrors = 0;
  
  for (const file of batchFiles.sort()) {
    console.log(`\nProcessing ${file}...`);
    
    try {
      // Read and parse the file
      const filePath = path.join(scriptsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract vocabulary array from the file
      const match = content.match(/const\s+\w+:\s*VocabularyWord\[\]\s*=\s*\[([\s\S]*?)\];/);
      if (!match) {
        console.log(`  Skipping - no vocabulary array found`);
        continue;
      }
      
      // Parse the vocabulary items
      const arrayContent = match[1];
      const itemMatches = arrayContent.matchAll(/\{\s*word:\s*['"]([^'"]+)['"]\s*,\s*definition:\s*['"]([^'"]+)['"]\s*,\s*part_of_speech:\s*['"]([^'"]+)['"]\s*,\s*topic:\s*['"]([^'"]+)['"]\s*,\s*difficulty_level:\s*['"]([^'"]+)['"]\s*\}/g);
      
      const words: VocabularyWord[] = [];
      for (const item of itemMatches) {
        words.push({
          word: item[1],
          definition: item[2],
          part_of_speech: item[3],
          topic: item[4],
          difficulty_level: item[5]
        });
      }
      
      if (words.length === 0) {
        console.log(`  Skipping - no words parsed`);
        continue;
      }
      
      console.log(`  Found ${words.length} words`);
      
      // Upload in batches of 100
      const BATCH_SIZE = 100;
      for (let i = 0; i < words.length; i += BATCH_SIZE) {
        const batch = words.slice(i, i + BATCH_SIZE);
        
        const { error } = await supabase
          .from('vocabulary')
          .upsert(batch, { onConflict: 'word', ignoreDuplicates: true });
        
        if (error) {
          console.log(`  Error uploading batch: ${error.message}`);
          totalErrors += batch.length;
        } else {
          totalUploaded += batch.length;
          process.stdout.write(`  Uploaded ${Math.min(i + BATCH_SIZE, words.length)}/${words.length}\r`);
        }
      }
      console.log(`  Done!`);
      
    } catch (err) {
      console.error(`  Error processing file: ${err}`);
    }
  }
  
  console.log('\n========================================');
  console.log(`Upload complete!`);
  console.log(`Total uploaded: ${totalUploaded}`);
  console.log(`Total errors: ${totalErrors}`);
}

// Also upload from seed-vocabulary.ts
async function uploadSeedVocabulary() {
  console.log('\nUploading seed vocabulary...');
  
  const seedPath = path.join(__dirname, 'seed-vocabulary.ts');
  if (!fs.existsSync(seedPath)) {
    console.log('seed-vocabulary.ts not found, skipping');
    return;
  }
  
  const content = fs.readFileSync(seedPath, 'utf-8');
  
  // Find all vocabulary arrays
  const matches = content.matchAll(/\{\s*word:\s*['"]([^'"]+)['"]\s*,\s*definition:\s*['"]([^'"]+)['"]\s*,\s*part_of_speech:\s*['"]([^'"]+)['"]\s*,\s*topic:\s*['"]([^'"]+)['"]\s*,\s*difficulty_level:\s*['"]([^'"]+)['"]\s*\}/g);
  
  const words: VocabularyWord[] = [];
  for (const item of matches) {
    words.push({
      word: item[1],
      definition: item[2],
      part_of_speech: item[3],
      topic: item[4],
      difficulty_level: item[5]
    });
  }
  
  console.log(`Found ${words.length} words in seed file`);
  
  if (words.length > 0) {
    const BATCH_SIZE = 100;
    for (let i = 0; i < words.length; i += BATCH_SIZE) {
      const batch = words.slice(i, i + BATCH_SIZE);
      
      const { error } = await supabase
        .from('vocabulary')
        .upsert(batch, { onConflict: 'word', ignoreDuplicates: true });
      
      if (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    console.log('Seed vocabulary uploaded!');
  }
}

async function main() {
  await uploadSeedVocabulary();
  await uploadVocabulary();
  
  // Get final count
  const { count } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true });
  
  console.log(`\nTotal vocabulary in database: ${count}`);
}

main().catch(console.error);
