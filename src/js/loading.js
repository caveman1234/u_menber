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
  // let url = response.config.url;
  if (response.data.flag != 1) {
    if (response.data.flag == 2) {
      app.$notify.error({
        title: '请求错误',
        message: "没有符合查询条件的数据",
        offset: 90,
        duration: 3000
      });
    } else {
      var errormsg = response.data.errormsg;
      console.log("%cajax::", "color:red;font-size:20px;", response.data.data, response.config.url, response.data.errormsg);
    }
  } else {
    console.log("%cajax::", "color:green;font-size:20px;", response.data.data, response.config.url);
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