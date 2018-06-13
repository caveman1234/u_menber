var proxy = require('http-proxy-middleware');
module.exports = [
  proxy('/open', {
    target: 'http://vip.cdkhms.com/',
    changeOrigin: true
  }),
  proxy('/vipkh', {
    target: 'http://vip.cdkhms.com:8080/',
    changeOrigin: true
  })
];