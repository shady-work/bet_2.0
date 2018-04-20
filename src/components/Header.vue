<!-- header.vue -->
<template>
  <div id="header">
    <!-- 上面的选择 -->
    <div class="a-waps">
      <img src="" alt="" id="logo">
      <a href="/#/home" class="nav-top">
        <i class="fa  fa-th-list"></i>
        <p>开奖中心</p>
      </a>

      <a href="/#/money_change" class="nav-top">
        <i class="fa fa-credit-card"></i>
        <p>资金明细</p>
      </a>

      <!--<router-link to="/money_change">-->
          <!--<i class="fa fa-credit-card"></i>-->
          <!--<p>资金明细</p>-->
      <!--</router-link>-->


      <a href="/#/unclear_diagam"  class="nav-top">
          <i class="fa fa-line-chart"></i>
          <p>未结明细</p>
      </a>

      <a href="/#/clear_diagam" class="nav-top">
        <i class="fa fa-bar-chart"></i>
        <p>今日已结</p>
      </a>

      <a href="/#/sum_diagam" class="nav-top">
        <i class="fa fa-pie-chart"></i>
        <p>结算报表</p>
      </a>


      <a href="/#/open_history" class="nav-top">
            <i class="fa fa-clock-o"></i>
          <p>历史开奖</p>
      </a>

      <a href="/#/bet_rules" class="nav-top">
        <i class="fa fa-navicon"></i>
        <p>玩法资讯</p>
      </a>

      <a href="/#/rules" class="nav-top">
          <i class="fa fa-list-ol"></i>
          <p>玩法规则</p>
      </a>

      <a href="#/recharge" class="nav-top">
        <i class="fa fa-usd" aria-hidden="true"></i>
        <p>充值</p>
      </a>


      <a href="#/withdraw" class="nav-top">
        <i class="fa fa-yen" aria-hidden="true"></i>
        <p>提现</p>
      </a>

      <a class="nav-top" href="#/personal">
          <i class="fa fa-user-o font36"></i>
          <p>个人中心</p>
      </a>

      <a @click="log_out()" class="nav-top">
        <i class="fa fa-sign-out"></i>
          <p>安全退出</p>
      </a>


    </div>


    <edi-pwd v-show="showArray[1]"></edi-pwd>
  </div>



</template>

<script>
import editPwd from './edit_pwd';
export default
{
  name:"Header",
  data:()=>
  {
      var my_data =
      {
          showArray:[0,0,0,0,0,0,0,0,0],
      };
      return my_data;
  },
  methods:
  {

    showOne:function(idx)
    {
        this.showArray = [0,0,0,0,0,0,0,0,0];
        this.showArray[idx] = 1;
    },
    /**
     * 退出登录
     */
    log_out:function()
    {
       this.$http.delete(`${this.global.config.API}token`).then(function(res){
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
        window.sessionStorage.token = null;
        window.sessionStorage.index = null;
        window.location.href = '/';
      });

    },

  },
  created:()=>
  {
    //当页面加载时触发的函数
  },
  components:
  {
    'edi-pwd':editPwd,
  }
}

</script>

<style scoped>
   #header
   {
     width:100%;
     height:78px;
     /*background:url('../assets/img/title.jpg');*/
     background: #ea4c4c;
     background-size: cover;
     min-width:1400px;
   }
   #header>.a-waps
   {
     width: 100%;
     height: 100%;
   }
   #logo
   {
     display:block;
     float: left;
     width: 230px;
     height: 100%;
   }
   .nav-top
   {
     display: block;
     float: left;
     width: 90px;
     height: 100%;
     box-sizing: border-box;
     /* border: 1px solid #000; */
     cursor: pointer;
   }
   .nav-top>img
   {
     display: block;
     width: 35px;
     height:35px;
     margin:0 auto;
     margin-top: 10px;
     opacity: 0.5;
   }
    .nav-top>i
   {
     display: block;
     width: 35px;
     height:35px;
     margin:0 auto;
     margin-top: 10px;
     color: #fff;
     font-size: 32px;
     padding-top: 3px;
      font-weight: 200;
   }
    .nav-top>.font36
    {
      font-size: 36px;
    }
   .nav-top>p
   {
     font-size: 14px;
     margin-top: 5px;
     color:#fff;
     font-weight: 700;
   }
   .nav-top:hover
   {
     text-decoration: none;
   }
</style>
