// 连接 MySQL: 先安装 npm i mysql -D
var mysql = require('mysql');
// MySQL 的连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node'
});
// 开始连接
connection.connect();

// 引入 http 模块：http 是提供 Web 服务的基础
const http = require("http");

// 引入 url 模块：url 是对用户提交的路径解析
const url = require("url");

// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require("querystring");

// 用 http 模块创建服务

http.createServer(function(req, res) {

  // 设置 cors 跨域
  res.setHeader("Access-Control-Allow-Origin", '*');
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');

  if (req.method === "POST") { // 接口 POST 形式

    console.log("\n【POST 形式】");
    
    // 获取前端发来的路由地址
    let pathName = req.url;

    console.log("\n接口为：" + pathName);

    // 接收发送过来的参数
    let tempResult = "";

    // 数据接入中
    req.addListener("data", function(chunk) {
      tempResult += chunk;
    });

    // 数据接收完成
    req.addListener("end", function() {
      const result = JSON.stringify(qs.parse(tempResult));
      console.log("\n参数为：");
      console.log(result);

      if (pathName === '/login') { // 登录

        console.log("\n【API - 登录】");
  
      } else if (pathName === '/register') { // 注册
  
        console.log("\n【API - 注册】");

        res.end("连接成功");
      }
      // 接口信息处理完毕
    });
    // 数据接收完毕
  } else if ( req.method === 'GET' ) { // 接口 GET 形式

    console.log("\n【GET 形式】");

    // 解析 url 接口
    let pathName = url.parse(req.url).pathname;

    console.log("\n接口为：" + pathName);

    if (pathName === '/getUser') { // 获取用户信息

      console.log("\n【API- 获取用户信息】");

      // 解析 url 参数部分
      let params = url.parse(req.url, true).query;

      console.log("\n参数为：");
      console.log(params);

      // 新增的 SQL 语句
      let readSql = "SELECT name,age FROM user";

      // 连接 SQL 并实施语句
      connection.query(readSql, function(error, response) {
        if (error) {
          throw error;
        } else {

          let newRes = JSON.parse(JSON.stringify(response));
          console.log(newRes);

          // 返回数据
          res.write(JSON.stringify({
            code: '1',
            message: '查询成功！',
            data: newRes
          }));

          // 结束响应
          res.end();
        }
      });
      // 查询完毕
    }
    else if (pathName === '/') { // 首页
      res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });

      res.write("服务已开启");

      res.end();
    }

  }
}).listen(8888); // 监听的端口

// 获取当前时间
function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var strDate = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minute = date.getMinutes(); // 分
  var second = date.getSeconds() // 秒
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  
  if (strDate >= 1 && strDate <= 9 ) {
    strDate = "0" + strDate;
  }

  // 返回 yyyy-mm-dd hh:mm:ss 形式
  var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
  return currentdate;
}