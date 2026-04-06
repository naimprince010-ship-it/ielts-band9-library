
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
const sub = createClient(url, key);
sub.from('mock_tests').select('*').then(r => {
  if(r.data) {
    console.log('Found ' + r.data.length + ' mock tests');
    r.data.forEach(d => {
      console.log('---');
      console.log('ID:', d.id);
      console.log('Title:', d.title);
      console.log('Module:', d.module_type);
      console.log('Published:', d.is_published);
      console.log('Test Data keys:', Object.keys(d.test_data || {}));
      if (d.module_type === 'listening') {
        const td = d.test_data || {};
        console.log('Is sections array?', Array.isArray(td.sections));
        if (td.sections && td.sections.length > 0) {
            console.log('First Section keys:', Object.keys(td.sections[0]));
            if (td.sections[0].questions) {
                console.log('Is questions array?', Array.isArray(td.sections[0].questions));
                console.log('Is first question options array?', Array.isArray(td.sections[0].questions[0].options));
                console.log('First question options:', td.sections[0].questions[0].options);
                console.log('options length:', td.sections[0].questions[0].options?.length);
            }
        }
      }
    });
  } else { console.log(r); }
});
