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
                        <a @click="isShow=[1,0,0,0,0];" :class="isShow[0]?'active':''">重庆时时彩</a>
                        <a @click="isShow=[0,1,0,0,0];" :class="isShow[1]?'active':''">重北京赛车pk10</a>
                        <a @click="isShow=[0,0,1,0,0];" :class="isShow[2]?'active':''">加拿大28</a>
                        <a @click="isShow=[0,0,0,1,0];" :class="isShow[3]?'active':''">pc蛋蛋</a>
                    </div>
                </div>


                <div class="xy-right">
                    <div class="xy-right-top">
                        <a v-for="(v,k) in handicaps" :class="tableArray[k]?'active':''" >{{return_upper(v.ratewin_name)}}盘</a>

                    </div>

                    <div class="rules  text-left" v-show="isShow[0]">
                       <table>
                           <tr class="color-red">
                               <td width="60" style="text-align:left;padding-left:15px;">玩法</td>
                               <td width="60" style="text-align:right;padding-right:15px;">单注投注最高金额</td>
                               <td width="60" style="text-align:right;padding-right:15px;">单注投注最低金额</td>
                               <td width="60" style="text-align:right;padding-right:15px;">单期投注最高金额</td>
                               <td width="60" style="text-align:right;padding-right:15px;">赔率</td>
                           </tr>
                           <tr v-for="(v,k) in data">
                               <td style="text-align:left;padding-left:15px;">{{v.play}}</td>
                               <td style="text-align:right;padding-right:15px;">{{v.one_bet_max}}</td>
                               <td style="text-align:right;padding-right:15px;">{{v.one_bet_min}}</td>
                               <td style="text-align:right;padding-right:15px;">{{v.one_bet_win}}</td>
                               <td style="text-align:right;padding-right:15px;">{{v.odds}}</td>
                           </tr>
                       </table>
                    </div>

                    <div class="rules  text-left" v-show="isShow[1]">
                        <table>
                            <tr class="color-red">
                                <td width="60" style="text-align:left;padding-left:15px;">玩法</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单注投注最高金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单注投注最低金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单期投注最高金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">赔率</td>
                            </tr>
                            <tr v-for="(v,k) in data">
                                <td style="text-align:left;padding-left:15px;">{{v.play}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_max}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_min}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_win}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.odds}}</td>
                            </tr>
                        </table>
                    </div>


                    <div class="rules  text-left" v-show="isShow[2]">
                        <table>
                            <tr class="color-red">
                                <td width="60" style="text-align:left;padding-left:15px;">玩法</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单注投注最高金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单注投注最低金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单期投注最高金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">赔率</td>
                            </tr>
                            <tr v-for="(v,k) in data">
                                <td style="text-align:left;padding-left:15px;">{{v.play}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_max}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_min}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_win}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.odds}}</td>
                            </tr>
                        </table>
                    </div>


                    <div class="rules  text-left" v-show="isShow[3]">
                        <table>
                            <tr class="color-red">
                                <td width="60" style="text-align:left;padding-left:15px;">玩法</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单注投注最高金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单注投注最低金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">单期投注最高金额</td>
                                <td width="60" style="text-align:right;padding-right:15px;">赔率</td>
                            </tr>
                            <tr v-for="(v,k) in data">
                                <td style="text-align:left;padding-left:15px;">{{v.play}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_max}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_min}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.one_bet_win}}</td>
                                <td style="text-align:right;padding-right:15px;">{{v.odds}}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="rules  text-left" v-show="isShow[4]">
                        <table>
                            <tr class="color-red">
                                <td>玩法</td>
                                <td>单注投注最高金额</td>
                                <td>单注投注最低金额</td>
                                <td>单期投注最高金额</td>
                                <td>赔率</td>
                            </tr>
                            <tr v-for="(v,k) in data">
                                <td>{{v.play}}</td>
                                <td>{{v.one_bet_max}}</td>
                                <td>{{v.one_bet_min}}</td>
                                <td>{{v.one_bet_win}}</td>
                                <td>{{v.odds}}</td>
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
           data:[
               {
                   play:"两面盘",
                   one_bet_max:130000,
                   one_bet_min:1,
                   one_bet_win:260000,
                   odds:1.99,
               },
               {
                   play:"冠亚大",
                   one_bet_max:130000,
                   one_bet_min:1,
                   one_bet_win:260000,
                   odds:2.2,
               },
               {
                   play:"冠亚小",
                   one_bet_max:130000,
                   one_bet_min:1,
                   one_bet_win:260000,
                   odds:1.79,
               },
               {
                   play:"冠亚单",
                   one_bet_max:130000,
                   one_bet_min:1,
                   one_bet_win:260000,
                   odds:1.79,
               },
               {
                   play:"冠亚双",
                   one_bet_max:130000,
                   one_bet_min:1,
                   one_bet_win:260000,
                   odds:2.2,
               },
               {
                   play:"名次(1~10位)",
                   one_bet_max:10050,
                   one_bet_min:1,
                   one_bet_win:100500,
                   odds:9.95,
               },
               {
                   play:"3、19",
                   one_bet_max:2234,
                   one_bet_min:1,
                   one_bet_win:2234,
                   odds:44.775,
               },
               {
                   play:"4、18",
                   one_bet_max:2234,
                   one_bet_min:1,
                   one_bet_win:2234,
                   odds:44.775,
               },
               {
                   play:"5、17",
                   one_bet_max:4466,
                   one_bet_min:1,
                   one_bet_win:4466,
                   odds:22.387,
               },
           ],
       };
       return data;
   },
   methods:
   {
       //获取用户有哪些盘口
       get_users_handicaps()
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
                       }
                   }
               });
       },
       return_upper:function(str)
       {
           return str.toUpperCase();
       },
   },
   created()
   {
       this.$store.state.isShowSecond = true;
       this.get_users_handicaps();
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
       border-right: 1px solid gray;
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
