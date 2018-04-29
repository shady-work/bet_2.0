<template>

        <div class="xinyongziliao" @click="cancel($event)">
                <div class="xy-header">
                   <i class="fa fa-list-ol"></i>
                    <span>玩法规则</span>
                    <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
                    <div class="clear"></div>
                </div>

                <div class="xy-left">

                    <div class="xy-list">
                        <a @click="isShow=[1,0,0,0,0];" :class="isShow[0]?'active':''">用户须知</a>
                        <a @click="isShow=[0,1,0,0,0];" :class="isShow[1]?'active':''">重庆时时彩</a>
                        <a @click="isShow=[0,0,1,0,0];" :class="isShow[2]?'active':''">北京赛车pk10</a>
                        <a @click="isShow=[0,0,0,1,0];" :class="isShow[3]?'active':''">加拿大28</a>
                        <a @click="isShow=[0,0,0,0,1];" :class="isShow[4]?'active':''">pc蛋蛋</a>
                    </div>
                </div>


                <div class="xy-right">
                    <div class="rules  text-left" v-show="isShow[1]">
                        <h2 class="text-center">重庆时时彩规则</h2>
                        <p>该游戏的投注时间、开奖时间和开奖号码与重庆时时彩完全同步，北京时间（GMT+8）每天白天从上午10：00开到晚上22：00，夜场从22:00至凌晨2点,每10分钟开一次奖，夜场每5分钟开一次奖,每天开奖120期(白天72期,夜间48期)。</p>
                        <p >
                            1.第一球~第五球<br>

                            第一球特~第五球特：第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。<br>

                            单双大小：根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。<br>

                            大小：根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。<br>

                            单双：根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。<br>

                            2.总和单双大小：<br>

                            大小：根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。<br>

                            单双：根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。<br>

                            3.前三特殊玩法： 豹子 > 顺子 > 对子 > 半顺 > 杂六 。<br>
                            豹子：数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。<br>
                            顺子：数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。<br>
                            对子：任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。<br>
                            半顺：任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。<br>
                            杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。<br>
                        </p>
                    </div>

                    <div class="rules  text-left" v-show="isShow[0]">
                        <h2 class="text-center">声明</h2>
                        <p >
                            1.如果客户怀疑自己的资料被盗用，应立即通知本公司，并更改详细数据，以前的使用者名称及密码将全部无效。<br>

                            2.客户有责任确保自己的账户及登入资料的保密性。以使用者名称及密码进行的任何网上投注将被视为有效。<br>

                            3.公布赔率时出现的任何打字错误或非故意人为失误，本公司保留改正错误和按正确赔率结算投注的权力。您居住所在地的法律有可能规定网络博弈不合法；若此情况属实，本公司将不会批准您使用付账卡进行交易。<br>

                            4.每次登入时客户都应该核对自己的账户结余额。如对余额有任何疑问，请在第一时间内通知本公司。<br>

                            5.一旦投注被接受，则不得取消或修改。<br>

                            6.所有号码赔率将不时浮动，派彩时的赔率将以确认投注时之赔率为准。<br>

                            7.每注最高投注金额按不同[场次]及[投注项目]及[会员账号]设定浮动。如投注金额超过上述设定，本公司有权取消超过之投注金额。<br>

                            8.所有投注都必须在开奖前时间内进行否则投注无效。<br>

                            9.所有投注派彩彩金皆含本金。</p>
                    </div>

                    <div class="rules  text-left" v-show="isShow[2]">
                        <h2 class="text-center">北京赛车pk10</h2>
                        <p>
                            该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网）），北京时间（GMT+8）每天白天从上午09:02开到晚上23:57，每5分钟开一次奖,每天开奖179期。
                        </p>
                        <p >
                            1～10 两面：指 单、双；大、小。<br>

                            单、双：号码为双数叫双，如4、8；号码为单数叫单，如5、9。<br>

                            大、小：开出之号码大于或等于6为大，小于或等于5为小。<br>

                            第一名～第十名 车号指定：每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。<br>

                            1～5龙虎<br>

                            冠  军 龙/虎：“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。<br>

                            亚  军 龙/虎：“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。<br>

                            第三名 龙/虎：“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。<br>

                            第四名 龙/虎：“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。<br>

                            第五名 龙/虎：“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。<br>

                            冠军车号＋亚军车号＝冠亚和值（为3~19)<br>

                            冠亚和单双：“冠亚和值”为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。<br>

                            冠亚和大小：“冠亚和值”大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。<br>

                            冠亚和指定：“冠亚和值”可能出现的结果为3～19， 投中对应“冠亚和值”数字的视为中奖，其余视为不中奖。
                        </p>
                    </div>


                    <div class="rules  text-left" v-show="isShow[3]">
                        <h2 class="text-center">加拿大28</h2>
                        <p>
                            「加拿大28」按北京快乐8的开奖结果为基础

                            北京快乐8开奖结果，每日179期，每天9:00 - 23:55，每5分钟公布一次北京快乐8开奖结果
                        </p>
                        <p >
                            大：三个位置的数值相加和大于等于14,15,16,17,18,19,20,21,22,23,24,25,26,27为大。<br>

                            小：三个位置的数值相加和小于等于00,01,02,03,04,05,06,07,08,09,10,11,12,13为小。<br>

                            单：三个位置的数值相加和为单就为单。<br>

                            双：三个位置的数值相加和为双就为双。<br>

                            大单（三个数值和）：15,17,19,21,23,25,27为大单。<br>

                            小单（三个数值和）：01,03,05,07,09,11,13为小单。<br>

                            大双（三个数值和）：14,16,18,20,22,24,26为大双。<br>

                            小双（三个数值和）：00,02,04,06,08,10,12为小双。<br>

                            极大（三个数值和）：23,24,25,26,27为极大。<br>

                            极小（三个数值和）：00,01,02,03,04为极小。<br>

                            红波（三个数值和）：03,06,09,12,15,18,21,24为红波。<br>

                            绿波（三个数值和）：01,04,07,10,16,19,22,25为绿波。<br>

                            蓝波（三个数值和）：02,05,08,11,17,20,23,26为蓝波。<br>

                            注:当开奖结果为：0,13,14,27(所有买的波色皆输)视为全部不中奖！<br>

                            豹子：當期開出三個數字相同即為豹子<br>

                            特码（三个数值和）：單選取一個數字投注。
                        </p>
                    </div>

                    <div class="rules  text-left" v-show="isShow[4]">
                        <h2 class="text-center">pc蛋蛋</h2>
                        <p>
                            「pc蛋蛋」按北京快乐8的开奖结果为基础

                            北京快乐8开奖结果，每日179期，每天9:00 - 23:55，每5分钟公布一次北京快乐8开奖结果
                        </p>
                        <p >
                            大：三个位置的数值相加和大于等于14,15,16,17,18,19,20,21,22,23,24,25,26,27为大。<br>

                            小：三个位置的数值相加和小于等于00,01,02,03,04,05,06,07,08,09,10,11,12,13为小。<br>

                            单：三个位置的数值相加和为单就为单。<br>

                            双：三个位置的数值相加和为双就为双。<br>

                            大单（三个数值和）：15,17,19,21,23,25,27为大单。<br>

                            小单（三个数值和）：01,03,05,07,09,11,13为小单。<br>

                            大双（三个数值和）：14,16,18,20,22,24,26为大双。<br>

                            小双（三个数值和）：00,02,04,06,08,10,12为小双。<br>

                            极大（三个数值和）：23,24,25,26,27为极大。<br>

                            极小（三个数值和）：00,01,02,03,04为极小。<br>

                            红波（三个数值和）：03,06,09,12,15,18,21,24为红波。<br>

                            绿波（三个数值和）：01,04,07,10,16,19,22,25为绿波。<br>

                            蓝波（三个数值和）：02,05,08,11,17,20,23,26为蓝波。<br>

                            注:当开奖结果为：0,13,14,27(所有买的波色皆输)视为全部不中奖！<br>

                            豹子：當期開出三個數字相同即為豹子<br>

                            特码（三个数值和）：單選取一個數字投注。
                        </p>
                    </div>

                  <div class="page-xy">
                      注意：本公司不接受任何电脑程式投注的注单，对电脑程式的注单公司有最终解释权谢谢配合！
                  </div>
                </div>

                <div class="clear"></div>
        </div>

</template>

<script>
export default
{
   data:function()
   {
       var data =
       {
           isShow:[1,0,0,0,0,0],
       };
       return data;
   },
   methods:
   {

       close:function()
       {

           this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
       },
       cancel:function(event)
       {
           var e = event || window.event;
           e.cancelBubble = true;
       },

   },
   created()
   {
       this.$store.state.isShowSecond = true;
   },
    watch:
        {
            /**
             * 监听$store.state.isShowSecond，当关闭时，返回cqssc
             * @param n
             */
            "$store.state.isShowSecond":function(n)
            {
                if(n === false)
                {
                    this.$router.push(window.sessionStorage.which_lty);
                }
            }
        }
}
</script>


<style scoped>

   .xinyongziliao
   {
     width:1080px;
     margin-left:10px;
     margin-top: 1px;
   }
   .xy-header
   {
       height: 30px;
       background: #e63636;
       color: #f3f3f3;
   }
   .xy-header>i
   {
       float: left;
       width: 20px;
       margin-top: 8px;
       height: 20px;
       margin-left: 15px;
   }
   .xy-header>span
   {
        float: left;
        height:30px;
        line-height: 30px;
        font-size: 14px;
        margin-left:5px;

   }
   .close-2
   {
       margin-right: 5px;
       width: 30px;
       height: 30px;
       line-height: 30px;
       font-size: 24px!important;
       cursor: pointer;
   }
   .xy-left
   {
       width: 185px;
       height: 715px;
       float: left;
       box-sizing: border-box;
       background: #fff;
       border-right: 1px solid gray;
   }

   .xy-list>a
   {
       display: block;
       width: 100%;
       padding: 3px;
       text-align: left;
       text-indent:35px;
       height: 30px;
       line-height:30px;
       color:#000;
       font-size: 14px;
       box-sizing: border-box;
       cursor:pointer;
   }
   .xy-list>.active
   {
     background: -webkit-linear-gradient(left,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Safari 5.1 - 6.0 */
     background: -o-linear-gradient(right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Opera 11.1 - 12.0 */
     background: -moz-linear-gradient(right,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Firefox 3.6 - 15 */
     background: linear-gradient(to right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* 标准的语法 */
   }
   .xy-right
   {
       height: 715px;
       width:895px;
       background: #fff;
       float: left;
       position: relative;
   }

   .edu>p
   {
       height: 20px;
       line-height: 20px;
       color:#f3f3f3;
       font-size: 14px;
   }
   table
   {
       width: 100%;
       border: 1px solid #e5e5e5;
       color: #f3f3f3;
       font-size: 14px;
       height: 441px;
   }
   td>span
   {
       display: block;
       padding: 3px;
   }


  .xy-right-top>span
  {
      float: left;
      height: 30px;
      margin-top:7px;
      line-height: 30px;
      font-size: 14px;
      margin-left: 5px;
      color: #f3f3f3;
  }

  .xy-right-top>input
  {
      width: 120px;
      float: left;
      background: none;
      outline: none;
      border: 1px solid #f3f3f3;
      color: #f3f3f3;
      float: left;
      height: 22px;;
      margin-top:11px;
      margin-left: 5px;
      border-radius:3px;
  }
  .xy-right-top>button
  {
    float: left;
    background: #5598c5;
    font-size: 14px;
    padding: 3px;
    outline: none;
    border: 1px solid #f3f3f3;
    color:#f3f3f3;
    margin-top:9px;
    border-radius: 3px;
    margin-left: 15px;
    width: 70px;
    /* height: 20px; */
  }
  .page-xy
  {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      background: #e63636;
      line-height: 30px;
      color:#fff;

      text-align:left;
      padding-left:15px;
      position: absolute;
      bottom:0;
  }
  .page-xy>span
  {
      float: left;
      width:30px;
      line-height:30px;
      margin-left:5px;
      margin-right:3px;
      color:#f3f3f3;

  }
  .rules
  {
      width: 100%;
      height: 485px;
      box-sizing: border-box;
      padding:15px;
  }
  .text-int-5
  {
      text-indent:55px;
  }
  p
  {
      line-height:24px;
      font-size: 14px;
  }
</style>
