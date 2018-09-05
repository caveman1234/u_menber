Vue.use(window.vuePlugin);
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
        phone: '',
        rangeDate: []
      },
      tableData: []
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var searchParams = this.formData;
      var startDate = searchParams.rangeDate.length == 2 ? searchParams.rangeDate[0].getTime(): "";
      var endDate = searchParams.rangeDate.length == 2 ? searchParams.rangeDate[1].getTime(): "";
      var paramsWrap = {
        params: {
          pageIndex: _this.pagerInfo.pageIndex,
          pageSize: _this.pagerInfo.pageSize,
          phone: searchParams.phone,
          startDate: startDate,
          endDate: endDate
        }
      };
      Object.keys(paramsWrap.params).forEach(function(key){
        if(!paramsWrap.params[key]){
          delete paramsWrap.params[key];
        }
      });
      var fullUrl = "/vipkh/ru/getConsume";
      var headerWrap = {
        timeout: 2 * 60 * 1000
      }
      return axios.post(fullUrl, paramsWrap.params, headerWrap)
        .then(function (res) {
          if (res.data.flag == 1) {
            _this.pagerInfo.totalCount = res.data.count;
            return res.data.data ? res.data.data : [];
          } else {
            return [];
          }
        });
    },
    onSubmit: async function () {
      var _this = this;
      var tableData = await _this.fetchData();
      _this.tableData = tableData;
    },
    reset: function () {
      var _this = this;
      this.$refs.searchForm.resetFields();
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

