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
      }
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var searchInp = String(this.$refs.searchInp.value).trim();
      // if (searchInp == "") {
      //   return;
      // }
      var realname = "";
      var phone = "";
      var phoneRegExp = /^\d+$/;
      var realnameRegExp = /^[^\d]+$/;
      if (phoneRegExp.test(searchInp)) {
        phone = searchInp;
        realname = "";
      } else {
        realname = searchInp;
        phone = "";
      }
      var params = {
        pager: {
          pageIndex: _this.pageIndex,
          pageSize: 10,
        },
        conditions: [
          {
            name: "realname",
            value1: realname,
            type: "string",
            op: "like"
          },
          {
            name: "phone",
            value1: phone,
            type: "string",
            op: "like"
          }
        ],
        fields: [
          { "name": "mid" },
          { "name": "realname" },
          { "name": "phone" },
          { "name": "identity_type" },//1 身份证
          { "name": "identity_num" },
        ]
      };
      var encrypted = globalHmacSHA256(params);
      var url = "/open/mm/member/query/v1";
      var fullUrl = url + "?access_token=" + AccessToken;
      var headerWrap = {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': encrypted,
        },
        timeout: 2 * 60 * 1000
      }
      return axios.post(fullUrl, params, headerWrap)
        .then(function (res) {
          if (res.data.flag == 1) {
            return res.data.data;
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