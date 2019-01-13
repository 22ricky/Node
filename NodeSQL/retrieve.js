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

// 查询的 SQL 语句
const retrieveSql = 'SELECT * FROM user';

// 连接 SQL 并实施语句
connection.query(retrieveSql, function(error, result) {
  if (error) throw error;
  console.log(result);
});

// 终止连接
connection.end();