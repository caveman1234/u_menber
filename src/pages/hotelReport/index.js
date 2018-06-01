Vue.use(vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      formData: {
        name: '',
        phone: ''
      },
      tableData: [{
        date: 111,
        name: 222,
        address: 333
      }],
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