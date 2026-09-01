const fs = require("fs");

const path = "src/data/deepVocabularyLessons.ts";
let content = fs.readFileSync(path, "utf8");

// The duplicate 'why' and 'accent' are at the end of the mistake blocks.
// Some words naturally had 'why' and 'accent' BEFORE the patch.
// Let's remove the duplicated 'why:' and 'accent:' that our patch added.

// We can just find multiple instances of 'why:' and 'accent:' within a word block.
// But wait, the easiest way is to use a regex to match the pattern our script inserted:
//
//        why: 'This is an essential academic term that enhances lexical resource.',
//        accent: {
//          border: '...',
//          surface: '...',
//          badge: '...',
//          heading: '...',
//          ring: '...',
//          dot: '...',
//        },
//        why: ...

// Actually, let's just write a parser that removes ALL 'why' and 'accent' properties that appear more than once in an object, or we can just restore the file from a backup? I didn't make a backup.

// A safer regex: find blocks that have 'why:' and 'accent:' immediately followed by another 'why:' and 'accent:'.
const duplicatePattern =
  /\s*why:\s*'This is an essential academic term that enhances lexical resource\.',\s*accent:\s*\{[\s\S]*?dot:\s*'[^']*',\s*\},\s*(?=why:)/g;

content = content.replace(duplicatePattern, "");

fs.writeFileSync(path, content);
console.log("Undo patch complete.");
