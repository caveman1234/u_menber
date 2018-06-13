Vue.use(window.vuePlugin);
var loadingInstance1;
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      pagerInfo: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0
      },
      formData: {
        realname: '',
        phone: ''
      },
      tableData: []
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var searchParams = this.formData;
      var paramsWrap = {
        params: {
          // pageIndex: _this.pagerInfo.pageIndex,
          // pageSize: _this.pagerInfo.pageSize,
          phone: searchParams.phone,
          uName: searchParams.realname,
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
            _this.pagerInfo.totalCount = res.data.count || 0;
            return (res.data.data ? [res.data.data] : []);
          } else {
            return [];
          }
        });
    },
    onSubmit: async function () {
      var _this = this;
      var tableData = await _this.fetchData();
      tableData = tableData.map(function (v) {
        var divide3 = (v.kyAmount / 3).toFixed(2);
        var divide4 = (v.kyAmount / 4).toFixed(2);
        return {
          uName: v.uName,
          phone: v.phone,
          lifeTotal: divide3,
          lifeUsed: divide3 - v.lifeFund,
          lifeResidue: v.lifeFund,
          healthTotal: divide3,
          healthUsed: divide3 - v.healthyFund,
          healthResidue: v.healthyFund,
          happyTotal: divide4,
          happyUsed: divide4 - v.funFund,
          happyResidue: v.funFund,
          commonTotal: v.cy_amount,
          commonUsed: ((v.cy_amount || 0) - v.currencyAmount),
          commonResidue: v.currencyAmount,
        }
      });
      _this.tableData = tableData;
    },
    reset: function () {
      var _this = this;
      Object.keys(this.formData).forEach(function (v) {
        _this.formData[v] = '';
      });
    },
    handleSizeChange: function (pageSize) {
      this.pagerInfo.pageSize = pageSize;
      this.onSubmit();
    },
    handleCurrentChange: function (pageIndex) {
      this.pagerInfo.pageIndex = pageIndex;
      this.onSubmit();
    },
  },
  mounted: function () {
    this.onSubmit();
  }
})
window.app = app;