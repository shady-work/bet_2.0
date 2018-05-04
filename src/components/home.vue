<template>
   <div class="center">
       <div class="cqssc">
            <cqssc></cqssc>
        </div>

        <div class="pk10">
            <pk10></pk10>
        </div>

        <div class="egg">
            <egg></egg>
        </div>

        <div class="cake">
            <cake></cake>
        </div>
   </div>
</template>

<script>
    import cqssc from './ssc_header';
    import pk10 from './pk10_header';
    import egg from './egg_header'; 
    import cake from './cake_header';    
    export default {
        name: "home",
        data()
        {
            return{

            };
        },
        methods:
        {

        },
        created()
        {
          $(function()
          {
            //浏览器的高度
            let browserHeight = $(window).height();
            //浏览器的宽度
            let browserWidth = $(window).width();

            //头部的高度
            let headerHeight  = 78;
            //左边的菜单的高度
            $("#left-nav").height(browserHeight - headerHeight);

            //设置中间区域的大小
            $("#center").width(browserWidth - 240);

            $('#bottom').width(browserWidth);

          });

        },
        components:
        {
            cqssc,
            pk10,
            egg,
            cake
        },
    }
</script>

<style scoped>

</style>