
<template>
        <div class="money-change">
                <div class="xy-header">
                    <i class="fa fa-bar-chart"></i>
                    <span>资金明细</span>
                    <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
                    <div class="clear"></div>
                </div>
                <div class="money-table">
                  <!--筛选条件-->
                  <div class="filter" style="padding:5px 3px;">
                      <div class="block" style="float:left;">
                          <el-date-picker
                                  v-model="value1"
                                  align="right"
                                  type="date"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期"
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
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions1">
                          </el-date-picker>
                      </div>
                      <div class="pull-left" style="height: 40px;line-height: 40px;margin-left:10px;margin-right:10px;"> 类型 </div>
                      <div class="pull-left">
                          <el-select v-model="filter_type" placeholder="请选择">
                              <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                              </el-option>
                          </el-select>
                      </div>

                      <el-button type="success pull-left ml10" @click="get_money_details_filter()">查询</el-button>
                      <div class="clear"></div>
                  </div>
                  <table border="1">
                     <thead>
                        <tr class="color-red">
                          <td style="text-align:left;padding-left:60px;">时间</td>
                          <td style="text-align:left;padding-left:60px;">类型</td>
                          <td style="text-align:right;padding-right:15px;">变动前金额</td>
                          <td width="50" style="text-align:right;padding-right:15px;">金额</td>
                          <td style="text-align:right;padding-right:15px;">变动后金额</td>
                          <!--<td>备注</td>-->
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(v,k) in data">
                          <td  width="100" style="text-align:left;padding-left:15px;">{{v.opr_time}}</td>
                          <td  width="90" style="text-align:left;padding-left:15px;">{{v.con}}</td>
                          <td  width="40" style="text-align:right;padding-right:15px;">{{v.old|money_digit}}</td>
                          <td  width="40"  style="text-align:right;padding-right:15px;color: rgb(0, 174, 0);" v-if="v.chg>0">+{{v.chg|money_digit}}</td>
                          <td  width="40"  style="text-align:right;padding-right:15px;color: red;" v-if="v.chg<0">{{v.chg|money_digit}}</td>
                          <td  width="40" style="text-align:right;padding-right:15px;">{{v.cur|money_digit}}</td>
                          <!--<td  class="beizhu"><p style="">{{v.opr_mark}}</p></td>-->
                        </tr>
                     </tbody>
                  </table>
                  <div class="page-xy">
                    <span v-if="hasPrev" @click="prevPage">◀</span>
                    <span v-if="!hasPrev" style="color:gray;">◀</span>
                    <b>第{{page}}页</b>
                    <span v-if="hasNext" @click="nextPage">▶</span>
                    <span v-if="!hasNext" style="color:gray;">▶</span>
                    <b>共{{pageNum}}页,{{sum}}条</b>
                  </div>
                </div>
                <div class="clear"></div>
        </div>

</template>


<script>
export default
{
   name:'money_change',
   data:function()
   {
      // let today =
     let time = new Date();
     let year = time.getFullYear();
     let month = time.getMonth() + 1;
     month = month < 10 ? ("0" + month) : month;
     let day = time.getDate();
     day = day < 10 ? ("0" + day) : day;
       var data =
       {
          tableArray:[1,0,0],
          data : [],
          page:1,
          per_page:15,
          hasNext:false,
          hasPrev:false,
          nextPageUrl:'',
          prevPageUrl:'',
          type:null,
          agent:null,
          manager:null,
          username:null,
          nickname_s:null,
          status:null,
          sum:0,
          pageNum:0,
          value:'',
          pickerOptions1:
          {
           disabledDate(time)
           {
             return time.getTime() > Date.now();
           },
           shortcuts:
           [
                {
                  text: '今天',
                  onClick(picker) {
                    picker.$emit('pick', new Date());
                  }
                },
                {
                  text: '昨天',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                  }
                },
                {
                  text: '一周前',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                  }
                }
           ]
          },
          value1:``,//开始的日期
          value2:``,//结束的日期
          options: [{
            value: '0',
            label: '全部'
          },{
              value: '1',
              label: '充值'
              }, {
              value: '2',
              label: '提现'
              }, {
              value: '3',
              label: '下注'
              }, {
              value: '4',
              label: '中奖'
              }, {
            value: '5',
            label: '返水'
          }, {
            value: '6',
            label: '流水'
          },{
            value: '7',
            label: '退款'
          },  ],
          filter_type:"0",//选择类型

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
       /**
        * 获取资金明细列表
        * type: 可选 查询变动类型 1充值 2提现 3下注 4中奖 range: 可选 查询时间范围 today:今天 week: 本周 lastweek: 上周
        */
       get_money_details:function( url =`${this.global.config.API}chgs` )
       {
         this.$http.get(url)
           .then(function(res)
           {
             if(res.data.status == 200)
             {
               this.data = res.data.data.chgs.list;
               this.hasPrev = res.data.data.chgs.hasPrev;
               this.hasNext = res.data.data.chgs.hasNext;
               this.sum = res.data.data.chgs.sum;
               this.pageNum = res.data.data.chgs.pageNum;
               this.prevPageUrl = this.hasPrev?res.data.data.chgs.prevPageUrl:'';
               this.nextPageUrl = this.hasNext?res.data.data.chgs.nextPageUrl:'';
             }
             else
             {
               console.log('用户数据加载失败.....');
             }

           });
       },
       prevPage:function()
       {
        if(!this.hasPrev)
        {
         alert('没有上一页了');
         return;
        }
        else
        {

         this.$http.get('http://lty-main.com'+this.prevPageUrl)
           .then(function(res)
           {
             if(res.data.status == 200)
             {
               this.data = res.data.data.chgs.list;
               this.hasPrev = res.data.data.chgs.hasPrev;
               this.hasNext = res.data.data.chgs.hasNext;
               this.prevPageUrl = this.hasPrev?res.data.data.chgs.prevPageUrl:'';
               this.nextPageUrl = this.hasNext?res.data.data.chgs.nextPageUrl:'';
               this.page = res.data.data.chgs.curPage;

             }
             else
             {
               console.log('the codes of money_change\'s history was load failed');
             }
           });
       }
       },
       nextPage:function()
       {
         if(!this.hasNext)
         {
           alert('没有下一页了');
           return;
         }
         else
         {
           this.$http.get('http://lty-main.com'+this.nextPageUrl)
             .then(function(res){
               if(res.data.status == 200)
               {
                 this.data = res.data.data.chgs.list;
                 this.hasPrev = res.data.data.chgs.hasPrev;
                 this.hasNext = res.data.data.chgs.hasNext;
                 this.prevPageUrl = this.hasPrev?res.data.data.chgs.prevPageUrl:'';
                 this.nextPageUrl = this.hasNext?res.data.data.chgs.nextPageUrl:'';
                 this.page = res.data.data.chgs.curPage;
               }
               else
               {
                 console.log('the codes of pk10c\'s history was load failed');
               }
             });
         }
       },
       // 按条件查询资金变动
       get_money_details_filter()
       {
         //全没值的时候
         if(parseInt(this.filter_type == 0) && !this.value1 && !this.value2)
         {
           this.get_money_details();
           console.log(1);
           return;
         }

         //起始日期为空时
         if(!this.value1)
         {
           if(!this.value2)
           {
             if(parseInt(this.filter_type) != 0)
             {
               this.get_money_details(`${this.global.config.API}chgs?type=${this.filter_type}`);
             }
             else
             {
               this.get_money_details();
             }
           }
           else
           {
             this.get_money_details(`${this.global.config.API}chgs?type=${this.filter_type}&range=${this.value2}_${this.value2}`);
           }
         }
         else
         {
           if(!this.value2)
           {
             this.get_money_details(`${this.global.config.API}chgs?type=${this.filter_type}&range=${this.value1}`);
           }
           else
           {
             if(parseInt(this.filter_type) != 0)
             {
               this.get_money_details(`${this.global.config.API}chgs?type=${this.filter_type}&range=${this.value1}_${this.value2}`);
             }
             else
             {
               this.get_money_details(`${this.global.config.API}chgs?range=${this.value1}_${this.value2}`);
             }

           }

         }
         return;
       },//end get_money_details_filter();


   },//methods end
   created:function()
   {
     if(window.sessionStorage.isLogin == 'ok')
     {
        this.$store.state.isShowSecond = true;
        this.get_money_details();

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
        },
       "value1":function(n,o)
       {
         // console.log(n);
       }
    }
}

</script>












<style scoped>

  .page-xy
  {
    font-size: 16px;
    color: #000;
      padding:8px 0;
  }
  .page-xy>span
  {
    cursor: pointer;
  }

  .money-change
  {
    width:1080px;
      margin-left:10px;
      margin-top:1px;
  }
  .xy-header
  {
    height: 30px;
    background: #e83a36;
    color: #f3f3f3;
  }
  .money-table
  {
    background: white;
    color: #000;
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
  table
  {
      width:100%;
  }
  table tr td
  {
      border: 1px solid #e5e5e5;
      padding:8px 3px;
  }
</style>


