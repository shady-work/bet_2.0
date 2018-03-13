<template>
  <div id="cqssc">

    <!-- 期数 时间 开奖号码 -->
    <div class="head">
      <img src="../assets/img/navicons_09.png" alt="">

      <div class="details">
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
          <p class="color-white mt5 text-right">距离封盘</p>
        </div>

        <div class="count-down color-white">
                    <span>
                        {{mins}}
                    </span>
          <b>分</b>
          <span>
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
            <a href="">50</a>
            <a href="">100</a>
            <a href="">200</a>
            <a href="">500</a>
            <a href="">1000</a>
            <a href="">设置快速金额</a>
            <a class="pull-right chongtian" @click="clear_bet">重填</a>
            <a href="" class="pull-right tijiao">提交</a>
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
                <input type="text" class="innnn" v-model="bets.single_ball['ball_'+ (index+1) +'_digit'][key]">
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
                <input type="text" v-model="bets.sum_digit[index]">
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
                <input type="text" v-model="bets.sum_half[index]">
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
                <input type="text" v-model="bets.single_ball.ball_1_digit[index]">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(v,index) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[index]}}</span>
                <span>{{odds.double_aspect.ball_1_half[v]}}</span>
                <input type="text" v-model="bets.double_aspect.ball_1_half[index]">
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
                <input type="text" v-model="bets.single_ball.ball_2_digit[index]">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>


              <div v-for="(v,index) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[index]}}</span>
                <span>{{odds.double_aspect.ball_2_half[v]}}</span>
                <input type="text" v-model="bets.double_aspect.ball_2_half[index]">
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
                <input type="text" v-model="bets.single_ball[k][key]">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(val,key) in double_aspect_a" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[key]}}</span>
                <span>{{odds.double_aspect['ball_' + (index+1) + '_half'][val]}}</span>
                <input type="text" v-model="bets.double_aspect['ball_' + (index+1) + '_half'][key]">
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
                <input type="text" v-model="bets.single_ball[k][key]">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>


              <div v-for="(val,key) in double_aspect_a" v-if="odds.double_aspect['ball_' + (index+1) + '_half'][val]" class="long-bet-content">
                <span class="font16px">{{double_aspect_c[key]}}</span>
                <span>{{odds.double_aspect['ball_' + (index+1) + '_half'][val]}}</span>
                <input type="text" v-model="bets.double_aspect['ball_' + (index+1) + '_half'][key]">
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
            <a href="">50</a>
            <a href="">100</a>
            <a href="">200</a>
            <a href="">500</a>
            <a href="">1000</a>
            <a href="">设置快速金额</a>
            <a  class="pull-right chongtian" @click="clear_bet">重填</a>
            <a href="" class="pull-right tijiao">提交</a>
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
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
      </div>

      <div class="history-list" v-show="history_tables[1]">
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
        <p>
          <span class="pull-left">龙虎[和]</span>
          <span class="pull-right">14期</span>
          <span class="clear"></span>
        </p>
      </div>

      <div class="history-list" v-show="history_tables[2]">
        <div class="history-balls">
          <p class="text-left">858585</p>
          <span class="code-ball hao1">1</span>
          <span class="code-ball hao2">2</span>
          <span class="code-ball hao3">3</span>
          <span class="code-ball hao4">4</span>
          <span class="code-ball hao5">5</span>
          <span class="code-ball hao6">6</span>
          <span class="code-ball hao7">7</span>
          <span class="code-ball hao8">8</span>
          <span class="code-ball hao9">9</span>
          <span class="code-ball hao10">10</span>
        </div>

        <div class="history-balls">
          <p class="text-left">858585</p>
          <span class="code-ball hao1">1</span>
          <span class="code-ball hao2">2</span>
          <span class="code-ball hao3">3</span>
          <span class="code-ball hao4">4</span>
          <span class="code-ball hao5">5</span>
          <span class="code-ball hao6">6</span>
          <span class="code-ball hao7">7</span>
          <span class="code-ball hao8">8</span>
          <span class="code-ball hao9">9</span>
          <span class="code-ball hao10">10</span>
        </div>
        <div class="history-balls">
          <p class="text-left">858585</p>
          <span class="code-ball hao1">1</span>
          <span class="code-ball hao2">2</span>
          <span class="code-ball hao3">3</span>
          <span class="code-ball hao4">4</span>
          <span class="code-ball hao5">5</span>
          <span class="code-ball hao6">6</span>
          <span class="code-ball hao7">7</span>
          <span class="code-ball hao8">8</span>
          <span class="code-ball hao9">9</span>
          <span class="code-ball hao10">10</span>
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
  import config from '../assets/js/config';

  export default {
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
          bets:{
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
              'ball_1_half':['1','','','','',''],
              'ball_2_half':['2','','','','',''],
              'ball_3_half':['3','','','','',''],
              'ball_4_half':['4','','','','',''],
              'ball_5_half':['5','','','','',''],
              'ball_6_half':['6','','','','','','','','','',],
              'ball_7_half':['7','','',''],
              'ball_8_half':['8','','',''],
              'ball_9_half':['9','','',''],
              'ball_10_half':['10','','',''],
            },
            sum_digit:['','','','','','','','','','','','','','','','',''],
            sum_half:['','','',''],
          },
          bet_content:[],//下注内容的集合

        };
      return my_data;
    },
    methods: {
      showType: function (idx) {
        this.showArray_cqssc = [0, 0, 0, 0, 0, 0, 0];
        this.showArray_cqssc[idx] = 1;
        this.clear_bet();
      },
      showTables: function (idx) {
        this.history_tables = [0, 0, 0, 0, 0, 0, 0];
        this.history_tables[idx] = 1;
      },
      close_history: function () {

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
      showHistory: function () {
        if (this.history_str == "展开") {
          $(".history-close").slideDown();
          $(".history-list").eq(this.history_flag).slideDown();
          $(".history-table").slideDown();
          this.history_tables = [0, 0, 0, 0, 0, 0, 0];
          this.history_tables[this.history_flag] = 1;
          this.history_str = "收起";
        }
        else {
          this.close_history();
        }

      },
      //获取开奖时间和下注封盘时间
      get_time:function () {
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
      count_down:function () {
        var that  = this;
        //封盘倒计时
        var timeId = setInterval(function(){
          if(that.end_time <= 0)
          {
            if(that.open_time <= 0 )
            {
              clearInterval(timeId);
              that.get_time();
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
      get_last:function(){
        this.$http.get(`${this.global.config.API}pk10/lastLty`).then(function(res){
            var data = res.data;
            this.open_codes = data.opencode;
            this.lastExpect = data.expect;
        });
      },
      //获取用户赔率
      get_odds:function(){
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

      bet_db:function(k,k2){
        this.bets.double_aspect[this.double_aspect[k]][k2] = this.fast_money;//改变下注金额
        this.bets.double_aspect[this.double_aspect[k]].reverse().reverse();//触发视图层改变
        let content = this.double_aspect[k] + '__' + this.double_aspect_a[k2];
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
      },
      bet_db2:function(v,k){
        this.bets.sum_half[k] = this.fast_money;//改变下注金额
        this.bets.sum_half.reverse().reverse();//触发视图层改变
        let content = 'sum_half__' + v;
        this.bet_content.push({content:content,money:this.fast_money});//添加到下注内容区
        console.log(this.bet_content);
      },
      clear_bet:function () {
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
              'ball_1_half':['1','','','','',''],
              'ball_2_half':['2','','','','',''],
              'ball_3_half':['3','','','','',''],
              'ball_4_half':['4','','','','',''],
              'ball_5_half':['5','','','','',''],
              'ball_6_half':['6','','','','','','','','','',],
              'ball_7_half':['7','','',''],
              'ball_8_half':['8','','',''],
              'ball_9_half':['9','','',''],
              'ball_10_half':['10','','',''],
            },
            sum_digit:['','','','','','','','','','','','','','','','',''],
            sum_half:['','','',''],
        };
        //更新视图层
        this.bets.single_ball.ball_1_digit.reverse().reverse();
      },


    },
    created: function () {
      //检测是否登录
      if (this.$store.state.isLogin || (window.sessionStorage.isLogin == "ok")) {
        this.global.log('欢迎回来~');
        //获取用户信息
        this.$http.get(config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.$store.state.username = data.username;//用户名
          this.$store.state.nickname = data.nickname;//昵称
          this.$store.state.cash_money = data.money.cash_money;//现金额度
          this.$store.state.credit_money = data.money.credit_money;//信用额度
        });

      }
      else {
        window.location.href = '#/login';
        return;
      }///没有登录跳转到登录页面

      //获取开奖时间和下注封盘时间
      this.get_time();
      //上期开奖结果
      this.get_last();

      //获取用户赔率
      this.get_odds();

    },
    mounted:function(){

    },
  }
</script>


<style scoped>
  @import '../assets/css/pk10.css';

  .first-ball-details {
    text-align: left;
    text-indent: 15px;
  }

  .first-ball-details > span {
    float: left;
  }
</style>
