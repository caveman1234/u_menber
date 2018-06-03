var tableData = [
  {
    field1: "000001",
    field2: "1001",
    field3: "000001",
    field4: "13777777771",
    field5: "张三",
    field6: "类型一",
    field7: "楼盘一",
    field8: "10000",
    field9: 200000,
    field10: "2018-03-01",
  },
  {
    field1: "000002",
    field2: "1002",
    field3: "000002",
    field4: "13777777772",
    field5: "李四",
    field6: "类型一",
    field7: "楼盘一",
    field8: "10000",
    field9: 200000,
    field10: "2018-03-02",
  },
  {
    field1: "000003",
    field2: "1003",
    field3: "000003",
    field4: "13777777773",
    field5: "王五",
    field6: "类型一",
    field7: "楼盘一",
    field8: "10000",
    field9: 200000,
    field10: "2018-03-03",
  },
];
Vue.use(window.vuePlugin);
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