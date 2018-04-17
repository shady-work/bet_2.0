<template>
    <div class="money-change" >
                    <div class="xy-header">
                         <i class="fa fa-line-chart"></i>
                        <span>未结算报表</span>
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
                         <table v-show="tableArray[0]" >
                            <tr class="color-red">
                                <td>时间</td>
                                <td>期数</td>
                                <td>注单号</td>
                                <td>下注内容</td>
                                <td>当时赔率</td>
                                <td>下注金额</td>
                                <td>预赢金额</td>
                            </tr>
                            <tr v-for="v in data">
                                <td>{{v.create_time}}</td>
                                <td>{{v.expect}}</td>
                                <td>{{v.order_no}}</td>
                                <td>{{v.mark_a}}--{{v.mark_b}}</td>
                                <td>{{v.rate}}</td>
                                <td>{{v.money}}</td>
                                <td>{{v.win}}</td>
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
   name:"unclear_diagam",
   data:function()
   {
       var data =
       {
          tableArray:[1,0,0],
          table_lotterys:[1,0,0,0],
          unclear:[{'order':'','time' :'','content':'','money':'','rate':'', 'win':''}],
          type:'ssc',//默认要的彩种数据
          hasNext:false,
          hasPrev:false,
          next_url:'',
          prev_url:'',
          list:[],
          page :1,
          pageNum:0,
          sum:0,
          data:[],
       };
       return data;
   },
   methods:
   {
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
            this.list = this.getOrder_2(`${this.global.config.API}${this.type}/history/clear/0`);
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

               this.$http.get(this.prevPageUrl)
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
               alert('没有下一页了');
               return;
           }
           else
           {
               this.$http.get(this.nextPageUrl)
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
      getOrder_2 : function(url = `${this.global.config.API}ssc/history/clear/0`)
      {
        var orderData_2 = [];
        this.$http.get(url).then(function(res)
        {
           if(res.data.status == 403) return false;
            let data = res.data.data;
            this.data  = data.list;
            this.hasPrev = data.hasPrev;
            this.hasNext = data.hasNext;
            this.sum = data.sum;
            this.pageNum = data.pageNum;
            this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
            this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
            this.page = data.curPage;

        });

     },

   },
   created:function(){

     if(window.sessionStorage.isLogin == 'ok')
     {
       this.$store.state.isShowSecond = true;
       this.list = this.getOrder_2();

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
    .page-xy
    {
        font-size: 16px;
        color: #000;
        padding:8px 0;
        position: absolute;
        bottom:10px;
        left:355px;
    }
    .page-xy>span
    {
        cursor: pointer;
    }

    .money-change
    {
        width:1080px;
        margin-left:10px;
        margin-top:5px;
    }
    .xy-header
    {
        height: 30px;
        background: #e83a36;
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
    table
    {
        width:100%;
    }
    table tr td
    {
        border: 1px solid #e5e5e5;
        padding:8px 3px;
    }
    .xy-left
    {
        width: 185px;
        height: 590px;
        float: left;
        box-sizing: border-box;
        background: #fff;
        border-right: 1px solid #e5e5e5;

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
        height: 590px;
        width:895px;
        background: #fff;
        float: left;
        position: relative;
    }

</style>
