const sharp = require('sharp');
sharp('public/images/kitsodontologico.jpg')
  .resize(800)
  .webp({ quality: 80 })
  .toFile('public/images/kitsodontologico.webp')
  .then(() => console.log('Successfully optimized image to WebP (800px width)'))
  .catch(err => console.error('Error optimizing image:', err));
