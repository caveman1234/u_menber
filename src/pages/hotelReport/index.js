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
        phone: ''
      },
      tableData: []
    }
  },
  methods: {
    fetchData: function () {
      var _this = this;
      var searchParams = this.formData;
      var params = {
        pager: {
          pageIndex: _this.pagerInfo.pageIndex,
          pageSize: _this.pagerInfo.pageSize,
        },
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
            name: "realname",
            value1: searchParams.realname,
            type: "string",
            op: "like"
          },
          {
            name: "phone",
            value1: searchParams.phone,
            type: "string",
            op: "like"
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
      return axios.post(fullUrl, params, headerWrap)
        .then(function (res) {
          if (res.data.flag == 1) {
            var pager = res.data.pager;
            _this.pagerInfo.totalCount = pager.totalCount;
            return res.data.data;
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