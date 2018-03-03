<!-- header.vue -->
<template>
  <div id="header">
    <!-- 上面的选择 -->
    <div class="a-waps">
      <img src="" alt="" id="logo">
      <a @click="showOne(0)" class="nav-top">
          <img src="../assets/img/index_17.png" alt="">
          <p>信用资料</p>
      </a>

      <a @click="showOne(1)" class="nav-top">
          <img src="../assets/img/index_19.png" alt="">
          <p>修改密码</p>
      </a>

      <a href="" class="nav-top">
          <img src="../assets/img/index_21.png" alt="">
          <p>未结明细</p>
      </a>

      <a href="" class="nav-top">
          <img src="../assets/img/index_23.png" alt="">
          <p>已结算报表</p>
      </a>

      <a @click="showOne(2)" class="nav-top">
          <img src="../assets/img/index_25.png" alt="">
          <p>历史开奖</p>
      </a>

      <a @click="showOne(3)" class="nav-top">
          <img src="../assets/img/index_27.png" alt="">
          <p>玩法规则</p>
      </a>

      <a href="" class="nav-top">
          <img src="../assets/img/index_29.png" alt="">
          <p>安全退出</p>
      </a>
    </div>

    <xinyongziliao v-show="showArray[0]"></xinyongziliao>
    <edi-pwd v-show="showArray[1]"></edi-pwd>
    <open-history v-show="showArray[2]"></open-history>
    <rules v-show="showArray[3]"></rules>
  </div>


  
</template>

<script>
import xinyongziliao from './xinyongziliao';
import editPwd from './edit_pwd';
import openHistory from './open_history';
import rules from './rules';
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
