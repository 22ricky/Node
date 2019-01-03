// 1.引入 url 模块
var url = require('url');

// 2.引入 http 模块
var http = require('http');

// 3.用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http.createServer(function (req, res) {

  // 4.获取服务器请求
  /**
   * 访问地址是：http://location:3000/?userName=ricky&userAge=22
   * 如果你执行 console.log(req.url)，它将执行两次，分别返回下面的信息：
   * /  ?userName=ricky&userAge=22
   * /  /favicon.ico
   * 这里为了防止重复执行，所以排除 req.url === /favicon.ico 的情况
   */
  if (req.url !== '/favicon.ico') {

    // 5.使用 url 的 parse 方法
    /**
   * parse 方法需要两个参数：
   * 第一个参数是地址
   * 第二个参数是 true 的话表示把 get 传值转换成对象
   */
    var result = url.parse(req.url, true);
    console.log(result);
    /**
     * Url {
     *   protocol: null,
     *   slashes: null,
     *   auth: null,
     *   host: null,
     *   port: null,
     *   hostname: null,
     *   hash: null,
     *   search: '?userName=ricky&userAge=22',
     *   query: { userName: 'ricky', userAge: '22' },
     *   pathname: '/',
     *   path: '/?userName=ricky&userAge=22',
     *   href: '/?userName=ricky&userAge=22' }
     */

    console.log(result.query.userName); // ricky

    console.log(result.query.userAge); // 22
  }

  // 设置 HTTP 头部，状态码是200，文件类型是 html，字符集是 utf8
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });

  // 往页面打印值
  res.write('<h1 style="text-align: center">Hello NodeJS</h1>');

  // 结束响应
  res.end();

}).listen(3000);