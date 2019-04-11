const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

let server = http.createServer((req, res) => {
  res.setHeader('content-encoding', 'gzip');
  let rs = fs.createReadStream(`www/${req.url}`);

  let gz = zlib.createGzip();
  
  rs.pipe(gz).pipe(res);

  rs.on('error', err => {
    res.writeHead(404);
    res.write('Not Found');
    res.end();
  });

  res.on('finish', () => {
    console.log('完成');
  });
});

server.listen(8888);