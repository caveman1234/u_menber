Vue.use(window.vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      users: [],
      isLoading: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      info:{
        name:"name"
      }
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var phone = String(this.$refs.searchInp.value).trim();
      var paramsWrap = {
        params: {
          pageIndex: _this.pageInfo.pageIndex,
          pageSize: _this.pageInfo.pageSize,
          phone: phone
        }
      };
      var fullUrl = "/vipkh/ru/getMemberInfo";
      var headerWrap = {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'X-Authorization': encrypted,
        // },
        timeout: 2 * 60 * 1000
      }
      return axios.get(fullUrl, paramsWrap, headerWrap)
        .then(function (res) {
          if (res.data.flag == 1) {
            return (res.data.data ? res.data.data : []);
          } else {
            return [];
          }
        });
    },
    search: async function () {
      var _this = this;
      _this.users = [];
      _this.isLoading = true;
      var users = await _this.fetchData();
      users = users.map(function (v) {
        return {
          realname: v.realname,
          phone: v.phone,
          identity_type: v.identity_type,
          identity_num: v.identity_num,
        }
      });
      _this.users = users;
      _this.isLoading = false;
    }
  },
  mounted: function () {
    var _this = this;
    _this.search();
    // mui.init({
    //   pullRefresh : {
    //     container:".userContent",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    //     up : {
    //       height:50,//可选.默认50.触发上拉加载拖动距离
    //       auto:true,//可选,默认false.自动上拉加载一次
    //       contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
    //       contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
    //       callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    //         _this.pageInfo.pageIndex++;
    //         debugger
    //         _this.search();
    //         // this.endPullupToRefresh(true|false);
    //       }, 
    //     }
    //   }
    // })
  }
})
window.app = app;