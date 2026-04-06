
const fs = require('fs');
const { SourceMapConsumer } = require('source-map');

const rawSourceMap = JSON.parse(fs.readFileSync('dist/assets/FullMockTestPage-DfGUrtY4.js.map', 'utf8'));

SourceMapConsumer.with(rawSourceMap, null, consumer => {
  consumer.eachMapping(function(m) {
    if (m.name === 'map') {
      console.log('originalName: ' + m.name + ', Line: ' + m.generatedLine + ' Col: ' + m.generatedColumn + ' -> Source: ' + m.source + ':' + m.originalLine + ':' + m.originalColumn);
    }
  });
});
