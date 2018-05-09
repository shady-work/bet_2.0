<template>
    <div id="left-nav">
        <!--用户信息模块-->
        <user></user>
        <div class="lottery-list">
            <a @click="turn(0)" :class="navArray[0]?'lottery active':'lottery'" v-show="isShow('cqssc')">
                <img src="../assets/img/icon_ssc.png" alt="">
                <p class="color-white" style="font-size: 14px;">重庆时时彩</p>
                <p class="color-white">{{ssc.tips}}</p>
                <div class="clear"></div>
            </a>
            <a @click="turn(1)" :class="navArray[1]?'lottery active':'lottery'" v-show="isShow('bjpk10')">
                <img src="../assets/img/icon_bjpk.png" alt="">
                <p class="color-white">北京赛车</p>
                <p class="color-white">{{pk10.tips}}</p>
                <div class="clear"></div>
            </a>
            <a @click="turn(2)" :class="navArray[2]?'lottery active':'lottery'" v-show="isShow('cakeno')">
                <img src="../assets/img/icon_jnd28.png" alt="">
                <p class="color-white">加拿大28</p>
                <p class="color-white">{{cake.tips}}</p>
                <div class="clear"></div>
            </a>
            <a @click="turn(3)" :class="navArray[3]?'lottery active':'lottery'" v-show="isShow('pcegg')">
                <img src="../assets/img/icon_lhc.png" alt="">
                <p class="color-white">PC蛋蛋&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p class="color-white">{{egg.tips}}</p>
                <div class="clear"></div>
            </a>

            <a @click="turn(4)" :class="navArray[4]?'lottery active':'lottery'">
                <img src="../assets/img/icon_xyft.png" alt="">
                <p class="color-white">足球竞猜</p>
                <p class="color-white">火热进行中</p>
                <div class="clear"></div>
            </a>

            <a @click="turn(5)" :class="navArray[5]?'lottery active':'lottery'">
                <img src="../assets/img/girl.jpg" alt="" style="-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">
                <p class="color-white">真人在线</p>
                <p class="color-white">火热进行中</p>
                <div class="clear"></div>
            </a>
        </div>

        <div>
            <p v-if="isAcceptNotice" style="color:#fff;float: left;margin-left:25px;" >已开启消息通知</p>
            <p v-else style="color:#909399;float: left;margin-left:25px;" >已关闭消息通知</p>
            <div>
                <el-switch
                        v-model="isAcceptNotice"
                        active-color="#13ce66"
                        inactive-color="#909399">
                </el-switch>
            </div>


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
          navArray:[1,0,0,0,0,0],
          unclear:[],//未结算的清单
          vaild_lotteries:[],//  用户拥有哪些彩种
            isAcceptNotice: true,  //是否接受通知的开关 true接受信息  false关闭信息
          ssc:
          {
            end_time :'',
            open_time:'', //时时彩的开盘时间
            expect:'',
            tips:'加载中',  //提示语
            unclearMoney:'',//ssc的未结算金额
            timeId2:'',//ssc的倒计时
          },
          pk10:
            {
              end_time :'',
              open_time:'', //时时彩的开盘时间
              expect:'',
              tips:'加载中',  //提示语
              unclearMoney:'',//ssc的未结算金额
              timeId2:'',//ssc的倒计时
            },
          cake:
            {
              end_time :'',
              open_time:'', //时时彩的开盘时间
              expect:'',
              tips:'加载中',  //提示语
              unclearMoney:'',//ssc的未结算金额
              timeId2:'',//ssc的倒计时
            },
            egg:
            {
              end_time :'',
              open_time:'', //时时彩的开盘时间
              expect:'',
              tips:'加载中',  //提示语
              unclearMoney:'',//ssc的未结算金额
              timeId2:'',//ssc的倒计时
            }
        };
      return data;
    },
      components:
      {
        'user':User,
      },
      methods:
      {

        turn:function(idx)
        {
          this.navArray =  [0,0,0,0,0,0];
          this.navArray[idx] =  1;
          switch(idx)
          {
            case 0:
              this.$router.push('/cqssc');
              window.sessionStorage.index = 0;
              window.sessionStorage.which_lty = 'cqssc';
              break;
            case 1:
              this.$router.push('/pk10');
              window.sessionStorage.index = 1;
              window.sessionStorage.which_lty = 'pk10';
              break;
            case 2:
              this.$router.push('/cakeno28');
              window.sessionStorage.index = 2;
              window.sessionStorage.which_lty = 'cakeno28';
              break;
            case 3:
              this.$router.push('/pcegg');
              window.sessionStorage.index = 3;
              window.sessionStorage.which_lty = 'pcegg';
              break;
            case 4:
              this.$router.push('football');
              window.sessionStorage.index = 4;
              window.sessionStorage.which_lty = 'football';
              break;
            case 5:
              this.$router.push('man_online');
              window.sessionStorage.index = 5;
              window.sessionStorage.which_lty = 'man_online';
              break;
            default:
              break;
          }
        },
        //是否显示彩种
        isShow:function(str)
        {
          let numb = this.vaild_lotteries.indexOf(str);
          if(numb == -1)
          {
            return false;
          }
          else
          {
            return true;
          }
        },
        /**
         * 获取重庆时时彩的时间和期数
         */
        get_time_ssc:function ()
        {
          this.$http.get(`${this.global.config.API}ssc/time`).then(function(res){
            let data = res.data;
            this.ssc.end_time = data.endtime;//这期的封盘时间
            this.ssc.open_time = data.opentime;//下期的开盘时间
            this.ssc.expect = data.expect;
            this.count_down_ssc();
          });
        },

        /**@augments 倒计时 */
        count_down_ssc:function ()
        {
          let that  = this;
          //封盘倒计时
          this.ssc.timeId2 = setInterval(function(){
            if(that.ssc.end_time <= 0)
            {
              if(that.ssc.end_time == 0 && that.isAcceptNotice)
              {
                that.$notify({
                  title: '重庆时时彩',
                  message: '重庆时时彩已封盘，准备开奖中。',
                  duration:2500,
                  position:'bottom-left',
                });
              }
              that.ssc.tips = "停止下注,正在开奖";
              if(that.ssc.open_time <= 0 )
              {
                if(that.ssc.open_time < -100)
                {
                  that.ssc.tips = '请等待开盘';
                }
                if(that.ssc.open_time == 0)
                {
                  //清除定时器
                  clearInterval(that.ssc.timeId2);
                  //重新获取时间
                  that.get_time_ssc();
                  if(that.isAcceptNotice){
                      //开盘通知
                      that.$notify({
                          title: '重庆时时彩',
                          message: '重庆时时彩已开盘，准备开奖中。',
                          type: 'success',
                          duration:2500,
                          position:'bottom-left',
                      });
                  }

                  that.ssc.tips = "开盘中";
                }
                else
                {
                  that.ssc.open_time++;
                }
                return;
              }
            }
            else
            {
              that.ssc.tips = that.ssc.expect + "期  下注中";
            }
            that.ssc.end_time--;
            that.ssc.open_time--;
          },1000);
        },


        get_time_pk10:function ()
        {
          this.$http.get(`${this.global.config.API}pk10/time`).then(function(res){
            let data = res.data;
            this.pk10.end_time = data.endtime;//这期的封盘时间
            this.pk10.open_time = data.opentime;//下期的开盘时间
            this.pk10.expect = data.expect;
            this.count_down_pk10();
          });
        },
        /**@augments 倒计时 */
        count_down_pk10:function ()
        {
          let that  = this;
          //封盘倒计时
          this.pk10.timeId2 = setInterval(function(){
            if(that.pk10.end_time <= 0)
            {
              if(that.pk10.end_time == 0 && that.isAcceptNotice)
              {
                that.$notify({
                  title: '北京赛车PK拾',
                  message: '北京赛车PK拾已封盘，准备开奖中。',
                  duration:2500,
                  position:'bottom-left',
                });
              }
              that.pk10.tips = "停止下注,正在开奖";
              if(that.pk10.open_time <= 0 )
              {
                if(that.pk10.open_time < -100)
                {
                  that.pk10.tips = '请等待开盘';
                }
                if(that.pk10.open_time == 0)
                {
                  //清除定时器
                  clearInterval(that.pk10.timeId2);
                  //重新获取时间
                  that.get_time_pk10();
                  if(that.isAcceptNotice){
                      //开盘通知
                      that.$notify({
                          title: '北京赛车PK拾',
                          message: '北京赛车PK拾已开盘，准备开奖中。',
                          type: 'success',
                          duration:2500,
                          position:'bottom-left',
                      });
                  }

                  that.pk10.tips = "开盘中";
                }
                else
                {
                  that.pk10.open_time++;
                }
                return;
              }
            }
            else
            {
              that.pk10.tips =that.pk10.expect + "期  下注中";
            }
            that.pk10.end_time--;
            that.pk10.open_time--;
          },1000);
        },


        get_time_cake:function ()
        {
          this.$http.get(`${this.global.config.API}cake/time`).then(function(res){
            let data = res.data;
            this.cake.end_time = data.endtime;//这期的封盘时间
            this.cake.open_time = data.opentime;//下期的开盘时间
            this.cake.expect = data.expect;
            this.count_down_cake();
          });
        },
        /**@augments 倒计时 */
        count_down_cake:function ()
        {
          let that  = this;
          //封盘倒计时
          this.cake.timeId2 = setInterval(function(){
            if(that.cake.end_time <= 0)
            {
              if(that.cake.end_time == 0 && that.isAcceptNotice)
              {
                that.$notify({
                  title: '加拿大28',
                  message: '加拿大28已封盘，准备开奖中。',
                  duration:2500,
                  position:'bottom-left',
                });
              }
              that.cake.tips = "停止下注,正在开奖";
              if(that.cake.open_time <= 0 )
              {
                if(that.cake.open_time < -100)
                {
                  that.cake.tips = '请等待开盘';
                }
                if(that.cake.open_time == 0)
                {
                  //清除定时器
                  clearInterval(that.cake.timeId2);
                  //重新获取时间
                  that.get_time_cake();
                  if(that.isAcceptNotice)
                  {
                      that.$notify({
                          title: '加拿大28',
                          message: '加拿大28已开盘，准备开奖中。',
                          type: 'success',
                          duration:2500,
                          position:'bottom-left',
                      });
                  }

                  that.cake.tips = "开盘中";
                }
                else
                {
                  that.cake.open_time++;
                }
                return;
              }
            }
            else
            {
              that.cake.tips =that.cake.expect + "期  下注中";
            }
            that.cake.end_time--;
            that.cake.open_time--;
          },1000);
        },


        get_time_egg:function ()
        {
          this.$http.get(`${this.global.config.API}egg/time`).then(function(res){
            let data = res.data;
            this.egg.end_time = data.endtime;//这期的封盘时间
            this.egg.open_time = data.opentime;//下期的开盘时间
            this.egg.expect = data.expect;
            this.count_down_egg();
          });
        },
        /**@augments 倒计时 */
        count_down_egg:function ()
        {
          let that  = this;
          //封盘倒计时
          this.egg.timeId2 = setInterval(function(){
            if(that.egg.end_time <= 0)
            {
              if(that.egg.end_time == 0 && that.isAcceptNotice)
              {
                that.$notify({
                  title: 'PC蛋蛋',
                  message: 'PC蛋蛋已封盘，准备开奖中。',
                  duration:2500,
                  position:'bottom-left',
                });
              }
              that.egg.tips = "停止下注,正在开奖";
              if(that.egg.open_time <= 0 )
              {
                if(that.egg.open_time < -100)
                {
                  that.egg.tips = '请等待开盘';
                }
                if(that.egg.open_time == 0)
                {
                  //清除定时器
                  clearInterval(that.egg.timeId2);
                  //重新获取时间
                  that.get_time_egg();
                  if(that.isAcceptNotice){
                      that.$notify({
                          title: 'PC蛋蛋',
                          message: 'PC蛋蛋已开盘，准备开奖中。',
                          type: 'success',
                          duration:2500,
                          position:'bottom-left',
                      });
                  }

                  that.egg.tips = "开盘中";
                }
                else
                {
                  that.egg.open_time++;
                }
                return;
              }
            }
            else
            {
              that.egg.tips =that.egg.expect + "期  下注中";
            }
            that.egg.end_time--;
            that.egg.open_time--;
          },1000);
        },




      },
    created:function ()
    {
      // console.l  og(this);
      //获取全局的未结算清单
      if(this.$store.state.isLogin)
      {
        //默认是index ==>cqssc的彩种、
        window.sessionStorage.which_lty = 'cqssc';

        if(window.sessionStorage.index)
        {
          this.navArray = [0,0,0,0,0,0];
        }

        //获取用户有哪些彩种
        this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
        });
        //window.sessionStorage.index


        //各个彩种的倒计时
        clearInterval(this.ssc.timeId2);
        this.get_time_ssc();

        //各个彩种的倒计时
        clearInterval(this.pk10.timeId2);
        this.get_time_pk10();

        //各个彩种的倒计时
        clearInterval(this.cake.timeId2);
        this.get_time_cake();

        //各个彩种的倒计时
        clearInterval(this.egg.timeId2);
        this.get_time_egg();
      }

    },

  }





</script>




<style scoped>
    #left-nav
    {
        width: 230px;
        background: #ea4c4c;
        float: left;
        border-top: 1px solid #fff;
        box-sizing: border-box;
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
        height: 52px;
        overflow: hidden;
        cursor:pointer;
    }
    .lottery>img
    {
        display:block;
        float: left;
        height: 40px;
        width:40px;
        margin-left: 25px;
        margin-top: 6px;
    }
    .lottery>p
    {
        height: 20px;
        line-height: 36px;
        text-align: left;
        text-indent:14px;
        font-size: 12px;

    }
    .active
    {
        background: -webkit-linear-gradient(left,rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right,rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(210,210,210,0.6),rgba(200,200,200,0.1)); /* 标准的语法 */
        border-left:5px solid #fff;
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
        color:#f3f3f3;
        padding:6px 15px 15px 25px;
        overflow: auto;
    }
    .recent-content>div:first-of-type
    {
        margin-top: 10px;
    }
    .list-recent
    {
        width: 100%;
        margin-bottom: 10px;
        font-size: 14px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(200,200,200,0.5);
    }


</style>

