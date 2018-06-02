var tableData = [
  {
    field1: "000001",
    field2: "2018-03-05",
    field3: "100000",
    field4: "13666666661",
    field5: "张三",
    field6: "无",
    field7: "无",
    field8: "无",
    field9: "无",
    field10: "无",
    field11: "无",
    field12: "无",
    field13: "无",
    field14: "无",
    field15: "无",
    field16: "无",
    field17: "无",
    field18: "无",
    field19: "无",
    field20: "无",
    field21: "无",
    field22: "无",
    field23: "无",
    field24: "无",
    field25: "无",
    field26: "无",
    field27: "无",
    field28: "无",
    field29: "无",
    field30: "无",
    field31: "无",
    field32: "无",
    field33: "无",
    field34: "无",
    field35: "无",
    field36: "无",
    field37: "无",
    field38: "无",
    field39: "无",
    field40: "无",
    field41: "无",
    field42: "无",
    field43: "无",
    field44: "无",
    field45: "无",
    field46: "无",
    field47: "无",
    field48: "无",
    field48: "无",
    field50: "无",
  },
  {
    field1: "000002",
    field2: "2018-03-06",
    field3: "200000",
    field4: "13666666662",
    field5: "李四",
    field6: "无",
    field7: "无",
    field8: "无",
    field9: "无",
    field10: "无",
    field11: "无",
    field12: "无",
    field13: "无",
    field14: "无",
    field15: "无",
    field16: "无",
    field17: "无",
    field18: "无",
    field19: "无",
    field20: "无",
    field21: "无",
    field22: "无",
    field23: "无",
    field24: "无",
    field25: "无",
    field26: "无",
    field27: "无",
    field28: "无",
    field29: "无",
    field30: "无",
    field31: "无",
    field32: "无",
    field33: "无",
    field34: "无",
    field35: "无",
    field36: "无",
    field37: "无",
    field38: "无",
    field39: "无",
    field40: "无",
    field41: "无",
    field42: "无",
    field43: "无",
    field44: "无",
    field45: "无",
    field46: "无",
    field47: "无",
    field48: "无",
    field48: "无",
    field50: "无",
  },
  {
    field1: "000003",
    field2: "2018-03-07",
    field3: "300000",
    field4: "13666666663",
    field5: "王二",
    field6: "无",
    field7: "无",
    field8: "无",
    field9: "无",
    field10: "无",
    field11: "无",
    field12: "无",
    field13: "无",
    field14: "无",
    field15: "无",
    field16: "无",
    field17: "无",
    field18: "无",
    field19: "无",
    field20: "无",
    field21: "无",
    field22: "无",
    field23: "无",
    field24: "无",
    field25: "无",
    field26: "无",
    field27: "无",
    field28: "无",
    field29: "无",
    field30: "无",
    field31: "无",
    field32: "无",
    field33: "无",
    field34: "无",
    field35: "无",
    field36: "无",
    field37: "无",
    field38: "无",
    field39: "无",
    field40: "无",
    field41: "无",
    field42: "无",
    field43: "无",
    field44: "无",
    field45: "无",
    field46: "无",
    field47: "无",
    field48: "无",
    field48: "无",
    field50: "无",
  },
];
Vue.use(vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      elTableColumnWidth: "100px",
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
      var encrypted = CryptoJS.SHA256(cryptoMsg, Secret).toString();
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