<template>
  <div>
        <div class="head">
            <div class="details">
                <img src="../assets/img/icon_ssc.png" class="logo-tubiao" alt="">
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
                    <p class="color-white" > 最新开奖：第{{lastExpect}}期,每日120期，今日剩余{{120-sales_+7}}期
                        <span color="color-white;" style="float:right; width:127px;">未结金额:{{money}}</span>
                        <a class="my-a" @click="history_codes()">历史记录</a>
                        <a class="my-a" @click="turn()" >快速下注</a>
                    </p>
                    <div class="balls">
                        <span v-for="v in lastOpenCode" :class="'hhao'+v">{{v}}</span>
                        <p class="color-white pull-right open-details">总和:{{parseInt(lastOpenCode[0])+parseInt(lastOpenCode[1])+parseInt(lastOpenCode[2])+parseInt(lastOpenCode[3])+parseInt(lastOpenCode[4])}},{{details.dragon_and_tiger[1]|number1}},{{details.dragon_and_tiger[0]|number1}}丨龙虎:{{details.dragon_and_tiger[2]}}丨前三:{{details.front_3[0]}}丨中三:{{details.medium_3[0]}}丨后三:{{details.end_3[0]}}</p>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="opencode_details pull-left">

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
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      month = month < 10 ? ("0" + month) : month;
      let day = time.getDate();
      day = day < 10 ? ("0" + day) : day;

      return{
            navArray:[1,0,0,0,0,0],
            lastExpect: `${year}${month}${day}`,//今天日期
            lastOpenCode: [1, 1, 1, 1, 1],          //最后一期开奖号码
            thisExpect: 20180312000,//这期下注的期数
            tips:'距离本期封盘还有',
            mins:'00',
            seconds:'00',
            sales_: 0,//今日已销售的期数
            end_time:60,//倒计时
            open_time:60,//开奖时间
            money:'',
            details:{
                "ball_1": [
                    4,
                    "双",
                    "小"
                ],
                "ball_2": [
                    8,
                    "双",
                    "大"
                ],
                "ball_3": [
                    6,
                    "双",
                    "大"
                ],
                "ball_4": [
                    0,
                    "双",
                    "小"
                ],
                "ball_5": [
                    7,
                    "单",
                    "大"
                ],
                "dragon_and_tiger": [
                    "总和大",
                    "总和单",
                    "虎"
                ],
                "front_3": [
                    "杂六"
                ],
                "medium_3": [
                    "杂六"
                ],
                "end_3": [
                    "半顺"
                ]
            },

      };
    },
    methods:
    {
        /**@augments 倒计时 */
        count_down:function ()
        {
            var that  = this;
            //封盘倒计时
            this.timeId2 = setInterval(function(){
                if(that.end_time <= 0)
                {
                that.mins = '00';
                that.seconds = Math.abs(that.open_time);
                that.tips = "离开盘还有";
                if(that.end_time == 0)
                {
                    that.thisExpect = parseInt(that.thisExpect) + 1;
                }
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
                else
                {
                let mins = Math.floor(that.end_time/60);
                mins = '0' + mins;
                that.mins = mins;
                let seconds = Math.abs(Math.floor(that.end_time%60));
                seconds  = seconds>9?seconds:('0'+seconds);
                that.seconds = seconds;
                }

                that.end_time--;
                that.open_time--;
            },1000);
            //开盘倒计时
        },

        /**
         * 获取最新一期的开奖数据
         */
        get_last_code: function ()
        {
          this.$http.get(this.global.config.API + 'ssc/lastLty', {}).then(function (res) {
            //获取到最新一期的数据
            let data = res.data;
            this.details = data.details;
            this.money = data.unclear_money;
            // console.log(res.data);
            
            this.lastOpenCode = data.opencode;

            this.lastExpect = `${data.expect}`;
          });
        },

        /**
         * 获取重庆时时彩的时间和期数
         */
        get_time:function ()
        {
          this.$http.get(`${this.global.config.API}ssc/time`).then(function(res){
             //console.log(res.data);
             let data = res.data;
             this.sales_ = data.saleNum;//已卖期数
             this.end_time = data.endtime;//这期的封盘时间
             this.open_time = data.opentime;//下期的开盘时间
             this.thisExpect = data.expect;//这期下注期数
             this.count_down();
          });
        },
        //点击跳转
        turn:function()
        {

            this.$router.push('/cqssc');
            window.sessionStorage.index = 0;
            window.sessionStorage.which_lty = 'cqssc';

        },
        //历史记录跳转
        history_codes:function () {
          this.$router.push('/open_history/ssc');
        },


    },
    //过滤
    filters:{
        number1:function (str) {
            let data = str.substring(2);
            return data;

        }
    },
    created()
    {
        // 1 获取重庆时时彩的时间和期数
        this.get_time();
        // 2 获取最新的开奖号码
        this.get_last_code();

    }
}
</script>





<style scoped>
 .head {

  width: 100%;
  box-sizing: border-box;
  padding-left: 5px;
}

.head .details > .logo-tubiao {
  float: left;
  width: 54px;
  height: 54px;
  margin-top: 4px;
  margin-left: 15px;
}

.details {
  width: 1080px;
  float: left;
  height: 86px;
  margin-top: 5px;
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
.balls {
    float: left;
    box-sizing: border-box;
    margin-top:5px;
    width:100%;
    padding:2px 0px;
}

.balls > span {
  display: block;
  float: left;
  /*background: url("../assets/img/ball.png");*/
  height: 40px;
  width: 40px;
  background-size: cover;
  text-align: center;
  line-height: 40px;
  margin-right: 15px;
  font-size: 26px;
  font-weight: 700;
    border-radius: 50%;
    color: #fff;
}



.pan {
  float: left;
  color: #000;
  margin-top:10px;
  margin-left:12px;
  margin-right:12px;
}

.pan select {
  border-radius: 3px;
}

.count-down {
  float: left;
  height: 100%;
}

.count-down > span {
  display: block;
  width: 40px;
  height: 40px;
  border: 2px solid #99cff6;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 22px;
  margin-left: 5px;
  float: left;
}

.count-down > b {
  float: left;
  margin-top: 25px;
}

.audio {
  margin-top: 6px;
}

.open-details
{
    line-height: 40px;;
}
    .my-a
    {
        color:white;text-decoration:underline;cursor:pointer;float:right;margin-right:15px;
    }

 .hhao1
 {
     background: #959612;
 }
 .hhao2
 {
     background: #0060ff;
 }
 .hhao3
 {
     background: #4d4d4d;
 }
 .hhao4
 {
     background: #ff7300;
 }
 .hhao5
 {
     background: #00adad;
 }
 .hhao6
 {
     background:#5200ff;
 }
 .hhao7
 {
     background: #666666;
 }
 .hhao8
 {
     /*background: #ff0000;*/
     background:#9300ffe8;
 }
 .hhao9
 {
     background:#760000;
 }
 .hhao0
 {
     background:#167301;
 }
</style>
