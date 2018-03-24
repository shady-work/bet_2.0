import Vue from 'vue';
import Router from 'vue-router';
import Cqssc from '@/components/cqssc';
import Login from '@/components/login';
import Pk10 from '@/components/pk10';
import Pcegg from '@/components/pcegg';
import Cakeno28 from '@/components/cakeno28';
import Index from '../index.vue';
import VueResource from 'vue-resource';/*引入资源请求插件*/
/*使用VueResource插件*/
Vue.use(VueResource);

Vue.use(Router);

export default new Router(
{
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      beforeEnter:function(to,from,next)
      {
          console.log(1111);
        //检测是否登录
        Vue.http.get('http://lty-main.com/ifLogin').then(function(res)
        {
          var data = res.data;
          if(data.status == 200)
          {
            next();
          }
          else
          {
            window.location.href = '/#login';
            next();
            return false;
          }
        });

      },
      children:
      [
        {
          path: '/pk10',
          name: 'pk10',
          component: Pk10,
        },
        {
          path: '/',
          name: 'Cqssc',
          component: Cqssc,
          beforeRouteLeave:function(){
            console.log('i\'m leaving');
          }
        },
        {
          path: '/pcegg',
          name: 'pcegg',
          component: Pcegg,
        },
        {
          path:"/cakeno28",
          name:"Cakeno28",
          component:Cakeno28,
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },


  ]
});
