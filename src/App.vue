<template>
  <div id="app">
    <my-header></my-header>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import config from './assets/js/config';
export default 
{
  name: 'App',
  components:
  {
    'my-header':Header,
  },
  data:()=>
  {
    return {}
  },
  created:()=>
  {
   
  },
}


</script>

<style>
    /* init css */
    @import url('./assets/css/init.css');
    #app 
    {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
</style>
