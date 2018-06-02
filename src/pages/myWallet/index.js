Vue.use(vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
      totalBalance: 10000,//总余额
      lifeBalance: 1000,//生活类余额
      healthBalance: 2000,//健康类余额
      happyBalance: 3000,//快乐类余额
      commonBalance: 4000,//通用类余额
    }
  },
  methods: {
    fetchWalletData: function () {

    },
    refresh(){
      this.fetchWalletData();
    }
  },
  mounted: function () {
    this.fetchWalletData();
  }
})
window.app = app;