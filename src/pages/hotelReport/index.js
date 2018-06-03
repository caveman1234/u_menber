var tableData = [
  {
    field1: "张三",
    field2: "13666666661",
    field3: 10000,
    field4: 20000,
    field5: 10000,
    field6: 10000,
    field7: 20000,
    field8: 10000,
    field9: 10000,
    field10: 20000,
    field11: 10000,
    field12: 10000,
    field13: 20000,
    field14: 10000,
    field15: 10000,
    field16: 20000,
    field17: 10000,
    field18: 10000,
    field19: 20000,
    field20: 10000,
    field21: 10000,
    field22: 20000,
    field23: 10000,
    field24: 10000,
    field25: 20000,
    field26: 10000,
  },
  {
    field1: "李四",
    field2: "13666666662",
    field3: 10000,
    field4: 20000,
    field5: 10000,
    field6: 10000,
    field7: 20000,
    field8: 10000,
    field9: 10000,
    field10: 20000,
    field11: 10000,
    field12: 10000,
    field13: 20000,
    field14: 10000,
    field15: 10000,
    field16: 20000,
    field17: 10000,
    field18: 10000,
    field19: 20000,
    field20: 10000,
    field21: 10000,
    field22: 20000,
    field23: 10000,
    field24: 10000,
    field25: 20000,
    field26: 10000,
  },
  {
    field1: "王二",
    field2: "13666666663",
    field3: 10000,
    field4: 20000,
    field5: 10000,
    field6: 10000,
    field7: 20000,
    field8: 10000,
    field9: 10000,
    field10: 20000,
    field11: 10000,
    field12: 10000,
    field13: 20000,
    field14: 10000,
    field15: 10000,
    field16: 20000,
    field17: 10000,
    field18: 10000,
    field19: 20000,
    field20: 10000,
    field21: 10000,
    field22: 20000,
    field23: 10000,
    field24: 10000,
    field25: 20000,
    field26: 10000,
  },
];
Vue.use(window.vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      formData: {
        name: '',
        phone: ''
      },
      tableData: tableData,
      currentPage: 0,
    }
  },
  methods: {
    onSubmit: function () {
      var searchParams = this.formData;


      var params = {
        "username": "zhangsan",
        "phone": "13888888888"
      };
      var AccessToken = "NVZBGUcdzvAkf8nrQDbqueX4TjJ5MpaP2IRmE7Si6WHYgF1C";
      var Secret = "CzwUucfT1RrXhHWKxp35PGYD4BISnmFZ6tVsAQiakvd7MEegJqj8N2yb";
      var cryptoMsg = JSON.stringify(params);
      // var encrypted = CryptoJS.SHA256(cryptoMsg, Secret).toString();
      var encrypted = CryptoJS.AES.encrypt(cryptoMsg, Secret);
      var url = "/open/mm/member/checkexist/v1";
      var fullUrl = baseUrl + url + "?access_token=" + AccessToken;

      var headerWrap = {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': encrypted,
        }
      }
      // axios({
      //   method: 'post',
      //   headers: headerWrap,
      //   url: url,
      //   data: params
      // });
      axios.post(fullUrl, params, headerWrap)
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