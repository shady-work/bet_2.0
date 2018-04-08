<template>
    <div id="user">
        <div class="left">
            <span class="fa fa-user-circle-o"></span>
            <p>{{$store.state.nickname}}</p>
        </div>
        <div class="right">
            <p class="kuaicai">
                <!--快彩额度:<span class="color-red">10000</span>-->
            </p>
            <p class="kuaicai">
                可用额度:<span class="">{{$store.state.cash_money}}</span>
            </p>
            <p class="kuaicai">
                今日盈亏:<span class="">{{$store.state.win_lost_today}}</span>
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
   methods:
   {
      parseIn:function(money)
      {
         return parseInt(money)
      }
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
        width: 75px;
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
        width: 155px;
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


