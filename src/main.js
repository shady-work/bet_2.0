// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';
import $ from 'jquery';
import vuex from 'vuex';
import common from './assets/js/common';//加载commonjs
Vue.prototype.global = common;//挂载在vue的原型上
/*引入资源请求插件*/
import VueResource from 'vue-resource';
/*使用VueResource插件*/
Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
 request.credentials = true;
next()
})
Vue.http.options.emulateJSON = true;//vue-resource的处理方案


Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:
    {
        isLogin:false,
    },
     mutations:
     {
        switch_dialog(isLogin)
        {//这里的state对应着上面这个state
            state.isLogin = true;
            //你还可以在这里执行其他的操作改变state
        }
    }
})


/* eslint-disable no-new */
new Vue(
{
  el: '#app',
  router:router,
  store:store,
  components: { App },
  template: '<App/>',
  data:function()
  {
    var data = 
    {
     
    };
    return data;
  }
});




