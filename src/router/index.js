import Vue from 'vue';
import Router from 'vue-router';
import Cqssc from '@/components/cqssc';
import Login from '@/components/login';
import Pk10 from '@/components/pk10';

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
    }, 
    {
      path: '/pk10',
      name: 'pk10',
      component: Pk10
    }
  ]
})
