// 引入 http 模块
const http = require('http');

// 引入 fs 模块
const fs = require('fs');

// 引入 url 模块
const url = require('url');

// 引入 path 模块
const path = require('path');

http.createServer(function(req, res) {
  // 获取相应路径
  let pathName = url.parse(req.url).pathname;

  // 默认加载路径
  if (pathName === '/') {
    // 默认加载的首页
    pathName = 'index.html';
  }

  const extName = path.extname(pathName);

  // 过滤 /favicon.ico 的请求
  if (pathName !== '/favicon.ico') {
    // 获取 html 目录下的 index.html
    fs.readFile('html/' + pathName, function(error, data) {
      if (error) {
        // 如果不存在这个文件
        console.log('400 Not Found!');
        fs.readFile('html/login.html', function(error, data) {
          if (error) {
            console.log(error);
          } else {
            // 获取文件类型
            const ext = getExt(extName);
            // 设置请求头
            res.writeHead(200, { "Content-Type": ext + "; charset=UTF-8" });
            // 写入读取文件
            res.write(data);
            // 结束响应
            res.end();
          }
        });
      } else {
        // 返回这个文件

        // 获取文件类型
        const ext = getExt(extName);
        // 设置请求头
        res.writeHead(200, { "Content-Type": ext + "; charset=UTF-8" });
        // 写入读取文件
        res.write(data);
        // 结束响应
        res.end();
      }
    });
  }
}).listen(8000);

// 获取后缀名
function getExt(extName) {
  // readFile 是异步操作，所以需要使用 readFileSync
  const data = fs.readFileSync('ext.json');
  const ext = JSON.parse(data.toString());
  return ext[extName];
}