<template>
  <div class="task" @click="close()">
        <div class="xinyongziliao" @click="cancel()">
                <div class="xy-header">
                    <img src="../assets/img/index_19_1.png" alt="">
                    <span>信用资料</span>
                    <span class="pull-right close-2" @click="close()">X</span>
                    <div class="clear"></div>
                </div>

                <div class="xy-left">
                    <div class="xy-user">
                        账号:{{nickname}}
                    </div>
                    <div class="xy-list">
                        <a href="" class="active">
                            重庆时时彩
                        </a>
                        <a href="">
                            北京赛车pk10
                        </a>
                        <a href="">
                           加拿大28
                        </a>
                        <a href="">
                            pc蛋蛋
                        </a>
                    </div>
                </div>


                <div class="xy-right">
                      <div class="xy-right-top">
                        <div class="xy-right-top-left">
                            <span class="yibancai pull-left">一般彩</span>
                            <div class="edu pull-left">
                                <p>信用额度：2000</p>
                                <p>可用额度：2000</p>
                            </div>
                        </div>
                        <div class="xy-right-top-left">
                            <span class="yibancai pull-left">快彩</span>
                            <div class="edu pull-left">
                                <p>信用额度：2000</p>
                                <p>可用额度：2000</p>
                            </div>
                        </div>
                      </div>
                      <table border="1">
                          <tr>
                              <td rowspan="2">玩法</td>
                              <td colspan="2">退水设定</td>
                              <td colspan="3">限注</td>
                          </tr>
                          <tr>
                              <td>B盘</td>
                              <td>D盘</td>
                              <td>单注最小</td>
                              <td>单注最大</td>
                              <td>单场(号)最高限额</td>
                          </tr>
                          <tr>
                              <td>
                                  <span>第一球</span>
                                  <span>第二球</span>
                                  <span>第三球</span>
                                  <span>第四球</span>
                                  <span>第五球</span>
                                  <span>第一球大小</span>
                                  <span>第二球大小</span>
                                  <span>第三球大小</span>
                                  <span>第四球大小</span>
                                  <span>第五球大小</span>
                                  <span>第一球单双</span>
                                  <span>第二球单双</span>
                                  <span>第三球单双</span>
                                  <span>第四球单双</span>
                                  <span>第五球单双</span>
                                  
                              </td>
                              <td>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                              </td>
                               <td>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                              </td>
                               <td>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                              </td>
                               <td>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                              </td>
                               <td>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                                  <span>2.6</span>
                              </td>
                          </tr>
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
          
       };
       return data;
   },
   created:function()
   {
       this.nickname = window.sessionStorage.nickname?window.sessionStorage.nickname:this.nickname;
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
       background: rgba(0,0,0,0.5);
       z-index:3;
   }
   .xinyongziliao
   {
       width:800px;
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
       width:615px;
       background: #4294d0;
       float: left;
   }
   .xy-right-top
   {
       width: 100%;
       height: 74px;
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
</style>
