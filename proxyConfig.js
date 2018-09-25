var proxy = require('http-proxy-middleware');
module.exports = [
  proxy('/open', {
    target: 'http://vip.cdkhms.com/',
    changeOrigin: true
  }),
  // proxy('/vipkh', {
  //   target: 'http://vip.cdkhms.com:8080/',
  //   changeOrigin: true
  // }),
  
  proxy('/vipkh', {
    target: 'http://47.93.233.214:8080/',
    changeOrigin: true
  })
];