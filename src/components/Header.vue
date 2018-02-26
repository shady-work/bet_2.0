<!-- header.vue -->
<template>
  <div id="header">
      <h1 @click="show()">{{msg}}</h1>
      <a href="">test</a>
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

<style>
   
</style>
