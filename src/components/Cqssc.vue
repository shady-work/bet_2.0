<template>
  <div id="cqssc">

    <!-- 期数 时间 开奖号码 -->
    <div class="head">
      <img src="../assets/img/navicons_13.png" alt="">

      <div class="details">
        <div class="left">
          <p class="color-white">第{{lastExpect}}期</p>
          <p class="color-white mt5">开奖号码</p>
        </div>
        <div class="balls">
          <span v-for="v in lastOpenCode">{{v}}</span>
          <div class="clear"></div>
        </div>
        <div class="description">
          <p class="color-white">
            10分钟一期，每天09:50-01:54:30销售
          </p>
          <p class="color-white mt5">
            今天已售{{sales_}}期,还剩{{120-sales_}}期
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
                        00
                    </span>
          <b>分</b>
          <span>
                        00
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
            单球1-5
            <span></span>
          </a>
          <a :class="showArray_cqssc[2]?'color-white active':'color-white'" @click="showType(2)">
            第一球
            <span></span>
          </a>
          <a :class="showArray_cqssc[3]?'color-white active':'color-white'" @click="showType(3)">
            第二球
            <span></span>
          </a>
          <a :class="showArray_cqssc[4]?'color-white active':'color-white'" @click="showType(4)">
            第三球
            <span></span>
          </a>
          <a :class="showArray_cqssc[5]?'color-white active':'color-white'" @click="showType(5)">
            第四球
            <span></span>
          </a>
          <a :class="showArray_cqssc[6]?'color-white active':'color-white'" @click="showType(6)">
            第五球
            <span></span>
          </a>
        </div>

        <div class="bet-content-input">
          <div class="fast-bet">
            快速下注金额
            <input type="text" class="fast-bet-input">
          </div>
          <div class="bet-btns">
            <a href="">50</a>
            <a href="">100</a>
            <a href="">200</a>
            <a href="">500</a>
            <a href="">1000</a>
            <a href="">设置快速金额</a>
            <a href="" class="pull-right chongtian">重填</a>
            <a href="" class="pull-right tijiao">提交</a>
          </div>
          <div class="clear"></div>
        </div>

        <!-- 两面 -->
        <div class="bet-chooses" v-show="showArray_cqssc[0]">
          <div class="bet-chooses-top">
            <div v-for="(v,k,index) in  odds.double_aspect"  :class="index==0?'first-ball mt0':'first-ball'">
              <div v-for="(val,key,ind) in v" class="first-ball-details text-0">
                <span class="he22 padding3">
                      {{odds.ball_5_half_str[key]}}
                </span>
                <span class="he22 padding3">
                    {{val}}
                </span>
                <input type="text" class="innnn padding3">
                <div class="clear"></div>
              </div>
              <div class="first-ball-top">
                {{odds.single_ball_1_5_str[index]}}
              </div>
            </div>
            <div class="clear"></div>

            <div class="long-bet">
              <div class="first-ball-top">
                总和、龙虎
              </div>

              <div v-for="(v,k) in odds.dragon_and_tiger" class="long-bet-content">
                <span>{{odds.dragon_and_tiger_str[k]}}</span>
                <span>{{v}}</span>
                <input type="text">
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 单球1-5 -->
        <div class="bet-chooses" v-show="showArray_cqssc[1]">
          <div class="bet-chooses-top">

            <div v-for="(v,k,index) in odds.single_ball_1_5" :class="index==0?'first-ball mt0':'first-ball'">
              <div v-for="(val,key,idx) in v" class="first-ball-details text-9">
                <span class="hao0">{{key}}</span>
                <span class="he22">
                     {{val}}
                 </span>
                <input type="text" class="innnn">
                <div class="clear"></div>
              </div>
              <div class="first-ball-top">
                 {{odds.single_ball_1_5_str[index]}}
              </div>
            </div>

            <div class="clear"></div>
          </div>
        </div>


        <!-- 第一球 -->
        <div v-for="(v,k) in odds.single_ball_1_5_str"  class="bet-chooses" v-show="showArray_cqssc[(k+2)]">
          <div class="bet-chooses-top">
            <!--第一球特码-->
            <div class="long-bet" style="height:auto;">
              <div class="first-ball-top">
                {{v}}
              </div>
              <div v-for="(item,index) in odds.single_ball_1_5['ball_'+(k+1)+'_digit']" class="long-bet-content">
                <span class="hao0 ml10 mt5">{{index}}</span>
                <span>{{item}}</span>
                <input type="text">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>
            <!--大小单双-->
            <div   class="long-bet" style="height:auto;">
              <div class="first-ball-top">
                {{v}}
              </div>
              <div v-for="(item,index) in odds.double_aspect['ball_'+(k+1)+'_half']" class="long-bet-content">
                <span>{{odds.ball_5_half_str[index]}}</span>
                <span>{{item}}</span>
                <input type="text">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>

            <div class="long-bet" style="height:auto;">
              <div class="first-ball-top">
                总和、龙虎
              </div>
              <div v-for="(item,index) in odds.dragon_and_tiger" class="long-bet-content">
                <span>{{odds.dragon_and_tiger_str[index]}}</span>
                <span>{{item}}</span>
                <input type="text">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>


            <div v-for="(item,index) in odds.ball_3" :class="index=='front3'?'first-ball mt0':'first-ball'" style="width:29%;">
              <div v-for="(i,idx) in item" class="first-ball-details">
                <span>{{odds.ball_3_str[idx]}}</span>
                <span class="w68">{{i}}</span>
                <input type="text">
                <div class="clear"></div>
              </div>


              <div class="first-ball-top" v-if="index=='front3'">
                前三
              </div>
              <div class="first-ball-top" v-if="index=='medium3'">
                 中三
              </div>
              <div class="first-ball-top" v-if="index=='end3'">
                后三
              </div>
            </div>

            <div class="clear"></div>
          </div>
        </div>



        <div class="bet-content-input mt5">
          <div class="fast-bet">
            快速下注金额
            <input type="text" class="fast-bet-input">
          </div>
          <div class="bet-btns">
            <a href="">50</a>
            <a href="">100</a>
            <a href="">200</a>
            <a href="">500</a>
            <a href="">1000</a>
            <a href="">设置快速金额</a>
            <a href="" class="pull-right chongtian">重填</a>
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
          <span>874933</span>
          <span class="code-ball">1</span>
          <span class="code-ball">2</span>
          <span class="code-ball">3</span>
          <span class="code-ball">4</span>
          <span class="code-ball">5</span>
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
    name: "Cqssc",
    data() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      month = month < 10 ? ("0" + month) : month;
      let day = time.getDate();
      day = month < 10 ? ("0" + day) : day;
      let my_data =
      {
          showArray_cqssc: [0, 0, 1, 0, 0, 0, 0],
          history_tables: [1, 0, 0],
          history_flag: 0,
          history_str: "收起",
          lastOpenCode: [1, 1, 1, 1, 1],          //最后一期开奖号码
          lastExpect: `${year}${month}${day}`,//今天日期
          thisExpect: 20180808,//这期下注的期数
          sales_: 0,//今日已销售的期数
          odds:
          {
             double_aspect:
             {
               ball_1_half    :[1.9430,1.9430,1.9430,1.9430],
               ball_2_half    :[1.9430,1.9430,1.9430,1.9430],
               ball_3_half    :[1.9430,1.9430,1.9430,1.9430],
               ball_4_half    :[1.9430,1.9430,1.9430,1.9430],
               ball_5_half    :[1.9430,1.9430,1.9430,1.9430],
             },
             ball_5_half_str:["大","小","单","双"],
             dragon_and_tiger:[1.9000,1.9000,1.9000,1.9000,1.9000,1.9000,1.9000],
             dragon_and_tiger_str:["总和单","总和双","总和大","总和小","龙","虎","和"],
             single_ball_1_5:
             {
               ball_1_digit:[1,1,1,1,1,1,1,1,1,1],
               ball_2_digit:[1,1,1,1,1,1,1,1,1,1],
               ball_3_digit:[1,1,1,1,1,1,1,1,1,1],
               ball_4_digit:[1,1,1,1,1,1,1,1,1,1],
               ball_5_digit:[1,1,1,1,1,1,1,1,1,1],
             },
             single_ball_1_5_str:['第一球','第二球','第三球','第四球','第五球'],
             ball_3:
             {
               front3:[1,2,3,4,5],
               medium3:[1,2,3,4,5],
               end3:[1,2,3,4,5],
             },
             ball_3_str:['豹子','顺子','顺子','半顺','杂六']
          },
      };
      return my_data;
    },
    methods:
      {
        /**
         * 选择玩法
         * @param idx
         */
        showType: function (idx) {
          this.showArray_cqssc = [0, 0, 0, 0, 0, 0, 0];
          this.showArray_cqssc[idx] = 1;
        },
        /**
         * 历史开奖的tab
         * @param idx
         */
        showTables: function (idx) {
          this.history_tables = [0, 0, 0, 0, 0, 0, 0];
          this.history_tables[idx] = 1;
        },
        /**
         * close history tab
         */
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
        /**
         * show history_tab
         */
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

        /**
         * 获取最新一期的开奖数据
         */
        get_last_code: function () {
          this.$http.get(this.global.config.API + 'ssc/lastLty', {}).then(function (res) {
          //获取到最新一期的数据
          let data = res.data;
          this.lastOpenCode = data.opencode;
          this.lastExpect = `${this.lastExpect}${data.id}`;
          this.thisExpect = data.expect;
          this.sales_ = data.id;
          });
        },
        /**
         * 获取两面盘赔率
         */
        get_odds:function(){
          //获取两面盘的赔率
          this.$http.get(`${this.global.config.API}ssc/odds/6`).then(function(response){
             let data = response.data.data;
             let odds = data.odds;
             let bet_area = Object.keys(odds);//["ball_1_half", "ball_2_half", "ball_3_half", "ball_4_half", "ball_5_half", "dragon_and_tiger"]
             let Alphabet = ['K','L','M','N'];
             for(let i = 0;i<this.odds.double_aspect.ball_1_half.length;i++) {
               this.odds.double_aspect.ball_1_half[i] = data.odds.ball_1_half[Alphabet[i]];
               this.odds.double_aspect.ball_2_half[i] = data.odds.ball_2_half[Alphabet[i]];
               this.odds.double_aspect.ball_3_half[i] = data.odds.ball_3_half[Alphabet[i]];
               this.odds.double_aspect.ball_4_half[i] = data.odds.ball_4_half[Alphabet[i]];
               this.odds.double_aspect.ball_5_half[i] = data.odds.ball_5_half[Alphabet[i]];
             }
             //由于直接给vue的data赋值，不会触发视图层更新，所以使用reverser来更新视图层
             this.odds.double_aspect.ball_1_half.reverse().reverse();
             Alphabet = ['A','B','C','D','E','F','G'];
             for(let i = 0;i<this.odds.dragon_and_tiger.length;i++) {
                this.odds.dragon_and_tiger[i] = data.odds.dragon_and_tiger[Alphabet[i]];
             }
          });

          //获取单球1-5的赔率
          this.$http.get(`${this.global.config.API}ssc/odds/7`).then(function(response) {
            let data = response.data.data.odds;
            let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];
            for(let i=0;i<Alphabet.length;i++) {
              this.odds.single_ball_1_5.ball_1_digit[i] = data.ball_1_digit[Alphabet[i]];
              this.odds.single_ball_1_5.ball_2_digit[i] = data.ball_2_digit[Alphabet[i]];
              this.odds.single_ball_1_5.ball_3_digit[i] = data.ball_3_digit[Alphabet[i]];
              this.odds.single_ball_1_5.ball_4_digit[i] = data.ball_4_digit[Alphabet[i]];
              this.odds.single_ball_1_5.ball_5_digit[i] = data.ball_5_digit[Alphabet[i]];
            }
            this.odds.single_ball_1_5.ball_1_digit.reverse().reverse();
          });

          //获取第一球的赔率
          this.$http.get(`${this.global.config.API}ssc/odds/1`).then(function(response){
              let Alphabet = ['A','B','C','D','E'];
              for(let i=0;i<this.odds.ball_3.front3.length;i++){
                this.odds.ball_3.front3[i] = response.data.data.odds.front_3[Alphabet[i]];
                this.odds.ball_3.medium3[i] = response.data.data.odds.medium_3[Alphabet[i]];
                this.odds.ball_3.end3[i] = response.data.data.odds.end_3[Alphabet[i]];
              }
              console.log(this.odds.ball_3);
          });


        },



      },
    created: function () {
      //检测是否登录
      if (this.$store.state.isLogin || (window.sessionStorage.isLogin == "ok")) {
        this.global.log('欢迎回来~');
      }
      else {
        window.location.href = '#/login';
      }//没有登录跳转到登录页面

      //获取最新的开奖号码
      this.get_last_code();
      //获取用户的赔率
      this.get_odds();

    },
    mounted: function () {
      //在created之后创建的构子

    }
  }
</script>


<style scoped>
  @import '../assets/css/cqssc.css';

  .first-ball-details {
    text-align: left;
    text-indent: 15px;
  }

  .first-ball-details > span {
    float: left;
  }
</style>
