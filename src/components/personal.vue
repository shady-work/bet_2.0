<template>
    <div class="money-change" >
        <div class="xy-header">
            <i class="fa  fa-user-o"></i>
            <span>个人中心</span>
            <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
            <div class="clear"></div>
        </div>

        <div class="xy-left">
            <div class="xy-left">

                <div class="xy-list">
                    <!--<a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0)">-->
                        <!--11111-->
                    <!--</a>-->
                    <!--<a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1)">-->
                        <!--22222-->
                    <!--</a>-->
                    <!--<a :class="table_lotterys[2]?'active':''" @click="tab_lottery(2)">-->
                        <!--33333-->
                    <!--</a>-->
                    <!--<a :class="table_lotterys[3]?'active':''" @click="tab_lottery(3)">-->
                        <!--44444-->
                    <!--</a>-->
                    <a href="#" :class="{'cur':curId === 0}" @click="curId=0">Home</a>
                    <a href="#" :class="{'cur':curId === 1}" @click="curId=1">About</a>
                    <a href="#" :class="{'cur':curId === 2}" @click="curId=2">Contact</a>
                    <a href="#" :class="{'cur':curId === 3}" @click="curId=3">MySpace</a>
                </div>
            </div>

        </div>


        <div class="xy-right" >

                <!--<div v-show="tableArray[0]">111</div>-->
                <!--<div v-show="tableArray[1]">222</div>-->
                <!--<div v-show="tableArray[2]">333</div>-->
                <!--<div v-show="tableArray[3]">444</div>-->
            <div v-show="curId===0">Home Content</div>
            <div v-show="curId===1">About Content</div>
            <div v-show="curId===2">Contact Content</div>
            <div v-show="curId===3">MySpace Content</div>

        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    export default
    {
        name:'personal',
        data:function()
        {
            var data =
                {
                    // tableArray:[1,0,0,0],
                    // table_lotterys:[1,0,0,0],
                    curId:0

                };
            return data;
        },
        methods:
            {
                showOne:function(idx)
                {
                    this.tableArray = [0,0,0,0];
                    this.tableArray[idx] = 1;

                },
                tab_lottery:function(idx)
                {
                    this.table_lotterys = [0,0,0,0];
                    this.table_lotterys[idx] = 1;
                    // this.type = str;
                    // this.list = this.getOrder_2(`${this.global.config.API}${this.type}/history/clear/0`);
                },

                //获取cqssc,pk10,egg,cake未结算的数据
                // getOrder_2 : function(url = `${this.global.config.API}ssc/history/clear/0`)
                // {
                //     var orderData_2 = [];
                //     this.$http.get(url).then(function(res)
                //     {
                //         if(res.data.status == 403) return false;
                //         let data = res.data.data;
                //         this.data  = data.list;
                //         this.hasPrev = data.hasPrev;
                //         this.hasNext = data.hasNext;
                //         this.sum = data.sum;
                //         this.pageNum = data.pageNum;
                //         this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
                //         this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
                //         this.page = data.curPage;
                //
                //     });
                //
                // },

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
        position: absolute;
        bottom:-36px;
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