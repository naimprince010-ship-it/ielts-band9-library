import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const TEST_ID = '88121da3-dea6-43a9-9703-968f637dd0ca';
const TTS_ENDPOINT = 'https://www.ieltstree.com/api/tts';
const CANONICAL_SUPABASE_URL = 'https://fjzqtzqflsqjevrurgbm.supabase.co';
const LEGACY_SUPABASE_PROJECT_REF = 'yzeiloqctrgpzuzkciiv';
const configuredSupabaseUrl = process.env.VITE_SUPABASE_URL ?? '';
const supabaseUrl = !configuredSupabaseUrl || configuredSupabaseUrl.includes(LEGACY_SUPABASE_PROJECT_REF)
  ? CANONICAL_SUPABASE_URL
  : configuredSupabaseUrl;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) throw new Error('Missing Supabase server credentials.');

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: bucket, error: bucketError } = await supabase.storage.getBucket('audio');
if (bucketError || !bucket) throw new Error(`Audio bucket unavailable: ${bucketError?.message ?? 'not found'}`);
if (!bucket.public) throw new Error('The audio bucket must be public before mock-test audio can use permanent public URLs.');

const { data: row, error: rowError } = await supabase
  .from('mock_tests')
  .select('id, test_data')
  .eq('id', TEST_ID)
  .single();
if (rowError || !row) throw new Error(`Listening test unavailable: ${rowError?.message ?? 'not found'}`);

const sections = Array.isArray(row.test_data?.sections) ? row.test_data.sections : [];
if (sections.length !== 4) throw new Error(`Expected 4 sections; found ${sections.length}.`);

const updatedSections = [];
for (const section of sections) {
  const transcript = typeof section.transcript === 'string' ? section.transcript.trim() : '';
  if (!transcript) throw new Error(`Section ${section.sectionNumber} has no transcript.`);

  if (typeof section.sectionAudioUrl === 'string' && section.sectionAudioUrl.startsWith('https://')) {
    updatedSections.push(section);
    continue;
  }

  const response = await fetch(TTS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: transcript, voice: 'alloy', provider: 'openai' }),
  });
  const result = await response.json();
  if (!response.ok || (!result.audioContent && !result.audioUrl)) {
    throw new Error(`Section ${section.sectionNumber} TTS failed: ${result.details ?? result.error ?? response.status}`);
  }

  let publicUrl = result.audioUrl;
  if (!publicUrl) {
    const audio = Buffer.from(result.audioContent, 'base64');
    const hash = createHash('sha256').update(`alloy|${transcript}`).digest('hex').slice(0, 32);
    const path = `mock-tests/${TEST_ID}/section-${section.sectionNumber}-${hash}.mp3`;
    const { error: uploadError } = await supabase.storage
      .from('audio')
      .upload(path, audio, { contentType: 'audio/mpeg', upsert: true });
    if (uploadError) throw new Error(`Section ${section.sectionNumber} upload failed: ${uploadError.message}`);
    publicUrl = supabase.storage.from('audio').getPublicUrl(path).data.publicUrl;
  }

  const audioCheck = await fetch(publicUrl, { method: 'HEAD' });
  if (!audioCheck.ok) throw new Error(`Section ${section.sectionNumber} public audio check failed: HTTP ${audioCheck.status}`);
  updatedSections.push({ ...section, sectionAudioUrl: publicUrl });
}

const updatedTestData = { ...row.test_data, audioUrl: '', sections: updatedSections };
const { error: updateError } = await supabase
  .from('mock_tests')
  .update({ test_data: updatedTestData })
  .eq('id', TEST_ID);
if (updateError) throw new Error(`Database update failed: ${updateError.message}`);

const { data: verified, error: verifyError } = await supabase
  .from('mock_tests')
  .select('test_data')
  .eq('id', TEST_ID)
  .single();
if (verifyError) throw new Error(`Verification query failed: ${verifyError.message}`);
const verifiedSections = Array.isArray(verified?.test_data?.sections) ? verified.test_data.sections : [];
const readyAudioCount = verifiedSections.filter((section) => /^https:\/\//.test(section.sectionAudioUrl ?? '')).length;
if (readyAudioCount !== 4) throw new Error(`Verification failed: ${readyAudioCount}/4 persistent audio URLs found.`);

console.log(JSON.stringify({ testId: TEST_ID, sections: verifiedSections.length, persistentAudio: readyAudioCount }));
