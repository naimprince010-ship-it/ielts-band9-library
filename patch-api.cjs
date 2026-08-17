const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'api/generate-vocabulary.ts',
  'api/enrich-vocabulary.ts',
  'api/categorize-vocabulary.ts',
  'api/recommend-vocabulary-topic.ts',
  'api/suggest-topics.ts',
  'api/analyze-design.ts'
];

for (const file of filesToPatch) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not exists
  if (!content.includes("import { requireStaff }")) {
    // find first empty line or something after imports
    const match = content.match(/import .*?;/g);
    if (match && match.length > 0) {
      const lastImport = match[match.length - 1];
      content = content.replace(lastImport, lastImport + "\nimport { requireStaff } from './_staffAuth.js';");
    } else {
      content = "import { requireStaff } from './_staffAuth.js';\n" + content;
    }
  }

  // Add auth check if not exists
  if (!content.includes("if (!(await requireStaff(req, res))) return;")) {
    content = content.replace(
      "if (!checkRateLimit",
      "if (!(await requireStaff(req, res))) return;\n\n  if (!checkRateLimit"
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched ${file}`);
}
