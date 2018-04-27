<template>

        <div class="xinyongziliao">
                <div class="xy-header">
                   <i class="fa fa-list-ol"></i>
                    <span>玩法规则</span>
                    <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
                    <div class="clear"></div>
                </div>

                <div class="xy-left">

                    <div class="xy-list">
                        <a @click="change_lty(0,'ssc')" :class="isShow[0]?'active':''"  v-show="isShow1('cqssc')">重庆时时彩</a>
                        <a @click="change_lty(1,'pk10')" :class="isShow[1]?'active':''" v-show="isShow1('bjpk10')">北京赛车pk10</a>
                        <a @click="change_lty(2,'cake')" :class="isShow[2]?'active':''" v-show="isShow1('cakeno')">加拿大28</a>
                        <a @click="change_lty(3,'egg')" :class="isShow[3]?'active':''"  v-show="isShow1('pcegg')">pc蛋蛋</a>
                    </div>
                </div>


                <div class="xy-right">
                    <div class="xy-right-top">
                        <a v-for="(v,k) in handicaps" :class="tableArray[k]?'active':''"  @click="tab_pan(v.ratewin_name,k)">{{return_upper(v.ratewin_name)}}盘</a>
                    </div>

                    <div class="rules  text-left" >
                       <table>
                           <tr class="color-red">
                               <td width="60" style="text-align:left;padding-left:15px;">玩法</td>
                               <td width="60" style="text-align:right;padding-right:15px;">单注投注最低金额</td>
                               <td width="60" style="text-align:right;padding-right:15px;">单注投注最高金额</td>
                               <td width="60" style="text-align:right;padding-right:15px;">单期投注最高金额</td>

                           </tr>
                           <tr v-for="(v,k) in data">
                               <td style="text-align:left;padding-left:15px;">{{v.play}}</td>
                               <td style="text-align:right;padding-right:15px;">{{v.one_bet_min}}</td>
                               <td style="text-align:right;padding-right:15px;">{{v.one_bet_win}}</td>
                               <td style="text-align:right;padding-right:15px;">{{v.one_bet_max}}</td>

                           </tr>
                       </table>
                    </div>




                </div>

                <div class="clear"></div>
        </div>

</template>

<script>
export default
{
   name:'bet_rules',
   data:function()
   {
       var data =
       {
           isShow:[1,0,0,0,0,0],
           tableArray:[1,0],
           which_lty:'ssc',//默认是ssc
           handicaps:[],//盘口们
           data:[{},{},{},{},{},{},{},{},{},{},{},{},{}],
           vaild_lotteries:[],//用户拥有哪些彩种
       };
       return data;
   },
   methods:
   {

        isShow1:function(str)
        {
            let numb = this.vaild_lotteries.indexOf(str);
            if(numb == -1)
            {
             return false;
            }
            else
            {
                return true;
            }
        },
       //获取用户有哪些盘口
       get_users_handicaps()
       {
           this.$http.get(`${this.global.config.API}${this.which_lty}/pans`)
               .then(function(res)
               {
                   this.handicaps = [];
                   if(res.data.status == 200)
                   {
                       for(let i = 0 ; i <res.data.data.ratelist.length;i++)
                       {
                           this.handicaps.push(res.data.data.ratelist[i]);
                       }
                   }

                   if(this.which_lty == 'ssc') this.get_user_bet_rules(this.handicaps[0].ratewin_name);
                   if(this.which_lty == 'pk10') this.get_user_bet_rules_pk10(this.handicaps[0].ratewin_name);
                   if(this.which_lty == 'cake') this.get_user_bet_rules_cake(this.handicaps[0].ratewin_name);
                   if(this.which_lty == 'egg') this.get_user_bet_rules_egg(this.handicaps[0].ratewin_name);

               });
       },

       change_lty(idx,type)
       {
         this.isShow = [0,0,0,0,0,0];
         this.isShow[idx] = 1;
         switch (type)
         {
           case "ssc":
             this.which_lty = 'ssc';
             this.get_users_handicaps();
             this.tableArray=[1,0];
             break;
           case 'pk10':
             this.which_lty = 'pk10';
             this.get_users_handicaps();
             this.tableArray=[1,0];
             break;
           case 'cake':
             this.which_lty = 'cake';
             this.get_users_handicaps();
             this.tableArray=[1,0,0,0];
             break;
           case 'egg':
             this.which_lty = 'egg';
             this.get_users_handicaps();
             this.tableArray=[1,0,0,0];
             break;

         }
       },
       //返回大写字母
       return_upper:function(str)
       {
           return str.toUpperCase();
       },


       //获取用户ssc拥有的第一个盘的下注限制
       get_user_bet_rules(pan)
       {
         this.$http.get(`${this.global.config.API}${this.which_lty}/odds/0?pan=${pan}`).then(function(res)
         {
           if(res.data.status ==200)
           {
             let data = res.data.data.odds;
             this.data = [];
             this.data.push({
               play : "第一球",
               one_bet_max:data.ball_1_digit.bet_limit.expect_limit,
               one_bet_min:data.ball_1_digit.bet_limit.order_limit_min,
               one_bet_win:data.ball_1_digit.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "第二球",
               one_bet_max:data.ball_2_digit.bet_limit.expect_limit,
               one_bet_min:data.ball_2_digit.bet_limit.order_limit_min,
               one_bet_win:data.ball_2_digit.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "第三球",
               one_bet_max:data.ball_3_digit.bet_limit.expect_limit,
               one_bet_min:data.ball_3_digit.bet_limit.order_limit_min,
               one_bet_win:data.ball_3_digit.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "第四球",
               one_bet_max:data.ball_4_digit.bet_limit.expect_limit,
               one_bet_min:data.ball_4_digit.bet_limit.order_limit_min,
               one_bet_win:data.ball_4_digit.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "第五球",
               one_bet_max:data.ball_5_digit.bet_limit.expect_limit,
               one_bet_min:data.ball_5_digit.bet_limit.order_limit_min,
               one_bet_win:data.ball_5_digit.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "总和",
               one_bet_max:data.dragon_and_tiger.bet_limit.expect_limit,
               one_bet_min:data.dragon_and_tiger.bet_limit.order_limit_min,
               one_bet_win:data.dragon_and_tiger.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "前三",
               one_bet_max:data.front_3.bet_limit.expect_limit,
               one_bet_min:data.front_3.bet_limit.order_limit_min,
               one_bet_win:data.front_3.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "中三",
               one_bet_max:data.medium_3.bet_limit.expect_limit,
               one_bet_min:data.medium_3.bet_limit.order_limit_min,
               one_bet_win:data.medium_3.bet_limit.order_limit_max,
             });

             this.data.push({
               play : "后三",
               one_bet_max:data.end_3.bet_limit.expect_limit,
               one_bet_min:data.end_3.bet_limit.order_limit_min,
               one_bet_win:data.end_3.bet_limit.order_limit_max,
             });

           }
         });
       },

       //获取用户pk10拥有的第一个盘的下注限制
        get_user_bet_rules_pk10(pan)
        {
        this.$http.get(`${this.global.config.API}${this.which_lty}/odds/0?pan=${pan}`).then(function(res)
        {
             if(res.data.status ==200)
             {
               let data = res.data.data.odds;
               this.data = [];
               this.data.push({
                 play : "冠军",
                 one_bet_max:data.ball_1_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_1_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_1_digit.bet_limit.order_limit_max,
               });
               this.data.push({
                 play : "亚军",
                 one_bet_max:data.ball_2_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_2_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_2_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第三名",
                 one_bet_max:data.ball_3_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_3_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_3_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第四名",
                 one_bet_max:data.ball_4_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_4_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_4_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第五名",
                 one_bet_max:data.ball_5_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_5_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_5_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第六名",
                 one_bet_max:data.ball_6_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_6_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_6_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第七名",
                 one_bet_max:data.ball_7_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_7_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_7_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第八名",
                 one_bet_max:data.ball_8_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_8_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_8_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第九名",
                 one_bet_max:data.ball_9_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_9_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_9_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "第十名",
                 one_bet_max:data.ball_10_digit.bet_limit.expect_limit,
                 one_bet_min:data.ball_10_digit.bet_limit.order_limit_min,
                 one_bet_win:data.ball_10_digit.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "冠亚军和",
                 one_bet_max:data.sum_digit.bet_limit.expect_limit,
                 one_bet_min:data.sum_digit.bet_limit.order_limit_min,
                 one_bet_win:data.sum_digit.bet_limit.order_limit_max,
               });

             }
            });
        },

       //获取用户cake拥有的第一个盘的下注限制
       get_user_bet_rules_cake(pan)
       {
       this.$http.get(`${this.global.config.API}${this.which_lty}/odds/0?pan=${pan}`).then(function(res)
       {
         if(res.data.status ==200)
         {
           let data = res.data.data.odds;
           this.data = [];
           this.data.push({
             play : "特码",
             one_bet_max:data.ball_1.bet_limit.expect_limit,
             one_bet_min:data.ball_1.bet_limit.order_limit_min,
             one_bet_win:data.ball_1.bet_limit.order_limit_max,
           });

           this.data.push({
             play : "多面",
             one_bet_max:data.ball_2.bet_limit.expect_limit,
             one_bet_min:data.ball_2.bet_limit.order_limit_min,
             one_bet_win:data.ball_2.bet_limit.order_limit_max,
           });

           this.data.push({
             play : "波色",
             one_bet_max:data.ball_3.bet_limit.expect_limit,
             one_bet_min:data.ball_3.bet_limit.order_limit_min,
             one_bet_win:data.ball_3.bet_limit.order_limit_max,
           });

           this.data.push({
             play : "豹子",
             one_bet_max:data.ball_4.bet_limit.expect_limit,
             one_bet_min:data.ball_4.bet_limit.order_limit_min,
             one_bet_win:data.ball_4.bet_limit.order_limit_max,
           });
         }
       });
     },
         //egg
         get_user_bet_rules_egg(pan)
         {
           this.$http.get(`${this.global.config.API}${this.which_lty}/odds/0?pan=${pan}`).then(function(res)
           {
             if(res.data.status ==200)
             {
               let data = res.data.data.odds;
               this.data = [];
               this.data.push({
                 play : "特码",
                 one_bet_max:data.ball_1.bet_limit.expect_limit,
                 one_bet_min:data.ball_1.bet_limit.order_limit_min,
                 one_bet_win:data.ball_1.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "多面",
                 one_bet_max:data.ball_2.bet_limit.expect_limit,
                 one_bet_min:data.ball_2.bet_limit.order_limit_min,
                 one_bet_win:data.ball_2.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "波色",
                 one_bet_max:data.ball_3.bet_limit.expect_limit,
                 one_bet_min:data.ball_3.bet_limit.order_limit_min,
                 one_bet_win:data.ball_3.bet_limit.order_limit_max,
               });

               this.data.push({
                 play : "豹子",
                 one_bet_max:data.ball_4.bet_limit.expect_limit,
                 one_bet_min:data.ball_4.bet_limit.order_limit_min,
                 one_bet_win:data.ball_4.bet_limit.order_limit_max,
               });
             }
           });
         },
     //获取用户有哪些彩种
         get_lotteries()
         {
           //获取用户有哪些彩种
           this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
           {
             let  data = response.data.data.user;
             this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
           });
         },
       //切换盘口
        tab_pan(pan,k)
        {
          if(this.which_lty == 'ssc') this.get_user_bet_rules(pan);
          if(this.which_lty == 'pk10') this.get_user_bet_rules_pk10(pan);
          if(this.which_lty == 'cake') this.get_user_bet_rules_cake(pan);
            this.tableArray = [0,0,0,0,0,0,0,0,0];
            this.tableArray[k] = 1;
        },


   },
   created()
   {
       this.$store.state.isShowSecond = true;
       this.get_users_handicaps();
       this.get_lotteries();
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
     margin-top: 5px;
   }
   .xy-right-top
   {
       width: 100%;
       height: 44px;
       overflow: hidden;
       background: #ededed;
   }
   .xy-right-top>a
   {
       float: left;
       height: 22px;
       box-sizing:border-box;
       padding:1px 18px;
       color:#000;
       font-size: 13px;
       margin-top: 11px;
       margin-left: 5px;
       line-height: 21px;
       cursor: pointer;
   }
   .xy-right-top>a.active
   {
       background: #fb5722;
       border-radius: 3px;
       color: #fff;
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
       /*border-right: 1px solid gray;*/
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
       font-size: 14px;
       text-align:center;
   }

   td
   {
       border: 1px solid #e5e5e5;
       padding:8px 3px;
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
