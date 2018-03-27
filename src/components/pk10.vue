<template>
  <div id="cqssc">

    <!-- 期数 时间 开奖号码 -->
    <div class="head">
      <div class="details">
        <img src="../assets/img/navicons_09.png" class="logo-tubiao" alt="">
        <div class="left">
          <p class="color-white">第{{lastExpect}}期</p>
          <p class="color-white mt5">开奖号码</p>
        </div>
        <div class="balls">
          <span v-for="(v,k) in open_codes" :class="'hao'+ (v/10*10)">{{v/10*10}}</span>
          <div class="clear"></div>
        </div>
        <div class="description">
          <p class="color-white">
            10分钟一期，每天09:50-01:54:30销售
          </p>
          <p class="color-white mt5">
            今天已售{{sales_}}期,还剩{{unsaleNum}}期
          </p>
          <div class="pan">
            <label>盘类</label>
            <select name="" id="">
              <option value="">B</option>
            </select>
          </div>
        </div>

        <div class="left">
          <p class="color-white text-right">第{{thisExpect}}期</p>
          <p class="color-white mt5 text-right" v-show="end_time > 0">距离封盘</p>
          <p class="color-white mt5 text-right" v-show="end_time <= 0">距离开盘</p>
        </div>

        <div class="count-down color-white">
                    <span>
                        {{mins}}
                    </span>
          <b>分</b>
          <span :class="end_time <= 0?'color-red':''">
                        {{seconds}}
                    </span>
          <b>秒</b>
        </div>


        <img src="../assets/img/alert-1.png" alt="" class="audio">
        <div class="clear"></div>
      </div>

      <div class="clear"></div>
    </div>

    <!-- 下注内容区 -->
    <div id="bet-content">
      <form action="">
        <div class="bet-content-table">
          <a :class="showArray_cqssc[0]?'color-white active':'color-white'" @click="showType(0)">
            两面盘
            <span></span>
          </a>
          <a :class="showArray_cqssc[1]?'color-white active':'color-white'" @click="showType(1)">
            单名1-10
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

        <div class="bet-content-input">
          <div class="fast-bet">
            快速下注金额
            <input type="text" class="fast-bet-input" v-model="fast_money">
          </div>
          <div class="bet-btns">
            <a @click="setBetMoney(10)">10</a> <a @click="setBetMoney(50)">50</a>            <a @click="setBetMoney(100)">100</a>            <a @click="setBetMoney(200)">200</a>            <a @click="setBetMoney(500)">500</a>            <a @click="setBetMoney(1000)">1000</a>

            <a class="pull-right chongtian" @click="clear_bet">重填</a>
            <a @click="comfire_content" class="pull-right tijiao">提交</a>
          </div>
          <div class="clear"></div>
        </div>

        <!-- 两面 -->
        <div class="bet-chooses" v-show="showArray_cqssc[0]">
          <div class="bet-chooses-top">

            <div v-for="(v,k,index) in odds.double_aspect"  :class="(index==0 || index==5)?'first-ball mt0':'first-ball'">
                <div v-for="(val,key,idx) in double_aspect_a" v-if="v[val]" class="first-ball-details text-0">
                     <span class="he22 ">{{double_aspect_c[key]}}</span>
                  <span class="he22 ">{{v[val]}}</span>
                  <input type="text" class="innnn" v-model="bets.double_aspect['ball_'+ (index+1) +'_half'][key]" @click="bet_db(index,key)">
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
                <span>{{odds.sum_half[v]}}</span>
                <input type="text" v-model="bets.sum_half[index]" @click="bet_db2(v,index)">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>

        <!-- 单名1-10 -->
        <div class="bet-chooses" v-show="showArray_cqssc[1]">
          <div class="bet-chooses-top">
            <div v-for="(v,k,index) in odds.single_ball"  :class="(index==0 || index==5)?'first-ball mt0':'first-ball'">
              <div v-for="(val,key,idx) in singleball_a" class="first-ball-details">
                <span :class="'hao' + (key+1)">{{key+1}}</span>
                <span class="he22">{{v[val]}}</span>
                <input type="text" class="innnn" v-model="bets.single_ball['ball_'+ (index+1) +'_digit'][key]"  @click="single_ball_1_10(k,key)">
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
                <span>{{odds.sum_digit[v]}}</span>
                <input type="text" v-model="bets.sum_digit[index]" @click="sumbo(v,index)">
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
                <span>{{odds.sum_half[v]}}</span>
                <input type="text" v-model="bets.sum_half[index]" @click="bet_db2(v,index)" >
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
                <span>{{odds.single_ball.ball_1_digit[v]}}</span>
                <input type="text" v-model="bets.single_ball.ball_1_digit[index]" @click="single_ball_1(v,index,'ball_1_digit')">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(v,index) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[index]}}</span>
                <span>{{odds.double_aspect.ball_1_half[v]}}</span>
                <input type="text" v-model="bets.double_aspect.ball_1_half[index]" @click="single_ball_2(v,index,'ball_1_half')">
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
                <span>{{odds.single_ball.ball_2_digit[v]}}</span>
                <input type="text" v-model="bets.single_ball.ball_2_digit[index]" @click="single_ball_1(v,index,'ball_2_digit')">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>


              <div v-for="(v,index) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[index]}}</span>
                <span>{{odds.double_aspect.ball_2_half[v]}}</span>
                <input type="text" v-model="bets.double_aspect.ball_2_half[index]" @click="single_ball_2(v,index,'ball_2_half')">
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
              <div v-for="(val,key) in singleball_a" class="long-bet-content ">
                <span :class="'hao'+(key+1)">{{key+1}}</span>
                <span>{{odds.single_ball[k][val]}}</span>
                <input type="text" v-model="bets.single_ball[k][key]" @click="single_ball_1(val,key,k)">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(val,key) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[key]}}</span>
                <span>{{odds.double_aspect['ball_' + (index+1) + '_half'][val]}}</span>
                <input type="text" v-model="bets.double_aspect['ball_' + (index+1) + '_half'][key]" @click="single_ball_2(val,key,'ball_' + (index+1) + '_half')">
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
                <span>{{odds.single_ball[k][val]}}</span>
                <input type="text" v-model="bets.single_ball[k][key]" @click="single_ball_1(val,key,k)">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(val,key) in double_aspect_a" v-if="odds.double_aspect['ball_' + (index+1) + '_half'][val]" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[key]}}</span>
                <span>{{odds.double_aspect['ball_' + (index+1) + '_half'][val]}}</span>
                <input type="text" v-model="bets.double_aspect['ball_' + (index+1) + '_half'][key]" @click="single_ball_2(val,key,'ball_' + (index+1) + '_half')">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="clear"></div>
          </div>
        </div>

        <div class="bet-content-input mrt-55">
          <div class="fast-bet">
            快速下注金额
            <input type="text" class="fast-bet-input" v-model="fast_money">
          </div>
          <div class="bet-btns">
            <a @click="setBetMoney(10)">10</a> <a @click="setBetMoney(50)">50</a>            <a @click="setBetMoney(100)">100</a>            <a @click="setBetMoney(200)">200</a>            <a @click="setBetMoney(500)">500</a>            <a @click="setBetMoney(1000)">1000</a>
            <a  class="pull-right chongtian" @click="clear_bet">重填</a>
            <a @click="comfire_content" class="pull-right tijiao">提交</a>
          </div>
          <div class="clear"></div>
        </div>

      </form>


    </div>

    <!-- 右边的历史记录 -->
    <div id="history">
      <div class="history-header" @click="showHistory">
        长龙排行 <span class="pull-right">{{history_str}}</span>
      </div>
      <div class="history-table">
        <a @click="showTables(0)" :class="history_tables[0]?'active':''">长龙-不出</a>
        <a @click="showTables(1)" :class="history_tables[1]?'active':''">长龙-出</a>
        <a @click="showTables(2)" :class="history_tables[2]?'active':''">历史开奖</a>
      </div>

      <div class="history-list" v-show="history_tables[0]">
          <!--长龙不出-->
      </div>

      <div class="history-list" v-show="history_tables[1]">
          <!--长龙不出-->
      </div>

      <div class="history-list" v-show="history_tables[2]">
        <div class="history-balls" v-for="v in history_codes">
          <p class="text-left">{{v.expect}}</p>
          <span v-for="val in v.open_codes" :class="'code-ball hao' + (val/10*10)">{{val/10*10}}</span>
        </div>
      </div>

      <div class="history-close ">
        <a @click="close_history()">
          关闭
        </a>
      </div>
    </div>


  </div>
</template>


<script>

  export default
  {
    name: "Pk10",
    data() {
      var my_data =
        {
          showArray_cqssc: [1, 0, 0, 0, 0, 0, 0],
          history_tables: [1, 0, 0],
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
          sum_half_b:['冠军单','冠军双','冠亚大','冠亚小'],

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
            '第一名大','第一名小','第一名单','第一名双','第一名龙','第一名虎',
            '第二名大','第二名小','第二名单','第二名双','第二名龙','第二名虎',
            '第三名大','第三名小','第三名单','第三名双','第三名龙','第三名虎',
            '第四名大','第四名小','第四名单','第四名双','第四名龙','第四名虎',
            '第五名大','第五名小','第五名单','第五名双','第五名龙','第五名虎',
            '第六名大','第六名小','第六名单','第六名双',
            '第七名大','第七名小','第七名单','第七名双',
            '第八名大','第八名小','第八名单','第八名双',
            '第九名大','第九名小','第九名单','第九名双',
            '第十名大','第十名小','第十名单','第十名双',
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
             //冠亚军总和
            '冠亚军-大','冠亚军-小','冠亚军-单','冠亚军-双',
            '冠亚军-特码-3','冠亚军-特码-4','冠亚军-特码-5','冠亚军-特码-6','冠亚军-特码-7',
            '冠亚军-特码-8','冠亚军-特码-9','冠亚军-特码-10','冠亚军-特码-11','冠亚军-特码-12',
            '冠亚军-特码-13','冠亚军-特码-14','冠亚军-特码-15','冠亚军-特码-16','冠亚军-特码-17',
            '冠亚军-特码-18','冠亚军-特码-19',

          ],

          timeId:0, //定时器1
          timeId2:1, //定时器2

          history_codes:[],//历史开奖的数据


        };
      return my_data;
    },
    methods:
    {
      showType: function (idx)
      {
        this.showArray_cqssc = [0, 0, 0, 0, 0, 0, 0];
        this.showArray_cqssc[idx] = 1;
        this.clear_bet();
      },
      showTables: function (idx)
      {
        this.history_tables = [0, 0, 0, 0, 0, 0, 0];
        this.history_tables[idx] = 1;
      },
      close_history: function ()
      {

        for (let i = 0; i < this.history_tables.length; i++) {
          if (this.history_tables[i]) {
            this.history_flag = i
          }
        }

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
          this.history_tables[this.history_flag] = 1;
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
        this.timeId2 = setInterval(function(){
          if(that.end_time <= 0)
          {
            that.mins = '00';
            that.seconds = that.open_time;
            if(that.open_time <= 0 )
            {
              clearInterval(that.timeId2);
              that.get_time();
              //获取全局的未结算清单
              that.$set(that.$store.state,'unclear',that.getOrder());
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
      get_odds:function()
      {
        this.$http.get(`${this.global.config.API}pk10/odds/1`).then(function(res){
            var data = res.data.data.odds;
            this.odds.single_ball = data;
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
      },

      bet_db:function(k,k2)
      {
        this.bets.double_aspect[this.double_aspect[k]][k2] = this.fast_money;//改变下注金额
        this.bets.double_aspect[this.double_aspect[k]].reverse().reverse();//触发视图层改变
        let content = this.double_aspect[k] + '__' + this.double_aspect_a[k2];
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      bet_db2:function(v,k)
      {
        this.bets.sum_half[k] = this.fast_money;//改变下注金额
        this.bets.sum_half.reverse().reverse();//触发视图层改变
        let content = 'sum_half__' + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
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
      single_ball_1_10:function(k,k2)
      {
        let keys = ['A','B','C','D','E','F','G','H','I','J'];
        this.bets.single_ball[k][k2] = this.fast_money;//改变下注金额
        this.bets.single_ball[k].reverse().reverse();//触发视图层改变
        let content = k + '__' + keys[k2];
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
        console.log(this.bet_content);
      },
      sumbo:function(v,k)
      {
        this.bets.sum_digit[k] = this.fast_money;//改变下注金额
        this.bets.sum_digit.reverse().reverse();//触发视图层改变
        let content = 'sum_digit__' + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
        console.table(this.bet_content)
      },
      single_ball_1:function (v,k,str)
      {
        this.bets.single_ball[str][k] = this.fast_money;//改变下注金额
        this.bets.single_ball[str].reverse().reverse();//触发视图层改变
        let content = str + "__" + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      single_ball_2:function (v,k,str)
      {
        this.bets.double_aspect[str][k] = this.fast_money;//改变下注金额
        this.bets.double_aspect[str].reverse().reverse();//触发视图层改变
        let content = str + "__" + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区

      },
      /**
       * 用户确认下注
       */
      comfire_content:function()
      {
        //当用户没有选择下注内容的时候要提示用户选择
        if(this.bet_content.length < 1){
          alert('请选择下注内容后再提交');
          return 0;
        }

        //过滤掉相同的对象
        this.filter_same();

        //拼接字符串
        let html = '';
        for(let i = 0; i<this.bet_content.length;i++)
        {
          var index = this.dicrationaries.indexOf(this.bet_content[i].content);
          html += this.dicrationaries_2[index] +  '  @ ￥' +  this.bet_content[i].money  +   '\n';
        }

        if(confirm(html))
        {
          this.do_bet();
        }
        else
        {
          console.log('取消');
        }

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
        this.$http.post(`${this.global.config.API}pk10/order`,{bets:this.bet_content,odds_table:'a'})
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
              //获取全局的未结算清单
              this.$set(this.$store.state,'unclear',this.getOrder());
              alert(res.data.msg);
            }
            else
            {
              alert(res.data.msg);
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
         this.$http.get(`${this.global.config.API}pk10/history/lottery?per_page=10&page=1`)
           .then(function(res)
           {
              if(res.data.status == 200)
              {
                  //console.log(res.data);
                  this.history_codes = res.data.data.list;
              }
           });
      }

    },
    created: function ()
    {
      //检测是否登录
      if (this.$store.state.isLogin || (window.sessionStorage.isLogin == "ok"))
      {
        this.global.log('欢迎回来~');
        //获取用户信息
        this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.$store.state.username = data.username;//用户名
          this.$store.state.nickname = data.nickname;//昵称
          this.$store.state.cash_money = data.money.cash_money;//现金额度
          this.$store.state.credit_money = data.money.credit_money;//信用额度
        });
      }
      else
      {
        window.location.href = '#/login';
        return;
      }///没有登录跳转到登录页面

      //获取开奖时间和下注封盘时间
      this.get_time();
      //上期开奖结果
      this.get_last();

      //获取用户赔率
      this.get_odds();

      //获取pk10的开奖数据
      this.get_open_history();

    },
    /**
     * 在created创建后的钩子
     */
    mounted:function()
    {
      var that = this;
      //获取赔率、最新开奖结果的倒计时 5s一次
      this.timeId = setInterval(function(){
        that.get_odds();
        that.get_last();
      },10000);

    },
    //离开这个路由时触发的钩子
    destroyed()
    {
      /**
       * 清除请求赔率和最新开奖的定时器
       */
      clearInterval(this.timeId);
      clearInterval(this.timeId2);
    },
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
