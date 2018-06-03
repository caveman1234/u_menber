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
        name: '',
        phone: ''
      },
      tableData: []
    }
  },
  methods: {
    fetchCustomItem: function () {
      var _this = this;
      var params = {
        // "conditions": [
        //   { "name": "realname", "value1": "", "type": "string", "op": "like" }
        // ],
        "pager": { "pageIndex": 1, "pageSize": 8 }
      };
      var encrypted = globalHmacSHA256(params);
      var url = "/open/mm/memberlevel/query/v1";
      var fullUrl = url + "?access_token=" + AccessToken;
      var headerWrap = {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': encrypted,
        },
        timeout: 2 * 60 * 1000
      }
      axios.post(fullUrl, params, headerWrap)
        .then(function (res) {
          var data = res.data.data;
          console.log("custorm::", res.data)
        });
    },
    onSubmit: function () {
      var _this = this;
      var searchParams = this.formData;
      var params = {
        pager: {
          pageIndex: _this.pagerInfo.pageIndex,
          pageSize: _this.pagerInfo.pageSize,
        },
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
      axios.post(fullUrl, params, headerWrap)
        .then(function (res) {
          var pager = res.data.pager;
          _this.pagerInfo.totalCount = pager.totalCount;
          var data = res.data.data;
          _this.tableData = data;
        });
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