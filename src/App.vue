<template>
  <div id="app">
    <my-header></my-header>
    <left-nav></left-nav> 
    <div id="center">
      <router-view/>
    </div>
    
    <div class="clear"></div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Left from './components/left_nav.vue';
import config from './assets/js/config';
export default 
{
  name: 'App',
  components:
  {
    'my-header':Header,
    'left-nav':Left,
  },
  data:()=>
  {
    return {}
  },
  created:function()
  {
    // this.login()
    // this.xiugai();
    // this.test();
   
  },
  methods: 
  {
    /**@augments  登录 */
    login: function() 
    {
      this.$http.post(config.API + 'token', {username: 'shady', pwd_1: 123123}).then(function (response) 
      {
        console.log(response.data)
      })
    },
    test: function() 
    {
      this.$http.get(config.API + 'user/4').then(function (response) 
      {
        console.log(response.data)
      })
    },
    xiugai: function () 
    {
      this.$http.put(config.API + 'user/4', {nickname: 'shady3'}).then(function (response) 
      {
        console.log(response.data)
      })
    }
  }
}


</script>

<style>
    /* init css */
    @import url('./assets/css/init.css');
    body
    {
      background: #328bcd;
    }
    #app 
    {
      /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
      font-family: "黑体";
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }

    #center
    {
      position:absolute;
      top: 78px;
      left: 230px;
      float: left;
      min-width: 1077px;
     
      
    }
</style>
