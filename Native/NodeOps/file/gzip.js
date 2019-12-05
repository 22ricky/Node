const fs = require('fs');
const zlib = require('zlib');

let rs = fs.createReadStream('www/jquery.js');
let ws = fs.createWriteStream('www/jquery.js.gz');

let gz = zlib.createGzip();

rs.pipe(gz).pipe(ws);
