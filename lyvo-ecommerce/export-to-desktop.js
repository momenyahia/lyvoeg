const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.resolve(__dirname);
const targetDir = 'C:\\Users\\momen\\Desktop\\lyvo-ecommerce';

console.log('Copying project to Desktop without node_modules and .next...');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  fs.readdirSync(from).forEach((element) => {
    if (element === 'node_modules' || element === '.next' || element === '.git') {
      return;
    }
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);

    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

try {
  copyFolderSync(sourceDir, targetDir);
  console.log('Successfully copied to:', targetDir);
} catch (err) {
  console.error('Error copying:', err);
}
