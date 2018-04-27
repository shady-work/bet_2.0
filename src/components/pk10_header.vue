<template>
        <div>
                <div class="head">
      <div class="details">
        <img src="../assets/img/icon_bjpk.png" class="logo-tubiao" alt="">
         <div class="right">
              <div class="right-left">
                  <p style="color:#209F16;">第{{thisExpect}}期</p>
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
              <p class="color-white"> 最新开奖：第{{lastExpect}}期,每日179期，今日剩余{{179-sales_+1}}期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span color="color-white;" style="float:right; width:127px;">未结金额:{{money}}</span>
                  <a class="my-a" @click="history_codes()">历史记录</a>
                  <a class="my-a" @click="turn()" >快速下注</a>
              </p>
              <div class="balls">
                  <span v-for="(v,k) in open_codes" :class="'hao'+ (v/10*10)">{{v/10*10}}</span>
                   <p class="color-white pull-right open-details">冠亚军和:{{details.sum[0]}},{{details.sum[2]}},{{details.sum[1]}}丨1~5龙虎:{{details.ball_1[3]}},{{details.ball_2[3]}},{{details.ball_3[3]}},{{details.ball_4[3]}},{{details.ball_5[3]}}</p>
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
                 lastExpect: 67097,
                 sales_ :100,//已卖期数
                 open_codes:[1,2,3,4,5,6,7,9,10], //开奖号码
                 thisExpect: 67098,
                 tips:'距离本期封盘还有',
                 mins: '00',        //倒计时 分钟
                 seconds: '00',     //倒计时 秒钟
                 unsaleNum:1,
                 end_time : 100,//这期的封盘时间
                 open_time : 100,//下期的开盘时间
                navArray:[1,0,0,0,0,0],
                details:{
                    "ball_1": [
                        9,
                        "单",
                        "大",
                        "龙"
                    ],
                    "ball_2": [
                        8,
                        "双",
                        "大",
                        "龙"
                    ],
                    "ball_3": [
                        2,
                        "双",
                        "小",
                        "虎"
                    ],
                    "ball_4": [
                        3,
                        "单",
                        "小",
                        "虎"
                    ],
                    "ball_5": [
                        10,
                        "双",
                        "大",
                        "龙"
                    ],
                    "ball_6": [
                        6,
                        "双",
                        "大"
                    ],
                    "ball_7": [
                        4,
                        "双",
                        "小"
                    ],
                    "ball_8": [
                        7,
                        "单",
                        "大"
                    ],
                    "ball_9": [
                        1,
                        "单",
                        "小"
                    ],
                    "ball_10": [
                        5,
                        "单",
                        "小"
                    ],
                    "sum": [
                        17,
                        "单",
                        "大"
                    ]
                },

                money:'',
            }
        },
        methods:
        {
             //倒计时
            count_down:function ()
            {
                var that  = this;
                //封盘倒计时
                this.timeId2 = setInterval(function()
                {
                if(that.end_time <= 0)
                {
                    that.mins = '00';
                    that.seconds = that.open_time;
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
                        that.tips = "距离本期封盘还有";
                    }
                    else
                    {
                        that.open_time++
                    }
                    return;
                    }
                }
                else
                {
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
            //获取开奖时间和下注封盘时间
            get_time:function ()
            {
                this.$http.get(`${this.global.config.API}pk10/time`).then(function(res){
                let data = res.data;
                this.sales_ = data.saleNum;//已卖期数
                this.unsaleNum = data.unsaleNum;//没卖期数
                this.end_time = data.endtime;//这期的封盘时间
                this.open_time = data.opentime;//下期的开盘时间
                this.thisExpect = data.expect;//这期下注期数
                this.count_down();
                });
            },
            //上期开奖结果
            get_last:function()
            {
                this.$http.get(`${this.global.config.API}pk10/lastLty`).then(function(res){
                    var data = res.data;
                    this.details = data.details;
                    this.money = data.unclear_money;
                    // console.log(res.data);
                    this.open_codes = data.opencode;
                    this.lastExpect = data.expect;
                });
            },
            turn:function () {

                this.$router.push('/pk10');
                window.sessionStorage.index = 1;
                window.sessionStorage.which_lty = 'pk10';
            },
            history_codes:function () {
              this.$router.push('/open_history/pk10');
            }
        },//end methods
        created()
        {
            // 1 获取开奖时间和下注封盘时间
            this.get_time();
            // 2 上期开奖结果
            this.get_last();
            // 3 获取用户有哪些盘口
        }//end created
        
}
</script>

<style scoped>
      
    .head
    {
        width: 100%;
        box-sizing: border-box;
        padding-left: 5px;
    }
    .head>img
    {
        float: left;
        width: 60px;
        height: 60px;
        margin-top: 15px;
    }
   .head .details > .logo-tubiao {
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
        height: 80px;
        margin-top:5px;
        /*background: rgba(0,0,0,0.5);*/
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
        float: left;
        margin-top:13px;
        width: 100%;
    }
    .balls>span
    {
        display:block;
        float: left;
        height: 25px;
        width: 25px;
        background-size: cover;
        text-align: center;
        line-height:25px;
        margin-right:8px;
        font-size: 18px;
        font-weight: 700;
        border-radius:3px;
        color: white;
    }

      .hao1
      {
          background: #959612;
      }
      .hao2
      {
          background: #0060ff;
      }
      .hao3
      {
          background: #4d4d4d;
      }
      .hao4
      {
          background: #ff7300;
      }
      .hao5
      {
          background: #00adad;
      }
      .hao6
      {
          background:#5200ff;
      }
      .hao7
      {
          background: #666666;
      }
      .hao8
      {
          /*background: #ff0000;*/
          background:#9300ffe8;
      }
      .hao9
      {
          background:#760000;
      }
      .hao10
      {
          background:#167301;
      }
    .my-a
    {
        color:white;text-decoration:underline;cursor:pointer;float:right;margin-right:15px;
    }

</style>
