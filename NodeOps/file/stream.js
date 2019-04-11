const fs = require('fs');

let rs = fs.createReadStream('www/Avatar.png');
let ws = fs.createWriteStream('www/Avatar_Copy.png');

rs.pipe(ws);