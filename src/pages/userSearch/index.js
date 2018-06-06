Vue.use(window.vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      users:[]
    }
  },
  methods: {
    search: function () {
      var _this = this;
      var searchInp = String(this.$refs.searchInp.value).trim();
      if(searchInp == ""){
        return;
      }
      var realname = "";
      var phone = "";
      var phoneRegExp = /^\d+$/;
      var realnameRegExp = /^[^\d]+$/;
      if(phoneRegExp.test(searchInp)){
        phone = searchInp;
        realname = "";
      }else{
        realname = searchInp;
        phone = "";
      }
      var params = {
        pager: {
          pageIndex: 0,
          pageSize: 15,
        },
        conditions: [
          {
            name: "realname",
            value1: realname,
            type: "string",
            op: "like"
          },
          {
            name: "phone",
            value1: phone,
            type: "string",
            op: "like"
          }
        ],
        fields: [
          { "name": "mid" },
          { "name": "realname" },
          { "name": "phone" },
          { "name": "identity_type" },//1 身份证
          { "name": "identity_num" },
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
          if(res.data.flag == 1){
            _this.users = res.data.data;
          }else{
            _this.users = [];
          }
        });
    }

  },
  mounted: function () {

  }
})
window.app = app;