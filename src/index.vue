<template>
   <div id="index">
     <!-- 头部 -->
     <my-header></my-header>
     <!-- 左边的信息 -->
     <left-nav></left-nav>
     <!-- 中间下注区 -->
     <div id="center">
        <router-view/>
        <div class="clear"></div>
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
  import Header from './components/header.vue';
  import Left from './components/left_nav.vue';
  import Login from './components/login.vue';
  export default
  {
      data:function(){
          return {

          }
      },
      components:
      {
        'my-header':Header,
        'left-nav':Left,
        'login':Login
      },
      beforeCreate:function(){
        //检测是否登录
        this.$http.get(this.global.config.API + 'ifLogin').then(function(res)
        {
          var data = res.data;
          if(data.status == 200)
          {
            this.global.log('欢迎回来~');
            //获取用户信息
            this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
            {
              let  data = response.data.data.user;
              this.$store.state.username = data.username;//用户名
              this.$store.state.nickname = data.nickname;//昵称
              this.$store.state.cash_money = data.money.cash_money;//现金额度
              this.$store.state.credit_money = data.money.credit_money;//信用额度
            });
          }
          else if (data.status == 403)
          {
            // window.location.href = '/#/login';
            this.$router.push('login');
            return false;
          }
        });
      },
      created:function()
      {


      }
  }
</script>

<style>
  body
  {
    background: #328bcd;
  }
  #center
  {
    position:absolute;
    top: 78px;
    left: 230px;
    float: left;
    min-width: 1077px;
    margin-bottom: 20px;
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
