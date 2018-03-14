<template>
  <div id="pcegg">
    <!-- 期数 时间 开奖号码 -->
    <div class="head">
      <img src="../assets/img/PCdandan.png" alt="">

      <div class="details">
        <div class="left">
          <p class="color-white">第{{last_expect}}期</p>
          <p class="color-white mt5">开奖号码</p>
        </div>
        <div class="balls">
          <span>{{open_codes[0]}}</span>
          <span class="bg-none">+</span>
          <span>{{open_codes[1]}}</span>
          <span class="bg-none">+</span>
          <span>{{open_codes[2]}}</span>
          <span class="bg-none">=</span>
          <span>{{open_codes[0] + open_codes[1] + open_codes[2]}}</span>
          <div class="clear"></div>
        </div>
        <div class="description">
          <p class="color-white">
            10分钟一期，每天09:50-01:54:30销售
          </p>
          <p class="color-white mt5">
            今天已售100期,还剩79期
          </p>
          <div class="pan">
            <label>盘类</label>
            <select name="" id="">
              <option value="">B</option>
            </select>
          </div>
        </div>

        <div class="left">
          <p class="color-white text-right">第{{this_expect}}期</p>
          <p class="color-white mt5 text-right" v-show="end_time > 0">距离封盘</p>
          <p class="color-white mt5 text-right" v-show="end_time <= 0">距离开盘</p>
        </div>

        <div class="count-down color-white">
          <span>{{mins}}</span>
          <b>分</b>
          <span>{{seconds}}</span>
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
          <a class="color-white active">
            PC蛋蛋
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
            <a @click="clear_bet()" class="pull-right chongtian">重填</a>
            <a @click="comfire_bet" class="pull-right tijiao">提交</a>
          </div>
          <div class="clear"></div>
        </div>


        <!-- 第一球 -->
        <div class="bet-chooses">
          <div class="bet-chooses-top">

            <div class="long-bet" style="height:auto;">
              <div class="first-ball-top">
                混合
              </div>
              <div v-for="(v,k) in odds.mixture" class="long-bet-content">
                <span>{{odds.mixture_str[k]}}</span>
                <span>{{v}}</span>
                <input type="text" v-if="odds.mixture_str[k] != '豹子'" v-model="bet_content.mixture[k]"
                       @click="choose_one(k,'mixture','ball_2')">
                <input type="text" v-if="odds.mixture_str[k] == '豹子'" v-model="bet_content.mixture[k]"
                       @click="choose_one(1,'mixture','ball_4')">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="long-bet" style="height:auto;">
              <div class="first-ball-top">
                波色
              </div>
              <div v-for="(v,k) in odds.color" class="long-bet-content">
                <span>{{odds.color_str[k]}}</span>
                <span>{{v}}</span>
                <input type="text" v-model="bet_content.color[k]" @click="choose_one(k,'color','ball_3')">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="long-bet special-code" style="height:auto;">
              <div class="first-ball-top">
                特码
              </div>
              <div v-for="(v,k) in odds.special" class="long-bet-content">
                <span class="hao0 ml10 mt5">{{k}}</span>
                <span>{{v}}</span>
                <input type="text" v-model="bet_content.special[k]" @click="choose_one(k,'special','ball_1')">
                <div class="clear"></div>
              </div>


              <div class="clear"></div>
            </div>


            <div class="clear"></div>
          </div>
        </div>


        <div class="bet-content-input mt5">
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
            <a @click="clear_bet()" class="pull-right chongtian">重填</a>
            <a @click="comfire_bet" class="pull-right tijiao">提交</a>
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
        <a @click="showType(0)" :class="history_tables[0]?'active':''">长龙-不出</a>
        <a @click="showType(1)" :class="history_tables[1]?'active':''">长龙-出</a>
        <a @click="showType(2)" :class="history_tables[2]?'active':''">历史开奖</a>
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
          <span>874933</span>
          <span class="code-ball">1</span>
          <span class="code-fh">+</span>
          <span class="code-ball">2</span>
          <span class="code-fh">+</span>
          <span class="code-ball">3</span>
          <span class="code-fh">=</span>
          <span class="code-ball">6</span>
        </div>
        <div class="history-balls">
          <span>874933</span>
          <span class="code-ball">1</span>
          <span class="code-fh">+</span>
          <span class="code-ball">2</span>
          <span class="code-fh">+</span>
          <span class="code-ball">3</span>
          <span class="code-fh">=</span>
          <span class="code-ball">6</span>
        </div>
        <div class="history-balls">
          <span>874933</span>
          <span class="code-ball">1</span>
          <span class="code-fh">+</span>
          <span class="code-ball">2</span>
          <span class="code-fh">+</span>
          <span class="code-ball">3</span>
          <span class="code-fh">=</span>
          <span class="code-ball">6</span>
        </div>
        <div class="history-balls">
          <span>874933</span>
          <span class="code-ball">1</span>
          <span class="code-fh">+</span>
          <span class="code-ball">2</span>
          <span class="code-fh">+</span>
          <span class="code-ball">3</span>
          <span class="code-fh">=</span>
          <span class="code-ball">6</span>
        </div>
        <div class="history-balls">
          <span>874933</span>
          <span class="code-ball">1</span>
          <span class="code-fh">+</span>
          <span class="code-ball">2</span>
          <span class="code-fh">+</span>
          <span class="code-ball">3</span>
          <span class="code-fh">=</span>
          <span class="code-ball">6</span>
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
  export default {
    name: "Pcegg",
    data() {
      var my_data =
        {
          showArray_cqssc: [1],
          history_tables: [1, 0, 0],
          history_flag: 0,
          history_str: "收起",
          last_expect:111111,
          this_expect:876845,
          open_codes:[0,1,2],
          end_time:60,
          open_time:60,
          sales_ : 0,
          unsaleNum:0,
          mins:'00',
          seconds:'00',
          fast_money: 10,//快速下注金额
          odds: //赔率
            {
              mixture: [],
              mixture_str: ['大', '小', '单', '双', '大单', '大双', '小单', '小双', '极大', '极小', '豹子'],
              color: [],
              color_str: ['红波', '绿波', '蓝波'],
              special: [],
            },
          bet_content:
            {
              mixture: ['', '', '', '', '', '', '', '', '', '', ''],
              color: ['', '', ''],
              special: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            },
          bets: [],
          dicrationaries:
            [   'ball_1__e1','ball_1__e2','ball_1__e3','ball_1__e4','ball_1__e5','ball_1__e6',
              'ball_1__e7','ball_1__e8','ball_1__e9','ball_1__e10','ball_1__e11','ball_1__e12',
              'ball_1__e13','ball_1__e14','ball_1__e15','ball_1__e16','ball_1__e17','ball_1__e18',
              'ball_1__e19','ball_1__e20','ball_1__e21','ball_1__e22','ball_1__e23',
              'ball_1__e24','ball_1__e25','ball_1__e26','ball_1__e27','ball_1__e28',

              'ball_2__e1','ball_2__e2','ball_2__e3','ball_2__e4','ball_2__e5','ball_2__e6',
              'ball_2__e7','ball_2__e8','ball_2__e9','ball_2__e10','ball_4__e1',

              'ball_3__e1','ball_3__e2','ball_3__e3',
            ],
          dicrationaries_2:
            [
              '特码-0','特码-1','特码-2','特码-3','特码-4','特码-5','特码-6','特码-7','特码-8','特码-9',
              '特码-10','特码-11','特码-12','特码-13','特码-14','特码-15','特码-16','特码-17','特码-18','特码-19',
              '特码-20','特码-21','特码-22','特码-23','特码-24','特码-25','特码-26','特码-27',

              '混合-大','混合-小','混合-单','混合-双','混合-大单','混合-大双','混合-小单','混合-小双','混合-极大','混合-极小','混合-豹子',

              '波色-红波','波色-绿波','波色-蓝波',
            ],

        };
      return my_data;
    },
    created: function () {
      if (window.sessionStorage.isLogin != "ok") {
        this.$router.push('login');
      }
    },
    methods:
      {
        showType: function (idx) {
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
        get_odds: function () {
          //获取两面盘的赔率
          this.$http.get(`${this.global.config.API}cake/odds`).then(function (response) {
            let data = response.data.data;
            let odds = data.odds;
            this.odds = {
              mixture: [],
              mixture_str: ['大', '小', '单', '双', '大单', '大双', '小单', '小双', '极大', '极小', '豹子'],
              color: [],
              color_str: ['红波', '绿波', '蓝波'],
              special: [],
            };
            for (let i = 0; i < 30; i++) {
              if (data.odds.ball_2['e' + i]) {
                this.odds.mixture.push(data.odds.ball_2['e' + i]);//混合的赔率
              }
              if (data.odds.ball_1['e' + i]) {
                this.odds.special.push(data.odds.ball_1['e' + i]);//特码的赔率
              }
              if (data.odds.ball_3['e' + i]) {
                this.odds.color.push(data.odds.ball_3['e' + i]);//波色的赔率
              }
            }
            this.odds.mixture.push(data.odds.ball_4['e1']);//混合的赔率添加豹子


          });


        },
        choose_one: function (k, str, str2) {

          if (str2 == 'ball_4') {
            var content = `ball_4__e1`;
            this.bet_content.mixture[10] = this.fast_money;//改变下注金额
            this.bet_content.mixture.reverse().reverse();//触发视图层改变
          }
          else {
            var content = str2 + "__e" + (k + 1);
            this.bet_content[str][k] = this.fast_money;//改变下注金额
            this.bet_content[str].reverse().reverse();//触发视图层改变
          }
          this.bets.push({content: content, money: this.fast_money});//添加到下注内容区
        },
        clear_bet: function () {
          //clear all bet action

          //recover bet money
          this.bet_content =
            {
              mixture: ['', '', '', '', '', '', '', '', '', '', ''],
              color: ['', '', ''],
              special: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            };
          //clear UI
          this.bet_content.mixture.reverse().reverse();

          //clear bets
          this.bets = [];
        },

        comfire_bet: function () {
          //当用户没有选择下注内容的时候要提示用户选择
          if (this.bets.length < 1) {
            alert('请选择下注内容后再提交');
            return 0;
          }
          //过滤掉相同的对象
          this.filter_same();
          let html = '';
          for (let i = 0; i < this.bets.length; i++) {
            var index = this.dicrationaries.indexOf(this.bets[i].content);
            html += this.dicrationaries_2[index] + '  @ ￥' + this.bets[i].money + '\n';
          }
          if (confirm(html)) {
            this.do_bet();

          }
          else {
            console.log('取消');
          }
        },
        /**
         * 过滤掉相同的数组
         */
        filter_same: function () {
          for (let i = 0; i < this.bets.length; i++) {
            let key = this.bets[i].content;
            var flag = false;
            for (let j = i + 1; j < this.bets.length; j++) {
              if (key == this.bets[j].content) {
                this.bets.splice(i, 1);
                flag = true;
                break;
              }
            }
            if (flag) {
              this.filter_same();
              break;
            }
          }
        },
        //post bet data
        do_bet:function () {
          this.$http.post(`${this.global.config.API}cake/order`,{bets:this.bets}).then(function(res){
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

        //get_open_code
        get_last_code:function(){
          let url = `${this.global.config.API}cake/lastLty`;
          this.$http.get(url).then(function(response){
            let data = response.data;
            this.open_codes = data.details.ball_0;
            this.last_expect = data.expect;

          });



        },
        get_time : function(){
          let url2 = `${this.global.config.API}cake/time`;
          this.$http.get(url2).then(function(response){
            let data = response.data;
            console.log(data);
            this.end_time = data.endtime;
            this.open_time = data.opentime;
            this.this_expect = data.expect;
            this.sales_ = data.saleNum;
            this.unsaleNum = data.unsaleNum;

          }).then(function(){
            this.count_down()
          });
        },
        count_down:function () {
          var that  = this;
          //封盘倒计时
          var timeId = setInterval(function(){
            if(that.end_time <= 0)
            {
              that.mins = '00';
              that.seconds = that.open_time;
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


      },
    created: function () {
      this.get_odds();

      this.get_last_code();

      this.get_time();
    },
    mounted: function () {

    },
  }
</script>


<style scoped>
  @import url('../assets/css/cakeno28.css');
</style>

