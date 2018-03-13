<template>
  <div id="pcegg">
       <!-- 期数 时间 开奖号码 -->
        <div class="head">
            <img src="../assets/img/PCdandan.png" alt="">

            <div class="details">
                <div class="left">
                    <p class="color-white">第634158期</p>
                    <p class="color-white mt5">开奖号码</p>
                </div>
                <div class="balls">
                    <span>1</span>
                    <span class="bg-none">+</span>
                    <span>3</span>
                    <span class="bg-none">+</span>
                    <span>5</span>
                     <span class="bg-none">=</span>
                     <span>5</span>
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
                    <p class="color-white text-right">第634158期</p>
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
                    <a class="color-white active" >
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
                          <a href="" class="pull-right chongtian">重填</a>
                           <a href="" class="pull-right tijiao">提交</a>
                     </div>
                     <div class="clear"></div>
                </div>






                <!-- 第一球 -->
                <div class="bet-chooses" >
                    <div class="bet-chooses-top">

                         <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               混合
                            </div>
                            <div v-for="(v,k) in odds.mixture" class="long-bet-content">
                                <span>{{odds.mixture_str[k]}}</span>
                                <span>{{v}}</span>
                                <input type="text" v-if="odds.mixture_str[k] != '豹子'" v-model="bet_content.mixture[k]" @click="choose_one(k,'mixture','ball_2')">
                                <input type="text" v-if="odds.mixture_str[k] == '豹子'" v-model="bet_content.mixture[k]" @click="choose_one(1,'mixture','ball_4')">
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
                          <a href="" class="pull-right chongtian">重填</a>
                          <a href="" class="pull-right tijiao">提交</a>
                     </div>
                     <div class="clear"></div>
                </div>

            </form>



        </div>

        <!-- 右边的历史记录 -->
        <div id="history">
            <div class="history-header"  @click="showHistory">
                长龙排行     <span class="pull-right">{{history_str}}</span>
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
export default
{
   name:"Pcegg",
    data()
    {
        var my_data =
        {
            showArray_cqssc:[1],
            history_tables:[1,0,0],
            history_flag:0,
            history_str:"收起",
            fast_money:10,//快速下注金额
            odds: //赔率
            {
               mixture : [],
               mixture_str : ['大','小','单','双','大单','大双','小单','小双','极大','极小','豹子'],
               color   : [],
               color_str   : ['红波','绿波','蓝波'],
               special : [],
            },
            bet_content:
            {
              mixture:['','','','','','','','','','',''],
              color:['','',''],
              special : ['','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
            },
            bets:[],

        };
        return my_data;
    },
    created:function()
    {
      if(window.sessionStorage.isLogin != "ok"){
        this.$router.push('login');
      }
    },
    methods:
    {
        showType:function(idx)
        {
               this.history_tables = [0,0,0,0,0,0,0];
               this.history_tables[idx] = 1;
        },
         close_history:function()
        {

            for(let i = 0;i<this.history_tables.length;i++)
            {
                if(this.history_tables[i]){this.history_flag=i}
            }

            $(".history-close").slideUp();
            $(".history-list").slideUp();
            $(".history-table").slideUp();
            this.history_str = "展开";
        },
        showHistory:function()
        {
            if(this.history_str == "展开")
            {
                $(".history-close").slideDown();
                $(".history-list").eq(this.history_flag).slideDown();
                $(".history-table").slideDown();
                this.history_tables = [0,0,0,0,0,0,0];
                this.history_tables[this.history_flag] = 1;
                this.history_str = "收起";
            }
            else
            {
                this.close_history();
            }

        },
        get_odds:function(){
          //获取两面盘的赔率
          this.$http.get(`${this.global.config.API}egg/odds`).then(function(response){
            let data = response.data.data;
            let odds = data.odds;
            console.log(odds);
            for(let i=0;i<30;i++){
               if(data.odds.ball_2['e'+i])
               {
                 this.odds.mixture.push(data.odds.ball_2['e'+i]);//混合的赔率
               }
              if(data.odds.ball_1['e'+i])
              {
                this.odds.special.push(data.odds.ball_1['e'+i]);//特码的赔率
              }
              if(data.odds.ball_3['e'+i])
              {
                this.odds.color.push(data.odds.ball_3['e'+i]);//波色的赔率
              }
            }
            this.odds.mixture.push(data.odds.ball_4['e1']);//混合的赔率添加豹子
            console.log(this.odds);

          });



        },
        choose_one:function(k,str,str2){

          if(str2 == 'ball_4')
          {
            var content = `ball_4__e1`;
            this.bet_content[str][k] = this.fast_money;//改变下注金额
            this.bet_content[str].reverse().reverse();//触发视图层改变
          }
          else
          {
            var content = str2 + "__e" + (k+1);
            this.bet_content[str][k] = this.fast_money;//改变下注金额
            this.bet_content[str].reverse().reverse();//触发视图层改变
          }

          this.bets.push({content:content,money:this.fast_money});//添加到下注内容区
          console.table(this.bets);
        },
    },
    created:function(){
        this.get_odds();
    },
    mounted:function(){
      console.log(this.bet_content.special.length);

    },
}
</script>


<style scoped>
    @import url('../assets/css/pcegg.css');
</style>

