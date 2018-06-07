var baseUrl = "http://vip.cdkhms.com";
// axios.defaults.timeout = 10000
/*
  @params json
  @return encrypted string
*/
var AccessToken = "NVZBGUcdzvAkf8nrQDbqueX4TjJ5MpaP2IRmE7Si6WHYgF1C";
function globalHmacSHA256(json) {
  var Secret = "CzwUucfT1RrXhHWKxp35PGYD4BISnmFZ6tVsAQiakvd7MEegJqj8N2yb";
  var cryptoMsg = JSON.stringify(json);
  var encrypted = CryptoJS.HmacSHA256(cryptoMsg, Secret).toString();
  return encrypted;
}
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}