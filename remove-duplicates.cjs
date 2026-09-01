const fs = require('fs');
const path = 'src/data/deepVocabularyLessons.ts';
let lines = fs.readFileSync(path, 'utf8').split('\n');

const startIndex1 = 2573; // line 2574 is index 2573
const endIndex1 = 2750; // line 2751 is index 2750

const startIndex2 = 3107; // line 3108 is index 3107
const endIndex2 = 3284; // line 3285 is index 3284

// We delete from bottom to top so indices don't shift
lines.splice(startIndex2, endIndex2 - startIndex2 + 1);
lines.splice(startIndex1, endIndex1 - startIndex1 + 1);

fs.writeFileSync(path, lines.join('\n'));
console.log('Duplicates removed.');
