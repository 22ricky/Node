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

// 删除的 SQL 语句
const deleteSql = 'DELETE FROM user WHERE id = 3';

// 连接 SQL 并实施语句
connection.query(deleteSql, function(error, result) {
  if (error) {
    console.log('删除错误：');
    console.log(error);
  } else {
    console.log('删除成功：');
    console.log(result);
  }
});

connection.end();