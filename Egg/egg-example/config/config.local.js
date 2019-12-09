// config/config.local.js
'use strict';
module.exports = () => {
  const config = {};

  // add http_proxy to httpclient
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false, // certificate
        proxy: process.env.http_proxy,
        timeout: [ 20000, 30000 ],
      },
    };
  }

  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

  return config;
};
