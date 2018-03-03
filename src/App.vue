<template>
  <div id="app">

    

    <!-- 头部 -->
    <my-header></my-header>

    <!-- 左边的信息 -->
    <left-nav></left-nav> 

    <!-- 中间下注区 -->
    <div id="center">
      <router-view/>
    </div>
    
    <div class="clear"></div>

    <!-- 底部的滚动条 -->
    <div id="notice">
      <div class="left">
        <img src="./assets/img/alert-1.png" alt="">
        <span>近期公告</span>
      </div>
      <marquee behavior="" direction="">
        本网站2010年成立于菲律宾，专业经营各项博彩业务，主营北京赛车pk10，幸运飞艇，重庆时时彩，广东快乐十分，幸运农场，六合彩等项目，自主开户，现金开户，安全稳定，下注简单，服务优质。
      </marquee>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Left from './components/left_nav.vue';
import Login from './components/login.vue';
import config from './assets/js/config';
export default 
{
  name: 'App',
  components:
  {
    'my-header':Header,
    'left-nav':Left,
    'login':Login
  },
  data:()=>
  {
    return {
      //isLogin:false,
    }
  },
  created:function()
  {
   
    
  
   
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
    #notice
    {
      position: fixed;
      left: 0;
      bottom: 0px;
      color:#f3f3f3;
      overflow: hidden;
    }
    #notice>.left
    {
      float: left;
      width:100px;
      height: 50px;
      font-size:14px;
      line-height: 50px;
    }
    #notice>.left>img
    {
      width: 14px;
      height: 16px;
      float: left;
      margin-top: 16px;
      margin-left: 16px;
    }
    #notice>marquee
    {
      float: left;
      width:1000px; 
      height: 50px;
      font-size:14px;
      line-height: 50px;
    }
</style>
