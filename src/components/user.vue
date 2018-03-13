<template>
    <div id="user">
        <div class="left">
            <span class="fa fa-user-circle-o"></span>
            <p>{{$store.state.nickname}}</p>
        </div>
        <div class="right">
            <p class="kuaicai">
                快彩额度:<span class="color-red">10000</span>
            </p>
            <p class="kuaicai">
                可用:<span class="color-red">{{$store.state.cash_money}}</span>
            </p>
            <p class="kuaicai">
                今日盈亏:<span class="color-red">10000</span>
            </p>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default
{
   data:function()
   {
       let data =
       {

       };
       return data;
   },
   created:function()
   {
       //获取用户的昵称
   },

}
</script>

<style scoped>
    #user
    {
        width: 100%;
        height: 85px;
        box-sizing: border-box;

    }
    .left
    {
        float: left;
        width: 100px;
        height: 100px;

    }
    .left>span
    {
        display:block;
        width: 50px;
        height:50px;
        margin:0 auto;
        margin-top: 10px;
        font-size: 45px;
        color:#e5e5e5;

    }
    .left>p
    {
        font-size: 16px;
        color:#f3f3f3;
        margin-top: 3px;
    }
    .right
    {
        float: left;
        width: 130px;
        text-align:left;
        text-indent:5px;
        color:#f3f3f3;
        font-size: 14px;
        box-sizing: border-box;
        padding-top: 10px;
    }
    .kuaicai
    {
        margin-bottom:10px;
    }
</style>


