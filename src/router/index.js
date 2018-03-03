import Vue from 'vue';
import Router from 'vue-router';
import Cqssc from '@/components/Cqssc';
import Login from '@/components/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cqssc',
      component: Cqssc
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
