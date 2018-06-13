/* this.$notify.success({
  title: 'Info',
  message: '这是一条没有关闭按钮的消息',
  showClose: false
});
this.$notify.error({
  title: 'Info',
  message: '这是一条没有关闭按钮的消息',
  showClose: false
}); */
// var loadingInstance1 = app.$loading({
//   background: "rgba(0,0,0,0.1)",
//   text: "正在加载......"
// });
var loadingInstance1;
//request setting
axios.interceptors.request.use(function (config) {
  loadingInstance1 = app.$loading({
    fullscreen: true,
    text: '正在拼命加载......',
    background: 'rgba(0,0,0,0.1)'
  });
  //追加一个参数,disable cache
  // config.url = config.url + "?_= " + Date.now();
  return config;
}, function (error) {
  loadingInstance1.close();
  app.$notify.error({
    title: '请求错误',
    message: '请求错误',
    offset: 90,
    duration: 3000
  });
  return Promise.reject(error);
});
/* response */
axios.interceptors.response.use(function (response) {
  setTimeout(function () { loadingInstance1.close() }, 300);
  if (response.data.flag != 1) {
    app.$notify.error({
      title: '请求错误',
      message: response.data.msg,
      offset: 90,
      duration: 3000
    });
  }
  return response;
}, function (error) {
  loadingInstance1.close();
  app.$notify.error({
    title: '请求错误',
    message: '请求错误',
    offset: 90,
    duration: 3000
  });
  return Promise.reject(error);
});