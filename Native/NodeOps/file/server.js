var http = require('http');
var url = require('url');
var querystring = require('querystring');
const common = require('./libs/common');
const fs = require('fs');
const uuid = require('uuid/v4');

let server = http.createServer((req, res) => {
  // const { pathname, query } = url.parse(req.url, true);
  // console.log(pathname, query);

  let arr = [];
  let post = {};
  let files = {};
  req.on('data', chunk => {
    arr.push(chunk);
  });
  req.on('end', () => {
    // console.log(querystring.parse(str));
    let data = Buffer.concat(arr);
    
    // data
    // 解析二进制文件上传数据
    if (req.headers['content-type']) {
      const str = req.headers['content-type'].split('; ')[1];
      if (str) {
        const boundary = '--' + str.split('=')[1];

        // 1.用boundary切开数据
        arr = data.split(boundary);

        // 2.丢弃头尾元素
        arr.shift();
        arr.pop();

        // 3.丢弃每一项的头尾"\r\n"
        arr = arr.map(buffer => buffer.slice(2, buffer.length - 2));

        // 4.在每一项中用第一次出现的"\r\n\r\n"切开数据
        arr.forEach(buffer => {
          const n = buffer.indexOf("\r\n\r\n");
          let description = buffer.slice(0, n);
          let content = buffer.slice(n+4);

          description = description.toString();

          if (description.indexOf("\r\n") === -1) {
            // 普通数据
            // Content-Disposition: form-data; name="user"
            content = content.toString();

            let name = description.split('; ')[1].split('=')[1];
            name = name.substring(1, name.length-1);
            post[name] = content;
          } else {
            // 文件数据
            /*Content-Disposition: form-data; name="f1"; filename="a.txt"\r\n
            Content-Type: text/plain*/
            let [line1, line2] = description.split('\r\n');
            let [, name, filename] = line1.split('; ');
            let type = line2.split(': ')[1];

            name = name.split('=')[1];
            name = name.substring(1, name.length-1);
            filename = filename.split('=')[1];
            filename = filename.substring(1, filename.length -1);
            const path = `upload/${uuid().replace(/\-/g, '')}`;
            
            fs.writeFile(path, content, err => {
              if (err) {
                console.log('文件上传错误：', err);
              } else {
                files[name] = { filename, type, path }
                console.log('成功');
                console.log(files);
              }
            });
          }
        });
      }
    }
    
    console.log(post);
    res.end();
  });
});

server.listen(8888);