const fs = require('fs');
const path = require('path');

// Ensure output directories expected by package.json "files" exist before stencil build validates them
const targetDirs = [
  path.resolve(__dirname, '../angular'),
  path.resolve(__dirname, '../components'),
];

targetDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('[prepare-build] Created placeholder directory:', dir);
  }
});
