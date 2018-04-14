import Vue from 'vue';
import Router from 'vue-router';
import Cqssc from '@/components/cqssc';
import Login from '@/components/login';
import Pk10 from '@/components/pk10';
import Pcegg from '@/components/pcegg';
import Cakeno28 from '@/components/cakeno28';
import Recharge from '@/components/recharge_';
import Index from '../index.vue';
import Withdraw from '@/components/withdraw.vue';
import football from '@/components/football.vue';
import man_online from '@/components/man_online.vue';
import money_change from '@/components/money_change.vue';
import unclear_diagam from '@/components/unclear_diagam.vue';
import clear_diagam from '@/components/clear_diagam.vue';
import sum_diagam from '@/components/sum_diagam.vue';
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
        {
          path:"/recharge",
          name:"Recharge",
          component:Recharge,
        },
        {
          path:"/withdraw",
          name:"Withdraw",
          component:Withdraw,
        },
        {
          path:"/football",
          name:"football",
          component:football,
        },
        {
          path:"/man_online",
          name:"man_online",
          component:man_online,
        },
        {
          path:"/money_change",
          name:"money_change",
          component:money_change,
        },
        {
          path:"/unclear_diagam",
          name:"unclear_diagam",
          component:unclear_diagam,
        },
        {
          path:"/clear_diagam",
          name:"clear_diagam",
          component:clear_diagam,
        },
        {
          path:"/sum_diagam",
          name:"sum_diagam",
          component:sum_diagam,
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
