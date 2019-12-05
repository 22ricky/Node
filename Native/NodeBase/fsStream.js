// 新建 fs
const fs = require('fs');
// 流的方式读取文件
let fileReadStream = fs.createReadStream('index.js');
// 读取次数
let count = 0;
// 保存数据
let str = '';
// 开始读取
fileReadStream.on('data', function(chunk) {
  console.log(`${++count} 接收到：${chunk.length}`);
  // Console：1 接收到：9
  str += chunk;
});
// 读取完成
fileReadStream.on('end', function() {
  console.log('--结束--');
  console.log(count);
  console.log(str);

  // Console：--结束--
  // 1
  // HelloNode
});
// 读取失败
fileReadStream.on('error', function(error) {
  console.log(error);
});


// 新建 fs
const fs = require('fs');
// 创建一个可以写入的流，写入到文件 index.js 中
let fileWriteStream = fs.createWriteStream('index.js');
// 开始写入
fileWriteStream.write('HelloNodeFileStream', 'utf8');
// 写入完成
fileWriteStream.end();
fileWriteStream.on('finish', function() {
  console.log('写入完成！');
  // Console：写入完成！
});
