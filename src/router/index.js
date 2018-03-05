import Vue from 'vue';
import Router from 'vue-router';
import Cqssc from '@/components/cqssc';
import Login from '@/components/login';
import Pk10 from '@/components/pk10';
import Pcegg from '@/components/pcegg';
import Cakeno28 from '@/components/cakeno28';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cqssc',
      component: Cqssc,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }, 
    {
      path: '/pk10',
      name: 'pk10',
      component: Pk10,
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
    }
  ]
})
