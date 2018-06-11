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
      var params = {
        pager: {
          pageIndex: 1,
          pageSize: 5,
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
          // {
          //   name: "realname",
          //   value1: searchParams.realname,
          //   type: "string",
          //   op: "eq"
          // },
          {
            name: "phone",
            value1: phoneSearch,
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
            return res.data.data;
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
      _this.tableData = tableData;
      _this.isLoading = false;
    },
  },
  mounted: function () {
    this.onSubmit();
  }
})
window.app = app;