Vue.use(window.vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      userInfo: {},
      refreshClass: false,
      dealRecordUrl: "http://vip.cdkhms.com/app/mm.php/MM/MemberStorage/index?type=1&wid=gh_d3af0cdfa7f3#searchrecord",
      accountRechargeUrl: "http://vip.cdkhms.com/app/mm.php/MM/MemberStorage/index?type=1&wid=gh_d3af0cdfa7f3#storagepay"
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var paramsWrap = {
        params: {
          memberid: getQueryString("mid")
        }
      };
      var fullUrl = "/vipkh/ru/get";
      var headerWrap = {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'X-Authorization': encrypted,
        // },
        timeout: 2 * 60 * 1000
      }
      _this.refreshClass = true;
      return axios.get(fullUrl, paramsWrap, headerWrap)
        .then(function (res) {
          setTimeout(function () {
            _this.refreshClass = false;
          }, 1500);
          if (res.data.flag == 1) {
            if (res.data.data == null) {
              return {};
            } else {
              return res.data.data
            }
          } else {
            return {};
          }
        });
    },
    onSubmit: async function () {
      var _this = this;
      var userInfo = await _this.fetchData();
      userInfo.totalMoney = (userInfo.lifeFund ||0) +( userInfo.healthyFund ||0) + (userInfo.funFund ||0) + (userInfo.currencyAmount || 0);
      _this.userInfo = userInfo;
    },
    dealRecord:function(){
      window.location.href = this.dealRecordUrl;
    },
    accountRecharge:function(){
      window.location.href = this.accountRechargeUrl;
    }
  },
  mounted: function () {
    this.onSubmit();
  }
})
window.app = app;