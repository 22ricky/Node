var http = require('http');

var tools1 = require('./add');

// 如果 Node 在当前目录找不到 multiply.js 文件，那么就会去 node_mudules 里面查找
var tools2 = require('multiply');

/**
 * 通过 package.json 来引用文件
 * 1.通过在 test_module 中 npm init --yes 来生成 package.json 文件
 * 2.package.json 文件中列出了程序入口文件为："main": "tools.js"
 * 3.Node 通过 require 查找 test_module，发现它有个 package.json 文件
 * 4.Node 执行 tools.js 文件
 */
var tools3 = require('test_module');

http.createServer(function(req, res) {

  res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" });

  res.write('<h1 style="text-align: center">Hello NodeJS</h1>');

  console.log(tools1.add(1, 2, 3));
  console.log(tools2.multiply(1, 2, 3, 4));
  console.log(tools3.add(4, 5, 6));
  /**
   * Console：
   * 6
   * 24
   * 15
   * 6
   * 24
   * 15
   * 这里要记得 Node 运行过程中，它请求了两次
   * http://localhost:3000/ 为一次
   * http://localhost:3000/favicon.ico 为第二次
   */

  res.end();

}).listen(3000);