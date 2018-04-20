<template>
    <div id="left-nav">
        <!--用户信息模块-->
        <user></user>
        <div class="lottery-list">
            <a @click="turn(0)" :class="navArray[0]?'lottery active':'lottery'" v-show="isShow('cqssc')">
                <img src="../assets/img/icon_ssc.png" alt="">
                <p class="color-white">
                    重庆时时彩
                </p>
                <div class="clear"></div>
            </a>
            <a @click="turn(1)" :class="navArray[1]?'lottery active':'lottery'" v-show="isShow('bjpk10')">
                <img src="../assets/img/icon_bjpk.png" alt="">
                <p class="color-white">
                    北京赛车
                </p>
                <div class="clear"></div>
            </a>
            <a @click="turn(2)" :class="navArray[2]?'lottery active':'lottery'" v-show="isShow('cakeno')">
                <img src="../assets/img/icon_jnd28.png" alt="">
                <p class="color-white">
                   加拿大28
                </p>
                <div class="clear"></div>
            </a>
            <a @click="turn(3)" :class="navArray[3]?'lottery active':'lottery'" v-show="isShow('pcegg')">
                <img src="../assets/img/icon_lhc.png" alt="">
                <p class="color-white">
                    PC蛋蛋
                </p>
                <div class="clear"></div>
            </a>

            <a @click="turn(4)" :class="navArray[4]?'lottery active':'lottery'">
              <img src="../assets/img/icon_xyft.png" alt="">
              <p class="color-white">
                足球竞猜
              </p>
              <div class="clear"></div>
            </a>

            <a @click="turn(5)" :class="navArray[5]?'lottery active':'lottery'">
              <img src="../assets/img/girl.jpg" alt="" style="-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">
              <p class="color-white">
                真人在线
              </p>
              <div class="clear"></div>
            </a>
        </div>


        <!--近期下注列表-->
        <div class="recent-bet" @click="toggleDiv(recent)">
            <img src="../assets/img/list_more.png" alt="">
            <p class="color-white">近期下注</p>
            <p class="color-white">{{recent.str}}</p>
        </div>

        <!--近期下注内容-->
        <div class="recent-content text-left" v-show="recent.flag" style="height: 400px;">
            <div class="list-recent" v-for="v in $store.state.unclear" v-html="v"></div>
        </div>

       <!--开奖网站参考-->
        <!--<div class="recent-bet" @click="toggleDiv(website)">
            <img src="../assets/img/network.png" alt="">
            <p class="color-white">开奖网站参考</p>
            <p class="color-white">{{website.str}}</p>
        </div>
        <div class="recent-content text-left" v-show="website.flag">

        </div>-->
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
            recent:
            {
                str:"-",
                flag:true,
            },
            website:
            {
                str:"+",
                flag:false,
            },
            navArray:[1,0,0,0,0,0],
            unclear:[],//未结算的清单
            vaild_lotteries:[],//  用户拥有哪些彩种
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

    },
    created:function ()
    {
       //获取全局的未结算清单
      if(this.$store.state.isLogin)
      {
        //默认是index ==>cqssc的彩种、
        window.sessionStorage.which_lty = 'cqssc';



        if(window.sessionStorage.index)
        {
          this.navArray = [0,0,0,0,0,0];
          let index = parseInt(window.sessionStorage.index);
          this.navArray[index] = 1;
        }

        //获取用户有哪些彩种
        this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种

          if(this.vaild_lotteries.indexOf('cqssc') != -1)
          {
            this.navArray = [0,0,0,0,0];
            this.navArray = [1,0,0,0,0];
          }
          else
          {
            if(this.vaild_lotteries.indexOf('bjpk10') != -1)
            {
              this.navArray = [0,0,0,0,0];
              this.navArray = [0,1,0,0,0];
            }
            else
            {
              if(this.vaild_lotteries.indexOf('cakeno') != -1)
              {
                this.navArray = [0,0,0,0,0];
                this.navArray = [0,0,1,0,0];
              }
              else
              {
                this.navArray = [0,0,0,0,0];
                this.navArray = [0,0,0,1,0];
              }
            }
          }

        });
         //window.sessionStorage.index
      }

    }
}




/**@augments控制样式的jqeury */


$(function()
{
    let browserHeight = $(window).height();
    let headerHeight  = 78;
    $("#left-nav").height(browserHeight - headerHeight);
    //$("#center").height(browserHeight - headerHeight + 80);
    $('.recent-content').height($("#left-nav").height() - 381);

});

</script>




<style scoped>
    #left-nav
    {
        width: 230px;
        background: #ea4c4c;
        float: left;
        border-top: 1px solid #fff;
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

