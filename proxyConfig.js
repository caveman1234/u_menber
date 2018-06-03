var proxy = require('http-proxy-middleware');
module.exports = [
  proxy('/ocm-web', {
    target: 'http://182.150.55.64:8013/',
    changeOrigin: true
  }),
  proxy('/open', {
    target: 'http://vip.cdkhms.com/',
    changeOrigin: true
  })
];