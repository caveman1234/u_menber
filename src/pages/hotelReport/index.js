var tableData = [
  {
    mid: '1',
    realname: '张三',
    phone: '13666666666',
    field3: 3
  },
  {
    mid: '2',
    realname: '李四',
    phone: '13666666667',
    field3: 4
  },
  {
    mid: '3',
    realname: '王五',
    phone: '13666666668',
    field3: 5
  },
];
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
    func() {
      var _this = this;
      var params = {
        "conditions": [
          { "name": "mid", "value1": 1, "type": "string", "op": "eq" },
          { "name": "coupon_id", "value1": 1, "type": "string", "op": "eq" }
        ],
        "fields": [
          { "name": "mid" },
          { "name": "coupon_id" },
          { "name": "sn" },
          { "name": "verify_data" },
          { "name": "receive_date" },
          { "name": "expense_type" },
          { "name": "source_type" },
          { "name": "title", "entity": "Coupon" },
          { "name": "is_limit_store", "entity": "Coupon" },
          { "name": "store_ids", "entity": "Coupon" },
          { "name": "out_import", "entity": "Coupon" },
          { "name": "ep_name", "entity": "Coupon" },
          { "name": "ep_logo", "entity": "Coupon" },
          { "name": "pic_url", "entity": "Coupon" },
          { "name": "backcolor", "entity": "Coupon" },
          { "name": "sub_title", "entity": "Coupon" },
          { "name": "re_type_value", "entity": "CouponReceiveType" },
          { "name": "re_type_name", "entity": "CouponReceiveType" },
          { "name": "ex_type_value", "entity": "CouponExpenseType" },
          { "name": "ex_type_name", "entity": "CouponExpenseType" },
          { "name": "verify_data", "alias": "card_verify_data", "entity": "CouponReceiveDetail" },
          { "name": "expense_type", "alias": "card_expense_type", "entity": "CouponReceiveDetail" },
          { "name": "store_id", "entity": "CouponReceiveDetail" },
          { "name": "source_type", "alias": "card_source_type", "entity": "CouponReceiveDetail" }
        ]
      }
      var encrypted = globalHmacSHA256(params);
      var url = "/open/mm/coupon/mycoupon/v1";//优惠券
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
        });
    },
    fetchUsers: function () {
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
        ],
        fields: [
          { "name": "mid" },
          { "name": "realname" },
          { "name": "phone" }
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
            var data = res.data.data;
            return data;
          } else {
            return [];
          }
        });
    },
    fetchCoupon: function (mid) {
      var _this = this;
      var params = {
        "conditions": [
          { "name": "mid", "value1": mid, "type": "string", "op": "eq" },
          { "name": "coupon_id", "value1": 1, "type": "string", "op": "eq" }
        ],
        "fields": [
          { "name": "mid" },
          { "name": "coupon_id" },
          { "name": "sn" },
          { "name": "verify_data" },
          { "name": "receive_date" },
          { "name": "expense_type" },
          { "name": "source_type" },
          { "name": "title", "entity": "Coupon" },
          { "name": "is_limit_store", "entity": "Coupon" },
          { "name": "store_ids", "entity": "Coupon" },
          { "name": "out_import", "entity": "Coupon" },
          { "name": "ep_name", "entity": "Coupon" },
          { "name": "ep_logo", "entity": "Coupon" },
          { "name": "pic_url", "entity": "Coupon" },
          { "name": "backcolor", "entity": "Coupon" },
          { "name": "sub_title", "entity": "Coupon" },
          { "name": "re_type_value", "entity": "CouponReceiveType" },
          { "name": "re_type_name", "entity": "CouponReceiveType" },
          { "name": "ex_type_value", "entity": "CouponExpenseType" },
          { "name": "ex_type_name", "entity": "CouponExpenseType" },
          { "name": "verify_data", "alias": "card_verify_data", "entity": "CouponReceiveDetail" },
          { "name": "expense_type", "alias": "card_expense_type", "entity": "CouponReceiveDetail" },
          { "name": "store_id", "entity": "CouponReceiveDetail" },
          { "name": "source_type", "alias": "card_source_type", "entity": "CouponReceiveDetail" }
        ]
      }
      var encrypted = globalHmacSHA256(params);
      var url = "/open/mm/coupon/mycoupon/v1";//优惠券
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
            var data = res.data.data;
            return data;
          } else {
            return [];
          }
        });
    },
    onSubmit: async function () {
      var _this = this;
      loadingInstance1 = _this.$loading({
        fullscreen: true,
        text: '正在拼命加载......',
        background: 'rgba(0,0,0,0.1)'
      });
      var users = await _this.fetchUsers();
      var tableData = users.map(function (v) {
        return Object.assign({}, v);
      });
      for (var i = 0; i < users.length; i++) {
        var currentObj = Object.assign({}, users[i]);
        currentObj.count = 0;
        var coupons =  await _this.fetchCoupon(currentObj.mid);
        var count = coupons.filter(function(v){
          return v.ep_name.includes("都喜");
        }).length;
        currentObj.count = count;
        tableData[i] = currentObj;
      }
      _this.tableData = tableData;
      loadingInstance1.close();
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