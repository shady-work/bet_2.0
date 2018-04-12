<template>
    <div class="task" @click="close()">
            <div class="xinyongziliao" @click="stop($event)">
                    <div class="xy-header">
                        <i class="fa fa-bar-chart"></i>
                        <span>结算报表</span>
                        <span class="pull-right close-2" @click="close()">X</span>
                        <div class="clear"></div>
                    </div>

                    <div class="xy-left">

                      <div class="xy-list">
                        <a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0)">
                           本周报表
                        </a>
                        <a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1)">
                          上周报表
                        </a>
                      </div>
                    </div>
                    <div class="xy-right">
                <div class="xy-right-top">
                  <a :class="tableArray[0]?'active':''" @click="showOne(0)">结算报表</a>
                </div>
                <table v-show="!details_show">
                  <tr>
                    <td>日期</td>
                    <td>下注条数</td>
                    <td>下注总金额</td>
                    <td>盈亏</td>
                    <td>返水</td>
                    <td>退水后盈亏</td>
                  </tr>

                  <tr v-for="(v,k) in data">
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.week_name}}/{{v.date_str }}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.sum_data.order_num}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.sum_data.sum_money}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.sum_data.win}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.sum_data.fs}}</td>
                    <td class="color-red" style="border:1px solid #e5e5e5;box-sizing: border-box">
                      <a @click="get_details(v.date_str)" v-if="v.sum_data.order_num > 0" style="font-weight: 700;cursor: pointer;text-decoration:underline;">
                        {{v.sum_data.winAndFs}}
                      </a>
                      <span v-else>
                        {{v.sum_data.winAndFs}}
                      </span>
                    </td>
                  </tr>
                </table>



                <table class="details-1" v-show="details_show" style="font-size: 12px;">
                  <tr>
                    <td>彩种</td>
                    <td>期数</td>
                    <td>注单号</td>
                    <td>时间</td>
                    <td>下注内容</td>
                    <td>下注金额</td>
                    <td>中奖结果</td>
                  </tr>
                  <tr v-for="v in details_data">
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.lty_name}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.expect}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.order_no}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.create_time}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.mark_a}}{{v.mark_b}}({{v.rate}})</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.money}}</td>
                    <td style="border:1px solid #e5e5e5;box-sizing: border-box">{{v.open_ret==1?'中奖':'未中奖'}}</td>
                  </tr>
                </table>



                <div class="page-xy">
                  <span @click="prev_page">◀</span>
                  <input type="text" v-model="page"  disabled>
                  <span @click="next_page">▶</span>
                </div>
              </div>

                    <div class="clear"></div>
            </div>
    </div>
</template>


<script>
export default
{
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
           sum_week:{},//本周和上周的结算报表
           data:[],
           details_data:[],
           details_show:false,

       };
       return data;
   },
   methods:
   {

       close:function()
       {
           this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
           this.which_time = '';
       },
       stop:function(event)
       {
          event.cancelBubble = true;
       },
       showOne:function(idx)
       {
            this.tableArray = [0,0,0];
            this.tableArray[idx] = 1;
       },
       tab_lottery:function(idx,str)
       {

            this.table_lotterys = [0,0,0,0];
            this.table_lotterys[idx] = 1;
            this.details_show = false;
            if(idx == 0 )
            {
              this.data = this.sum_week['this_week'];
            }
            if(idx == 1 )
            {
              this.data = this.sum_week['last_week'];
            }
       },
       //下一页
       next_page:function(){
         if(this.next_url) this.list = this.get_details('',this.next_url);
         else alert('没有下一页');

       },
       //上一页
       prev_page:function(){
         if(this.prev_url) this.list = this.get_details('',this.prev_url);
         else alert('没有上一页');
       },
       //获取cqssc,pk10,egg,cake未结算的数据

       get_data:function(time = 'today',lty_type = 'ssc')
       {
         this.$http.get(`${this.global.config.API}summary?range=${time}&lty_type=${lty_type}`).then(function(res)
         {

                if(res.data.status == 200)
                {
                  this.summary = res.data.data.summary;
                }
                else
                {
                  console.log('数据加载失败');
                }
         })
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
     get_details:function(date_str,url)
     {
       this.details_show = true;
       if(url)
       {
         this.$http.get(url+'&per_page=10').then(function(res)
         {

           if(res.data.status == 200)
           {
             let data = res.data.data;
             this.next_url = data.nextPageUrl;
             this.prev_url = data.prevPageUrl;
             this.details_data = data.orders;
             this.page = data.curPage;
           }
         });
       }
       else
       {
         this.$http.get(`${this.global.config.API}details?date=${date_str}&per_page=10`).then(function(res)
         {

           if(res.data.status == 200)
           {
             let data = res.data.data;
             this.next_url = data.nextPageUrl;
             this.prev_url = data.prevPageUrl;
             this.details_data = data.orders;
             this.page = data.curPage;
           }
         });
       }

     },

   },//methods end
   created:function()
   {
     if(window.sessionStorage.isLogin == 'ok')
     {

       this.get_all_data();

     }

   },
   watch:
   {
      'which_time':function(n)
      {
          if(n == '')
          {
            this.tableArray  = [1,0,0];
          }
          else
          {
            this.tableArray  = [0,1,0];
            this.get_data(n,this.type);
          }
      }
   }
}

</script>


<style scoped>

    .filter-search
    {
      margin-top: 11px;
      width: 80px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      height: 23px;
      margin-left: 15px;
    }
    .task
    {
        position:fixed;
        width:100%;
        height: 100%;
        left:0;
        top:0;
        background: rgba(0,0,0,0.6);
        z-index:3;
    }
    .xinyongziliao
    {
      width:900px;
      height: 445px;
      position: absolute;
      left: 50%;
      margin-left: -450px;
      top: 50px;
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
        margin-top: 5px;
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
        height: 515px;
        float: left;
        box-sizing: border-box;
        background: #fff;
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
        height: 515px;
        width:715px;
        background: #fff;
        float: left;
        position: relative;
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
        padding:1px 3px;
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
    .xy-right-top-left
    {
        float: left;
        width: 307.5px;
        height: 100%;
        overflow: hidden;
    }
    .yibancai
    {
        height: 100%;
        width: 100px;
        color: #f3f3f3;
        font-size: 18px;
        line-height: 74px;
    }
    .edu
    {
        padding-top: 15px;
        box-sizing: border-box;
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

    .open-code
    {
        float: left;
        width: 25px;
        height: 25px;
        background: url('../assets/img/ball.png');
        background-size: cover;
        margin-left:5px;
        margin-right:2px;
        color: #5e6061;
        line-height: 25px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
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
        position: absolute;
        bottom: 0;
        left:0;
    }
    .page-xy>span
    {
        float: left;
        width:30px;
        line-height:30px;
        margin-left:5px;
        margin-right:3px;
        color:#f3f3f3;
      cursor: pointer;

    }
    .page-xy>input
    {
        width: 40px;
        height: 20px;
        margin-top: 5px;
        text-align:center;
        color:#f3f3f3;
        font-size: 12px;
        background: #ff7300;
        border:none;
        float: left;
    }
</style>
