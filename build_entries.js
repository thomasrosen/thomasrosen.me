const fs = require('fs');
const matter = require('gray-matter');

// Read YAML file
const yamlContent = fs.readFileSync('./data_about_thomasrosen/entries.yml', 'utf8');
const { data: entries } = matter(`---
${yamlContent}
---`);

// Write JSON file
fs.writeFileSync('./src/data/entries.json', JSON.stringify(entries, null, 2));

console.log('✅ Successfully converted entries.yml to entries.json'); 
