const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

// Read YAML file
const fullpath_load = path.join(__dirname, '../src/data/entries.yml');
const yamlContent = fs.readFileSync(fullpath_load, 'utf8');
const { data: entries } = matter(`---
${yamlContent}
---`);

// Write JSON file
const fullpath_save = path.join(__dirname, '../src/data/entries.json');
fs.writeFileSync(fullpath_save, JSON.stringify(entries, null, 2));

console.log('✅ Successfully converted entries.yml to entries.json'); 
