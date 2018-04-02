<style scoped>
  .beizhu
  {
    width: 200px;
    height: 30px;
  }
  .page-xy
  {
    font-size: 16px;
    color: #fff;
  }
  .page-xy>span
  {
    cursor: pointer;
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
    width:700px;
    height: 445px;
    position: absolute;
    left: 50%;
    margin-left: -350px;
    top: 50px;
  }
  .xy-header
  {
    height: 30px;
    background: #174262;
    color: #f3f3f3;
  }
  .money-table
  {
    background: #4294d0;
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
  .xy-list>a
  {
    display: block;
    width: 100%;
    padding: 3px;
    text-align: left;
    text-indent:35px;
    height: 30px;
    line-height:30px;
    color:#f3f3f3;
    font-size: 14px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .xy-list>.active
  {
    background: -webkit-linear-gradient(left,rgba(210,210,210,0.3),rgba(200,200,200,0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(210,210,210,0.3),rgba(200,200,200,0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right,rgba(210,210,210,0.3),rgba(200,200,200,0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(210,210,210,0.3),rgba(200,200,200,0)); /* 标准的语法 */
  }

  .xy-right-top>a
  {
    float: left;
    height: 22px;
    box-sizing:border-box;
    padding:1px 3px;
    color:#f3f3f3;
    font-size: 13px;
    margin-top: 11px;
    margin-left: 5px;
    line-height: 21px;
    cursor: pointer;
  }
  .xy-right-top>a.active
  {
    background: #5598c5;
    border-radius: 3px;
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
    color: #f3f3f3;
    font-size: 14px;

  }
  table tr
  {
    height: 25px;
    border-bottom:1px solid #2c7db6;
  }
  td>span
  {
    display: block;
    padding: 3px;
  }



</style>
<template>
    <div class="task" @click="close()">
            <div class="xinyongziliao" @click="stop($event)">
                    <div class="xy-header">
                        <i class="fa fa-bar-chart"></i>
                        <span>资金明细</span>
                        <span class="pull-right close-2" @click="close()">X</span>
                        <div class="clear"></div>
                    </div>
                    <div class="money-table">
                      <table border="1">
                         <thead>
                            <tr>
                              <td>类型</td>
                              <td>金额</td>
                              <td>时间</td>
                              <!--<td>备注</td>-->
                            </tr>
                         </thead>
                         <tbody>
                            <tr v-for="(v,k) in data">
                              <td  width="200">{{v.con}}</td>
                              <td  width="200">{{v.chg}}</td>
                              <td  width="200">{{v.opr_time}}</td>
                              <!--<td  class="beizhu"><p>{{v.opr_mark}}</p></td>-->
                            </tr>
                         </tbody>
                      </table>
                      <div class="page-xy">
                        <span @click="prevPage">◀</span>
                        <b>第{{page}}页</b>
                        <span @click="nextPage">▶</span>
                        <b>共{{pageNum}}页,{{sum}}条</b>
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
       };
       return data;
   },

   methods:
   {

       close:function()
       {
           this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
       },
       stop:function(event)
       {
          event.cancelBubble = true;
       },
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
       if(this.prevPageUrl == '')
       {
         alert('没有上一页了');
         return;
       }
       else
       {
         this.page--;
         this.$http.get(`${this.global.config.API}${this.prevPageUrl}`)
           .then(function(res){
             if(res.data.status == 200)
             {
               this.data = res.data.data.chgs.list;
               this.hasPrev = res.data.data.chgs.hasPrev;
               this.hasNext = res.data.data.chgs.hasNext;
               this.prevPageUrl = this.hasPrev?res.data.data.chgs.prevPageUrl:'';
               this.nextPageUrl = this.hasNext?res.data.data.chgs.nextPageUrl:'';
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
       if(this.nextPageUrl == '')
       {
         alert('没有下一页了');
         return;
       }
       else
       {
         this.page++;
         this.$http.get(`${this.global.config.API}${this.nextPageUrl}`)
           .then(function(res){
             if(res.data.status == 200)
             {
               this.data = res.data.data.chgs.list;
               this.hasPrev = res.data.data.chgs.hasPrev;
               this.hasNext = res.data.data.chgs.hasNext;
               this.prevPageUrl = this.hasPrev?res.data.data.chgs.prevPageUrl:'';
               this.nextPageUrl = this.hasNext?res.data.data.chgs.nextPageUrl:'';
             }
             else
             {
               console.log('the codes of pk10c\'s history was load failed');
             }
           });
       }
      },
      my_trim:function(str)
      {
        return str.replace(/^\s+|\s+$/gm,'');
      }

   },//methods end
   created:function()
   {
     if(window.sessionStorage.isLogin == 'ok')
     {
        this.get_money_details();
     }

   },
}

</script>



