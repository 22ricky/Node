// let a = new Buffer('abc');
// let b = new Buffer('ddd');

// let c = Buffer.concat([a, b]);

// console.log(c);

let buf = new Buffer('aaa-bbb-cccdddddd');

Buffer.prototype.split = Buffer.prototype.split || function(str) {
  let arr = [];
  let cur = 0;
  let n = 0;
  while ((n = this.indexOf(str, cur)) !== -1) {
    arr.push(this.slice(cur, n));
    cur = n + str.length;
  }
  arr.push(this.slice(cur));
  return arr;
}

let arr = buf.split('-');

console.log(arr);

console.log(arr.map(buffer => buffer.toString()));