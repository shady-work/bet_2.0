// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';
import vuex from 'vuex';


import common from './assets/js/common';//加载commonjs
Vue.prototype.global = common;//挂载在vue的原型上

/**
 * 封装的全局方法
 */
Vue.prototype.getOrder = function(){
  let urls = ['ssc','pk10','egg','cake'];
  this.orderData = [];
  for(let j = 0;j<urls.length;j++)
  {
    //获取cqssc,pk10,egg,cake未结算的数据
    this.$http.get(`${this.global.config.API}${urls[j]}/history/lucky/0`).then(function(res)
    {
      let data = res.data.data;
      let list  = data.list;
      for(let i = 0; i<list.length;i++)
      {
        if(list[i].status == 0 && list[i].open_code == "")
        {
          let html = `${list[i].lty_name} <p>${list[i].expect} ${list[i].mark_a}  ${list[i].mark_b} ${list[i].money}</p>`;
          this.orderData.push(html);
        }
      }
    });
  }
  return this.orderData;
};




import VueResource from 'vue-resource';/*引入资源请求插件*/
/*使用VueResource插件*/
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.interceptors.push(function(request, next)
{
    //拦截器
    // 跨域携带cookie
    request.credentials = true;
    next();
});


Vue.http.options.emulateJSON = true;//vue-resource的处理方案

// 使用vuex  vuex像个仓库
Vue.use(vuex);
var store = new vuex.Store(
{//store对象
    state:
    {
        isLogin:window.sessionStorage.isLogin=='ok'?true:false,
        nickname:'加载中',
        cash_money:0,
        test:[1,23,32,32],
        unclear:[],//未结算清单
    },
    mutations:
    {
        switch_dialog(isLogin)
        {//这里的state对应着上面这个states
            state.isLogin = true;
            //你还可以在这里执行其他的操作改变state
        }
    }
});


/* eslint-disable no-new */
new Vue(
{
  el: '#app',
  router:router,
  store:store,
  components: { App },
  template: '<App/>',
});


/**
 * 全局监听的钩子(vue-router的守卫，防御塔，每个路由跳转都要经过这个防御塔)
 * to是要去的地方(obj)
 * from是你从哪来(obj)
 * next是下一步，不执行的话，路由会一直停滞在这，不会跳转
 */
router.beforeEach(function(to, from, next)
{
   if(to.name == null)
   {
        //用户登录了，跳转到主页
        if(window.sessionStorage.isLogin == "ok")
        {
            router.push('/');
            return false;
        }
        else
        {
            //用户没有登录，跳转到登录页面
           router.push('login');
           return false;
        }
   }

   next();
});









