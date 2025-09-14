import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libDir = path.join(__dirname, '../Lib');
const indexFile = path.join(libDir, 'index.tsx');

let existingContent = '';


fs.readdir(libDir, (err, files) => {
  if (err) {
    console.error('Error reading Lib directory:', err);
    return;
  }
  const componentFolders = files.filter(file => {
    const filePath = path.join(libDir, file);
    return fs.statSync(filePath).isDirectory();
  });

  const exports = [];

  componentFolders.forEach(folder => {
    const folderPath = path.join(libDir, folder);
    const subFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.tsx'));
    subFiles.forEach(file => {
      const componentName = path.parse(file).name;
      exports.push(`export {${componentName}} from "./${folder}/${componentName}";`);
    });
  });
  const newContent = existingContent + exports.join('\n') + '\n';
  fs.writeFileSync(indexFile, newContent);
  console.log('index.tsx updated with component exports.');
});
