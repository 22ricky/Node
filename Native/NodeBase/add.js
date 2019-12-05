// 1.假设我们文件中有个工具模块
var tools = {
  add: (...numbers) => {
    let sum = 0;
    for (let number in numbers) {
      sum += numbers[number];
    }
    return sum;
  }
};

/**
 * 2.暴露模块
 * exports.str = str;
 * module.exports = str;
 * 区别：
 * module.exports 是真正的接口
 * exports 是一个辅助工具
 * 如果 module.exports 为空，那么所有的 exports 搜集到的属性和方法，都赋值给了 module.exports
 * 如果 module.exports 具有任何的属性和方法，则 exports 会被忽略
 */

// export 使用方法
// var str = 'Node is very good!';
// exports.str = str; // { str: 'Node is very good!' }

// module.exports 使用方法
module.exports = tools;