
<template>
        <div class="money-change">
                <div class="xy-header">
                    <i class="fa fa-bar-chart"></i>
                    <span>资金明细</span>
                    <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
                    <div class="clear"></div>
                </div>
                <div class="money-table">
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
        */
       get_money_details:function()
       {
         this.$http.get(`${this.global.config.API}chgs`)
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

           })
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
           this.$http.get(this.nextPageUrl)
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
      margin-top:5px;
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


