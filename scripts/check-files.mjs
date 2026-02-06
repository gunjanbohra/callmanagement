import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';

const IMPORTANT_DIRS = ['pages', 'app', 'components', 'api'];
const ROOT_DIR = new URL('../', import.meta.url).pathname;

async function getFiles(dir) {
  const files = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const path = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && !entry.name.includes('node_modules')) {
          files.push(...(await getFiles(path)));
        }
      } else if (entry.isFile()) {
        const stats = await stat(path);
        if (stats.size === 0) {
          files.push(relative(ROOT_DIR, path));
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return files;
}

async function main() {
  console.log('Checking for zero-length files...');
  
  const emptyFiles = await getFiles(ROOT_DIR);
  
  if (emptyFiles.length > 0) {
    console.log('\nFound empty files:');
    emptyFiles.forEach(file => console.log(`- ${file}`));
  } else {
    console.log('\nNo empty files found!');
  }
  
  // Check for important directories
  console.log('\nChecking important directories...');
  for (const dir of IMPORTANT_DIRS) {
    try {
      await stat(join(ROOT_DIR, 'src', dir));
      console.log(`✓ ${dir} directory exists`);
    } catch {
      console.log(`⚠ ${dir} directory not found`);
    }
  }
}

main().catch(console.error);