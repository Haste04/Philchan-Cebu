const fs = require('fs');
const path = require('path');

const dir = './src';
const colorMap = {
  'charcoal': 'health-text',
  'linen': 'health-bg',
  'deep-teal': 'health-green',
  'ribbon': 'health-red',
  'sanctuary-gold': 'health-green-light',
  'mist': 'health-border',
  'slate-900': 'health-green',
  'slate-950': 'health-green',
  'slate-800': 'health-green',
  'emerald-400': 'health-green-light',
  'emerald-300': 'health-green-light',
  'emerald-500': 'health-green-light',
  'rose-400': 'health-red-light',
  'rose-500': 'health-red-light',
  'amber-400': 'health-green-pale',
  'amber-500': 'health-green-pale',
  'slate-300': 'health-bg',
  'slate-400': 'health-border',
  'slate-200': 'health-bg',
  'slate-50': 'health-white',
  'slate-100': 'health-white'
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.astro')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      for (const [oldC, newC] of Object.entries(colorMap)) {
        const regex = new RegExp(oldC, 'g');
        content = content.replace(regex, newC);
      }
      
      // dark mode classes removal to simplify and just rely on our palette
      content = content.replace(/dark:[^\s"']+/g, '');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDirectory(dir);
