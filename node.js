const crypto = require('crypto');
var params = {
  "username": "zhangsan",
  "phone": "13888888888"
}
const secret = 'CzwUucfT1RrXhHWKxp35PGYD4BISnmFZ6tVsAQiakvd7MEegJqj8N2yb';
const hash = crypto.createHmac('sha256', secret)
  .update(JSON.stringify(params))
  .digest('hex');
console.log(hash);