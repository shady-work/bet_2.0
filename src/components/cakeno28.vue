<template>
  <div id="pcegg">
    <!-- 期数 时间 开奖号码 -->
    <div class="head">
      <div class="details">
        <img src="../assets/img/icon_jnd28.png" class="logo-tubiao" alt="">
        <div class="left">
          <p class="color-white"> 最新开奖：第{{last_expect}}期,每日179期，今日剩余{{179-sales_+8}}期</p>
          <div class="balls">
            <span class="color-white" :class="returnColor(open_codes[0])">{{open_codes[0]}}</span>
            <span class="bg-none color-white">+</span>
            <span class="color-white" :class="returnColor(open_codes[1])">{{open_codes[1]}}</span>
            <span class="bg-none color-white">+</span>
            <span  class="color-white" :class="returnColor(open_codes[2])">{{open_codes[2]}}</span>
            <span class="bg-none color-white">=</span>
            <span class="color-white" :class="returnColor(open_codes[0] + open_codes[1] + open_codes[2])">{{open_codes[0] + open_codes[1] + open_codes[2]}}</span>
            <div class="clear"></div>
          </div>
        </div>
        <div class="right">
          <div class="right-left">
            <p style="color:#209F16;">第{{this_expect}}期</p>
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
          <!--<div class="history-header" @click="showHistory">-->
            <!--历史记录 <span class="pull-right pointer">{{history_str}}</span>-->
          <!--</div>-->
          <div class="history-table">
            <a @click="showType(1)" :class="history_tables[1]?'active':''">长龙排行</a>
            <a @click="showType(2)" :class="history_tables[2]?'active':''">今日开奖</a>
          </div>
          <div class="history-list" v-show="history_tables[1]" style="width:280px;">
            <p v-for="(v,k) in long_dragon" class="text-left">
              <span>{{v.name}}</span>
              <span class="pull-right mr10">{{v.num}}期</span>
            </p>
            <div class="mt5"> <el-button type="primary" plain  size="small" @click="history_tables[1]=false;">关闭</el-button></div>
          </div>

          <div class="history-list" v-show="history_tables[2]">
            <div class="history-balls" v-for="v in history_codes">
              <span>{{v.expect}}</span>
              <span :class="returnColor(v.details.ball_0[0]) + ' code-ball'">{{v.details.ball_0[0]}}</span>
              <span class="code-fh">+</span>
              <span :class="returnColor(v.details.ball_0[1]) + ' code-ball'">{{v.details.ball_0[1]}}</span>
              <span class="code-fh">+</span>
              <span :class="returnColor(v.details.ball_0[2]) + ' code-ball'">{{v.details.ball_0[2]}}</span>
              <span class="code-fh">=</span>
              <span :class="returnColor(v.details.ball_1[0]) + ' code-ball'">{{v.details.ball_1[0]}}</span>
            </div>
            <div class="mt5"> <el-button type="primary" plain  size="small" @click="history_tables[2]=false;">关闭</el-button></div>
          </div>

          <!--<div class="history-close ">-->
            <!--<a @click="close_history()" class="pointer">-->
              <!--关闭-->
            <!--</a>-->
          <!--</div>-->
        </div>
        <div class="clear"></div>
      </div>

      <div class="clear"></div>
    </div>

    <!-- 下注内容区 -->
    <div id="bet-content">
      <form action="" >
        <div class="pan">
          <label style="color: #fff;">盘口</label>
          <select v-model="which_handicap">
            <option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">{{return_upper(v.ratewin_name)}}盘 <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span></option>
          </select>
        </div>
        <div class="bet-content-table">
          <a class="color-white active">
            加拿大28
            <span></span>
          </a>
        </div>

        <!--<div class="bet-content-input">-->
          <!--&lt;!&ndash;<div class="pan">&ndash;&gt;-->
            <!--&lt;!&ndash;<label>盘口</label>&ndash;&gt;-->
            <!--&lt;!&ndash;<select v-model="which_handicap">&ndash;&gt;-->
              <!--&lt;!&ndash;<option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">{{return_upper(v.ratewin_name)}}盘 <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span></option>&ndash;&gt;-->
            <!--&lt;!&ndash;</select>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<div class="fast-bet">-->
            <!--快速下注金额-->
            <!--<input type="text" class="fast-bet-input" v-model="fast_money">-->
          <!--</div>-->
          <!--&lt;!&ndash;<div class="bet-btns">&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="setBetMoney(10)">10</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="setBetMoney(50)">50</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="setBetMoney(100)">100</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="setBetMoney(200)">200</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="setBetMoney(500)">500</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="setBetMoney(1000)">1000</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="clear_bet()" class="pull-right chongtian">重填</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<a @click="comfire_bet" class="pull-right tijiao">提交</a>&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<div class="clear"></div>-->
        <!--</div>-->


        <!-- 第一球 -->
        <div class="bet-chooses">
          <div class="bet-chooses-top">

            <div class="long-bet" style="height:auto;">
              <div class="first-ball-top">
                混合
              </div>
              <div v-for="(v,k) in odds.mixture" class="long-bet-content" v-if="v !=  0.0000">
                <span >{{odds.mixture_str[k]}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:-8px;margin-top:4px;">{{v}}</span>
                <input type="text" v-if="k != 10" v-model="bet_content.mixture[k]"
                       @click="choose_one(k,'mixture','ball_2')"
                       @change="choose_one_change(k,'mixture','ball_2')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:5px;">

                <input type="text" v-if="k == 10" v-model="bet_content.mixture[10]"
                       @click="choose_one(1,'mixture','ball_4')"
                       @change="choose_one_change(1,'mixture','ball_4')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:5px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="long-bet" style="height:auto;">
              <div class="first-ball-top">
                波色
              </div>
              <div v-for="(v,k) in odds.color" class="long-bet-content" v-if="v !=  0.0000">
                <span>{{odds.color_str[k]}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:-8px;margin-top:4px;">{{v}}</span>
                <input type="text" v-model="bet_content.color[k]"
                       @click="choose_one(k,'color','ball_3')"
                       @change="choose_one_change(k,'color','ball_3')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:5px;">
                <div class="clear"></div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="long-bet special-code" style="height:auto;">
              <div class="first-ball-top">
                特码
              </div>
              <div v-for="(v,k) in odds.special" class="long-bet-content">
                <span class="hao0 ml10 mt5" :class="returnColor(k)">{{k}}</span>
                <span class="he22 color-red f700" style="padding:1px;margin-left:8px;margin-top:4px;">{{v}}</span>
                <input type="text" v-model="bet_content.special[k]"
                       @click="choose_one(k,'special','ball_1')"
                       @change="choose_one_change(k,'special','ball_1')"
                       style="margin-top:5px;width:43px;height:17px;margin-left:10px;">
                <div class="clear"></div>
              </div>


              <div class="clear"></div>
            </div>


            <div class="clear"></div>
          </div>
        </div>


        <!--<div class="bet-content-input mt5">-->
          <!--<div class="fast-bet">-->
            <!--快速下注金额-->
            <!--<input type="text" class="fast-bet-input" v-model="fast_money">-->
          <!--</div>-->
          <!--<div class="bet-btns">-->
            <!--<a @click="setBetMoney(10)">10</a>-->
            <!--<a @click="setBetMoney(50)">50</a>-->
            <!--<a @click="setBetMoney(100)">100</a>-->
            <!--<a @click="setBetMoney(200)">200</a>-->
            <!--<a @click="setBetMoney(500)">500</a>-->
            <!--<a @click="setBetMoney(1000)">1000</a>-->
            <!--<a @click="clear_bet()" class="pull-right chongtian">重填</a>-->
            <!--<a @click="comfire_bet" class="pull-right tijiao">提交</a>-->
            <!--&lt;!&ndash;<span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="clear"></div>-->
        <!--</div>-->

        <!--快速下注-->
        <div class="bet-content-input mrt-55">
          <div class="fast-bet" style="color:#606266;text-indent:8px;">
            快速下注金额
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
            <el-button v-if="open_state"  class="btn-fast pull-right" @click="comfire_bet">提交</el-button>
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
  export default {
    name: "Cakeno28",
    data() {
      var my_data =
        {
          centerDialogVisible:false,
          bet_html:'',
          showArray_cqssc: [1],
          history_tables: [0, 0, 0],
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
            fast_bet_money:[10,50,100,200,500,1000],//快速下注的金额
            open_state:false,
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
          dicrationaries:[
            'ball_1__e1','ball_1__e2','ball_1__e3','ball_1__e4','ball_1__e5','ball_1__e6',
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
          timeId:0,
          timeId2:1,
          timeId3:2,
          history_codes:[],

          //查看用户可选的盘口
          handicaps:[],
          //当前是哪个盘口
          which_handicap:'',

          vaild_lotteries:[],//  用户拥有哪些彩种
          fanshui:'',
          orderData:[],//未结算数据
          tips:'距离本期封盘还有',
          dec_limit:
            {
              ball_1:{},
              ball_2:{},
              ball_3:{},
              ball_4:{},
              ball_5:{},
            },
          all_odds:[],
          long_dragon:[],

        };
      return my_data;
    },

    methods:
      {
        showType: function (idx)
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
          else {
            this.close_history();
          }

        },
        //获取赔率
        get_odds: function (which_handicap = null)
        {
          if(which_handicap || this.which_handicap)
          {
            this.$http.get(`${this.global.config.API}cake/odds?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function (response)
            {
              let data = response.data.data;
              let odds = data.odds;
              this.odds = {
                mixture: [],
                mixture_str: ['大', '小', '单', '双', '大单', '大双', '小单', '小双', '极大', '极小', '豹子'],
                color: [],
                color_str: ['红波', '绿波', '蓝波'],
                special: [],
              };
              this.dec_limit.ball_1 = odds.ball_1.dec_odds;
              this.dec_limit.ball_2 = odds.ball_2.dec_odds;
              this.dec_limit.ball_3 = odds.ball_3.dec_odds;
              this.dec_limit.ball_4 = odds.ball_4.dec_odds;
              this.dec_limit.ball_5 = odds.ball_5.dec_odds;
              for (let i = 0; i < 30; i++)
              {
                if (data.odds.ball_2['e' + i])
                {
                  this.odds.mixture.push(data.odds.ball_2['e' + i]);//混合的赔率
                  if(data.odds.ball_2['e' + i] && data.odds.ball_2['e' + i] != '0.0000')
                  {
                    this.all_odds[i+27] = data.odds.ball_2['e' + i];
                  }


                }
                if (data.odds.ball_1['e' + i])
                {
                  this.odds.special.push(data.odds.ball_1['e' + i]);//特码的赔率
                  if(data.odds.ball_1['e' + i] && data.odds.ball_1['e' + i] != '0.0000')
                  {
                    this.all_odds[i-1] = data.odds.ball_1['e' + i];
                  }

                }
                if (data.odds.ball_3['e' + i])
                {
                  this.odds.color.push(data.odds.ball_3['e' + i]);//波色的赔率
                  if(data.odds.ball_3['e' + i] && data.odds.ball_3['e' + i] != '0.0000')
                  {
                    this.all_odds[i+38] = data.odds.ball_3['e' + i];
                  }
                }
              }
              this.odds.mixture[10] = data.odds.ball_4['e1'];//混合的赔率添加豹子
              this.all_odds[38] = data.odds.ball_4['e1'];
              //console.log(data.odds.ball_4['e1']);
              //this.all_odds.splice(0,1);
            });
          }
          // else
          // {
          //   //获取两面盘的赔率
          //   this.$http.get(`${this.global.config.API}cake/odds`).then(function (response) {
          //     let data = response.data.data;
          //     let odds = data.odds;
          //     this.odds = {
          //       mixture: [],
          //       mixture_str: ['大', '小', '单', '双', '大单', '大双', '小单', '小双', '极大', '极小', '豹子'],
          //       color: [],
          //       color_str: ['红波', '绿波', '蓝波'],
          //       special: [],
          //     };
          //     for (let i = 0; i < 30; i++) {
          //       if (data.odds.ball_2['e' + i]) {
          //         this.odds.mixture.push(data.odds.ball_2['e' + i]);//混合的赔率
          //       }
          //       if (data.odds.ball_1['e' + i]) {
          //         this.odds.special.push(data.odds.ball_1['e' + i]);//特码的赔率
          //       }
          //       if (data.odds.ball_3['e' + i]) {
          //         this.odds.color.push(data.odds.ball_3['e' + i]);//波色的赔率
          //       }
          //     }
          //     this.odds.mixture[10] = data.odds.ball_4['e1']//混合的赔率添加豹子
          //
          //
          //   });
          // }

        },
        //**选择一个下注
        choose_one: function (k, str, str2)
        {
          let content = '';
          if (str2 == 'ball_4')
          {
            content = `ball_4__e1`;
            if(this.bet_content.mixture[10] != "")
            {
              return false;
            }
            this.bet_content.mixture[10] = this.fast_money;//改变下注金额
            this.bet_content.mixture.reverse().reverse();//触发视图层改变
          }
          else
          {
            content = str2 + "__e" + (k + 1);
            if(this.bet_content[str][k] != "")
            {
              return false;
            }
            this.bet_content[str][k] = this.fast_money;//改变下注金额
            this.bet_content[str].reverse().reverse();//触发视图层改变
          }
          this.bets.push({content: content, money: this.fast_money});//添加到下注内容区
        },
        choose_one_change: function (k, str, str2)
        {
          let content = '';
          if (str2 == 'ball_4')
          {
            content = `ball_4__e1`;
            this.bets.push({content: content, money: this.bet_content.mixture[10]});//添加到下注内容区
          }
          else
          {
            content = str2 + "__e" + (k + 1);
            this.bets.push({content: content, money: this.bet_content[str][k]});//添加到下注内容区
          }

        },
        //清除下注内容
        clear_bet: function ()
        {

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
        //确认下注
        comfire_bet: function ()
        {
          //过滤掉相同的对象
          this.filter_same();
          //当用户没有选择下注内容的时候要提示用户选择
          if (this.bets.length < 1)
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

          //下注总金额
          let sumMoney = 0;
          //下注显示框的html
          let html = `<table class="bet-table"><tr><td>注单明细</td><td>赔率</td><td>下注金额</td><td>操作</td></tr>`;

          //将this.bets的内容转化成html显示在页面的弹框上
          for(let i = 0; i<this.bets.length;i++)
          {
            let str = '';
            var index = this.dicrationaries.indexOf(this.bets[i].content);


            if(this.$store.state.son_off)
            {
              if(this.is_dec(this.bets[i].content,this.bets[i].money))
              {
                let odds = (Number(this.all_odds[index]) - Number(this.is_dec(this.bets[i].content,this.bets[i].money))).toFixed(4);
                str += `${odds}`
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
                        <td>${this.bets[i].money}</td>
                        <td><button  class='${this.bets[i].content}' attr='my-btn-1'>删除</button></td>
                     </tr>`;
            //算下注的总金额
            sumMoney += parseInt(this.bets[i].money);
          }
          html +=   `</table>`;
          html += `<div style='text-align:center;margin-top:15px;' id='sum' >共 <span style="color:blue;font-weight:700;">${this.bets.length}</span> 条 <span style="color:blue;font-weight:700;">${sumMoney}</span>￥</div>`;
          this.centerDialogVisible = true;
          this.bet_html = html;
          return;
        },
        //是否趺背，趺多少
        is_dec:function(content,money)
        {
          let returnData = null;
          let patterns =
            {
              pattern1 : 'ball_1',
              pattern2 : 'ball_2',
              pattern3 : 'ball_3',
              pattern4 : 'ball_4',

            };
          let flag = false;
          let index = 0;
          for(let i = 1 ; i<15;i++)
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
            let line = event.target.parentNode.parentNode;
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
        /**
         * 过滤掉相同的数组
         */
        filter_same: function ()
        {
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
            if(!this.bets[i].money)
            {
              this.bets.splice(i,1);
              flag = true;
            }
            if (flag) {
              this.filter_same();
              break;
            }
          }
        },
        //post bet data
        do_bet:function ()
        {
          this.centerDialogVisible = false;
          this.$http.post(`${this.global.config.API}cake/order`,{bets:this.bets,odds_table:this.which_handicap}).then(function(res){
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
                  type: 'success',
                  duration:1500,
                });
              //获取全局的未结算清单
              this.get_ssc_unclear();
              //显示未结算的数据
              this.$store.state.isShowUnclear = true;
              //显示cakeno28的数据
              this.$store.state.which_lottery = 'cake';
            }
            else
            {
              //alert(res.data.msg);
              this.$message.error(res.data.msg);
            }

          });
        },

        //get_open_code
        get_last_code:function()
        {
          let url = `${this.global.config.API}cake/lastLty`;
          this.$http.get(url).then(function(response){
            let data = response.data;
            this.open_codes = data.details.ball_0;
            this.last_expect = data.expect;
          });
        },
        //获取下注时间
        get_time : function()
        {
          let url2 = `${this.global.config.API}cake/time`;
          this.$http.get(url2).then(function(response){
            let data = response.data;
            this.end_time = data.endtime;
            this.open_time = data.opentime;
            this.this_expect = data.expect;
            this.sales_ = data.saleNum;
            this.unsaleNum = data.unsaleNum;

          }).then(function(){
            this.count_down()
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
            else {
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
        setBetMoney:function(money)
        {
          this.fast_money = money;
        },
        get_codes_history:function()
        {
          this.$http.get(`${this.global.config.API}cake/history/lottery?per_page=10&page=1`)
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
          this.$http.get(`${this.global.config.API}cake/pans`)
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
        returnColor:function(num)
        {
          let className = '';
          num = parseInt(num);
          if(num%3 == 0)
          {
            className = 'bg-red';
          }
          if(num%3 == 1)
          {
            className = 'bg-green';
          }
          if(num%3 == 2)
          {
            className = 'bg-blue';
          }
          if(num == 0 || num == 13 || num == 14 || num ==27)
          {
            className = 'bg-white';
          }
          return className;

        },
        /**
         * 获取egg未结算的清单
         */
        get_ssc_unclear:function()
        {

          //获取cqssc未结算的数据
          this.$http.get(`${this.global.config.API}cake/history/clear/0`).then(function(res)
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
        //获取长龙出的数据
        get_londDragon_data()
        {
          this.$http.get(`${this.global.config.API}cake/longDragon`)
            .then(function(res)
            {

              if(res.data.status == 200)
              {
                this.long_dragon = res.data.data;
              }
            })
        },


      },
    created : function ()
    {
      if (window.sessionStorage.isLogin != "ok")
      {
        this.$router.push('/');
      }
      else
      {
        this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
          if(this.vaild_lotteries.indexOf('cakeno') != -1)
          {
            this.get_odds();
            this.get_last_code();
            this.get_time();
            this.get_codes_history();
            this.get_users_handicaps();
            this.get_ssc_unclear();
            this.get_londDragon_data();
          }
          else
          {
            this.$router.push('pcegg');
          }
        });

      }
    },
    mounted: function ()
    {
      var that = this;
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
    //离开这个路由时触发的钩子
    destroyed()
    {
      clearInterval(this.timeId);
      clearInterval(this.timeId2);
      clearInterval(this.timeId3);
    },
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
      }//end of watch Object
  }
</script>


<style scoped>
  @import url('../assets/css/cakeno28.css');
</style>
<style>
  button[attr='my-btn-1']
  {
    float:right;
    margin-right:12px;
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

