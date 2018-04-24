<template>
  <div id="cqssc">
    <!-- 期数 时间 开奖号码 -->
    <div class="head">
      <div class="details">
        <img src="../assets/img/icon_ssc.png" class="logo-tubiao" alt="">
        <div class="left">
          <p class="color-white"> 最新开奖：第{{lastExpect}}期,每日120期，今日剩余{{120-sales_+7}}期</p>
            <div class="balls">
                <span v-for="v in lastOpenCode">{{v}}</span>
                <div class="clear"></div>
            </div>
        </div>
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
          <div class="pan">
            <label>盘口</label>
            <select v-model="which_handicap">
              <option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">{{return_upper(v.ratewin_name)}}</option>
            </select>
          </div>
          <div class="fast-bet">
            快速下注金额
            <input type="text" class="fast-bet-input" v-model="fast_money">
          </div>
          <div class="bet-btns">
            <a @click="setBetMoney(10)">10</a>     <a @click="setBetMoney(50)">50</a>            <a @click="setBetMoney(100)">100</a>            <a @click="setBetMoney(200)">200</a>            <a @click="setBetMoney(500)">500</a>            <a @click="setBetMoney(1000)">1000</a>
            <a  class="pull-right chongtian" @click="clear_bet">重填</a>
            <a @click="comfire_content" :plain="true" class="pull-right tijiao" >提交</a>
            <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span>
          </div>
          <div class="clear"></div>
        </div>

        <!-- 两面 -->
        <div class="bet-chooses" v-show="showArray_cqssc[0]">
          <div class="bet-chooses-top">
            <div v-for="(v,k,index) in  odds.double_aspect"  :class="index==0?'first-ball mt0':'first-ball'">
              <div v-for="(val,key,ind) in v" class="first-ball-details text-0">
                <span class="he22 padding3">{{odds.ball_5_half_str[key]}}</span>
                <span class="he22 padding3 color-red f700" >{{val}}</span>
                <input type="text" class="innnn padding3" v-model="bet_content['ball_'+ (index+1) +'_half'][key]" @click="double_1(k,key)"  @change="double_1_change(k,key)" style="padding:1px;">
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
                <span class="color-red f700">{{v}}</span>
                <input type="text" v-model="bet_content.dragon_and_tiger[k]" @click="double_2(k)" @change="double_2_change(k)">
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
                <span class="he22 color-red f700" style="text-indent:5px;">{{val}}</span>
                <input type="text" class="innnn" v-model="bet_content.single_ball_1_5['ball_'+ (index+1) +'_digit'][key]"  @click="single_ball_1(index,key)"  @change="single_ball_1_change(index,key)" style="margin-left:5px;margin-top:2px;">
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
            <div class="long-bet" style="height:120px;">
              <div class="first-ball-top">
                {{v}}
              </div>
              <div v-for="(item,index) in odds.single_ball_1_5['ball_'+(k+1)+'_digit']" class="long-bet-content">
                <span class="hao0 ml10 mt5">{{index}}</span>
                <span class="he22 color-red f700" style="text-indent:5px;margin-top:5px;margin-left:5px;">{{item}}</span>
                <input type="text" v-model="bet_content.single_ball_1_5['ball_'+ (k+1) +'_digit'][index]" @click="ball_1_5(k,index,'tm')"    @change="ball_1_5_change(k,index,'tm')" style="margin-top:5px;width:45px;height:17px;margin-left:5px;">
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
                <span class="he22 color-red f700" style="margin-top:5px;margin-left:-14px;">{{item}}</span>
                <input type="text" v-model="bet_content['ball_'+ (k+1) +'_half'][index]" @click="ball_1_5(k,index,'lm')"  @change="ball_1_5_change(k,index,'lm')" style="margin-top:5px;width:45px;heigth:16px;margin-left:11px;">
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
                <span class="he22 color-red f700" style="margin-top:5px;margin-left:-3px;">{{item}}</span>
                <input type="text" v-model="bet_content.dragon_and_tiger[index]" @click="ball_1_5(k,index,'he')" @change="ball_1_5_change(k,index,'he')" style="margin-top:5px;width:45px;heigth:16px;margin-left:11px;">
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>


            <div v-for="(item,index) in odds.ball_3" :class="index=='front3'?'first-ball mt0':'first-ball'" style="width:29%;">
              <div v-for="(i,idx) in item" class="first-ball-details">
                <span>{{odds.ball_3_str[idx]}}</span>
                <span class="he22 color-red f700">{{i}}</span>
                <input type="text" v-model="bet_content.ball_3[index][idx]" @click="ball_1_5(index,idx,'qzhs')" @change="ball_1_5_change(index,idx,'qzhs')">
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
          <div class="pan">
            <label>盘口</label>
            <select v-model="which_handicap">
              <option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">{{return_upper(v.ratewin_name)}}</option>
            </select>
          </div>
          <div class="fast-bet">
            快速下注金额
            <input type="text" class="fast-bet-input" v-model="fast_money">
          </div>
          <div class="bet-btns">
            <a @click="setBetMoney(10)">10</a>     <a @click="setBetMoney(50)">50</a>            <a @click="setBetMoney(100)">100</a>            <a @click="setBetMoney(200)">200</a>            <a @click="setBetMoney(500)">500</a>            <a @click="setBetMoney(1000)">1000</a>
            <a  class="pull-right chongtian" @click="clear_bet" >重填</a>
            <a  class="pull-right tijiao" @click="comfire_content" >提交</a>
            <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span>
          </div>
          <div class="clear"></div>
        </div>

      </form>
    </div>

    <!-- 右边的历史记录 -->
    <div id="history">
      <div class="history-header" @click="showHistory">
        长龙排行 <span class="pull-right pointer" >{{history_str}}</span>
      </div>
      <div class="history-table">
        <a @click="showTables(0)" :class="history_tables[0]?'active':''">长龙-不出</a>
        <a @click="showTables(1)" :class="history_tables[1]?'active':''">长龙-出</a>
        <a @click="showTables(2)" :class="history_tables[2]?'active':''">历史开奖</a>
      </div>

      <div class="history-list" v-show="history_tables[0]">

      </div>

      <div class="history-list" v-show="history_tables[1]">

      </div>

      <div class="history-list" v-show="history_tables[2]">
        <div v-for="(v,k) in history_expects" class="history-balls">
          <span>{{v}}</span>
          <span v-for="(val,key) in history_codes[k]" class="code-ball">{{val}}</span>
        </div>
      </div>
      <div class="history-close ">
        <a @click="close_history()" class="pointer">
          关闭
        </a>
      </div>
    </div>



    <!--下注提示框-->
    <el-dialog
      title="确认下注"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div v-html="bet_html" @click="delete_it($event)" ></div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="do_bet()">确 定</el-button>
      </span>
    </el-dialog>





  </div>
</template>


<script>

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
          centerDialogVisible:false,
          bet_html:'',
          showArray_cqssc: [1, 0, 0, 0, 0, 0, 0],
          mins:'00',
          seconds:'00',
          history_tables: [0, 0, 1],
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
             dragon_and_tiger_str:["总和大","总和小","总和单","总和双","龙","虎","和"],
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
            'front_3__A','front_3__B','front_3__C','front_3__D','front_3__E',
            'medium_3__A','medium_3__B','medium_3__C','medium_3__D','medium_3__E',
            'end_3__A','end_3__B','end_3__C','end_3__D','end_3__E',
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

          curPage:1,//当前页面
          hasNext:true,//是否有下一页
          hasPrev:false,//是否有上一页
          history_list:[],//开奖列表
          nextPageUrl:'',//下页的url
          prevPageUrl:'',//上页的url
          history_codes:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],],//开奖号码的集合
          history_expects:[],//开奖期数的集合

          //更新odds和开奖数据，未结算数据的定时器
          timeId:0,
          timeId2:5,
          timeId3:10,

          //查看用户可选的盘口
          handicaps:[],
          //当前是哪个盘口
          which_handicap:'',


          vaild_lotteries:[],//  用户拥有哪些彩种
          fanshui:'',
          orderData:[],//未结算数据
          tips:'距离本期封盘还有',

      };
      return my_data;
    },
    methods:
    {
        /**
         * 选择玩法
         * @param idx
         */
        showType: function (idx)
        {
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
        showTables: function (idx)
        {
          this.history_tables = [0, 0, 0, 0, 0, 0, 0];
          this.history_tables[idx] = 1;
        },
        /**
         * close history tab
         */
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
        /**
         * show history_tab
         */
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
          else {
            this.close_history();
          }
        },

        /**
         * 获取最新一期的开奖数据
         */
        get_last_code: function ()
        {
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
        get_odds:function(which_handicap = null){
          //获取两面盘的赔率
          if(which_handicap || this.which_handicap)
          {
            this.$http.get(`${this.global.config.API}ssc/odds/6?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(response)
            {
              if(response.data.status == 403) return false;
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
            this.$http.get(`${this.global.config.API}ssc/odds/7?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(response)
            {
              if(response.data.status == 403) return false;
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
            this.$http.get(`${this.global.config.API}ssc/odds/1?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(response)
            {
              if(response.data.status == 403) return false;
              let Alphabet = ['A','B','C','D','E'];
              for(let i=0;i<this.odds.ball_3.front3.length;i++){
                this.odds.ball_3.front3[i] = response.data.data.odds.front_3[Alphabet[i]];
                this.odds.ball_3.medium3[i] = response.data.data.odds.medium_3[Alphabet[i]];
                this.odds.ball_3.end3[i] = response.data.data.odds.end_3[Alphabet[i]];
              }

            });
          }
          else
          {
            this.$http.get(`${this.global.config.API}ssc/odds/6`).then(function(response){
              if(response.data.status == 403) return false;
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
              if(response.data.status == 403) return false;
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
              if(response.data.status == 403) return false;
              let Alphabet = ['A','B','C','D','E'];
              for(let i=0;i<this.odds.ball_3.front3.length;i++){
                this.odds.ball_3.front3[i] = response.data.data.odds.front_3[Alphabet[i]];
                this.odds.ball_3.medium3[i] = response.data.data.odds.medium_3[Alphabet[i]];
                this.odds.ball_3.end3[i] = response.data.data.odds.end_3[Alphabet[i]];
              }

            });
          }


        },
        /**
         * 确认下注
         */
        comfire_content:function()
        {

            //过滤掉相同的对象
            this.filter_same();
            //当用户没有选择下注内容的时候要提示用户选择
            if(this.bets.length < 1)
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
            let sumMoney = 0;
            let html = '';
            for(let i = 0; i<this.bets.length;i++){
               var index = this.dicrationaries.indexOf(this.bets[i].content);
               html += "<div style='text-indent:15px;margin-top: 5px;'>"  + this.dicrationaries_2[index] +  '  @ ￥' +  this.bets[i].money
               + '<button style="float:right;margin-right:12px;color:#fff;background:#f56c6c;border: 1px solid #dcdfe6;padding:3px;" class=' + this.bets[i].content +'>删除</button></div>';
              sumMoney += parseInt(this.bets[i].money);
            }
            html += "<div style='text-align:center;' id='sum'>"  + '共' + this.bets.length + '条,' + sumMoney + "￥" +   '</div>';
            this.centerDialogVisible = true;
            this.bet_html = html;
            return;


        },
      //删除某个下注选择
        delete_it(event)
        {

          if(event.target.innerHTML == '删除')
          {
            //删除这个下注项
            for(let i = 0 ; i<this.bets.length;i++)
            {
               if(this.bets[i].content == event.target.className)
               {
                 this.bets.splice(i, 1);
               }
            }

            //移除这个html元素
            let line = event.target.parentNode;
            let bigDaddy = line.parentNode;
            bigDaddy.removeChild(line);

            //重写统计
            let len = this.bets.length;//几条
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
              totalMoney += this.bets[i].money;
            }
            document.getElementById('sum').innerHTML = `共${len}条,${totalMoney}￥`;
          }
        },
        //两面盘下注方法1
        double_1:function(key,index)
        {
            if(this.bet_content[key][index] != "")
            {
                return false;
            }
            let keys = ['K','L','M','N'];//组织数组
            this.bet_content[key][index] = this.fast_money;//改变下注金额
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[index],money:this.fast_money});//添加到下注内容区
        },
        //两面盘下注方法1 在用户更改下注金钱时触发的函数
        double_1_change(key,index)
        {
            let keys = ['K','L','M','N'];//组织数组
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[index],money:this.bet_content[key][index]});//添加到下注内容区
        },

        //两面盘下注方法2
        double_2:function (index) {
          let keys = ['A','B','C','D','E','F','G'];//组织数组
          let key  = 'dragon_and_tiger';//组织数组
          if(this.bet_content[key][index] != "")
          {
            return false;
          }
          this.bet_content[key][index] = this.fast_money;//改变下注金额
          this.bet_content[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + keys[index],money:this.fast_money});//添加到下注内容区

        },
        //两面盘下注方法2 在用户更改下注金钱时触发的函数
        double_2_change:function (index) {

            let keys = ['A','B','C','D','E','F','G'];//组织数组
            let key  = 'dragon_and_tiger';//组织数组
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[index],money:this.bet_content[key][index]});//添加到下注内容区

        },
        //单球的下注
        single_ball_1:function (k,index) {

          let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
          let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
          let key  = keys[k];//组织数组
          if(this.bet_content.single_ball_1_5[key][index] != "")
          {
            return false;
          }
          this.bet_content.single_ball_1_5[key][index] = this.fast_money;//改变下注金额
          this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + Alphabet[index],money:this.fast_money});//添加到下注内容区

        },
        //单球的下注 在用户改变下注金额的时候触发的函数
        single_ball_1_change(k,index)
        {
            let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
            let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
            let key  = keys[k];//组织数组
            this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + Alphabet[index],money: this.bet_content.single_ball_1_5[key][index]});//添加到下注内容区
        },


        //1-5球的下注
        ball_1_5:function (k,i,type) {
            if(type == 'tm')
            {
              let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
              let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
              let key  = keys[k];//组织数组
              if(this.bet_content.single_ball_1_5[key][i] != "")
              {
                    return false;
              }
              this.bet_content.single_ball_1_5[key][i] = this.fast_money;//改变下注金额
              this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
              this.bets.push({content:key + '__' + Alphabet[i],money:this.fast_money});//添加到下注内容区
            }
            else if (type == 'lm')
            {
              let arr = ['ball_1_half','ball_2_half','ball_3_half','ball_4_half','ball_5_half'];//组织数组
              let keys = ['K','L','M','N'];//组织数组
              let key = arr[k];
              if(this.bet_content[key][i] != "")
              {
                 return false;
              }
              this.bet_content[key][i] = this.fast_money;//改变下注金额
              this.bet_content[key].reverse().reverse();//触发视图层改变
              this.bets.push({content:key + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }
            else if(type == 'he')
            {
              let keys = ['A','B','C','D','E','F','G'];//组织数组
              let key  = 'dragon_and_tiger';//组织数组
              if(this.bet_content[key][i] != "")
              {
                    return false;
              }
              this.bet_content[key][i] = this.fast_money;//改变下注金额
              this.bet_content[key].reverse().reverse();//触发视图层改变
              this.bets.push({content:key + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }
            else if(type == 'qzhs')
            {
              let keys = ['A','B','C','D','E'];
              if(this.bet_content.ball_3[k][i] != "")
              {
                    return false;
              }
              this.bet_content.ball_3[k][i] = this.fast_money;//改变下注金额
              this.bet_content.ball_3[k].reverse().reverse();//触发视图层改变

              if(k=='front3')
              {
                this.bets.push({content:'front_3' + '__' + keys[i],money:this.fast_money});//添加到下注内容区
              }
              if(k=='medium3')
              {

                this.bets.push({content:'medium_3' + '__' + keys[i],money:this.fast_money});//添加到下注内容区
              }
              if(k=='end3')
              {
                this.bets.push({content:'end_3' + '__' + keys[i],money:this.fast_money});//添加到下注内容区
              }
              let x = {content:'medium_3' + '__' + keys[i],money:this.fast_money};


              return
            }
            else
            {
              alert('????');
            }
        },


        //1-5球的下注 在用户改变下注金额的时候触发的函数
        ball_1_5_change:function (k,i,type) {
            if(type == 'tm')
            {
                let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
                let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
                let key  = keys[k];//组织数组
                this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
                this.bets.push({content:key + '__' + Alphabet[i],money:this.bet_content.single_ball_1_5[key][i]});//添加到下注内容区
            }
            else if (type == 'lm')
            {
                let arr = ['ball_1_half','ball_2_half','ball_3_half','ball_4_half','ball_5_half'];//组织数组
                let keys = ['K','L','M','N'];//组织数组
                let key = arr[k];
                this.bet_content[key].reverse().reverse();//触发视图层改变
                this.bets.push({content:key + '__' + keys[i],money:this.bet_content[key][i]});//添加到下注内容区
            }
            else if(type == 'he')
            {
                let keys = ['A','B','C','D','E','F','G'];//组织数组
                let key  = 'dragon_and_tiger';//组织数组
                this.bet_content[key].reverse().reverse();//触发视图层改变
                this.bets.push({content:key + '__' + keys[i],money:this.bet_content[key][i]});//添加到下注内容区
            }
            else if(type == 'qzhs')
            {

//                console.log(this.bet_content.ball_3[k][i]);
                let keys = ['A','B','C','D','E'];
                if(k=='front3')
                {
                    this.bets.push({content:'front_3' + '__' + keys[i],money:this.bet_content.ball_3[k][i]});//添加到下注内容区
                }
                if(k=='medium3')
                {
                    this.bets.push({content:'medium_3' + '__' + keys[i],money:this.bet_content.ball_3[k][i]});//添加到下注内容区
                }
                if(k=='end3')
                {
                    this.bets.push({content:'end_3' + '__' + keys[i],money:this.bet_content.ball_3[k][i]});//添加到下注内容区
                }
                return
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
        filter_same:function ()
        {
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
                if(!this.bets[i].money)
                {
                    this.bets.splice(i,1);
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
         *提交下注！！！
         */
        do_bet:function ()
        {

           this.centerDialogVisible = false;
           this.$http.post(`${this.global.config.API}ssc/order`,{bets:this.bets,odds_table:this.which_handicap}).then(function(res){
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

                //提示下注成功
                this.$message(
                {
                  dangerouslyUseHTMLString: true,
                  message: res.data.msg,
                  center: true,
                  type: 'success'
                });
                //设置未结算清单
                this.get_ssc_unclear();
              }
              else
              {
                this.$message.error(res.data.msg);
              }

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
        /**
         * 倒计时
         */
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
                   that.get_ssc_unclear();
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
         * 获取历史开奖
         */
        get_history:function()
        {
            let url = `${this.global.config.API}ssc/history/lottery?per_page=10`;
            this.history_codes = [];
            this.$http.get(url).then(function(res){
              let data = res.data.data;
              this.curPage = data.curPage;
              this.hasNext = data.hasNext;
              this.hasPrev = data.hasPrev;
              this.history_list = data.list;
              for(let i = 0; i<this.history_list.length;i++)
              {
                   let expect = this.history_list[i].expect;
                   this.history_expects.push(expect);
                   let codes = this.history_list[i].opencode.split(',');
                   this.history_codes.push(codes);
              }
              this.history_codes.reverse().reverse();
            });
        },
        /**
         * 设置下注金额
         */
        setBetMoney:function(money)
        {
           this.fast_money = money;
        },

        /**
         * 查看用户可选盘口
         */
        get_users_handicaps:function()
        {
           this.$http.get(`${this.global.config.API}ssc/pans`)
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
          this.$http.get(`${this.global.config.API}ssc/history/clear/0`).then(function(res)
          {
            if(res.data.status == 403) return false;
            this.orderData = [];
            let data = res.data.data;
            let list  = data.list;
            for(let i = 0; i<list.length;i++)
            {
              if(list[i].status != -1) {
                let html = `${list[i].lty_name} ${list[i].expect}  <p>${list[i].mark_a}  ${list[i].mark_b} ￥${parseInt(list[i].money)}</p>`;
                this.orderData.push(html);
              }
            }
            //设置全局的未结算清单
            this.$set(this.$store.state,'unclear',this.orderData);
          });
        },
    },

    created: function ()
    {

      if(this.$store.state.isLogin)
      {
        //查看是否有cqssc这个彩种
        this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
          if(this.vaild_lotteries.indexOf('cqssc') != -1)
          {
            // 1 获取重庆时时彩的时间和期数
            this.get_time();
            // 2 获取最新的开奖号码
            this.get_last_code();
            // 3 获取用户拥有哪些盘口
            this.get_users_handicaps();
            // 4 获取用户的赔率
            this.get_odds();
            // 5 获取开奖历史
            this.get_history();
            // 6 获取未结算清单
            this.get_ssc_unclear();
          }
          else
          {
            this.$router.push('pk10');
          }

        });
      }

    },

    mounted: function ()
    {
      //在created之后创建的构子
      var that = this;

      //获取赔率、最新开奖结果的倒计时 5s一次
      this.timeId = setInterval(function()
      {
        that.get_odds();
        that.get_last_code();
      },10000);
      //获取未结算数据 45s一次
      this.timeId3 = setInterval(function()
      {
        that.get_ssc_unclear();
      },45000);



    },
    /**
     * 离开这个路由时触发的函数，摧毁定时器
     */
    destroyed()
    {
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
            that.get_last_code();
          },10000);
        }
      }
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
<style>
  .el-dialog--center .el-dialog__body
  {
    padding-bottom: 15px;
  }
</style>
