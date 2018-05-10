<template>
  <div id="cqssc">

    <!-- 期数 时间 开奖号码 -->
    <div class="head">
      <div class="details">
        <img src="../assets/img/icon_bjpk.png" class="logo-tubiao" alt="">
          <div class="left">
              <!--<p class="color-white"> 最新开奖：第{{lastExpect}}期,每日179期，今日剩余{{179-sales_+1}}期</p>-->
              <p class="color-white">第&nbsp;{{lastExpect}}&nbsp;期开奖结果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今日期数 {{sales_}}/179</p>
              <div class="balls">
                  <span v-for="(v,k) in open_codes" :class="'hao'+ (v/10*10)">{{v/10*10}}</span>
                  <div class="clear"></div>
              </div>
          </div>
          <div class="right">
              <p>第&nbsp;{{thisExpect}}&nbsp;期</p>
              <div class="right-left">
                  <!--<p style="color:#209F16;">第{{thisExpect}}期</p>-->
                  <p>{{tips}}</p>
              </div>
              <div class="right-right">
                  <span class="fen">{{mins}}</span>
                  <span>分</span>
                  <span class="fen">{{seconds}}</span>
                  <span >秒</span>
              </div>
          </div>
        <!-- 右边的历史记录 -->
          <div id="history">
              <div class="history-table">
                  <el-popover
                          placement="bottom"
                          title=""
                          width="600"
                          trigger="click"
                          popper-class="my-click-class">
                      <table class="history-tables-ssc text-center">
                          <tr>
                              <td >期号/时间</td>
                              <td width="220"><p>号码</p></td>
                              <td colspan="3">冠亚军和</td>
                              <td colspan="5">1~5龙虎</td>
                          </tr>
                          <tr v-for="v in history_codes">
                              <td><p>{{v.expect}}&nbsp;<span style="color:gray">{{v.opentime|get_time2}}</span></p></td>
                              <td><span v-for="val in v.open_codes" :class="'code-ball hao' + (val/10*10)">{{val/10*10}}</span></td>
                              <td>{{v.details.sum[0]}}</td>
                              <td v-if="v.details.sum[2]=='大'" class="color-red">{{v.details.sum[2]}}</td>
                              <td v-if="v.details.sum[2]=='小'">{{v.details.sum[2]}}</td>
                              <td>{{v.details.sum[1]}}</td>
                              <td :class="v.details.ball_1[3]=='龙'?'color-red':''">{{v.details.ball_1[3]}}</td>
                              <td :class="v.details.ball_2[3]=='龙'?'color-red':''">{{v.details.ball_2[3]}}</td>
                              <td :class="v.details.ball_3[3]=='龙'?'color-red':''">{{v.details.ball_3[3]}}</td>
                              <td :class="v.details.ball_4[3]=='龙'?'color-red':''">{{v.details.ball_4[3]}}</td>
                              <td :class="v.details.ball_5[3]=='龙'?'color-red':''">{{v.details.ball_5[3]}}</td>
                          </tr>
                      </table>
                      <el-button slot="reference" style="float:left;background:none;border: none;color: white;" size="mini">今日开奖</el-button>

                  </el-popover>

                  <el-popover
                          placement="bottom"
                          title="长龙排行"
                          width="280"
                          center="true"
                          trigger="click"
                          popper-class="my-click-class">
                      <p v-for="(v,k) in data" v-if="k<10" class="text-left" style="border-bottom:1px dashed rgba(200, 200, 200, 0.8);line-height: 20px;height: 30px;">
                          <span>{{v.name}}</span>
                          <span class="pull-right mr10">{{v.num}}期</span>
                      </p>

                      <el-button slot="reference" style="float:left;background:none;border: none;color: white;" size="mini">长龙排行</el-button>

                  </el-popover>
                  <div class="clear"></div>
              </div>
          </div >



        <!--<div id="history" >-->
          <!--<div class="history-table">-->
            <!--<a @click="showTables(1)" :class="history_tables[1]?'active':''" style="margin-right:10px;">长龙排行</a>-->
            <!--<a @click="showTables(2)" :class="history_tables[2]?'active':''">今日开奖</a>-->
          <!--</div>-->
            <!--&lt;!&ndash;长龙出&ndash;&gt;-->
          <!--<div class="history-list" v-show="history_tables[1]" style="width: 280px;">-->
            <!--<p v-for="(v,k) in data" v-if="k<10" class="text-left" style="border-bottom:1px dashed gray;line-height: 20px;height: 30px;color: black">-->
              <!--<span>{{v.name}}</span>-->
              <!--<span class="pull-right mr10">{{v.num}}期</span>-->
            <!--</p>-->
            <!--<div class="mt5"> <el-button type="primary" plain  size="small" @click="history_tables[1]=false;">关闭</el-button></div>-->

          <!--</div>-->

          <!--<div class="history-list" v-show="history_tables[2]">-->
              <!--<table class="history-tables-ssc">-->
                  <!--<tr>-->
                      <!--<td>期数/时间</td>-->
                      <!--<td width="220">号码</td>-->
                      <!--<td colspan="3">冠亚军和</td>-->
                      <!--<td colspan="5">1~5龙虎</td>-->
                  <!--</tr>-->
                 <!--<tr v-for="v in history_codes">-->
                     <!--<td><p>{{v.expect}}&nbsp;<span style="color:gray">{{v.opentime|get_time2}}</span></p></td>-->
                     <!--<td><span v-for="val in v.open_codes" :class="'code-ball hao' + (val/10*10)">{{val/10*10}}</span></td>-->
                     <!--<td>{{v.details.sum[0]}}</td>-->
                     <!--<td v-if="v.details.sum[2]=='大'" class="color-red">{{v.details.sum[2]}}</td>-->
                     <!--<td v-if="v.details.sum[2]=='小'">{{v.details.sum[2]}}</td>-->
                     <!--<td>{{v.details.sum[1]}}</td>-->
                     <!--<td :class="v.details.ball_1[3]=='龙'?'color-red':''">{{v.details.ball_1[3]}}</td>-->
                     <!--<td :class="v.details.ball_2[3]=='龙'?'color-red':''">{{v.details.ball_2[3]}}</td>-->
                     <!--<td :class="v.details.ball_3[3]=='龙'?'color-red':''">{{v.details.ball_3[3]}}</td>-->
                     <!--<td :class="v.details.ball_4[3]=='龙'?'color-red':''">{{v.details.ball_4[3]}}</td>-->
                     <!--<td :class="v.details.ball_5[3]=='龙'?'color-red':''">{{v.details.ball_5[3]}}</td>-->
                 <!--</tr>-->
              <!--</table>-->
            <!--&lt;!&ndash;<div class="history-balls" v-for="v in history_codes">-->

              <!--<p class="text-left">{{v.expect}}</p>-->
              <!--<span v-for="val in v.open_codes" :class="'code-ball hao' + (val/10*10)">{{val/10*10}}</span>-->
            <!--</div>&ndash;&gt;-->
            <!--<div class="mt5"> <el-button type="primary" plain  size="small" @click="history_tables[2]=false;">关闭</el-button></div>-->
          <!--</div>-->

        <!--</div>-->
        <div class="clear"></div>
      </div>

      <div class="clear"></div>
    </div>





    <!-- 下注内容区 -->
    <div id="bet-content">
      <form action="">
        <div class="bet-content-table">
          <div class="pan">
            <label style="color: #fff;">盘口</label>
            <select v-model="which_handicap">
              <option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">{{return_upper(v.ratewin_name)}}盘 <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span></option>
            </select>
          </div>
          <a :class="showArray_cqssc[0]?'color-white active':'color-white'" @click="showType(0)">
            两面盘
            <span></span>
          </a>
          <a :class="showArray_cqssc[1]?'color-white active':'color-white'" @click="showType(1)">
            数字盘
            <span></span>
          </a>
          <a :class="showArray_cqssc[2]?'color-white active':'color-white'" @click="showType(2)">
            冠、亚军组合
            <span></span>
          </a>
          <a :class="showArray_cqssc[3]?'color-white active':'color-white'" @click="showType(3)">
            三、四、五、六名
            <span></span>
          </a>
          <a :class="showArray_cqssc[4]?'color-white active':'color-white'" @click="showType(4)">
            七、八、九、十名
            <span></span>
          </a>

        </div>


        <!--快速下注-->
        <!--<div class="bet-content-input mt5">-->
              <!--<div class="fast-bet" style="color:#606266;text-indent:8px;">-->
                  <!--快速下注金额-->
                  <!--<el-input v-model="fast_money" placeholder="请输入内容" class="my-input-elm" style=""></el-input>-->
              <!--</div>-->
              <!--<div class="bet-btns">-->

                  <!--<el-button @click="setBetMoney(fast_bet_money[0])" class="btn-fast" >{{fast_bet_money[0]}}</el-button>-->
                  <!--<el-button @click="setBetMoney(fast_bet_money[1])" class="btn-fast">{{fast_bet_money[1]}}</el-button>-->
                  <!--<el-button @click="setBetMoney(fast_bet_money[2])" class="btn-fast">{{fast_bet_money[2]}}</el-button>-->
                  <!--<el-button @click="setBetMoney(fast_bet_money[3])" class="btn-fast">{{fast_bet_money[3]}}</el-button>-->
                  <!--<el-button @click="setBetMoney(fast_bet_money[4])" class="btn-fast">{{fast_bet_money[4]}}</el-button>-->
                  <!--<el-button @click="setBetMoney(fast_bet_money[5])" class="btn-fast">{{fast_bet_money[5]}}</el-button>-->
                  <!--&lt;!&ndash;设置快速下注金额&ndash;&gt;-->
                  <!--<el-popover-->
                          <!--placement="top"-->
                          <!--width="50"-->
                  <!--&gt;-->
                      <!--<el-input v-model="fast_bet_money[0]" placeholder="请输入内容" class="my-input-elm-set" ></el-input>-->
                      <!--<el-input v-model="fast_bet_money[1]" placeholder="请输入内容" class="my-input-elm-set"></el-input>-->
                      <!--<el-input v-model="fast_bet_money[2]" placeholder="请输入内容" class="my-input-elm-set"></el-input>-->
                      <!--<el-input v-model="fast_bet_money[3]" placeholder="请输入内容" class="my-input-elm-set"></el-input>-->
                      <!--<el-input v-model="fast_bet_money[4]" placeholder="请输入内容" class="my-input-elm-set"></el-input>-->
                      <!--<el-input v-model="fast_bet_money[5]" placeholder="请输入内容" class="my-input-elm-set"></el-input>-->
                      <!--<el-button slot="reference" class="set-fast-money">设置快速下注金额</el-button>-->
                  <!--</el-popover>-->
                  <!--&lt;!&ndash;/设置快速下注金额&ndash;&gt;-->
                  <!--<el-button class="btn-fast pull-right" @click="clear_bet">重填</el-button>-->
                  <!--<el-button v-if="open_state"  class="btn-fast pull-right" @click="comfire_content">提交</el-button>-->
                  <!--<el-button v-if="!open_state"  class="btn-fast pull-right" disabled >提交</el-button>-->
              <!--</div>-->
              <!--<div class="clear"></div>-->
          <!--</div>-->



        <!-- 两面 -->
        <div class="bet-chooses" v-show="showArray_cqssc[0]">
          <div class="bet-chooses-top">

            <div v-for="(v,k,index) in odds.double_aspect"  :class="(index==0 || index==5)?'first-ball mt0':'first-ball'">
                <div v-for="(val,key,idx) in double_aspect_a" v-if="parseIn(v[val])" class="first-ball-details text-0">
                   <span class="he22 ">{{double_aspect_c[key]}}</span>
                  <span class="he22 color-red f700" style="margin-left:15px;">{{v[val]}}</span>
                  <input type="text" class="innnn" v-model="bets.double_aspect['ball_'+ (index+1) +'_half'][key]" @click="bet_db(index,key)" @change="bet_db_change(index,key)" style="margin-top:5px;width:50px;height:17px;margin-left:20px;">
                  <div class="clear"></div>
                </div>
                <div class="first-ball-top">
                  {{double_aspect_b[index]}}
                </div>
            </div>

            <div class="clear"></div>

            <div class="long-bet height-auto">
              <div class="first-ball-top">
                冠、亚军和
              </div>
              <div v-for="(v,index) in sum_half_a" class="long-bet-content">
                <span>{{sum_half_b[index]}}</span>
                <span class="he22 color-red f700" style="margin-left:-4px;padding:3px;">{{odds.sum_half[v]}}</span>
                <input type="text" v-model="bets.sum_half[index]" @click="bet_db2(v,index)" @change="bet_db2_change(v,index)" >
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>

        <!-- 单名1-10 -->
        <div class="bet-chooses" v-show="showArray_cqssc[1]">
          <div class="bet-chooses-top" style="height:900px;">
            <div v-for="(v,k,index) in odds.single_ball"  :class="(index==0 || index==5)?'first-ball mt0':'first-ball'">
              <div v-for="(val,key,idx) in singleball_a" class="first-ball-details">
                <span :class="'hao' + (key+1)">{{key+1}}</span>
                <span class="he22 color-red f700" style="padding:1px;">{{v[val]}}</span>
                <input type="text" class="innnn" v-model="bets.single_ball['ball_'+ (index+1) +'_digit'][key]"
                       @click="single_ball_1_10(k,key)"
                       @change="single_ball_1_10_change(k,key)"
                       style="margin-top:5px;width:50px;height:17px;margin-left:15px;">
                <div class="clear"></div>
              </div>
              <div class="first-ball-top">
                {{singleball_b[index]}}
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </div>


        <!-- 冠、亚军和 -->
        <div class="bet-chooses" v-show="showArray_cqssc[2]">
          <div class="bet-chooses-top">

            <div class="long-bet height-auto">
              <div class="first-ball-top">
                冠、亚军和
              </div>
              <div v-for="(v,index) in sum_digit_a" class="long-bet-content">
                <span>{{index+3}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:-15px;margin-top:1px;">{{odds.sum_digit[v]}}</span>
                <input type="text" v-model="bets.sum_digit[index]"
                       @click="sumbo(v,index)"
                       @change="sumbo_change(v,index)"
                       style="margin-top:5px;width:43px;height:17px;margin-left:12px;">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>

            <div class="long-bet height-auto">
              <div class="first-ball-top">
                冠、亚军和
              </div>
              <div v-for="(v,index) in sum_half_a" class="long-bet-content">
                <span>{{sum_half_b[index]}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:-5px;margin-top:2px;">{{odds.sum_half[v]}}</span>
                <input type="text" v-model="bets.sum_half[index]"
                       @click="bet_db2(v,index)"
                       @change="bet_db2_change(v,index)"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="long-bet height-auto hao123">
              <div class="first-ball-top">
                冠军
              </div>

              <div v-for="(v,index) in singleball_a" class="long-bet-content ">
                <span :class="'hao'+(index+1)">{{index+1}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:-1px;">{{odds.single_ball.ball_1_digit[v]}}</span>
                <input type="text" v-model="bets.single_ball.ball_1_digit[index]"
                       @click="single_ball_1(v,index,'ball_1_digit')"
                       @change="single_ball_1_change(v,index,'ball_1_digit')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(v,index) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[index]}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:1px;">{{odds.double_aspect.ball_1_half[v]}}</span>
                <input type="text" v-model="bets.double_aspect.ball_1_half[index]"
                       @click="single_ball_2(v,index,'ball_1_half')"
                       @change="single_ball_2_change(v,index,'ball_1_half')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>


            <div class="long-bet height-auto hao123">
              <div class="first-ball-top">
                亚军
              </div>
              <div v-for="(v,index) in singleball_a" class="long-bet-content ">
                <span :class="'hao'+(index+1)">{{index+1}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:-1px;">{{odds.single_ball.ball_2_digit[v]}}</span>
                <input type="text" v-model="bets.single_ball.ball_2_digit[index]"
                       @click="single_ball_1(v,index,'ball_2_digit')"
                       @change="single_ball_1_change(v,index,'ball_2_digit')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>


              <div v-for="(v,index) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[index]}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:1px;">{{odds.double_aspect.ball_2_half[v]}}</span>
                <input type="text" v-model="bets.double_aspect.ball_2_half[index]"
                       @click="single_ball_2(v,index,'ball_2_half')"
                       @change="single_ball_2_change(v,index,'ball_2_half')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
        </div>


        <!-- 3、4、5、6 -->
        <div class="bet-chooses" v-show="showArray_cqssc[3]">
          <div class="bet-chooses-top">

            <div v-for="(v,k,index) in odds.single_ball" v-if="index>1 && index < 6" class="long-bet height-auto hao123">
              <div class="first-ball-top">
                {{singleball_b[index]}}
              </div>
              <div v-for="(val,key) in singleball_a" class="long-bet-content" >
                <span :class="'hao'+(key+1)">{{key+1}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:-1px;">{{odds.single_ball[k][val]}}</span>
                <input type="text" v-model="bets.single_ball[k][key]"
                       @click="single_ball_1(val,key,k)"
                       @change="single_ball_1_change(val,key,k)"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(val,key) in double_aspect_a" class="long-bet-content" v-if="odds.double_aspect['ball_' + (index+1) + '_half'][val] != 0.0000 || !odds.double_aspect['ball_' + (index+1) + '_half'][val]">
                <span class="font16px">{{double_aspect_c[key]}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:2px;">{{odds.double_aspect['ball_' + (index+1) + '_half'][val]}}</span>
                <input type="text" v-model="bets.double_aspect['ball_' + (index+1) + '_half'][key]"
                       @click="single_ball_2(val,key,'ball_' + (index+1) + '_half')"
                       @change="single_ball_2_change(val,key,'ball_' + (index+1) + '_half')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="clear"></div>
          </div>
        </div>

        <!-- 7、8、9、10 -->
        <div class="bet-chooses" v-show="showArray_cqssc[4]">
          <div class="bet-chooses-top">

            <div v-for="(v,k,index) in odds.single_ball" v-if="index>=6" class="long-bet height-auto hao123">
              <div class="first-ball-top">
                {{singleball_b[index]}}
              </div>
              <div v-for="(val,key) in singleball_a" class="long-bet-content ">
                <span :class="'hao'+(key+1)">{{key+1}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:-1px;">{{odds.single_ball[k][val]}}</span>
                <input type="text" v-model="bets.single_ball[k][key]"
                       @click="single_ball_1(val,key,k)"
                       @change="single_ball_1_change(val,key,k)"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(val,key) in double_aspect_a" v-if="odds.double_aspect['ball_' + (index+1) + '_half'][val] != 0.000 || !odds.double_aspect['ball_' + (index+1) + '_half'][val]" class="long-bet-content" >
                <span class="font16px">{{double_aspect_c[key]}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:4px;margin-top:1px;">{{odds.double_aspect['ball_' + (index+1) + '_half'][val]}}</span>
                <input type="text" v-model="bets.double_aspect['ball_' + (index+1) + '_half'][key]"
                       @click="single_ball_2(val,key,'ball_' + (index+1) + '_half')"
                       @change="single_ball_2_change(val,key,'ball_' + (index+1) + '_half')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:3px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="clear"></div>
          </div>
        </div>

        <!--快速下注-->
        <div class="bet-content-input mrt-55">
              <div class="fast-bet" style="color:#606266;text-indent:8px;">
                  <span>快速下注金额</span>
                  <el-input v-model="fast_money" placeholder="请输入内容" class="my-input-elm" style=""></el-input>
              </div>
              <div class="bet-btns">

                  <el-button @click="setBetMoney(fast_bet_money[0])" class="btn-fast" >{{fast_bet_money[0]}}</el-button>
                  <el-button @click="setBetMoney(fast_bet_money[1])" class="btn-fast">{{fast_bet_money[1]}}</el-button>
                  <el-button @click="setBetMoney(fast_bet_money[2])" class="btn-fast">{{fast_bet_money[2]}}</el-button>
                  <el-button @click="setBetMoney(fast_bet_money[3])" class="btn-fast">{{fast_bet_money[3]}}</el-button>
                  <el-button @click="setBetMoney(fast_bet_money[4])" class="btn-fast">{{fast_bet_money[4]}}</el-button>
                  <el-button @click="setBetMoney(fast_bet_money[5])" class="btn-fast">{{fast_bet_money[5]}}</el-button>
                  <!--设置快速下注金额-->
                  <el-popover
                          placement="top"
                          width="50"
                  >
                      <el-input v-model="fast_bet_money[0]" placeholder="请输入内容" class="my-input-elm-set" ></el-input>
                      <el-input v-model="fast_bet_money[1]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                      <el-input v-model="fast_bet_money[2]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                      <el-input v-model="fast_bet_money[3]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                      <el-input v-model="fast_bet_money[4]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                      <el-input v-model="fast_bet_money[5]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                      <el-button slot="reference" class="set-fast-money">设置快速下注金额</el-button>
                  </el-popover>
                  <!--/设置快速下注金额-->
                  <el-button class="btn-fast pull-right" @click="clear_bet">重填</el-button>
                  <el-button v-if="open_state"  class="btn-fast pull-right" @click="comfire_content">提交</el-button>
                  <el-button v-if="!open_state"  class="btn-fast pull-right" disabled >提交</el-button>
              </div>
              <div class="clear"></div>
          </div>

      </form>
    </div>




    <!--下注提示框-->
    <el-dialog
      title="确认下注"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div v-html="bet_html" @click="delete_it($event)"></div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="do_bet()">确 定</el-button>
  </span>
    </el-dialog>




  </div>
</template>


<script>

  export default
  {
    name: "Pk10",
    data() {
      var my_data =
        {
          data:[],
          centerDialogVisible:false,
          bet_html:'',
          showArray_cqssc: [1, 0, 0, 0, 0, 0, 0],
          history_tables: [0, 0, 0],
          history_flag: 0,
          history_str: "收起",
          mins: '00',        //倒计时 分钟
          seconds: '00',     //倒计时 秒钟
          thisExpect: 67098,
          lastExpect: 67097,
          sales_ :100,//已卖期数
          unsaleNum :100,//已卖期数
          end_time : 100,//这期的封盘时间
          open_time : 100,//下期的开盘时间
          open_codes:[1,2,3,4,5,6,7,9,10], //开奖号码
          fast_money:10,//快速下注的金额

          singleball:['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit','ball_6_digit','ball_7_digit','ball_8_digit','ball_9_digit','ball_10_digit',],
          singleball_a:['A','B','C','D','E','F','G','H','I','J'],
          singleball_b:['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],

          double_aspect:['ball_1_half','ball_2_half','ball_3_half','ball_4_half','ball_5_half','ball_6_half','ball_7_half','ball_8_half','ball_9_half','ball_10_half'],
          double_aspect_a : ['K','L','M','N','O','P'],
          double_aspect_b : ['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
          double_aspect_c : ['大','小','单','双','龙','虎'],

          sum_digit_a:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'],
          sum_half_a:['A','B','C','D'],
          sum_half_b:['冠军大','冠军小','冠亚单','冠亚双'],

          //赔率
          odds:{
            single_ball:{
              'ball_1_digit':{'A':0,},
              'ball_2_digit':{'A':0,},
              'ball_3_digit':{'A':0,},
              'ball_4_digit':{'A':0,},
              'ball_5_digit':{'A':0,},
              'ball_6_digit':{'A':0,},
              'ball_7_digit':{'A':0,},
              'ball_8_digit':{'A':0,},
              'ball_9_digit':{'A':0,},
              'ball_10_digit':{'A':0,},
            },
            double_aspect:{
              'ball_1_half':{'K':0,},
              'ball_2_half':{'K':0,},
              'ball_3_half':{'K':0,},
              'ball_4_half':{'K':0,},
              'ball_5_half':{'K':0,},
              'ball_6_half':{'K':0,},
              'ball_7_half':{'K':0,},
              'ball_8_half':{'K':0,},
              'ball_9_half':{'K':0,},
              'ball_10_half':{'K':0,},
            },
            sum_digit:{},
            sum_half:{},
          },
          //下注金额
          bets:
          {
            single_ball:{
              'ball_1_digit':['','','','','','','','','','',],
              'ball_2_digit':['','','','','','','','','','',],
              'ball_3_digit':['','','','','','','','','','',],
              'ball_4_digit':['','','','','','','','','','',],
              'ball_5_digit':['','','','','','','','','','',],
              'ball_6_digit':['','','','','','','','','','',],
              'ball_7_digit':['','','','','','','','','','',],
              'ball_8_digit':['','','','','','','','','','',],
              'ball_9_digit':['','','','','','','','','','',],
              'ball_10_digit':['','','','','','','','','','',],
            },
            double_aspect:{
              'ball_1_half':['','','','','',''],
              'ball_2_half':['','','','','',''],
              'ball_3_half':['','','','','',''],
              'ball_4_half':['','','','','',''],
              'ball_5_half':['','','','','',''],
              'ball_6_half': ['','','',''],
              'ball_7_half': ['','','',''],
              'ball_8_half': ['','','',''],
              'ball_9_half': ['','','',''],
              'ball_10_half':['','','',''],
            },
            sum_digit:['','','','','','','','','','','','','','','','',''],
            sum_half:['','','',''],
          },
          bet_content:[],//下注内容的集合
          //纯赔率列表
          all_odds:[],
          //参照表1
          dicrationaries:[
            //两面
            'ball_1_half__K','ball_1_half__L','ball_1_half__M','ball_1_half__N','ball_1_half__O','ball_1_half__P',
            'ball_2_half__K','ball_2_half__L','ball_2_half__M','ball_2_half__N','ball_2_half__O','ball_2_half__P',
            'ball_3_half__K','ball_3_half__L','ball_3_half__M','ball_3_half__N','ball_3_half__O','ball_3_half__P',
            'ball_4_half__K','ball_4_half__L','ball_4_half__M','ball_4_half__N','ball_4_half__O','ball_4_half__P',
            'ball_5_half__K','ball_5_half__L','ball_5_half__M','ball_5_half__N','ball_5_half__O','ball_5_half__P',
            'ball_6_half__K','ball_6_half__L','ball_6_half__M','ball_6_half__N',
            'ball_7_half__K','ball_7_half__L','ball_7_half__M','ball_7_half__N',
            'ball_8_half__K','ball_8_half__L','ball_8_half__M','ball_8_half__N',
            'ball_9_half__K','ball_9_half__L','ball_9_half__M','ball_9_half__N',
            'ball_10_half__K','ball_10_half__L','ball_10_half__M','ball_10_half__N',
             //特码
            'ball_1_digit__A','ball_1_digit__B','ball_1_digit__C',
            'ball_1_digit__D','ball_1_digit__E','ball_1_digit__F',
            'ball_1_digit__G','ball_1_digit__H','ball_1_digit__I','ball_1_digit__J',
            'ball_2_digit__A','ball_2_digit__B','ball_2_digit__C',
            'ball_2_digit__D','ball_2_digit__E','ball_2_digit__F',
            'ball_2_digit__G','ball_2_digit__H','ball_2_digit__I','ball_2_digit__J',
            'ball_3_digit__A','ball_3_digit__B','ball_3_digit__C',
            'ball_3_digit__D','ball_3_digit__E','ball_3_digit__F',
            'ball_3_digit__G','ball_3_digit__H','ball_3_digit__I','ball_3_digit__J',
            'ball_4_digit__A','ball_4_digit__B','ball_4_digit__C',
            'ball_4_digit__D','ball_4_digit__E','ball_4_digit__F',
            'ball_4_digit__G','ball_4_digit__H','ball_4_digit__I','ball_4_digit__J',
            'ball_5_digit__A','ball_5_digit__B','ball_5_digit__C',
            'ball_5_digit__D','ball_5_digit__E','ball_5_digit__F',
            'ball_5_digit__G','ball_5_digit__H','ball_5_digit__I','ball_5_digit__J',
            'ball_6_digit__A','ball_6_digit__B','ball_6_digit__C',
            'ball_6_digit__D','ball_6_digit__E','ball_6_digit__F',
            'ball_6_digit__G','ball_6_digit__H','ball_6_digit__I','ball_6_digit__J',
            'ball_7_digit__A','ball_7_digit__B','ball_7_digit__C',
            'ball_7_digit__D','ball_7_digit__E','ball_7_digit__F',
            'ball_7_digit__G','ball_7_digit__H','ball_7_digit__I','ball_7_digit__J',
            'ball_8_digit__A','ball_8_digit__B','ball_8_digit__C',
            'ball_8_digit__D','ball_8_digit__E','ball_8_digit__F',
            'ball_8_digit__G','ball_8_digit__H','ball_8_digit__I','ball_8_digit__J',
            'ball_9_digit__A','ball_9_digit__B','ball_9_digit__C',
            'ball_9_digit__D','ball_9_digit__E','ball_9_digit__F',
            'ball_9_digit__G','ball_9_digit__H','ball_9_digit__I','ball_9_digit__J',
            'ball_10_digit__A','ball_10_digit__B','ball_10_digit__C',
            'ball_10_digit__D','ball_10_digit__E','ball_10_digit__F',
            'ball_10_digit__G','ball_10_digit__H','ball_10_digit__I','ball_10_digit__J',

             //冠亚军总和
            'sum_half__A','sum_half__B','sum_half__C','sum_half__D',
            'sum_digit__A','sum_digit__B','sum_digit__C','sum_digit__D', 'sum_digit__E',
            'sum_digit__F','sum_digit__G','sum_digit__H','sum_digit__I',
            'sum_digit__J','sum_digit__K','sum_digit__L','sum_digit__M','sum_digit__N',
            'sum_digit__O','sum_digit__P','sum_digit__Q'
          ],
          //参照表2
          dicrationaries_2:[
            //两面
            '第一名-大','第一名-小','第一名-单','第一名-双','第一名-龙','第一名-虎',
            '第二名-大','第二名-小','第二名-单','第二名-双','第二名-龙','第二名-虎',
            '第三名-大','第三名-小','第三名-单','第三名-双','第三名-龙','第三名-虎',
            '第四名-大','第四名-小','第四名-单','第四名-双','第四名-龙','第四名-虎',
            '第五名-大','第五名-小','第五名-单','第五名-双','第五名-龙','第五名-虎',
            '第六名-大','第六名-小','第六名-单','第六名-双',
            '第七名-大','第七名-小','第七名-单','第七名-双',
            '第八名-大','第八名-小','第八名-单','第八名-双',
            '第九名-大','第九名-小','第九名-单','第九名-双',
            '第十名-大','第十名-小','第十名-单','第十名-双',
            //特码
            '第一名-特码-1','第一名-特码-2','第一名-特码-3','第一名-特码-4',
            '第一名-特码-5','第一名-特码-6','第一名-特码-7','第一名-特码-8','第一名-特码-9','第一名-特码-10',
            '第二名-特码-1','第二名-特码-2','第二名-特码-3','第二名-特码-4',
            '第二名-特码-5','第二名-特码-6','第二名-特码-7','第二名-特码-8','第二名-特码-9','第二名-特码-10',
            '第三名-特码-1','第三名-特码-2','第三名-特码-3','第三名-特码-4',
            '第三名-特码-5','第三名-特码-6','第三名-特码-7','第三名-特码-8','第三名-特码-9','第三名-特码-10',
            '第四名-特码-1','第四名-特码-2','第四名-特码-3','第四名-特码-4',
            '第四名-特码-5','第四名-特码-6','第四名-特码-7','第四名-特码-8','第四名-特码-9','第四名-特码-10',
            '第五名-特码-1','第五名-特码-2','第五名-特码-3','第五名-特码-4',
            '第五名-特码-5','第五名-特码-6','第五名-特码-7','第五名-特码-8','第五名-特码-9','第五名-特码-10',
            '第六名-特码-1','第六名-特码-2','第六名-特码-3','第六名-特码-4',
            '第六名-特码-5','第六名-特码-6','第六名-特码-7','第六名-特码-8','第六名-特码-9','第六名-特码-10',
            '第七名-特码-1','第七名-特码-2','第七名-特码-3','第七名-特码-4',
            '第七名-特码-5','第七名-特码-6','第七名-特码-7','第七名-特码-8','第七名-特码-9','第七名-特码-10',
            '第八名-特码-1','第八名-特码-2','第八名-特码-3','第八名-特码-4',
            '第八名-特码-5','第八名-特码-6','第八名-特码-7','第八名-特码-8','第八名-特码-9','第八名-特码-10',
            '第九名-特码-1','第九名-特码-2','第九名-特码-3','第九名-特码-4',
            '第九名-特码-5','第九名-特码-6','第九名-特码-7','第九名-特码-8','第九名-特码-9','第九名-特码-10',
            '第十名-特码-1','第十名-特码-2','第十名-特码-3','第十名-特码-4',
            '第十名-特码-5','第十名-特码-6','第十名-特码-7','第十名-特码-8','第十名-特码-9','第十名-特码-10',
             //冠亚军总和
            '冠亚军-大','冠亚军-小','冠亚军-单','冠亚军-双',
            '冠亚军-特码-3','冠亚军-特码-4','冠亚军-特码-5','冠亚军-特码-6','冠亚军-特码-7',
            '冠亚军-特码-8','冠亚军-特码-9','冠亚军-特码-10','冠亚军-特码-11','冠亚军-特码-12',
            '冠亚军-特码-13','冠亚军-特码-14','冠亚军-特码-15','冠亚军-特码-16','冠亚军-特码-17',
            '冠亚军-特码-18','冠亚军-特码-19',

          ],

          timeId:0, //定时器1
          timeId2:1, //定时器2
          timeId3:10, //定时器3

          history_codes:[],//历史开奖的数据

          //查看用户可选的盘口
          handicaps:[],
          //当前是哪个盘口
          which_handicap:'',

          vaild_lotteries:[],//  用户拥有哪些彩种

          fanshui:"",
          orderData:[],//未结算数据
          tips:'距离本期封盘还有',


          isClose:false,//是否闭盘
          //趺背的数据
          dec_limit:
            {
              //1里面找
              ball_1_digit:{},
              ball_2_digit:{},
              ball_3_digit:{},
              ball_4_digit:{},
              ball_5_digit:{},
              ball_6_digit:{},
              ball_7_digit:{},
              ball_8_digit:{},
              ball_9_digit:{},
              ball_10_digit:{},
              //6页面找
              ball_1_half:{},
              ball_2_half:{},
              ball_3_half:{},
              ball_4_half:{},
              ball_5_half:{},
              ball_6_half:{},
              ball_7_half:{},
              ball_8_half:{},
              ball_9_half:{},
              ball_10_half:{},
              //1页面找
              sum_half:{},
              sum_digit:{},
            },
          open_state:false,//是否开盘,true是开盘,false是封盘了
          fast_bet_money:[10,50,100,200,500,1000],//快速下注的金额


        };
      return my_data;
    },
    filters: {
      get_time2: function (str) {
        let data = str.substring(10);
        return data;
      }

    },
    methods:
    {
      parseIn(v)
      {
        return parseInt(v);
      },
      showType: function (idx)
      {
        this.showArray_cqssc = [0, 0, 0, 0, 0, 0, 0];
        this.showArray_cqssc[idx] = 1;
        this.clear_bet();
      },
      showTables: function (idx)
      {
        // this.history_tables = [0, 0, 0, 0, 0, 0, 0];
        // this.history_tables[idx] = 1;
          if(idx == 1)
          {
              this.history_tables[1] = !this.history_tables[1];
              this.history_tables[2] = 0;
          }
          if(idx == 2)
          {
              this.history_tables[2] = !this.history_tables[2];
              this.history_tables[1] = 0;
          }
      },
        //长龙出的数据
        get_londDragon_data()
        {
            this.$http.get(this.global.config.API + 'pk10/longDragon', {}).then(function (res) {

                this.data = res.data.data;

            });
        },
      close_history: function ()
      {

        this.history_tables = [0, 0, 0, 0, 0, 0, 0];

        $(".history-close").slideUp();
        $(".history-list").slideUp();
        $(".history-table").slideUp();
        this.history_str = "展开";
      },
      showHistory: function ()
      {
        if (this.history_str == "展开") {
          $(".history-close").slideDown();
          $(".history-list").eq(this.history_flag).slideDown();
          $(".history-table").slideDown();
          this.history_tables = [0, 0, 0, 0, 0, 0, 0];
          this.history_tables[1] = 1;
          this.history_str = "收起";
        }
        else
        {
          this.close_history();
        }

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
            that.open_state = false;
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
                that.get_ssc_unclear();
                that.tips = "距离本期封盘还有";
                that.open_state = true;
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
            that.open_state = true;
          }

          that.end_time--;
          that.open_time--;


        },1000);
        //开盘倒计时



      },
      //上期开奖结果
      get_last:function()
      {
        this.$http.get(`${this.global.config.API}pk10/lastLty`).then(function(res){
            var data = res.data;
            this.open_codes = data.opencode;
            this.lastExpect = data.expect;
        });
      },
      //获取用户赔率
      get_odds:function(which_handicap = null)
      {
        if(which_handicap || this.which_handicap)
        {
          this.$http.get(`${this.global.config.API}pk10/odds/1?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(res)
          {
            let data = res.data.data.odds;
            this.odds.single_ball = data;
            let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];
            for(let i=0;i<Alphabet.length;i++)
            {
              this.dec_limit['ball_'+ (i+1) +'_digit'] = data['ball_'+ (i+1) +'_digit'].dec_odds;
              this.all_odds[(i+50)] = data['ball_1_digit'][Alphabet[i]];
              this.all_odds[(i+60)] = data['ball_2_digit'][Alphabet[i]];
              this.all_odds[(i+70)] = data['ball_3_digit'][Alphabet[i]];
              this.all_odds[(i+80)] = data['ball_4_digit'][Alphabet[i]];
              this.all_odds[(i+90)] = data['ball_5_digit'][Alphabet[i]];
              this.all_odds[(i+100)] = data['ball_5_digit'][Alphabet[i]];
              this.all_odds[(i+110)] = data['ball_6_digit'][Alphabet[i]];
              this.all_odds[(i+120)] = data['ball_7_digit'][Alphabet[i]];
              this.all_odds[(i+130)] = data['ball_8_digit'][Alphabet[i]];
              this.all_odds[(i+140)] = data['ball_9_digit'][Alphabet[i]];
            }

          });
          this.$http.get(`${this.global.config.API}pk10/odds/2?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(res)
          {
            let data = res.data.data.odds;
            this.odds.double_aspect = data;
            let Alphabet = ['K','L','M','N','O','P'];
            this.dec_limit['ball_7_half'] = data['ball_7_half'].dec_odds;
            this.dec_limit['ball_8_half'] = data['ball_8_half'].dec_odds;
            this.dec_limit['ball_9_half'] = data['ball_9_half'].dec_odds;
            this.dec_limit['ball_10_half'] = data['ball_10_half'].dec_odds;
            for(let i=0;i<Alphabet.length;i++)
            {
                this.dec_limit['ball_'+ (i+1) +'_half'] = data['ball_'+ (i+1) +'_half'].dec_odds;
                this.all_odds[i]    = data['ball_1_half'][Alphabet[i]];
                this.all_odds[i+6]  = data['ball_2_half'][Alphabet[i]];
                this.all_odds[i+12] = data['ball_3_half'][Alphabet[i]];
                this.all_odds[i+18] = data['ball_4_half'][Alphabet[i]];
                this.all_odds[i+24] = data['ball_5_half'][Alphabet[i]];
            }
            let Alphabet1 = ['K','L','M','N'];
            for(let i=0;i<Alphabet1.length;i++)
            {
              this.all_odds[i+30] = data['ball_6_half'][Alphabet[i]];
              this.all_odds[i+34] = data['ball_7_half'][Alphabet[i]];
              this.all_odds[i+38] = data['ball_8_half'][Alphabet[i]];
              this.all_odds[i+42] = data['ball_9_half'][Alphabet[i]];
              this.all_odds[i+46] = data['ball_10_half'][Alphabet[i]];
            }

          });
          this.$http.get(`${this.global.config.API}pk10/odds/3?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(res)
          {
            let data = res.data.data.odds;
            this.odds.sum_digit = data.sum_digit;
            this.odds.sum_half = data.sum_half;
            this.dec_limit.sum_digit = data.sum_digit.dec_odds;
            this.dec_limit.sum_half = data.sum_half.dec_odds;
            let Alphabet1 = ['A','B','C','D'];
            for(let i=0;i<Alphabet1.length;i++)
            {
                this.all_odds[i+150] = data['sum_half'][Alphabet1[i]];
            }
            let Alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];
            for(let i=0;i<Alphabet.length;i++)
            {
              this.all_odds[i+154] = data['sum_digit'][Alphabet[i]];
            }
          });
        }
       /* else
        {
          this.$http.get(`${this.global.config.API}pk10/odds/1`).then(function(res){
            var data = res.data.data.odds;
            this.odds.single_ball = data;
            for(let i=1;i<11;i++)
            {
              this.dec_limit['ball_'+ i +'_digit'] = data['ball_'+ i +'_digit'].dec_odds
            }

          });
          this.$http.get(`${this.global.config.API}pk10/odds/2`).then(function(res){
            var data = res.data.data.odds;
            this.odds.double_aspect = data;

          });
          this.$http.get(`${this.global.config.API}pk10/odds/3`).then(function(res){
            var data = res.data.data.odds;
            this.odds.sum_digit = data.sum_digit;
            this.odds.sum_half = data.sum_half;
          });
        }*/

      },
      //两面盘点击下注1
      bet_db:function(k,k2)
      {
        if(this.bets.double_aspect[this.double_aspect[k]][k2] != "")
        {
          return false;
        }
        this.bets.double_aspect[this.double_aspect[k]][k2] = this.fast_money;//改变下注金额
        this.bets.double_aspect[this.double_aspect[k]].reverse().reverse();//触发视图层改变
        let content = this.double_aspect[k] + '__' + this.double_aspect_a[k2];
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      //两面盘修改下注1
      bet_db_change(k,k2)
      {
        let content = this.double_aspect[k] + '__' + this.double_aspect_a[k2];
        this.bet_content.push({content:content,money:this.bets.double_aspect[this.double_aspect[k]][k2]});//添加到下注内容区
      },
      //两面盘点击下注2
      bet_db2:function(v,k)
      {
        if(this.bets.sum_half[k] != "")
        {
          return false;
        }
        this.bets.sum_half[k] = this.fast_money;//改变下注金额
        this.bets.sum_half.reverse().reverse();//触发视图层改变
        let content = 'sum_half__' + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      //两面盘修改下注2
      bet_db2_change:function(v,k)
      {
        let content = 'sum_half__' + v;
        this.bet_content.push({content:content,money:this.bets.sum_half[k]});//添加到下注内容区
      },
      //单球点击下注
      single_ball_1_10:function(k,k2)
      {
        if(this.bets.single_ball[k][k2] != "")
        {
          return false;
        }
        let keys = ['A','B','C','D','E','F','G','H','I','J'];
        this.bets.single_ball[k][k2] = this.fast_money;//改变下注金额
        this.bets.single_ball[k].reverse().reverse();//触发视图层改变
        let content = k + '__' + keys[k2];
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      //单球修改下注
      single_ball_1_10_change:function(k,k2)
      {
        let keys = ['A','B','C','D','E','F','G','H','I','J'];
        let content = k + '__' + keys[k2];
        this.bet_content.push({content:content,money:this.bets.single_ball[k][k2]});//添加到下注内容区
      },
      //总和点击下注
      sumbo:function(v,k)
      {
        if(this.bets.sum_digit[k] != "")
        {
          return false;
        }
        this.bets.sum_digit[k] = this.fast_money;//改变下注金额
        this.bets.sum_digit.reverse().reverse();//触发视图层改变
        let content = 'sum_digit__' + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      //总和修改下注
      sumbo_change:function(v,k)
      {
        let content = 'sum_digit__' + v;
        this.bet_content.push({content:content,money:this.bets.sum_digit[k]});//添加到下注内容区
      },
      //单球点击下注1
      single_ball_1:function (v,k,str)
      {
        if(this.bets.single_ball[str][k] != "")
        {
          return false;
        }
        this.bets.single_ball[str][k] = this.fast_money;//改变下注金额
        this.bets.single_ball[str].reverse().reverse();//触发视图层改变
        let content = str + "__" + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      //单球修改下注2
      single_ball_1_change:function (v,k,str)
      {
        let content = str + "__" + v;
        this.bet_content.push({content:content,money:this.bets.single_ball[str][k]});//添加到下注内容区
      },
      //单球点击下注1
      single_ball_2:function (v,k,str)
      {
        if(this.bets.double_aspect[str][k] != "")
        {
          return false;
        }
        this.bets.double_aspect[str][k] = this.fast_money;//改变下注金额
        this.bets.double_aspect[str].reverse().reverse();//触发视图层改变
        let content = str + "__" + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      //单球点击下注1
      single_ball_2_change:function (v,k,str)
      {
        let content = str + "__" + v;
        this.bet_content.push({content:content,money:this.bets.double_aspect[str][k]});//添加到下注内容区
      },
      //清除下注内容
      clear_bet:function ()
      {
        //清空数据
        this.bet_content = [];
        //重置ui
        this.bets =
          {
            single_ball:{
              'ball_1_digit':['','','','','','','','','','',],
              'ball_2_digit':['','','','','','','','','','',],
              'ball_3_digit':['','','','','','','','','','',],
              'ball_4_digit':['','','','','','','','','','',],
              'ball_5_digit':['','','','','','','','','','',],
              'ball_6_digit':['','','','','','','','','','',],
              'ball_7_digit':['','','','','','','','','','',],
              'ball_8_digit':['','','','','','','','','','',],
              'ball_9_digit':['','','','','','','','','','',],
              'ball_10_digit':['','','','','','','','','','',],
            },
            double_aspect:{
              'ball_1_half':['','','','','',''],
              'ball_2_half':['','','','','',''],
              'ball_3_half':['','','','','',''],
              'ball_4_half':['','','','','',''],
              'ball_5_half':['','','','','',''],
              'ball_6_half':['','','','','','','','','','',],
              'ball_7_half':['','','',''],
              'ball_8_half':['','','',''],
              'ball_9_half':['','','',''],
              'ball_10_half':['','','',''],
            },
            sum_digit:['','','','','','','','','','','','','','','','',''],
            sum_half:['','','',''],
          };
        //更新视图层
        this.bets.single_ball.ball_1_digit.reverse().reverse();
      },
      //删除订单
      delete_it(event)
      {

        if(event.target.innerHTML == '删除')
        {
          //删除这个下注项
          for(let i = 0 ; i<this.bet_content.length;i++)
          {
            if(this.bet_content[i].content == event.target.className)
            {
              this.bet_content.splice(i, 1);
            }
          }

          //移除这个html元素
          let line = event.target.parentNode.parentNode;
          let bigDaddy = line.parentNode;
          bigDaddy.removeChild(line);

          //重写统计
          let len = this.bet_content.length;//几条
          //当this.bets没有内容时，提示用户选择下注内容,并清空下注内容
          if(len <1)
          {
            this.centerDialogVisible = false;
            this.$message.error('请重新选择下注内容');
            this.clear_bet();

          }
          let totalMoney = 0;//总金额
          for(let i = 0;i<len;i++)
          {
            totalMoney += this.bet_content[i].money;
          }
          document.getElementById('sum').innerHTML = `共${len}条,${totalMoney}￥`;
        }
      },
      /**
       * 用户确认下注
       */
      comfire_content:function()
      {
        //过滤掉相同的对象
        this.filter_same();

        //当用户没有选择下注内容的时候要提示用户选择
        if(this.bet_content.length < 1)
        {
          this.$message(
            {
              dangerouslyUseHTMLString: true,
              message: '请选择下注内容后再提交',
              center: true,
              type: 'warning'
            });
          return 0;
        }
        /*开始拼接数据*/
        let html = `<table class="bet-table"><tr><td>注单明细</td><td>赔率</td><td>下注金额</td><td>操作</td></tr>`;
        //下注总金额
        let sumMoney = 0;
        //将this.bet_content的内容转化成html显示在页面的弹框上
        for(let i = 0; i<this.bet_content.length;i++)
        {
          //下注内容的下标，对应可以找到下注内容的中文，和赔率
          let index = this.dicrationaries.indexOf(this.bet_content[i].content);
          //赔率
          let str = '';
          if(this.$store.state.son_off)
          {
            if(this.is_dec(this.bet_content[i].content,this.bet_content[i].money))
            {
              let odds = (Number(this.all_odds[index]) - Number(this.is_dec(this.bet_content[i].content,this.bet_content[i].money))).toFixed(4);
              str += `${odds}`;
            }
            else
            {
              str += `${this.all_odds[index]}`;
            }
          }
          else
          {
            str += `${this.all_odds[index]}`;
          }


          //组织成html页面
          html += `<tr>
                        <td>${this.dicrationaries_2[index]}</td>
                        <td class="color-red">${str}</td>
                        <td>${this.bet_content[i].money}</td>
                        <td><button  class='${this.bet_content[i].content}' attr='my-btn-1'>删除</button></td>
                     </tr>`;
          sumMoney += parseInt(this.bet_content[i].money);
        }
        html +=   `</table>`;
        html += `<div style='text-align:center;margin-top:15px;' id='sum' >共 <span style="color:blue;font-weight:700;">${this.bet_content.length}</span> 条 <span style="color:blue;font-weight:700;">${sumMoney}</span>￥</div>`;
        this.centerDialogVisible = true;
        this.bet_html = html;
        return;


      },
      is_dec:function(content,money)
      {
        let returnData = null;
        let patterns =
          {
            pattern1 :  'ball_1_digit',
            pattern2 :  'ball_2_digit',
            pattern3 :  'ball_3_digit',
            pattern4 :  'ball_4_digit',
            pattern5 :  'ball_5_digit',
            pattern6 :  'ball_6_digit',
            pattern7 :  'ball_7_digit',
            pattern8 :  'ball_8_digit',
            pattern9 :  'ball_9_digit',
            pattern10 : 'ball_10_digit',

            pattern11 : 'ball_1_half',
            pattern12 : 'ball_2_half',
            pattern13 : 'ball_3_half',
            pattern14 : 'ball_4_half',
            pattern15 : 'ball_5_half',
            pattern16 : 'ball_6_half',
            pattern17 : 'ball_7_half',
            pattern18 : 'ball_8_half',
            pattern19 : 'ball_9_half',
            pattern20 : 'ball_10_half',


            pattern20 : 'sum_half',
            pattern21 : 'sum_digit',



          };
        let flag = false;
        let index = 0;
        for(let i = 1 ; i<22;i++)
        {
          if(content.match(patterns['pattern' + i]))
          {
            flag = true;
            index = i;
            break;
          }
        }
        if(flag)
        {
          let data = this.dec_limit[patterns['pattern' + index]];
          for(let i = 0 ; i<data.length;i++)
          {
            if(money>=data[i].limit)
            {
              returnData = data[i].dec_odds;
            }
          }
        }
        return returnData;

      },
      /**
       * 过滤掉相同的下注内容
       */
      filter_same:function ()
      {
        for(let i = 0; i < this.bet_content.length;i++)
        {
          let key =  this.bet_content[i].content;
          var flag = false;
          for(let j = i+1;j<this.bet_content.length;j++)
          {
            if(key == this.bet_content[j].content)
            {
              this.bet_content.splice(i,1);
              flag = true;
              break;
            }
          }
          if(!this.bet_content[i].money)
          {
            this.bet_content.splice(i,1);
            flag = true;
          }
          if(flag)
          {
            this.filter_same();
            break;
          }
        }
      },
      /**
       * 提交下注 注单
       */
      do_bet:function ()
      {
        this.centerDialogVisible = false;
        this.$http.post(`${this.global.config.API}pk10/order`,{bets:this.bet_content,odds_table:this.which_handicap})
          .then(function(res)
          {
            if(res.data.status == 200)
            {
              //清除下注内容
              this.clear_bet();
              //从服务器上获取余额
              this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
              {
                let  data = response.data.data.user;
                this.$set(this.$store.state,'cash_money',data.money.cash_money)
              });
              this.$message(
                {
                  dangerouslyUseHTMLString: true,
                  message: res.data.msg,
                  center: true,
                  type: 'success',
                  duration:1500,
                });
              //获取全局的未结算清单
              this.get_ssc_unclear();
              //显示未结算的数据
              this.$store.state.isShowUnclear = true;
              //显示pk10的数据
              this.$store.state.which_lottery = 'pk10';
            }
            else
            {
              this.$message.error(res.data.msg);
             }
        });
      },

      /**
       * 设置快速下注的金额
       */
      setBetMoney:function(money)
      {
        this.fast_money = money;
      },

      /**
       * 获取北京pk拾的历史开奖
       */
      get_open_history:function()
      {
         this.$http.get(`${this.global.config.API}pk10/history/lottery?range=today`)
           .then(function(res)
           {
              if(res.data.status == 200)
              {

                  this.history_codes = res.data.data.list;
              }
           });
      },
      /**
       * 查看用户可选盘口
       */
      get_users_handicaps:function()
      {
        this.$http.get(`${this.global.config.API}pk10/pans`)
          .then(function(res)
          {
            this.handicaps = [];
            if(res.data.status == 200)
            {

              for(let i = 0 ; i <res.data.data.ratelist.length;i++)
              {
                this.handicaps.push(res.data.data.ratelist[i]);
                this.which_handicap = res.data.data.ratelist[0].ratewin_name;
                this.fanshui = res.data.data.ratelist[0].fs;
              }

            }
          });
      },
      return_percent:function(str)
      {
        return str;
      },
      return_upper:function(str)
      {
        return str.toUpperCase();
      },
      /**
       * 获取cqssc未结算的清单
       */
      get_ssc_unclear:function()
      {

        //获取cqssc未结算的数据
        this.$http.get(`${this.global.config.API}pk10/history/clear/0`).then(function(res)
        {
          if(res.data.status == 403) return false;
          this.orderData = [];
          let data = res.data.data;
          let list  = data.list;
          for(let i = 0; i<list.length;i++)
          {
              this.orderData.push(list[i]);

          }
          //设置全局的未结算清单
          this.$set(this.$store.state,'unclear',this.orderData);

        });
      },

    },
    created: function ()
    {
      //检测是否登录
      if (this.$store.state.isLogin || (window.sessionStorage.isLogin == "ok"))
      {
        //获取用户信息
        this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.$store.state.username = data.username;//用户名
          this.$store.state.nickname = data.nickname;//昵称
          this.$store.state.cash_money = data.money.cash_money;//现金额度
          this.$store.state.credit_money = data.money.credit_money;//信用额度
          this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
          if(this.vaild_lotteries.indexOf('bjpk10') != -1)
          {
            // 1 获取开奖时间和下注封盘时间
            this.get_time();
            // 2 上期开奖结果
            this.get_last();
            // 3 获取用户有哪些盘口
            this.get_users_handicaps();
            // 4 获取用户赔率
            this.get_odds();

            // 5获取pk10的开奖数据
            this.get_open_history();

            // 6 获取未结算清单
            this.get_ssc_unclear();
            //7.获取长龙出数据
              this.get_londDragon_data();
          }
          else
          {
            this.$router.push('cakeno28');
          }
        });
      }
      else
      {
        window.location.href = '/';
      }///没有登录跳转到登录页面



    },
    /**
     * 在created创建后的钩子
     */
    mounted:function()
    {
      var that = this;
      //获取赔率、最新开奖结果的倒计时 5s一次
      this.timeId = setInterval(function()
      {
        that.get_odds(this.which_handicap);
        that.get_last();
      },10000);

      //获取未结算数据 45s一次
      this.timeId3 = setInterval(function()
      {
        that.get_ssc_unclear();
      },45000);

    },
    //离开这个路由时触发的钩子
    destroyed()
    {
      /**
       * 清除请求赔率和最新开奖的定时器
       */
      clearInterval(this.timeId);
      clearInterval(this.timeId2);
      clearInterval(this.timeId3);
    },
    /**
     * 监听用户切换盘时 刷新赔率
     */
    watch:
      {
        /**
         *  监听用户选择的盘口，切换盘口时，获取对应盘口的赔率
         * @param n
         * @param o
         */
        "which_handicap":function(n,o)
        {
          this.get_odds(n);
          for(let i = 0;i<this.handicaps.length;i++)
          {
            if(n == this.handicaps[i].ratewin_name)
            {
              this.fanshui = this.handicaps[i].fs;
            }
          }
        },
        /**
         * 当open_time<0时，说明已经销售完了，关闭所有请求，
         * @param n
         */
        "open_time":function(n)
        {
          if(n<0)
          {
            clearInterval(this.timeId);
          }else if (n === 0)
          {
            clearInterval(this.timeId);
            var that = this;
            //获取赔率、最新开奖结果的倒计时 5s一次
            this.timeId = setInterval(function()
            {
              that.get_odds();
              that.get_last();
            },10000);
          }
        }
      }
  }//end export default
</script>


<style scoped>
  @import '../assets/css/pk10.css';

  .first-ball-details
  {
    text-align: left;
    text-indent: 15px;
  }

  .first-ball-details > span
  {
    float: left;
  }
</style>
<style>
  button[attr='my-btn-1']
  {

    margin-right:5px;
    color:#fff;
    background:#f56c6c;
    border: 1px solid #dcdfe6;padding:3px;
  }
  .bet-table
  {
      width: 100%;
      text-align:center;
  }
  .bet-table td
  {
      padding:8px;
      border: 1px solid #e5e5e5;
      text-align:center;
  }
</style>
