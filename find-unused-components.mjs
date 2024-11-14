import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'src', 'components');
const searchDirs = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components')
];

function getFiles(dir, files_ = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

function isComponentUsed(componentName, searchDirs) {
  for (const dir of searchDirs) {
    const files = getFiles(dir);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes(componentName)) {
        return true;
      }
    }
  }
  return false;
}

const componentFiles = getFiles(componentsDir);

const unusedComponents = componentFiles.filter(component => {
  const componentName = path.basename(component, '.astro');
  return !isComponentUsed(componentName, searchDirs);
});

if (unusedComponents.length > 0) {
  console.log('Unused Components:');
  unusedComponents.forEach(component => console.log(component));
} else {
  console.log('No unused components found.');
}