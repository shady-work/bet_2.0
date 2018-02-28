<!-- header.vue -->
<template>
  <div id="header">
     <img src="" alt="" id="logo">
     <a href="" class="nav-top">
        <img src="../assets/img/index_17.png" alt="">
        <p>信用资料</p>
     </a>

     <a href="" class="nav-top">
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

     <a href="" class="nav-top">
        <img src="../assets/img/index_25.png" alt="">
        <p>历史开奖</p>
     </a>

     <a href="" class="nav-top">
        <img src="../assets/img/index_27.png" alt="">
        <p>玩法规则</p>
     </a>

     <a href="" class="nav-top">
        <img src="../assets/img/index_29.png" alt="">
        <p>安全退出</p>
     </a>
     
  </div>
</template>

<script>
export default 
{
  name:"Header",
  data:()=>
  {
      var my_data = 
      {
          msg:"header"
      };
      return my_data;
  },
  methods:
  {
    //当页面加载时触发的函数
    show:()=>
    {
        alert(1);
    },
  },
  created:()=>
  {
    //当页面加载时触发的函数
   
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
     width: 105px;
     height: 100%;
     box-sizing: border-box;
     /* border: 1px solid #000; */
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
