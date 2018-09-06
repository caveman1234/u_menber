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
            return (res.data.data ? res.data.data : []);
          } else {
            return [];
          }
        });
    },
    onSubmit: async function () {
      var _this = this;
      if(!(this.formData.phone || this.formData.realname)){
        app.$notify({message:"请输入搜索条件",type:"warning"});
        return;
      }
      _this.tableData = [];
      var tableData = await _this.fetchData();
      tableData = tableData.map(function (v) {
        return {
          uName: v.uName,
          phone: v.phone,

          lifeTotal: (v.lifeAmount || 0),
          lifeUsed: (v.lifeAmount || 0) - (v.lifeFund || 0),
          lifeResidue: v.lifeFund,

          healthTotal: (v.HealthAmount || 0),
          healthUsed: (v.HealthAmount || 0) - (v.healthyFund || 0),
          healthResidue: v.healthyFund,

          happyTotal: (v.funAmount || 0),
          happyUsed: (v.funAmount || 0) - (v.funFund || 0),
          happyResidue: v.funFund,

          commonTotal: v.cyAmount,
          commonUsed: ((v.cyAmount || 0) - (v.currencyAmount || 0)),
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
    // this.onSubmit();
  }
})
window.app = app;