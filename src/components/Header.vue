<!-- header.vue -->
<template>
  <div id="header">
    <!-- 上面的选择 -->
    <div class="a-waps">
      <img src="" alt="" id="logo">
      <a @click="showOne(0)" class="nav-top">

          <i class="fa fa-credit-card"></i>
          <p>信用资料</p>
      </a>

      <a @click="showOne(1)" class="nav-top">
         <i class="fa fa-unlock-alt font36"></i>
          <p>修改密码</p>
      </a>

      <a @click="showOne(5)"  class="nav-top">
          <i class="fa fa-line-chart"></i>
          <p>未结明细</p>
      </a>

      <a @click="showOne(4)" class="nav-top">
          <i class="fa fa-bar-chart"></i>
          <p>已结算报表</p>

      </a>

      <a @click="showOne(2)" class="nav-top">
            <i class="fa fa-clock-o"></i>
          <p>历史开奖</p>
      </a>

      <a @click="showOne(3)" class="nav-top">
          <i class="fa fa-list-ol"></i>
          <p>玩法规则</p>
      </a>

      <a @click="log_out()" class="nav-top">
        <i class="fa fa-sign-out"></i>
          <p>安全退出</p>
      </a>
    </div>

    <xinyongziliao v-show="showArray[0]"></xinyongziliao>
    <edi-pwd v-show="showArray[1]"></edi-pwd>
    <open-history v-show="showArray[2]"></open-history>
    <rules v-show="showArray[3]"></rules>
    <clear v-show="showArray[4]"></clear>
    <unclear v-show="showArray[5]"></unclear>
  </div>



</template>

<script>
import xinyongziliao from './xinyongziliao';
import editPwd from './edit_pwd';
import openHistory from './open_history';
import rules from './rules';
import clear from './clear_diagam';
import unclear from './unclear_diagam';
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
    /**@augments
     *
     */
    showOne:function(idx)
    {
        this.showArray = [0,0,0,0,0,0,0,0,0];
        this.showArray[idx] = 1;
    },
    log_out:function()
    {
      this.$http.delete(`${this.global.config.API}token`).then(function(res){
        console.log(res);
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
    'xinyongziliao':xinyongziliao,
    'edi-pwd':editPwd,
    'open-history':openHistory,
    'rules':rules,
    'clear':clear,
    'unclear':unclear,
  }
}
</script>

<style scoped>
   #header
   {
     width:100%;
     height:78px;
     background:url('../assets/img/title.jpg');
     background-size: cover;
     min-width:1200px;
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
     width: 121.5px;
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
     color: #3284bf;
     font-size: 32px;
     padding-top: 3px;
   }
    .nav-top>.font36
    {
      font-size: 36px;
    }
   .nav-top>p
   {
     font-size: 14px;
     margin-top: 5px;
     color:#2d74a8;
     font-weight: 700;
   }
   .nav-top:hover
   {
     text-decoration: none;
   }
</style>
