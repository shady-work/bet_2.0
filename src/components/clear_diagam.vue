<template>
    <div class="task" @click="close()">
            <div class="xinyongziliao" id="weijiesuan">
                    <div class="xy-header">
                        <i class="fa fa-bar-chart"></i>
                        <span>已结算报表</span>
                        <span class="pull-right close-2" @click="close()">X</span>
                        <div class="clear"></div>
                    </div>

                    <div class="xy-left">

                        <div class="xy-list">
                            <a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0)">
                                重庆时时彩
                            </a>
                            <a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1)">
                                北京赛车pk10
                            </a>
                            <a :class="table_lotterys[2]?'active':''" @click="tab_lottery(2)">
                            加拿大28
                            </a>
                            <a :class="table_lotterys[3]?'active':''" @click="tab_lottery(3)">
                                pc蛋蛋
                            </a>
                        </div>
                    </div>


                    <div class="xy-right">
                        <div class="xy-right-top">
                            <a :class="tableArray[0]?'active':''" @click="showOne(0)">日报表查询</a>
                            <a :class="tableArray[1]?'active':''" @click="showOne(1)">两周表查询</a>
                            <a :class="tableArray[2]?'active':''" @click="showOne(2)">取消场次单表查询</a>
                        </div>
                        <table v-show="tableArray[0]">
                            <tr>
                                <td>游戏</td>
                                <td>期数</td>
                                <td>场次</td>
                                <td>下注笔数</td>
                                <td>有效金额</td>
                                <td>结果</td>
                                <td>明细查看</td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                        </table>
                        <table v-show="tableArray[1]">
                            <tr>
                                <td>游戏</td>
                                <td>下注笔数</td>
                                <td>有效金额</td>
                                <td>退水</td>
                                <td>中奖</td>
                                <td>结果</td>
                                <td>明细查看</td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                            <tr>
                                <td>2018-03-01</td>
                                <td>3</td>
                                <td>380</td>
                                <td>5.4</td>
                                <td>971</td>
                                <td>+971</td>
                                <td><i class="fa fa-search"></i></td>
                            </tr>
                        </table>

                        <table v-show="tableArray[2]">
                            <tr>
                                <td>注单号/时间</td>
                                <td>下注类型</td>
                                <td>注单类型</td>
                                <td>下注金额</td>
                            </tr>
                             <tr>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                            </tr>
                        </table>
                        <div class="page-xy">
                                <span>◀</span>
                                <input type="text" value="1">
                                <span>/2008</span>
                                <span>▶</span>

                                <span class="pull-right" style="width:auto;">
                                    每页10条，共20080条
                                </span>
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
          table_lotterys:[1,0,0,0]
       };
       return data;
   },
   methods:
   {

       close:function()
       {

           this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
       },
       showOne:function(idx)
       {
            this.tableArray = [0,0,0];
            this.tableArray[idx] = 1;
       },
       tab_lottery:function(idx)
       {
            this.table_lotterys = [0,0,0,0];
            this.table_lotterys[idx] = 1;
       }
   }
}
/**
 * 处理firefox的兼容问题
 */
window.onload = function ()
{
  weijiesuan.onclick = function (evt)
  {
    var e = window.event || evt
    e.cancelBubble = true;
  };
  weijiesuan1.onclick = function (evt)
  {
    var e = window.event || evt;
    e.cancelBubble = true;
  };
  weijiesuan2.onclick = function (evt)
  {
    var e = window.event || evt
    e.cancelBubble = true;
  };

};
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
    .xy-right
    {
        height: 515px;
        width:715px;
        background: #4294d0;
        float: left;
        position: relative;
    }
    .xy-right-top
    {
        width: 100%;
        height: 44px;
        overflow: hidden;
        background: #266ea0;
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
        position: absolute;
        bottom: 0px;
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
</style>
