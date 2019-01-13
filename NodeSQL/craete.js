// 连接 MySQL
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

// 新增的 SQL 语句及新增的字段信息
const createSql = 'INSERT INTO user(name, age) VALUES(?,?)';
const createSqlParams = ['guest', 25];

// 连接 SQL 并实施语句
connection.query(createSql, createSqlParams, function(error, result) {
  if (error) {
    console.log('新增错误：');
    console.log(error);
  } else {
    console.log('新增成功：');
    console.log(result);
  }
});

// 终止连接
connection.end();