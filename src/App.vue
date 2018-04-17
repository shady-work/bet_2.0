<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

export default
{
  name: 'App',
}


</script>

<style>
    /* init css */
    @import url('./assets/css/init.css');
    @import url('./assets/css/font-awesome.css');

    #app
    {
      font-family: "微软雅黑";
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }

</style>
