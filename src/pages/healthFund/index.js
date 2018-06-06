Vue.use(window.vuePlugin);
var loadingInstance1;
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      pagerInfo: {
        pageIndex: 1,
        pageSize: 2,
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
    //获取用户信息
    fetchUsersInfo: function () {
      var _this = this;
      var searchParams = this.formData;
      var params = {
        pager: {
          pageIndex: _this.pagerInfo.pageIndex,
          pageSize: _this.pagerInfo.pageSize,
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
          {
            name: "realname",
            value1: searchParams.realname,
            type: "string",
            op: "eq"
          },
          {
            name: "phone",
            value1: searchParams.phone,
            type: "string",
            op: "eq"
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
            var pager = res.data.pager;
            _this.pagerInfo.totalCount = pager.totalCount;
            return res.data.data;
          } else {
            return [];
          }
        });
    },
    //获取储值记录by mid
    fetchStoredRecordByMid: function (mid) {
      var _this = this;
      var searchParams = this.formData;
      var params = {
        "conditions": [
          { "name": "mid", "value1": mid, "type": "string", "op": "eq" }
        ],
        "pager": { "pageIndex": 1, "pageSize": 10000, "totalPage": null, "totalCount": null },
        "fields": [
          { "name": "mid" },
          { "name": "action_type" },
          { "name": "store_code" },
          { "name": "sum" },
          { "name": "balance" },
          { "name": "balance_discount" },
          { "name": "create_time", "format": "Y-m-d H:i:s" }
        ],
        "orders": [
          { "name": "create_time", "order": "asc" }
        ],

      };
      var encrypted = globalHmacSHA256(params);
      var url = "/open/mm/storage/query/v1";//储值卡记录查询
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
    //获取门店判断消费类型
    fetchStoreByStorecode: function (storeCode) {
      var _this = this;
      var searchParams = this.formData;
      var params = {
        "conditions": [
          { "name": "code", "value1": storeCode, "type": "string", "op": "eq" }
        ],
        "pager": { "pageIndex": 1, "pageSize": 8 },
        "orders": [
          { "name": "province", "order": "desc" }
        ],
        "fields": [
          { "name": "id" },
          { "name": "name" },
          { "name": "contact" },
          { "name": "address" },
          { "name": "province" },
          { "name": "city" },
          { "name": "area" },
          { "name": "code" },
          { "name": "erp_code" },
        ]
      }
      var encrypted = globalHmacSHA256(params);
      var url = "/open/mm/store/query/v1";//门店档案
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
      //获取会员-》获取储值卡消费记录-》查询这条记录的类别
      var _this = this;
      loadingInstance1 = _this.$loading({
        fullscreen: true,
        text: '正在拼命加载......',
        background: 'rgba(0,0,0,0.1)'
      });
      var users = await _this.fetchUsersInfo();
      var tableData = users.map(function (v) {
        return Object.assign({}, v);
      });
      for (var i = 0; i < users.length; i++) {
        var define1Balance = 0;//生活智慧康养基金使用额  erp_code 01
        var define2Balance = 0;//健康智慧康养基金使用额  erp_code 02
        var define3Balance = 0;//快乐智慧康养基金使用额  erp_code 03
        var define4Balance = 0;//通用余额使用额  erp_code 04
        var currentObj = tableData[i];
        currentObj.define1Balance = define1Balance;
        currentObj.define2Balance = define2Balance;
        currentObj.define3Balance = define3Balance;
        currentObj.define4Balance = define4Balance;
        currentObj.define1 = Number(currentObj.define1);
        currentObj.define2 = Number(currentObj.define2);
        currentObj.define3 = Number(currentObj.define3);
        //储值卡记录
        var storedRecords = await _this.fetchStoredRecordByMid(users[i].mid);
        for (var item = 0; item < storedRecords.length; item++) {
          //获取门店 
          if (storedRecords[item].store_code) {
            var store = await _this.fetchStoreByStorecode(storedRecords[item].store_code);
            if (store && store.length > 0 && store[0].erp_code) {
              var type = store[0].erp_code.split("_")[0];
              //改为正数
              storedRecords[item].sum = Math.abs(storedRecords[item].sum);
              switch (type) {
                case "01":
                  //生活
                  if (storedRecords[item].action_type == 1) {
                    //储值
                    currentObj.define4 += storedRecords[item].sum
                  } else {
                    //消费
                    //消费额大于余额
                    if (storedRecords[item].sum > ((currentObj.define1 || 0) - currentObj.define1Balance)) {
                      currentObj.define1Balance = currentObj.define1;//消费额为总额
                      //累加本次通用消费额 = 本次消费额 - （总额 - 使用额）
                      currentObj.define4Balance += (storedRecords[item].sum - (currentObj.define1 - currentObj.define1Balance));
                    } else {
                      //消费额小于余额
                      currentObj.define1Balance += storedRecords[item].sum;
                    }
                  }
                  break;
                case "02":
                  //健康
                  if (storedRecords[item].action_type == 1) {
                    //储值
                    currentObj.define4 += storedRecords[item].sum
                  } else {
                    //消费
                    //消费额大于余额
                    if (storedRecords[item].sum > ((currentObj.define2 || 0) - currentObj.define2Balance)) {
                      currentObj.define2Balance = currentObj.define2;//消费额为总额
                      //累加本次通用消费额 = 本次消费额 - （总额 - 使用额）
                      currentObj.define4Balance += (storedRecords[item].sum - (currentObj.define2 - currentObj.define2Balance));
                    } else {
                      //消费额小于余额
                      currentObj.define2Balance += storedRecords[item].sum;
                    }
                  }
                  break;
                case "03":
                  //快乐
                  // currentObj.define3Balance += storedRecords[item].sum;
                  if (storedRecords[item].action_type == 1) {
                    //储值
                    currentObj.define4 += storedRecords[item].sum
                  } else {
                    //消费
                    //消费额大于余额
                    if (storedRecords[item].sum > ((currentObj.define3 || 0) - currentObj.define3Balance)) {
                      currentObj.define3Balance = currentObj.define3;//消费额为总额
                      //累加本次通用消费额 = 本次消费额 - （总额 - 使用额）
                      currentObj.define4Balance += (storedRecords[item].sum - (currentObj.define3 - currentObj.define3Balance));
                    } else {
                      //消费额小于余额
                      currentObj.define3Balance += storedRecords[item].sum;
                    }
                  }
                  break;
              }
            }
          } else if (storedRecords[item].store_code == null) {
            //没有本店信息 消费 和储值没有门店信息
            if (storedRecords[item].action_type == 1) {
              //储值
              currentObj.define4 += storedRecords[item].sum
            } else {
              
            }
          }
        }
        tableData[i] = currentObj;
      }
      _this.tableData = tableData;
      loadingInstance1.close();
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
    // this.onSubmit();
  }
})
window.app = app;