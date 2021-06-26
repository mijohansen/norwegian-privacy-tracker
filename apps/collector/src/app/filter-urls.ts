const fs = require('fs');
const csvParse = require('csv-parse/lib/sync');

const content = fs.readFileSync(__dirname + '/url.csv', 'utf-8');

const records = csvParse(content, {
  delimiter: ';',
  trim: true,
});
const compact = [];
records.forEach(record => {
  try {
    const url = new URL(record[1]);
    const candidate = 'https://' + url.hostname;
    if (compact.indexOf(candidate) === -1) {
      compact.push(candidate);
    }
  } catch (e) {
  }
});

fs.writeFileSync(__dirname + '/urls.json', JSON.stringify(compact));
console.log(compact);
