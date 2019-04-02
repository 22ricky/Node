var http = require('http');
var url = require('url');
var querystring = require('querystring');

let server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // const { pathname, query } = url.parse(req.url, true);
  // console.log(pathname, query);

  let arr = [];
  req.on('data', chunk => {
    arr.push(chunk);
  });
  req.on('end', () => {
    // console.log(querystring.parse(str));
    let data = Buffer.concat(arr);
    console.log(data);
    res.end();
  });
});

server.listen(8888);