const fs = require('fs/promises');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'public');
const outDir = path.join(root, 'dist');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
      continue;
    }
    if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function build() {
  await fs.rm(outDir, { recursive: true, force: true });
  await copyDir(srcDir, outDir);
  const marker = path.join(outDir, 'build-info.txt');
  const now = new Date().toISOString();
  await fs.writeFile(marker, `Built at ${now}\n`, 'utf8');
  console.log(`Static build generated at ${outDir}`);
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
