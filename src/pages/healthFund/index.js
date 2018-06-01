Vue.use(vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      currentPage: 0,
      formData: {
        name: '',
        phone: ''
      },
      tableData: [{
        date: 111111,
        name: 222,
        address: 333
      }]
    }
  },
  methods: {
    func: function () {
      var url = "/ocm-web/api/base/prod/search-for-purchase-order";
      var paramsWrap = {
        params: {
          prodGroupId: "f5e8aad4-98fa-4d45-a3e7-cf2c1386bf53",
          customerId: "171b88f4-b36b-4335-b756-0666acc41008"
        }
      }
      axios.get(url, paramsWrap)
        .then(function (res) {
          //   debugger
        })
        .catch(function (res) {
          //   debugger
        })
    },
    onSubmit: function () {
      var searchParams = this.formData;
      console.log(searchParams)
      this.func();
    },
    reset: function () {
      var _this = this;
      this.$refs.searchForm.resetFields();
      Object.keys(this.formData).forEach(function (v) {
        _this.formData[v] = '';
      });
    },
    handleSizeChange: function (val) {
      console.log(val);
    },
    handleCurrentChange: function (val) {
      console.log(val);
    },

  },
  mounted: function () {


  }
})
window.app = app;