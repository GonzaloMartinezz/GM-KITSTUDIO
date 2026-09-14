import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'd:/MI PROPIO NEGOCIO/GMKITSTUDIO/frontend/public/images';

async function optimize() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const filePath = path.join(dir, file);
      const tempPath = filePath + '.tmp';
      
      console.log(`Optimizing ${file}...`);
      
      try {
        if (file.endsWith('.jpg')) {
          await sharp(filePath)
            .resize({ width: 800, withoutEnlargement: true })
            .jpeg({ quality: 75, progressive: true })
            .toFile(tempPath);
        } else if (file.endsWith('.png')) {
          const width = file === 'LOGOia.png' ? 200 : 800; // Logo doesn't need to be huge
          await sharp(filePath)
            .resize({ width, withoutEnlargement: true })
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(tempPath);
        }
        
        fs.renameSync(tempPath, filePath);
        console.log(`Successfully optimized ${file}`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }
}

optimize();
