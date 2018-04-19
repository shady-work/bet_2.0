<template>

    <div class="xinyongziliao">
            <div class="xy-header">
                <i class="fa fa-bar-chart"></i>
                <span>已结算报表</span>
                <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
                <div class="clear"></div>
            </div>
            <div class="xy-left">

              <div class="xy-list">
                <a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0,'ssc')">
                  重庆时时彩
                </a>
                <a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1,'pk10')">
                  北京赛车pk10
                </a>
                <a :class="table_lotterys[2]?'active':''" @click="tab_lottery(2,'cake')">
                  加拿大28
                </a>
                <a :class="table_lotterys[3]?'active':''" @click="tab_lottery(3,'egg')">
                  pc蛋蛋
                </a>
              </div>
            </div>
            <div class="xy-right">
        <div class="xy-right-top">
          <a :class="tableArray[0]?'active':''" @click="showOne(0)">所有已结算</a>
          <a :class="tableArray[1]?'active':''" @click="showOne(1)">按条件筛选</a>
          <select class="pull-left filter-search" v-model="which_time">
            <option v-bind:value="''">请选择</option>
            <option v-bind:value="'today'">今日</option>
            <option v-bind:value="'this_week'">本周</option>
            <option v-bind:value="'last_week'">上周</option>
            <option v-bind:value="'this_month'">本月</option>
            <option v-bind:value="'last_month'">上月</option>
            <option v-bind:value="'this_year'">本年</option>
          </select>

        </div>
        <table v-show="tableArray[0]">
          <tr class="color-red">
              <td>时间</td>
              <td>期数</td>
              <td>注单号</td>
              <td style="text-align:left;padding-left:15px;">下注内容</td>
              <td>下注金额</td>
              <td>当时赔率</td>
              <td>是否中奖</td>
          </tr>
          <tr v-for="v in data">
              <td>{{v.create_time}}</td>
              <td>{{v.expect}}</td>
              <td>{{v.order_no}}</td>
              <td style="text-align:left;padding-left:15px;">{{v.mark_a}}--{{v.mark_b}}</td>
              <td>{{v.money}}</td>
              <td>{{v.rate}}</td>
              <td v-if="v.open_ret == 1" style="color: #00ae00;font-weight: 700;">中奖</td>
              <td v-if="v.open_ret == 0" style="color: gray;">未中</td>
          </tr>
        </table>
        <table v-show="tableArray[1]">
                <tr>
                  <td>盈亏</td>
                  <td>已结算条数</td>
                  <td>已结算金额</td>
                  <td>中奖条数</td>
                  <td>中奖金额</td>
                  <td>未中奖条数</td>
                  <td>未中奖金额</td>
                  <td>未结算条数</td>
                  <td>未结算金额</td>
                </tr>
                <tr>
                  <td>{{summary.yk}}</td>
                  <td>{{summary.clearedCount}}</td>
                  <td>{{summary.clearedMoney}}</td>
                  <td>{{summary.luckyCount}}</td>
                  <td>{{summary.luckyMoney}}</td>
                  <td>{{summary.unluckyCount}}</td>
                  <td>{{summary.unluckyMoney}}</td>
                  <td>{{summary.unclearedCount}}</td>
                  <td>{{summary.unclearedMoney}}</td>
                </tr>
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
   name:"clear_diagam",
   data:function()
   {
       var data =
       {
           tableArray:[1,0,0],
           table_lotterys:[1,0,0,0],
           unclear:[{'order':'','time' :'','content':'','money':'','rate':'', 'win':''}],
           type:'ssc',//默认要的彩种数据
           nextPageUrl:'',
           prevPageUrl:'',
           sum:0,
           pageNum:0,
           list:[],
           page :1,
           which_time:'',//查看报表的哪一段时间
           summary:{},//报表数据
           hasNext:false,
           hasPrev:false,
           data:[],

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
            this.type = str;
            this.list = this.getOrder_2(`${this.global.config.API}${this.type}/history/clear/1`);
            this.get_data(this.which_time,str)
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

               this.$http.get("http://lty-main.com"+this.prevPageUrl)
                   .then(function(res)
                   {
                       if(res.data.status == 200)
                       {
                           let data = res.data.data;
                           this.data  = data.list;
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
               this.$http.get("http://lty-main.com"+this.nextPageUrl)
                   .then(function(res){
                       if(res.data.status == 200)
                       {
                           let data = res.data.data;
                           this.data  = data.list;
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
       //获取cqssc,pk10,egg,cake未结算的数据
       getOrder_2 : function(url = `${this.global.config.API}ssc/history?clear=1`)
       {
         this.$http.get(url).then(function(res)
         {
           if(res.data.status == 200)
           {
               let data = res.data.data;
               this.page = data.curPage;
               this.data  = data.list;
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
       },

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
                  this.$message.error(res.data.msg);
                }
         })
       },

   },//methods end
   created:function()
   {
     if(window.sessionStorage.isLogin == 'ok')
     {
       this.$store.state.isShowSecond = true;
       this.list = this.getOrder_2();
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
      },
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

    .xinyongziliao
    {
      width:1080px;
      height: 445px;
      margin-left: 10px;
      margin-top:5px;
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
        height: 725px;
        float: left;
        box-sizing: border-box;
        background: #fff;
        border-right:1px solid #e5e5e5;
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
        height: 725px;
        width:895px;
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
    td
    {
        border: 1px solid #e5e5e5;
        padding:8px 3px;
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
        font-size: 16px;
        color: #000;
        padding:8px 0;
        position: absolute;
        bottom:0;
        left:355px;
    }
    .page-xy>span
    {
        cursor: pointer;
    }
</style>
