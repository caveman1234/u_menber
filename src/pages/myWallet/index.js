Vue.use(window.vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      userInfo:{},
      refreshClass: false,
      dealRecordUrl: "http://vip.cdkhms.com/app/mm.php/MM/MemberStorage/index?type=1&wid=gh_d3af0cdfa7f3#searchrecord",
      accountRechargeUrl: "http://vip.cdkhms.com/app/mm.php/MM/MemberStorage/index?type=1&wid=gh_d3af0cdfa7f3#storagepay"
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var params = {
        fields: [
          { name: "mid" },
          { name: "realname" },
          { name: "phone" },
          { name: "define1" },
          { name: "define2" },
          { name: "define3" },
          { name: "define4" },
        ],
        conditions: [
          {
            name: "mid",
            value1: 1,
            type: "string",
            op: "eq"
          }
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
      _this.refreshClass = true;
      return axios.post(fullUrl, params, headerWrap)
        .then(function (res) {
          setTimeout(function(){
            _this.refreshClass = false;
          },1500);
          if (res.data.flag == 1) {
            return res.data.data[0];
          } else {
            return {};
          }
        });
    },
    onSubmit: async function () {
      var _this = this;
      var userInfo = await _this.fetchData();
      _this.userInfo = userInfo;
    }
  },
  mounted: function () {
    this.onSubmit();
  }
})
window.app = app;