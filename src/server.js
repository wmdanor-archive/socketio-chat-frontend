try {
  require('dotenv').config();
} catch {}
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT ?? 3000;

const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain'
};

const server = http.createServer((request, response) => {
  const filePath = (request.url === '/' ? '/index.html' : request.url).slice(1);

  console.log(filePath);

  const extname = path.extname(filePath).toLowerCase();

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(path.resolve(distPath, filePath), (error, data) => {
    if (error) {
      if(error.code === 'ENOENT') {
        fs.readFile(indexPath, (error, data) => {
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(data, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('500 Internal Server Error');
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(data, 'utf-8');
    }
  });
});

server.listen(port);

console.log(`Server listening on port ${port}`);
