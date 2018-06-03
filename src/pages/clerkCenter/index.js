Vue.use(window.vuePlugin);
var app = new Vue({
  el: '#u_healthFund',
  data: function () {
    return {
    }
  },
  methods: {
    serach:function(){
      var searchText = this.$refs.searchInp.value;
    }
  },
  mounted: function () {
    
  }
})
window.app = app;