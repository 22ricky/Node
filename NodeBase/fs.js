/**
 * 1. fs.stat 检测是文件还是目录
 * 2. fs.mkdir 创建目录
 * 3. fs.writeFile 创建写入文件
 * 4. fs.appendFile 追加文件
 * 5. fs.readFile 读取文件
 * 6. fs.readdir 读取目录
 * 7. fs.rename 重命名
 * 8. fs.rmdir 删除目录
 * 9. fs.unlink 删除文件
 */

// 1. fs.stat
const fs = require('fs');
fs.stat('index.js', function(error, stats) {
  if (error) {
    console.log(error);
    return false;
  } else {
    console.log(stats);
    /**
     * Console：
     * Stats {
     *   dev: 173613516,
     *   mode: 33206,
     *   nlink: 1,
     *   uid: 0,
     *   gid: 0,
     *   rdev: 0,
     *   blksize: undefined,
     *   ino: 2533274790692909,
     *   size: 9,
     *   blocks: undefined,
     *   atimeMs: 1546672457093.365,
     *   mtimeMs: 1546673164512.6992,
     *   ctimeMs: 1546675769866.3315,
     *   birthtimeMs: 1546672457093.365,
     *   atime: 2019-01-05T07:14:17.093Z,
     *   mtime: 2019-01-05T07:26:04.513Z,
     *   ctime: 2019-01-05T08:09:29.866Z,
     *   birthtime: 2019-01-05T07:14:17.093Z }
     */

    console.log(`文件：${stats.isFile()}`);
    // Console：文件：true

    console.log(`目录：${stats.isDirectory()}`);
    // Console：目录：false

    return false;
  }
});

// 2. fs.mkdir
// const fs = require('fs');

/**
 * 接收参数
 * path - 将创建的目录路径
 * mode - 目录权限（读写权限），默认 0777
 * callback - 回调，传递异常参数 err
 */
// fs.mkdir('css', function(err) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('创建目录成功！');
//     // Console：创建目录成功！
//   }
// });

// 3. fs.writeFile
// const fs = require('fs');

/**
 * filename (String) 文件名称
 * data (String | Buffer) 将要写入的内容，可以是字符串或者 buffer 数据。
 * . encoding (String) 可选。默认为 'utf8'，当 data 是 buffer 时，该值应该为 ignored。
 * . mode (Number) 文件读写权限，默认为 438。
 * . flag (String) 默认为 'w'。
 * callback { Function } 回调，传递异常参数 err
 */
// fs.writeFile('index.js', 'Hello', function(err) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('写入文件成功！');
//     // Console：写入文件成功！
//   }
// });

// 4. fs.appendFile
// const fs = require('fs');

/**
 * path (String) 文件路径
 * data (String | Buffer) 将要追加的内容，可以是字符串或者 buffer 数据。
 * . encoding (String) 可选。默认为 'utf8'，当 data 是 buffer 时，该值应该为 ignored。
 * . mode (Number) 文件读写权限，默认为 438。
 * . flag (String) 默认为 'a'。
 * callback { Function } 回调，传递异常参数 err
 */
// fs.appendFile('index.js', 'Node', function(err) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('追加文件成功！');
//     // Console：追加文件成功！
//   }
// });

// 5. fs.readFile
// const fs = require('fs');

/**
 * 接收参数
 * path (String) 文件路径
 * . encoding (String) 可选，默认为 null。
 * . flag (String) 默认为 'r'。
 * callback { Function } 回调，传递异常参数 err 和 文件内容 data
 */
// fs.readFile('index.js', function(err, data) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('读取文件成功！');
//     console.log(data);
//     // Console：
//     // 读取文件成功！
//     // <Buffer 48 65 6c 6c 6f 4e 6f 64 65>
//   }
// });

// 6. fs.readdir
// const fs = require('fs');

/**
 * 接收参数
 * path (String) 目录路径
 * . encoding (String) 可选，默认为 'utf8'。
 * . withFileTypes (Boolean) 默认为 false。
 * callback { Function } 回调，传递异常参数 err 和目录中的文件名数组 files
 */
// fs.readdir('node_modules', function(err, files) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('读取目录成功！');
//     console.log(files);
//     // Console：
//     // 读取目录成功！
//     // [ 'multiply.js', 'test_module' ]
//   }
// });

// 7. fs.rename
// const fs = require('fs');

/**
 * 接收参数
 * oldPath - 旧文件路径
 * newPath - 新文件路径
 * callback - 回调，传递异常参数 err
 */
// 重命名
// fs.rename('index.js', 'new.js', function(err) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('重命名成功！');
//     // Console：重命名成功！
//   }
// });

// 剪切
// fs.rename('index.js', 'node_modules/index.js', function(err) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('剪切成功！');
//     // Console：剪切成功！
//   }
// });

// 8. fs.rmdir
// const fs = require('fs');

/**
 * 接收参数
 * path - 将删除的目录路径
 * mode - 目录权限（读写权限），默认 0777
 * callback - 回调，传递异常参数 err
 */
// fs.rmdir('css', function(err) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('删除目录成功！');
//     // Console：删除目录成功！
//   }
// });

// 9. fs.unlink
// const fs= require('fs');

/**
 * 接收参数
 * path - 将删除的文件路径
 * callback - 回调，传递异常参数 err
 */
// fs.unlink('index.js', function(err) {
//   if (err) {
//     console.log(err);
//     return false;
//   } else {
//     console.log('删除文件成功！');
//     // Console：删除文件成功！
//   }
// });