const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'hero-vtc.jpg': 'https://images.unsplash.com/photo-1562829781-0a3c9d3c7ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'service-prive.jpg': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'aeroport.jpg': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'evenements.jpg': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
};

const downloadImage = (url, filename) => {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const filepath = path.join(publicDir, filename);
  const file = fs.createWriteStream(filepath);

  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filepath);
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

Object.entries(images).forEach(([filename, url]) => {
  downloadImage(url, filename);
}); 