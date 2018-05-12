<template>

    <div class="xinyongziliao" >
            <div class="xy-header">
                <i class="fa fa-bar-chart"></i>
                <span>结算报表</span>
                <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
                <b style="line-height:30px;" v-show="details_show">{{when_}}</b>
                <div class="clear"></div>
            </div>

            <div class="xy-left">
              <div class="xy-list">
                <a :class="table_lotterys[2]?'active':''" @click="tab_lottery(2)">
                  今日
                </a>
                <a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0)">
                   本周报表
                </a>
                <a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1)">
                  上周报表
                </a>
                <a :class="table_lotterys[3]?'active':''" @click="tab_lottery(3)">
                  本月
                </a>
                <a :class="table_lotterys[4]?'active':''" @click="tab_lottery(4)">
                  按日期查找
                </a>

              </div>
            </div>
            <div class="xy-right" v-show="!is_coustom_date">
                <table v-show="!details_show" >
                  <tr class="color-red">
                    <td width="100" style="text-align:left;padding-left:15px;">日期</td>
                    <td width="60" style="text-align:right;padding-right:15px;">下注条数</td>
                    <td width="60" style="text-align:right;padding-right:15px;">下注总金额</td>
                    <td width="60" style="text-align:right;padding-right:15px;">盈亏</td>
                    <td width="60" style="text-align:right;padding-right:15px;">返水</td>
                    <td width="60" style="text-align:right;padding-right:15px;">退水后盈亏</td>
                  </tr>

                  <tr v-for="(v,k) in data">
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:left;padding-left:15px;">{{v.week_name}}&nbsp;{{v.date_str }}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">{{v.sum_data.order_num}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">{{v.sum_data.sum_money}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;" >{{v.sum_data.win}}</td>

                    <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">{{v.sum_data.fs}}</td>
                    <td class="color-red" style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">
                      <a @click="get_details(v.date_str,v.week_name + '/ ' + v.date_str )" v-if="v.sum_data.order_num > 0" style="font-weight: 700;cursor: pointer;">

                          <span v-if="v.sum_data.winAndFs>0" style="color: rgb(0, 174, 0);text-decoration:underline;">+{{v.sum_data.winAndFs}}</span>
                          <span v-if="v.sum_data.winAndFs<0" style="color: red;text-decoration:underline;">{{v.sum_data.winAndFs}}</span>
                      </a>
                      <span v-else>
                        {{v.sum_data.winAndFs}}
                      </span>
                    </td>
                  </tr>
                </table>
                <div v-if="details_data.length>1">
                    <table class="details-1" v-show="details_show" >
                        <tr class="color-red">
                            <td>彩种</td>
                            <td>期数</td>
                            <td>注单号</td>
                            <td>时间</td>
                            <td style="text-align:left;padding-left:5px;">下注内容</td>
                            <td style="text-align:right;padding-right:10px;">下注金额</td>
                            <td >状态</td>
                        </tr>
                        <tr v-for="v in details_data">
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.lty_name}}</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.expect}}</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.order_no}}</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.create_time}}</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:left;padding-left:10px;">{{v.mark_a}}{{v.mark_b}}({{v.rate}})</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:10px;">{{v.money|money_digit}}</td>
                            <!--<td style="text-align:center;" v-show="v.open_ret==1">{{v.open_ret==1?'中奖':'未中'}}</td>-->
                            <td v-if="v.status == -1" style="color: #eec48f;">已取消</td>
                            <td v-else>
                                <b v-if="v.open_ret == 1" style="color: #00ae00;font-weight: 700;">中奖</b>
                                <b v-if="v.open_ret == 0" style="color: gray;">未中</b>
                                <b v-if="v.open_ret != 1 && v.open_ret != 0" style="color: gray;">未开</b>
                            </td>
                        </tr>
                    </table>

                    <div class="page-xy" v-show="details_show">
                        <span v-if="hasPrev" @click="prevPage">◀</span>
                        <span v-if="!hasPrev" style="color:gray;">◀</span>
                        <b>第{{page}}页</b>
                        <span v-if="hasNext" @click="nextPage">▶</span>
                        <span v-if="!hasNext" style="color:gray;">▶</span>
                        <b>共{{pageNum}}页,{{sum}}条</b>
                    </div>
                </div>
                <div v-else   style="margin-top: 25px;">

                </div>

            </div>

            <div class="xy-right" v-show="is_coustom_date" style="text-align:left;">
                <div class="filter" style="padding:5px 3px;">
                    <div class="block" style="float:left;">
                        <el-date-picker
                                v-model="value1"
                                align="right"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="开始日期"
                                :picker-options="pickerOptions1">
                        </el-date-picker>
                    </div>
                    <div class="pull-left" style="height: 40px;line-height: 40px;margin-left:10px;margin-right:10px;"> 至 </div>
                    <div class="block" style="float:left;">
                        <el-date-picker
                                v-model="value2"
                                align="right"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="结束日期"
                                :picker-options="pickerOptions1">
                        </el-date-picker>
                    </div>
                    <el-button type="success pull-left ml10" @click="get_all_data_by_date">查询</el-button>
                    <div class="clear"></div>
                    <!--日期的列表-->
                    <table  style="margin-top: 15px;" v-show="date_flag">
                        <tr class="color-red">
                            <td width="100" style="text-align:left;padding-left:15px;">日期</td>
                            <td width="60" style="text-align:right;padding-right:15px;">下注条数</td>
                            <td width="60" style="text-align:right;padding-right:15px;">下注总金额</td>
                            <td width="60" style="text-align:right;padding-right:15px;">盈亏</td>
                            <td width="60" style="text-align:right;padding-right:15px;">返水</td>
                            <td width="60" style="text-align:right;padding-right:15px;">退水后盈亏</td>
                        </tr>

                        <tr v-for="(v,k) in data2" >
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:left;padding-left:15px;">{{v.week_name}}&nbsp;{{v.date_str }}</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">{{v.sum_data.order_num}}</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">{{v.sum_data.sum_money}}</td>
                            <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;" >{{v.sum_data.win}}</td>

                            <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">{{v.sum_data.fs}}</td>
                            <td class="color-red" style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:15px;">
                                <a @click="get_details(v.date_str,v.week_name + '/ ' + v.date_str )" v-if="v.sum_data.order_num > 0" style="font-weight: 700;cursor: pointer;">

                                    <span v-if="v.sum_data.winAndFs>0" style="color: rgb(0, 174, 0);text-decoration:underline;">+{{v.sum_data.winAndFs}}</span>
                                    <span v-if="v.sum_data.winAndFs<0" style="color: red;text-decoration:underline;">{{v.sum_data.winAndFs}}</span>
                                </a>
                                <span v-else>
                        {{v.sum_data.winAndFs}}
                      </span>
                            </td>
                        </tr>
                    </table>



                    <!--具体某天的数据-->
                    <div v-if="details_data.length>1" style="margin-top: 15px;">
                        <table class="details-1 text-center" v-show="!date_flag" >
                            <tr class="color-red">
                                <td>彩种</td>
                                <td>期数</td>
                                <td>注单号</td>
                                <td>时间</td>
                                <td style="text-align:left;padding-left:5px;">下注内容</td>
                                <td style="text-align:right;padding-right:10px;">下注金额</td>
                                <td >中奖结果</td>
                            </tr>
                            <tr v-for="v in details_data">
                                <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.lty_name}}</td>
                                <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.expect}}</td>
                                <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.order_no}}</td>
                                <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.create_time}}</td>
                                <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:left;padding-left:10px;">{{v.mark_a}}{{v.mark_b}}({{v.rate}})</td>
                                <td style="border:1px solid #e5e5e5;box-sizing: border-box;text-align:right;padding-right:10px;">{{v.money|money_digit}}</td>
                                <!--<td style="text-align:center;" v-show="v.open_ret==1">{{v.open_ret==1?'中奖':'未中'}}</td>-->
                                <td v-if="v.open_ret == 1" style="color: #00ae00;font-weight: 700;">中奖</td>
                                <td v-if="v.open_ret == 0" style="color: gray;">未中</td>
                            </tr>
                        </table>

                        <div class="page-xy" v-show="!date_flag">
                            <span v-if="hasPrev" @click="prevPage">◀</span>
                            <span v-if="!hasPrev" style="color:gray;">◀</span>
                            <b>第{{page}}页</b>
                            <span v-if="hasNext" @click="nextPage">▶</span>
                            <span v-if="!hasNext" style="color:gray;">▶</span>
                            <b>共{{pageNum}}页,{{sum}}条</b>
                        </div>
                    </div>
                    <div v-else   style="margin-top: 25px;">

                    </div>
                    <div class="clear"></div>
                </div>
            </div>

            <div class="clear"></div>
    </div>
</template>


<script>
export default
{
   name:"sum_diagam",
   data:function()
   {
       var data =
       {
           tableArray:[1,0,0],
           table_lotterys:[1,0,0,0],
           unclear:[{'order':'','time' :'','content':'','money':'','rate':'', 'win':''}],
           type:'ssc',//默认要的彩种数据
           next_url:'',
           prev_url:'',
           list:[],
           page :1,
           which_time:'',//查看报表的哪一段时间
           summary:{},//报表数据
           sum_week:
           {
               last_week:[
                   {
                       date_str:"04-09",
                       sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },

               ],
               this_week:[
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
                   {
                       date_str:"04-09",
                       sum_data:
                           {
                               fs:0,
                               order_num:0,
                               sum_money:0,
                               win:0,
                               winAndFs:0,
                           },
                       week_name:"星期一"
                   },
               ]
           },//本周和上周的结算报表
           data:[
               {
                   date_str:"04-09",
                   sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                   week_name:"星期一"
               },
               {
                   date_str:"04-09",
                   sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                   week_name:"星期一"
               },
               {
                   date_str:"04-09",
                   sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                   week_name:"星期一"
               },
               {
                   date_str:"04-09",
                   sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                   week_name:"星期一"
               },
               {
                   date_str:"04-09",
                   sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                   week_name:"星期一"
               },
               {
                   date_str:"04-09",
                   sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                   week_name:"星期一"
               },
               {
                   date_str:"04-09",
                   sum_data:
                       {
                           fs:0,
                           order_num:0,
                           sum_money:0,
                           win:0,
                           winAndFs:0,
                       },
                   week_name:"星期一"
               },

           ],
           details_data:[],
           details_show:false,
           hasNext:false,
           hasPrev:false,
           nextPageUrl:'',
           prevPageUrl:'',
           sum:0,
           pageNum:0,
           when_:'星期三/04-11',
           is_coustom_date:false,// 是否自定义时间查找
           pickerOptions1:
           {
               disabledDate(time) {
                 return time.getTime() > Date.now();
               },
           },
           value1:'',
           value2:'',
           filter_type:'',
           data2:[],
           date_flag:true,
       };
       return data;
   },
    filters:{
        money_digit:function(value){
            return Number(value).toFixed(2);
        }
    },
   methods:
   {

       showOne:function(idx)
       {
            this.tableArray = [0,0,0];
            this.tableArray[idx] = 1;
       },
       //切换tab
       tab_lottery:function(idx,str)
       {

            this.table_lotterys = [0,0,0,0];
            this.table_lotterys[idx] = 1;
            this.details_show = false;
            if(idx == 0 )
            {
              this.is_coustom_date = false;
              this.data = this.sum_week['this_week'];
            }
            if(idx == 1 )
            {
              this.is_coustom_date = false;
              this.data = this.sum_week['last_week'];
            }
            if(idx == 3 )
            {
               this.is_coustom_date = false;
               this.data = this.sum_week['this_month'];
            }
            if(idx == 2)
            {
                //获取本日的统计报表
              this.is_coustom_date = false;
                let date  = new Date();
                let month = date.getMonth() + 1;
                let day   = date.getDate();
                let week  = date.getDay();
                let str   = '';
                if (week == 0) {
                    str = "星期日";
                } else if (week == 1) {
                    str = "星期一";
                } else if (week == 2) {
                    str = "星期二";
                } else if (week == 3) {
                    str = "星期三";
                } else if (week == 4) {
                    str = "星期四";
                } else if (week == 5) {
                    str = "星期五";
                } else if (week == 6) {
                    str = "星期六";
                }
                let dateStr =  str + '/' + month + "-" + day;
                this.get_details(month + "-" + day,dateStr);
            }
            if(idx == 4)
            {
                //获取自定义的时间报表
                this.is_coustom_date = true;
            }
       },
       prevPage:function()
       {
           if(!this.hasPrev)
           {
               this.$message.error('没有上一页了');
               return;
           }
           else
           {

               this.$http.get(this.prevPageUrl)
                   .then(function(res)
                   {
                       if(res.data.status == 200)
                       {
                           let data = res.data.data;
                           this.details_data = data.orders;
                           this.hasPrev = data.hasPrev;
                           this.hasNext = data.hasNext;
                           this.sum = data.sum;
                           this.pageNum = data.pageNum;
                           this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
                           this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
                           this.page = data.curPage;
                       }
                       else
                       {
                           this.$message.error(res.data.msg);
                       }
                   });
           }
       },
       nextPage:function()
       {
           if(!this.hasNext)
           {
               this.$message.error('没有下一页了');
               return;
           }
           else
           {
               this.$http.get(this.nextPageUrl)
                   .then(function(res){
                       if(res.data.status == 200)
                       {
                           let data = res.data.data;
                           this.details_data = data.orders;
                           this.hasPrev = data.hasPrev;
                           this.hasNext = data.hasNext;
                           this.sum = data.sum;
                           this.pageNum = data.pageNum;
                           this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
                           this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
                           this.page = data.curPage;
                       }
                       else
                       {
                           this.$message.error(res.data.msg);
                       }
                   });
           }
       },

     /**
      * 获取上周和本周的下注统计
      */
     get_all_data:function()
     {

       this.$http.get(`${this.global.config.API}clearList`).then(function(res)
       {
         if(res.data.status == 200)
         {
           this.sum_week = res.data.data;
           this.data = this.sum_week.this_week;
         }
       });
     },
     //按照日期查找报表
     get_all_data_by_date:function()
     {
       this.$http.get(`${this.global.config.API}clearList2?range=${this.value1}_${this.value2}`).then(function(res)
       {
           if(res.data.status == 200)
           {
             this.data2 = res.data.data.range;
             this.date_flag = true;

           }
       });
     },
     //获取所选日期的详细下注内容
     get_details:function(date_str,str)
     {

          //按时间查找的优先处理
          if(this.table_lotterys[4] == 1)
          {
            this.date_flag = false;
          }


          this.details_show = true;
          this.when_ = str;
          this.when_ = this.when_.replace('undefined/',"");

          //格式不统一，需要格式化下日期格式，有的是04-10  有的是2018-04-10   正确的数据格式是04-10
          if(date_str.length > 8)
          {
             date_str = date_str.substring(5);
          }

          this.$http.get(`${this.global.config.API}details?date=${date_str}`).then(function(res)
          {
             if(res.data.status == 200)
             {
                let data = res.data.data;
                this.details_data = data.orders;
                this.hasPrev = data.hasPrev;
                this.hasNext = data.hasNext;
                this.sum = data.sum;
                this.pageNum = data.pageNum;
                this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
                this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
                this.page = data.curPage;
             }
          });
     },

   },//methods end
   created:function()
   {
     if(window.sessionStorage.isLogin == 'ok')
     {
       this.$store.state.isShowSecond = true;
       this.get_all_data();

     }
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
        /*height: 445px;*/
        margin-left: 10px;
        margin-top:1px;
        padding-bottom: 20px;
        background: #fff;
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

    .xy-left
    {
        width: 185px;
        float: left;
        box-sizing: border-box;
        background: #fff;
        /*border-right:1px solid #e5e5e5;*/
    }
    .xy-list>a
    {
        display: block;
        width: 100%;
        /*padding: 3px;*/
        text-align: left;
        text-indent:35px;
        height: 30px;
        line-height:30px;
        color:#000;
        font-size: 14px;
        box-sizing: border-box;
        cursor: pointer;
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
        width:895px;
        background: #fff;
        float: left;
        position: relative;
    }
    .xy-head
    {
        height:50px;
        background: #e5e5e5;
        width:100%;
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
        color: #000;
        font-size: 14px;

    }
    table>tr
    {
        height: 40px;
        border-bottom:1px solid #e5e5e5;
    }
    td>span
    {
        display: block;
        padding: 3px;
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
        font-size: 16px;
        color: #000;
        padding:8px 0;
        text-align:center;
        /*position: absolute;*/
        /*bottom:5px;*/
        /*left:355px;*/
    }
    .page-xy>span
    {
        cursor: pointer;
    }

</style>
