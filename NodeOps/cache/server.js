const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  // 获取文件日期
  fs.stat(`www/${pathname}`, (err, stat) => {
    if (err) {
      res.writeHeader(404);
      res.write('Not Found');
      res.end();
    } else {
      function sendFileToClient() {
        // 发送
        let rs = fs.createReadStream(`www/${pathname}`);

        res.setHeader('Last-Modified', stat.mtime.toGMTString());
        
        // 输出
        rs.pipe(res);

        rs.on('error', err => {
          res.writeHeader(404);
          res.write('Not Found');
          res.end();
        });
      }
      
      if (req.headers['if-modified-since']) {
        let oDate = new Date(req.headers['if-modified-since']);
        let time_client = Math.floor(oDate.getTime() / 1000);
        let time_server = Math.floor(stat.mtime.getTime() / 1000);

        if (time_server > time_client) { // 服务器的文件时间>客户端手里的版本
          sendFileToClient();
        } else {
          res.writeHeader(304);
          res.write('Not Modified');
          res.end();
        }
      } else {
        sendFileToClient();
      }
    }
  });
}).listen(8088);