<template>
    <div id="left-nav">
        <user></user>'
        <div class="lottery-list">
            <a @click="turn(0)" :class="navArray[0]?'lottery active':'lottery'">
                <img src="../assets/img/navicons_11.png" alt="">
                <p class="color-white">
                    重庆时时彩
                </p>
                <div class="clear"></div>
            </a>
            <a @click="turn(1)" :class="navArray[1]?'lottery active':'lottery'">
                <img src="../assets/img/navicons_09.png" alt="">
                <p class="color-white">
                    北京赛车
                </p>
                <div class="clear"></div>
            </a>
            <a @click="turn(2)" :class="navArray[2]?'lottery active':'lottery'">
                <img src="../assets/img/kuaile8.png" alt="">
                <p class="color-white">
                   加拿大28
                </p>
                <div class="clear"></div>
            </a>
            <a @click="turn(3)" :class="navArray[3]?'lottery active':'lottery'">
                <img src="../assets/img/PCdandan.png" alt="">
                <p class="color-white">
                    加拿大卑斯快乐8
                </p>
                <div class="clear"></div>
            </a>
        </div>


        <div class="recent-bet" @click="toggleDiv(recent)">
            <img src="../assets/img/list_more.png" alt="">
            <p class="color-white">近期下注</p>
            <p class="color-white">{{recent.str}}</p>
        </div>
        <div class="recent-content text-left" v-show="recent.flag">
            123
        </div>
        <div class="recent-bet" @click="toggleDiv(website)">
            <img src="../assets/img/network.png" alt="">
            <p class="color-white">开奖网站参考</p>
            <p class="color-white">{{website.str}}</p>
        </div>
        <div class="recent-content text-left" v-show="website.flag">
            123
        </div>
    </div>
</template>





<script>
import User from './user.vue';
export default 
{
    data:function()
    {
        let data = 
        {
            recent:~
            {
                str:"+",
                flag:false,
            },
            website:
            {
                str:"+",
                flag:false,
            },
            navArray:[1,0,0,0],
        };
        return data;
    },
    components:
    {
       'user':User,
    },
    methods:
    {
        toggleDiv:function(arg)
        {
            arg.str  = arg.str=="+"?"-":"+";
            arg.flag = !arg.flag;
        },
        turn:function(idx)
        {
            this.navArray =  [0,0,0,0];
            this.navArray[idx] =  1;
            switch(idx)
            {
                case 0:
                this.$router.push('/');
                break;
                case 1:
                this.$router.push('pk10');
                break;
                case 2:
                this.$router.push('cakeno28');
                break;
                case 3:
                this.$router.push('pcegg');
                break;
                default:
                break;
            }
        }
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
        cursor:pointer;
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
        border-top:2px solid rgba(200,200,200,0.3);
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
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
    .recent-content
    {
        width: 100%;
        border-top: 2px solid rgba(200,200,200,0.3);
        box-sizing:border-box;
        padding-left:25px;
        padding-top:6px;
        color:#f3f3f3;
        padding-right: 15px;
        padding-bottom:15px;
    }
</style>

