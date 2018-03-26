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
                              <td>123</td>
                              <td>123</td>
                              <td>123</td>
                              <td>123</td>
                            </tr>
                         </thead>
                      </table>
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
             //this.data = res.data.data.chgs();
           })
       }

   },//methods end
   created:function()
   {
     if(window.sessionStorage.isLogin == 'ok')
     {
        //this.get_money_details();
     }

   },
}

</script>


<style scoped>
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
        height: 545px;
        position: absolute;
        left: 360px;
        top: 178px;
        /* border: 1px solid #000; */
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
    .xy-left
    {
        width: 185px;
        height: 515px;
        float: left;
        box-sizing: border-box;
        background: #22618d;
    }
    .xy-user
    {
        height: 80px;
        width: 100%;
        line-height:80px;
        font-size: 16px;
        color: #f3f3f3;
    }
    .xy-user
    {
        width: 100%;
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
    table>tr
    {
        height: 40px;
        border-bottom:1px solid #2c7db6;
    }
    td>span
    {
        display: block;
        padding: 3px;
    }



</style>
