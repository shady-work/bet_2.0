<template>
  <div class="task" @click="close()">
        <div class="xinyongziliao" @click="cancel($event)">
                <div class="xy-header">
                    <img src="../assets/img/index_19_1.png" alt="">
                    <span>历史开奖</span>
                    <span class="pull-right close-2" @click="close()">X</span>
                    <div class="clear"></div>
                </div>

                <div class="xy-left">

                    <div class="xy-list">
                        <a  class="active">
                            重庆时时彩
                        </a>
                        <a >
                            北京赛车pk10
                        </a>
                        <a >
                           加拿大28
                        </a>
                        <a >
                            pc蛋蛋
                        </a>
                    </div>
                </div>


                <div class="xy-right">
                    <div class="rules color-white text-left">
                            <h2 class="text-center">重庆时时彩规则</h2>
                            <p >一般规则说明</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p> 如果客户怀疑自己的资料被盗用，应立即通知本公司，并更改个 如果客户怀疑自己的资料被盗用，应立即通知本公司，并更改个 如果客户怀疑自己的资料被盗用，应立即通知本公司，并更改个</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                            <p class="text-int-5">客户一经在本公司开户或投注，即被视为已接受这些规则。客户一经在本公司开户或投注，即被视为已接受这些规则。客户一经在本公司开户或投注，即被视为已接受这些规则。</p>
                    </div>

                      <div class="page-xy">
                          注意：本公司不接受任何电脑程式投注的注单，对电脑程式的注单公司有最终解释权谢谢配合！
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

       };
       return data;
   },
   methods:
   {

       close:function()
       {

           this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
       },
       cancel:function(event)
       {
           var e = event || window.event;
           e.cancelBubble = true;
       },

   }
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
   .xy-header>img
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
   }
   .xy-list>.active
   {
       background: -webkit-linear-gradient(left,rgba(210,210,210,0.3),rgba(200,200,200,0)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(210,210,210,0.3),rgba(200,200,200,0)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right,rgba(210,210,210,0.3),rgba(200,200,200,0)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(210,210,210,0.3),rgba(200,200,200,0)); /* 标准的语法 */
   }
   .xy-right
   {
       height: 515px;
       width:715px;
       background: #4294d0;
       float: left;
   }
   .xy-right-top
   {
       width: 100%;
       height: 44px;
       overflow: hidden;
       background: #266ea0;
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
       border: 1px solid #e5e5e5;
       color: #f3f3f3;
       font-size: 14px;
       height: 441px;
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
      background: #174262;
      line-height: 30px;
      color:#c18184;
      font-size:12px;
      text-align:left;
      padding-left:15px;
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
  .page-xy>input
  {
      width: 40px;
      height: 20px;
      margin-top: 5px;
      text-align:center;
      color:#f3f3f3;
      font-size: 12px;
      background: #22618d;
      border:none;
      float: left;
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
