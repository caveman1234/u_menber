Vue.use(window.vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      isLoading: false,
      tableData: []
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var phoneSearch = _this.$refs.searchInp.value;
      var _this = this;
      var paramsWrap = {
        params: {
          phone: phoneSearch
        }
      };
      Object.keys(paramsWrap.params).forEach(function (key) {
        if (!paramsWrap.params[key]) {
          delete paramsWrap.params[key];
        }
      });
      var fullUrl = "/vipkh/ru/get";
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
            return (res.data.data ? [res.data.data] : []);
          } else {
            return [];
          }
        });
    },
    onSubmit: async function () {
      var _this = this;
      _this.tableData = [];
      _this.isLoading = true;
      var tableData = await _this.fetchData();
      tableData = tableData.map(function (v) {
        return {
          uName: v.uName,
          phone: v.phone,

          lifeTotal: (v.lifeAmount || 0),
          lifeUsed: (v.lifeAmount || 0) - v.lifeFund,
          lifeResidue: v.lifeFund,

          healthTotal: (v.HealthAmount || 0),
          healthUsed: (v.HealthAmount || 0) - v.healthyFund,
          healthResidue: v.healthyFund,

          happyTotal: (v.funAmount || 0),
          happyUsed: (v.funAmount || 0) - v.funFund,
          happyResidue: v.funFund,

          commonTotal: v.cy_amount,
          commonUsed: ((v.cy_amount || 0) - v.currencyAmount),
          commonResidue: v.currencyAmount,
          totalResidue: (v.currencyAmount + v.funFund + v.lifeFund + v.healthyFund),
          imgUrl: v.imgUrl
        }
      });
      _this.tableData = tableData;
      _this.isLoading = false;
    },
  },
  mounted: function () {
    this.onSubmit();
  }
})
window.app = app;