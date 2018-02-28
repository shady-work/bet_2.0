<template>
    <div id="left-nav">
        <user></user>'
        <div class="lottery-list">
            <a href="" class="lottery active">
                <img src="../assets/img/navicons_11.png" alt="">
                <p class="color-white">
                    重庆时时彩
                </p>
                <div class="clear"></div>
            </a>
            <a href="" class="lottery ">
                <img src="../assets/img/kuaile8.png" alt="">
                <p class="color-white">
                    广东快乐十分
                </p>
                <div class="clear"></div>
            </a>
            <a href="" class="lottery ">
                <img src="../assets/img/navicons_09.png" alt="">
                <p class="color-white">
                    北京赛车
                </p>
                <div class="clear"></div>
            </a>
            <a href="" class="lottery ">
                <img src="../assets/img/navicons_13.png" alt="">
                <p class="color-white">
                    加拿大卑斯快乐8
                </p>
                <div class="clear"></div>
            </a>
        </div>


        <div class="recent-bet">
            <img src="../assets/img/index_27.png" alt="">
            <p class="color-white">近期下注</p>
            <p class="color-white">+</p>
        </div>

        <div class="recent-bet">
            <img src="../assets/img/index_27.png" alt="">
            <p class="color-white">开奖网站参考</p>
            <p class="color-white">+</p>
        </div>
    </div>
</template>





<script>
import User from './user.vue';
export default 
{
    components:
    {
       'user':User,

    },
}




/**@augments控制样式的jqeury */


$(function()
{
    let browserHeight = $(window).height();
    let headerHeight  = 78;
    $("#left-nav").height(browserHeight - headerHeight);
    $("#center").height(browserHeight - headerHeight);
   
});

</script>




<style scoped>
    #left-nav
    {
        width: 230px;
        /* height: 500px; */
        background: #22618d;
        float: left; 
    }
    .lottery-list
    {
        width: 100%;
        margin-top: 2px;
        margin-bottom:10px;
    }
    .lottery
    {
        display:block;
        width: 100%;
        height: 42px;
        overflow: hidden;
    }
    .lottery>img
    {
        display:block;
        float: left;
        height: 30px;
        width:30px;
        margin-left: 25px;
        margin-top: 6px;
    }
    .lottery>p
    {
        float: left;
        height: 42px;
        line-height: 42px;
        margin-left: 15px;
        
    }
    .active
    {
        background: -webkit-linear-gradient(left,rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right,rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* 标准的语法 */
    }


    .recent-bet
    {
        width: 100%;
        height: 45px;
        border-top:2px solid rgba(200,200,200,0.3)
    }
    .recent-bet>img
    {
        float: left;
        width: 30px;
        height: 30px;
        margin-left: 25px;
        margin-top: 7.5px;
    }
    .recent-bet>p
    {
        float: left;
        height:45px;
        line-height: 45px;
        margin-left: 15px;
    }
    .recent-bet>p:nth-of-type(2)
    {
        float:right;
        margin-right:25px;
        font-size: 18px;
    }
</style>

