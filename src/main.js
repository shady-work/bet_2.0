
import Vue from 'vue';
import App from './App';
import router from './router';
import vuex from 'vuex';
import './lib/index.js'//加载一些挂在vue原型上的函数
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import common from './assets/js/common';//加载commonjs
Vue.prototype.global = common;//挂载在vue的原型上

//Vue's ajax
import VueResource from 'vue-resource';/*引入资源请求插件*/
/*使用VueResource插件*/
Vue.use(VueResource);
/*使用ElementUI插件*/
Vue.use(ElementUI);
Vue.config.productionTip = false;
//拦截器，vue的每个request（ajax）都会过这个函数
Vue.http.interceptors.push(function(request, next)
{
    //拦截器
    // 跨域携带cookie
    //request.credentials = true;
    request.headers.set('Authorization', 'bearer ' + window.sessionStorage.token);
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
        cash_money:0,         //余额
        unclear:[],//未结算清单  用于侧边栏
        win_lost_today:0,//今日盈亏
        return_present:0,//今日返水
        isShowSecond:false,//是否显示每个彩种下面的第二级view
        son_off:false,//是否开启子盘 false,不开启，true，开启子盘;
        isShowUnclear:false,//是否显示右侧的未结算历史（近期下注）
        which_lottery:'ssc',//当前要哪个彩种的数据
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
const Vm = new Vue(
{
  el: '#app',
  router:router,
  store:store,
  components: { App },
  template: '<App/>',
  created:function(){

  }
});


/**
 * 全局监听的钩子(vue-router的守卫，防御塔，每个路由跳转都要经过这个防御塔)
 * to是要去的地方(obj)
 * from是你从哪来(obj)
 * next是下一步，不执行的话，路由会一直停滞在这，不会跳转
 */
router.beforeEach(function(to, from, next)
{

   //判断是要去哪个路由，如果在路由文件中没有，则跳转到根目录
   if(!to.name)
   {
     Vm.$router.push('/home');
     next();
   }
  else
   {
     switch(to.name)
     {
       case "Cqssc":
         Vm.$children[0].$children[0].$children[1].navArray = [1,0,0,0,0,0,0];
         break;
       case "pk10":
         Vm.$children[0].$children[0].$children[1].navArray = [0,1,0,0,0,0,0];
         break;
       case 'Cakeno28':
         Vm.$children[0].$children[0].$children[1].navArray = [0,0,1,0,0,0,0];
         break;
       case "pcegg":
         Vm.$children[0].$children[0].$children[1].navArray = [0,0,0,1,0,0,0];
         break;
       case "football":
         Vm.$children[0].$children[0].$children[1].navArray = [0,0,0,0,1,0,0];
         break;
       case "man_online":
         Vm.$children[0].$children[0].$children[1].navArray = [0,0,0,0,0,1,0];
         break;
       case "Index":
         break;
       default:
         Vm.$children[0].$children[0].$children[1].navArray = [0,0,0,0,0,0,0];
         break;
     }

     next();
   }

});


//导入覆盖element_ui的css
import './assets/css/coverElement.css';









