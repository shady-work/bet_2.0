import Vue from 'vue';
import Router from 'vue-router';
import Cqssc from '@/components/Cqssc';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cqssc',
      component: Cqssc
    }
  ]
})
