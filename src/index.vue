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
      <!--<div class="left">-->
        <!--<img src="./assets/img/alert-1.png" alt="">-->
        <!--<span>近期公告</span>-->
      <!--</div>-->
      <!--<marquee behavior="" direction="">-->
        <!--本网站2010年成立于菲律宾，专业经营各项博彩业务，主营北京赛车pk10，幸运飞艇，重庆时时彩，广东快乐十分，幸运农场，六合彩等项目，自主开户，现金开户，安全稳定，下注简单，服务优质。-->
      <!--</marquee>-->
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
            timeId:0,
            timeId3:1,
          }
      },
      components:
      {
        'my-header':Header,
        'left-nav':Left,
        'login':Login
      },
      methods:
      {
        /**
         *  每10秒获取用户的个人信息,如果没有成功的话，前去登录页面，清除绶存
         */
        get_users_info:function()
         {
           this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
           {
             if(response.data.status == 200)
             {
               let  data = response.data.data.user;
               this.$store.state.username = data.username;//用户名
               this.$store.state.nickname = data.nickname;//昵称
               this.$store.state.cash_money = data.money.cash_money;//现金额度
               this.$store.state.credit_money = data.money.credit_money;//信用额度
               this.$store.state.win_lost_today = data.yk;//信用额度
             }
             else
             {
               this.$store.state.isLogin    = false; //设置登录flag
               this.$store.state.user_id    = null;//设置登录user_id
               window.sessionStorage.isLogin  = null;  //本地会话保存登录状态
               window.sessionStorage.user_id  = null;//本地会话保存user_id
               window.sessionStorage.admin    = null;
               window.sessionStorage.agent    = null;
               window.sessionStorage.manager  = null;
               window.sessionStorage.nickname = null;
               window.sessionStorage.type     = null;
               window.sessionStorage.username = null;
               clearInterval(this.timeId);
               this.$router.push('/');
             }

           });
         }
      },
      beforeCreate:function()
      {
        //检测是否登录
        if(window.sessionStorage.isLogin == 'ok')
        {
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
                this.$store.state.win_lost_today = data.yk;//信用额度
              });
            }
            else
            {

              this.$router.push('/');
              return false;
            }
          });
        }
        else
        {
          this.$router.push('/');
        }

      },
      created:function()
      {
        if(this.$store.state.isLogin)
        {
           clearInterval(this.timeId);
           let that = this ;
           this.timeId = setInterval(that.get_users_info,10000);

           //每25秒刷新未结算的订单，在每次下注后，也会对应刷新；
           this.timeId3 = setInterval(function()
           {
             that.$set(that.$store.state,'unclear',that.getOrder());
           },40000);
        }

        $(function()
        {
          let browserHeight = $(window).height();
          let headerHeight  = 78;
          $("#left-nav").height(browserHeight - headerHeight);
          //$("#center").height(browserHeight - headerHeight + 80);
          $('.recent-content').height($("#left-nav").height() - 381);
        });

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
    bottom: 0;
    color:#f3f3f3;
    overflow: hidden;
  }
  #notice>.left
  {
    float: left;

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
    height: 50px;
    font-size:14px;
    line-height: 50px;
  }
</style>
