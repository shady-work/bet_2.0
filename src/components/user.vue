<template>
    <div id="user">

        <div class="left">
            <p class="mt5 color-white text-left ml10" style="text-indent: 15px;">{{$store.state.nickname}}</p>
            <span class="fa fa-user-circle-o"></span>
        </div>
        <div class="right">
            <p class="kuaicai">
                <!--快彩额度:<span class="color-red">10000</span>-->
            </p>
            <p class="kuaicai">
                <span>可用额度:</span> <span class="pull-right" style="text-align: right;margin-right:10px;">{{get_sum($store.state.cash_money,$store.state.credit_money)|money_digit}}</span>
            </p>
            <p class="kuaicai" >
                <span>今日盈亏:</span> <span class="pull-right" style="text-align: right;margin-right:10px;">{{$store.state.win_lost_today|money_digit}}</span>
            </p>
            <p class="kuaicai" >
                <span>今日返水:</span> <span class="pull-right" style="text-align: right;margin-right:10px;">{{$store.state.return_present|money_digit}}</span>
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
      },
       get_sum:function(v1,v2)
       {
         return Number(v1)+Number(v2);
       }
   },
   created:function()
   {
       //获取用户的昵称
   },
   filters:{
    money_digit:function(value){
      return Number(value).toFixed(2);
    }
   },

}
</script>

<style scoped>
    #user
    {
        width: 100%;
        height:118px;
        box-sizing: border-box;

    }
    .left
    {
        float: left;
        width: 100%;
        height: 30px;
        padding-left:20px;
        margin: 0 auto;
        position: relative;
        /*height: 100px;*/


    }
    .left>span
    {
        display:block;
        float:left;
        width:30px;
        height:30px;
        font-size:28px;
        line-height:30px;
        margin:0 auto;
        margin-top:5px;
        margin-bottom: 5px;
        /*font-size: 53px;*/
        /*position: absolute;*/
        color:#e5e5e5;

    }
    .left>p
    {
        font-size: 16px;
        color:#f3f3f3;
        height: 30px;
        line-height: 30px;
        /*margin-top:3px;*/
        margin-left:26px;
        position: absolute;
        /*top:10px;*/
    }
    .right
    {
        float: left;
        width: 140px;
        text-align:left;
        text-indent:5px;
        color:#f3f3f3;
        box-sizing: border-box;
        font-size: 12px;
        padding-left:15px;
    }
    .kuaicai
    {
        margin-bottom:10px;
    }
</style>


