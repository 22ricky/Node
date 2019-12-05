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

// 修改的 SQL 语句及修改的字段信息
const updateSql = 'UPDATE user SET age = ? WHERE id = ?';
const updateSqlParams = [30, 3];

// 连接 SQL 并实施语句
connection.query(updateSql, updateSqlParams, function(error, result) {
  if (error) {
    console.log('修改错误：');
    console.log(error);
  } else {
    console.log('修改成功：');
    console.log(result);
  }
});

// 终止连接
connection.end();