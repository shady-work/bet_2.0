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

        <!--选择下注内容-->
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
            <a  class="pull-right chongtian" @click="clear_bet">重填</a>
            <a @click="comfire_content" class="pull-right tijiao" >提交</a>
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
                <input type="text" class="innnn padding3" v-model="bet_content['ball_'+ (index+1) +'_half'][key]" @click="double_1(k,key)">
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
                <input type="text" v-model="bet_content.dragon_and_tiger[k]" @click="double_2(k)">
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
                <input type="text" class="innnn" v-model="bet_content.single_ball_1_5['ball_'+ (index+1) +'_digit'][key]"  @click="single_ball_1(index,key)">
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
                <input type="text" v-model="bet_content.single_ball_1_5['ball_'+ (k+1) +'_digit'][index]" @click="ball_1_5(k,index,'tm')" >
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
                <input type="text" v-model="bet_content['ball_'+ (k+1) +'_half'][index]" @click="ball_1_5(k,index,'lm')">
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
                <input type="text" v-model="bet_content.dragon_and_tiger[index]" @click="ball_1_5(k,index,'he')">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>


            <div v-for="(item,index) in odds.ball_3" :class="index=='front3'?'first-ball mt0':'first-ball'" style="width:29%;">
              <div v-for="(i,idx) in item" class="first-ball-details">
                <span>{{odds.ball_3_str[idx]}}</span>
                <span class="w68">{{i}}</span>
                <input type="text" v-model="bet_content.ball_3[index][idx]" @click="ball_1_5(index,idx,'qzhs')">
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


        <!--选择下注内容-->
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
            <a  class="pull-right chongtian" @click="clear_bet" >重填</a>
            <a  class="pull-right tijiao" @click="comfire_content" >提交</a>
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
      day = day < 10 ? ("0" + day) : day;
      let my_data =
      {
          showArray_cqssc: [1, 0, 0, 0, 0, 0, 0],
          mins:'00',
          seconds:'00',
          history_tables: [1, 0, 0],
          history_flag: 0,
          history_str: "收起",
          lastOpenCode: [1, 1, 1, 1, 1],          //最后一期开奖号码
          lastExpect: `${year}${month}${day}`,//今天日期
          thisExpect: 20180312000,//这期下注的期数
          sales_: 0,//今日已销售的期数
          fast_money:10,//快速下注初始值
          end_time:60,//倒计时
          open_time:60,//开奖时间
          //下注金额的集合
          bet_content:{
            ball_1_half:['','','',''],
            ball_2_half:['','','',''],
            ball_3_half:['','','',''],
            ball_4_half:['','','',''],
            ball_5_half:['','','',''],
            dragon_and_tiger:['','','','','','',''],
            single_ball_1_5:
            {
              ball_1_digit:['','','','','','','','','',''],
              ball_2_digit:['','','','','','','','','',''],
              ball_3_digit:['','','','','','','','','',''],
              ball_4_digit:['','','','','','','','','',''],
              ball_5_digit:['','','','','','','','','',''],
            },
            ball_3:
            {
              front3:['','','',''],
              medium3:['','','',''],
              end3:['','','',''],
            },
          },
          //赔率的集合
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
          bets:[],//下注内容的集合
          dicrationaries:[
            'ball_1_half__K','ball_1_half__L','ball_1_half__M','ball_1_half__N',
            'dragon_and_tiger__A','dragon_and_tiger__B','dragon_and_tiger__C','dragon_and_tiger__D','dragon_and_tiger__E','dragon_and_tiger__F','dragon_and_tiger__G',
            'ball_2_half__K','ball_2_half__L','ball_2_half__M','ball_2_half__N',
            'ball_3_half__K','ball_3_half__L','ball_3_half__M','ball_3_half__N',
            'ball_4_half__K','ball_4_half__L','ball_4_half__M','ball_4_half__N',
            'ball_5_half__K','ball_5_half__L','ball_5_half__M','ball_5_half__N',
            'ball_1_digit__A','ball_1_digit__B','ball_1_digit__C','ball_1_digit__D','ball_1_digit__E','ball_1_digit__F','ball_1_digit__G','ball_1_digit__H','ball_1_digit__I','ball_1_digit__J',
            'ball_2_digit__A','ball_2_digit__B','ball_2_digit__C','ball_2_digit__D','ball_2_digit__E','ball_2_digit__F','ball_2_digit__G','ball_2_digit__H','ball_2_digit__I','ball_2_digit__J',
            'ball_3_digit__A','ball_3_digit__B','ball_3_digit__C','ball_3_digit__D','ball_3_digit__E','ball_3_digit__F','ball_3_digit__G','ball_3_digit__H','ball_3_digit__I','ball_3_digit__J',
            'ball_4_digit__A','ball_4_digit__B','ball_4_digit__C','ball_4_digit__D','ball_4_digit__E','ball_4_digit__F','ball_4_digit__G','ball_4_digit__H','ball_4_digit__I','ball_4_digit__J',
            'ball_5_digit__A','ball_5_digit__B','ball_5_digit__C','ball_5_digit__D','ball_5_digit__E','ball_5_digit__F','ball_5_digit__G','ball_5_digit__H','ball_5_digit__I','ball_5_digit__J',
            'front3__A','front3__B','front3__C','front3__D','front3__E',
            'medium3__A','medium3__B','medium3__C','medium3__D','medium3__E',
            'end3__A','end3__B','end3__C','end3__D','end3__E',
          ],
          dicrationaries_2:[
            '第一球大','第一球小','第一球单','第一球双',
            '总和-单','总和-双','总和-大','总和-小','总和-龙','总和-虎','总和-和',
            '第二球大','第二球小','第二球单','第二球双',
            '第三球大','第三球小','第三球单','第三球双',
            '第四球大','第四球小','第四球单','第四球双',
            '第五球大','第五球小','第五球单','第五球双',
            '第一球-特码-0','第一球-特码-1','第一球-特码-2','第一球-特码-3','第一球-特码-4','第一球-特码-5','第一球-特码-6','第一球-特码-7','第一球-特码-8','第一球-特码-9',
            '第二球-特码-0','第二球-特码-1','第二球-特码-2','第二球-特码-3','第二球-特码-4','第二球-特码-5','第二球-特码-6','第二球-特码-7','第二球-特码-8','第二球-特码-9',
            '第三球-特码-0','第三球-特码-1','第三球-特码-2','第三球-特码-3','第三球-特码-4','第三球-特码-5','第三球-特码-6','第三球-特码-7','第三球-特码-8','第三球-特码-9',
            '第四球-特码-0','第四球-特码-1','第四球-特码-2','第四球-特码-3','第四球-特码-4','第四球-特码-5','第四球-特码-6','第四球-特码-7','第四球-特码-8','第四球-特码-9',
            '第五球-特码-0','第五球-特码-1','第五球-特码-2','第五球-特码-3','第五球-特码-4','第五球-特码-5','第五球-特码-6','第五球-特码-7','第五球-特码-8','第五球-特码-9',
            '前三-豹子','前三-顺子','前三-对子','前三-半顺','前三-杂六',
            '中三-豹子','中三-顺子','中三-对子','中三-半顺','中三-杂六',
            '后三-豹子','后三-顺子','后三-对子','后三-半顺','后三-杂六',
          ],
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
          //清空数据
          this.bets = [];
          //重置ui  每个tab就可以下注当前的，不可以两个tab同时下
          this.bet_content =
          {
              ball_1_half:['','','',''],
              ball_2_half:['','','',''],
              ball_3_half:['','','',''],
              ball_4_half:['','','',''],
              ball_5_half:['','','',''],
              dragon_and_tiger:['','','','','','',''],
              single_ball_1_5:
                {
                  ball_1_digit:['','','','','','','','','',''],
                  ball_2_digit:['','','','','','','','','',''],
                  ball_3_digit:['','','','','','','','','',''],
                  ball_4_digit:['','','','','','','','','',''],
                  ball_5_digit:['','','','','','','','','',''],
                },
              ball_3:
                {
                  front3:['','','',''],
                  medium3:['','','',''],
                  end3:['','','',''],
                },
          };
          //更新视图层
          this.bet_content.ball_1_half.reverse().reverse();
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
          this.lastExpect = `${data.expect}`;
          });
        },
        /**
         * 获取赔率
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

          });

        },
        /**
         * 确认下注
         */
        comfire_content:function()
        {
            //当用户没有选择下注内容的时候要提示用户选择
            if(this.bets.length < 1){
              alert('请选择下注内容后再提交');
              return 0;
            }
            //过滤掉相同的对象
            this.filter_same();
            let html = '';
            for(let i = 0; i<this.bets.length;i++){
               var index = this.dicrationaries.indexOf(this.bets[i].content);
               html += this.dicrationaries_2[index] +  '  @ ￥' +  this.bets[i].money  +   '\n';
            }
            if(confirm(html)){
              this.do_bet();

            }
            else {
              console.log('取消');
            }

        },
        //两面盘下注方法1
        double_1:function(key,index)
        {
            let keys = ['K','L','M','N'];//组织数组
            this.bet_content[key][index] = this.fast_money;//改变下注金额
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[index],money:this.fast_money});//添加到下注内容区

        },
        //两面盘下注方法2
        double_2:function (index) {
          let keys = ['A','B','C','D','E','F','G'];//组织数组
          let key  = 'dragon_and_tiger';//组织数组
          this.bet_content[key][index] = this.fast_money;//改变下注金额
          this.bet_content[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + keys[index],money:this.fast_money});//添加到下注内容区

        },
        //单球的下注
        single_ball_1:function (k,index) {

          let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
          let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
          let key  = keys[k];//组织数组
          this.bet_content.single_ball_1_5[key][index] = this.fast_money;//改变下注金额
          this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + Alphabet[index],money:this.fast_money});//添加到下注内容区

        },

        //1-5球的下注
        ball_1_5:function (k,i,type) {
            if(type == 'tm')
            {
              let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
              let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
              let key  = keys[k];//组织数组
              this.bet_content.single_ball_1_5[key][i] = this.fast_money;//改变下注金额
              this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
              this.bets.push({content:key + '__' + Alphabet[i],money:this.fast_money});//添加到下注内容区
            }
            else if (type == 'lm')
            {
              let arr = ['ball_1_half','ball_2_half','ball_3_half','ball_4_half','ball_5_half'];//组织数组
              let keys = ['K','L','M','N'];//组织数组
              let key = arr[k];
              this.bet_content[key][i] = this.fast_money;//改变下注金额
              this.bet_content[key].reverse().reverse();//触发视图层改变
              this.bets.push({content:key + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }
            else if(type == 'he')
            {
              let keys = ['A','B','C','D','E','F','G'];//组织数组
              let key  = 'dragon_and_tiger';//组织数组
              this.bet_content[key][i] = this.fast_money;//改变下注金额
              this.bet_content[key].reverse().reverse();//触发视图层改变
              this.bets.push({content:key + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }
            else if(type == 'qzhs')
            {
              let keys = ['A','B','C','D','E'];
              this.bet_content.ball_3[k][i] = this.fast_money;//改变下注金额
              this.bet_content.ball_3[k].reverse().reverse();//触发视图层改变
              this.bets.push({content:k + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }
            else
            {
              alert('????');
            }
        },
        /**
         * 清除下注内容{清空数据,重置ui}
         */
        clear_bet:function () {
          //清空数据
          this.bets = [];
          //重置ui
          this.bet_content =
          {
            ball_1_half:['','','',''],
              ball_2_half:['','','',''],
              ball_3_half:['','','',''],
              ball_4_half:['','','',''],
              ball_5_half:['','','',''],
              dragon_and_tiger:['','','','','','',''],
              single_ball_1_5:
              {
                ball_1_digit:['','','','','','','','','',''],
                ball_2_digit:['','','','','','','','','',''],
                ball_3_digit:['','','','','','','','','',''],
                ball_4_digit:['','','','','','','','','',''],
                ball_5_digit:['','','','','','','','','',''],
              },
              ball_3:
              {
                front3:['','','',''],
                  medium3:['','','',''],
                end3:['','','',''],
              },
          };
          //更新视图层
          this.bet_content.ball_1_half.reverse().reverse();

        },

        /**
         * 过滤掉相同的数组
         */
        filter_same:function () {
             for(let i = 0; i < this.bets.length;i++)
             {
                let key =  this.bets[i].content;
                var flag = false;
                for(let j = i+1;j<this.bets.length;j++)
                {
                    if(key == this.bets[j].content)
                    {
                        this.bets.splice(i,1);
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
         *提交下注！！！
         */
        do_bet:function () {
           this.$http.post(`${this.global.config.API}ssc/order`,{bets:this.bets}).then(function(res){
              if(res.data.status == 200)
              {
                 //清除下注内容
                 this.clear_bet();
                 //从服务器上获取余额
                this.$http.get(config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
                {
                  let  data = response.data.data.user;
                  this.$set(this.$store.state,'cash_money',data.money.cash_money)
                });
                 alert(res.data.msg);
              }
              else
              {
                alert(res.data.msg);
              }

           });
        },
        /**
         * 获取重庆时时彩的时间和期数
         */
        get_time:function () {
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
        /**
         * 倒计时
         */
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

      //获取最新的开奖号码
      this.get_last_code();
      //获取用户的赔率
      this.get_odds();

      //获取重庆时时彩的时间和期数
      this.get_time();

    },

    mounted: function () {
      //在created之后创建的构子
      var that = this;
      //获取赔率、最新开奖结果的倒计时 5s一次
      setInterval(function(){
        that.get_odds();
        that.get_last_code();
      },5000)

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
