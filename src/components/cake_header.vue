<template>
  <div>
        <!-- 期数 时间 开奖号码 -->
        <div class="head">
            <div class="details">
                <img src="../assets/img/icon_jnd28.png" class="logo-tubiao" alt="">
                  <div class="right">
                    <div class="right-left">
                        <p style="color:#209F16;">第{{this_expect}}期</p>
                        <p>{{tips}}</p>
                    </div>
                    <div class="right-right">
                        <span class="fen">{{mins}}</span>
                        <span>分</span>
                        <span class="fen">{{seconds}}</span>
                        <span >秒</span>
                    </div>
                </div>
                <div class="left">
                    <p class="color-white"> 最新开奖：第{{last_expect}}期,每日179期，今日剩余{{396-sales_+8}}期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span color="color-white;" style="float:right; width:127px;">未结金额:{{money}}</span>
                        <a class="my-a" @click="history_codes()">历史记录</a>
                        <a class="my-a" @click="turn()" >快速下注</a>
                    </p>
                    <div class="balls">
                        <span class="color-white" :class="returnColor(open_codes[0])">{{open_codes[0]}}</span>
                        <span class="bg-none color-white">+</span>
                        <span class="color-white" :class="returnColor(open_codes[1])">{{open_codes[1]}}</span>
                        <span class="bg-none color-white">+</span>
                        <span  class="color-white" :class="returnColor(open_codes[2])">{{open_codes[2]}}</span>
                        <span class="bg-none color-white">=</span>
                        <span class="color-white" :class="returnColor(open_codes[0] + open_codes[1] + open_codes[2])">{{open_codes[0] + open_codes[1] + open_codes[2]}}</span>

                        <p class="color-white pull-right open-details">总和:{{details.ball_1[0]}},{{details.ball_2[0]}},{{details.ball_2[1]}},{{details.ball_2[2]}},{{details.ball_2[3]}}丨波色:{{details.ball_3[0]}}</p>
                        <div class="clear"></div>
                    </div>
                </div>
              
                <div class="clear"></div>
            </div>

            <div class="clear"></div>
        </div>
  </div>
</template>

<script>
export default {
    data()
    {
        return{
            last_expect:111111,
            this_expect:876845,
            sales_ : 0,
            open_codes:[0,1,2],
            tips:'距离本期封盘还有',
            end_time:60,
            open_time:60,
            unsaleNum:0,
            mins:'00',
            seconds:'00',
            details: {
                "ball_0": [
                    1,
                    7,
                    1
                ],
                "ball_1": [
                    9
                ],
                "ball_2": [
                    "小",
                    "单",
                    "小单",
                    "非极值"
                ],
                "ball_3": [
                    "红波"
                ],
                "ball_4": [
                    "非豹子"
                ],
                "ball_5": []
            },

            money:'',
        }
    },//end data
    methods:
    {
         //get_open_code
        get_last_code:function()
        {
          let url = `${this.global.config.API}cake/lastLty`;
          this.$http.get(url).then(function(response){
            let data = response.data;
              this.details = data.details;
              this.money = data.unclear_money;
            this.open_codes = data.details.ball_0;
            this.last_expect = data.expect;
          });
        },
        //获取下注时间
        get_time : function()
        {
          let url2 = `${this.global.config.API}cake/time`;
          this.$http.get(url2).then(function(response){
            let data = response.data;
            this.end_time = data.endtime;
            this.open_time = data.opentime;
            this.this_expect = data.expect;
            this.sales_ = data.saleNum;
            this.unsaleNum = data.unsaleNum;

          }).then(function(){
            this.count_down()
          });
        },
        //倒计时
        count_down:function ()
        {
          var that  = this;
          //封盘倒计时
          this.timeId2 = setInterval(function(){
            if(that.end_time <= 0)
            {
              that.mins = '00';
              that.seconds = that.open_time;
              that.seconds = that.seconds>9?that.seconds:("0" + that.seconds);
              that.tips = "离开盘还有";
              if(that.open_time <= 0 )
              {
                if(that.open_time < -100)
                {
                  that.mins = "--";
                  that.seconds = "--";
                  that.tips = '请等待开盘';
                }
                if(that.open_time == 0)
                {
                  //清除定时器
                  clearInterval(that.timeId2);
                  //重新获取时间
                  that.get_time();
                  //获取未结算的订单
                  that.tips = "距离本期封盘还有";
                }
                else
                {
                  that.open_time++
                }
                return;

              }
            }
            else {
              let mins = Math.floor(that.end_time/60);
              mins = '0' + mins;
              that.mins = mins;
              let seconds = Math.floor(that.end_time%60);
              seconds  = seconds>9?seconds:('0'+seconds);
              that.seconds = seconds;
            }

            that.end_time--;
            that.open_time--;
          },1000);
          //开盘倒计时
        },
        //返回颜色
         returnColor:function(num)
        {
          let className = '';
          num = parseInt(num);
          if(num%3 == 0)
          {
            className = 'bg-red';
          }
          if(num%3 == 1)
          {
            className = 'bg-green';
          }
          if(num%3 == 2)
          {
            className = 'bg-blue';
          }
          if(num == 0 || num == 13 || num == 14 || num ==27)
          {
            className = 'bg-white';
          }
          return className;

        },
        turn:function () {
            this.$router.push('/cakeno28');
            window.sessionStorage.index = 2;
            window.sessionStorage.which_lty = 'cakeno28';
        },
        history_codes:function () {
          this.$router.push('/open_history/cake');
        }
    },//end methods
    created()
    {
         this.get_last_code();
         this.get_time();
    }
}
</script>

<style scoped>
.head
{

  width: 100%;
  box-sizing: border-box;
  padding-left: 5px;
}

.head .details > .logo-tubiao
{
  float: left;
  width: 54px;
  height: 54px;
  margin-top: 4px;
  margin-left: 15px;
}
.details
{
  width: 1080px;
  float: left;
  height: 86px;
  margin-top:5px;
  background: #ea4c4c;
  margin-left: 5px;
  box-sizing: border-box;
  padding-top: 10px;
}
.left {
    width: 680px;
    height: 100%;
    float: left;
    margin-left: 13px;
    text-align:left;
}
.right
{
    width:300px;
    height:65px;
    border: 1px solid #f2dcaf;
    background: #fffdf1;
    float: left;
    margin-left: 10px;
}
.right-left
{
    width:130px;
    float: left;
    height:100%;
}
.right-right
{
    width:170px;
    float: left;
}
.right-right span
{
    float: left;
    margin-top:5px;
    height:50px;
    line-height:50px;
    margin-right:5px;
}
.right-right .fen
{
    display: block;
    width:50px;
    height:50px;
    background: url('../assets/img/opentimebg.png');
    background-size: cover;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-top:5px;
    font-size:28px;
    color: #fff;
    line-height:50px;
    float: left;
    margin-right:5px;
}

.right-left>p
{
    height:32px;
    line-height:32px;
}
.balls
{
    width: 100%;
    float: left;
    margin-top:5px;
   
}
.balls>span
{
  display:block;
  float: left;
  background: url("../assets/img/ball_cana.png");
  height: 40px;
  width: 40px;
  background-size: cover;
  text-align: center;
  line-height:40px;
  margin-right:8px;
  font-size: 26px;
  font-weight: 700;
  color: #000;
}
.bg-none
{
  background: none!important;
  color:#000;
  width: 16px!important;
  margin-right: 12px!important;

}
.open-details
{
    line-height: 40px;;
}
.my-a
{
    color:white;text-decoration:underline;cursor:pointer;float:right;margin-right:15px;
}
</style>
