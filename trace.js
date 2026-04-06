
const fs = require('fs');
const { SourceMapConsumer } = require('source-map');

const rawSourceMap = JSON.parse(fs.readFileSync('dist/assets/FullMockTestPage-DfGUrtY4.js.map', 'utf8'));

SourceMapConsumer.with(rawSourceMap, null, consumer => {
  // Let's find every 'map' property in the source map
  consumer.eachMapping(function(m) {
    if (m.name === 'map') {
      console.log('Line: ' + m.generatedLine + ' Col: ' + m.generatedColumn + ' -> ' + m.originalLine + ':' + m.originalColumn);
    }
  });
});
