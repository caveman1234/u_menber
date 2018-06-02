var tableData = [
  {
    field1:"张三",
    field2:"13888888881",
    field3:3000,
    field4:600,
    field5:2400,
    field6:4000,
    field7:1200,
    field8:2800,
    field9:3000,
    field10:700,
    field11:2300,
    field12:1000,
    field13:1000,
    field14:1000
  },
  {
    field1:"李四",
    field2:"13888888882",
    field3:3000,
    field4:600,
    field5:2400,
    field6:4000,
    field7:1200,
    field8:2800,
    field9:3000,
    field10:700,
    field11:2300,
    field12:1000,
    field13:1000,
    field14:1000
  },
  {
    field1:"王五",
    field2:"13888888883",
    field3:3000,
    field4:600,
    field5:2400,
    field6:4000,
    field7:1200,
    field8:2800,
    field9:3000,
    field10:700,
    field11:2300,
    field12:1000,
    field13:1000,
    field14:1000
  },
  {
    field1:"王六",
    field2:"13888888884",
    field3:3000,
    field4:600,
    field5:2400,
    field6:4000,
    field7:1200,
    field8:2800,
    field9:3000,
    field10:700,
    field11:2300,
    field12:1000,
    field13:1000,
    field14:1000
  },
];
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
      tableData: tableData
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