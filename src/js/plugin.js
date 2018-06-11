window.vuePlugin = {
  install: function (Vue) {
    Vue.directive('red', {
      inserted:function(el, binding, vnode) {
        var context = vnode.context;
        // context.myFun('al');
        el.style.color = '#E7442E';
      }
    });
    Vue.directive('gray', {
      inserted:function(el, binding, vnode) {
        var context = vnode.context;
        // context.myFun('al');
        el.style.color = '#999999';
      }
    });
    /* 格式化日期 */
    Vue.filter('formatDate', function (value) {
      if (!value) return '';
      var date = new Date(value);
      var year = date.getFullYear();
      var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      var day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());
      var formatDate = [year, month, day];
      return formatDate.join('-');
    });
    Vue.filter('formatDateTime', function (value) {
      if (!value) return '';
      var date = new Date(value);
      var year = date.getFullYear();
      var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      var day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());
      var hours = (date.getHours() + 1) < 10 ? '0' + (date.getHours()) : (date.getHours());
      var minutes = (date.getMinutes() + 1) < 10 ? '0' + (date.getMinutes()) : (date.getMinutes());
      var seconds = (date.getSeconds() + 1) < 10 ? '0' + (date.getSeconds()) : (date.getSeconds());
      var formatDate = [year, month, day];
      var formatTime = [hours, minutes, seconds];
      return formatDate.join('/') + " " + formatTime.join(':');
    });
    Vue.filter("formatWhether", function (value) {
      var obj = {
        0: "否",
        1: "是"
      }
      return obj[value];
    });
    Vue.filter('formatMoney', function (value) {
      if (value === null || value === '' || value === undefined) {
        return '¥0.00';
      }
      if (value === 0) {
        return '¥0.00';
      }
      value = String(Number(value).toFixed(2));
      var str = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      return '¥' + str;
    });
  }
}