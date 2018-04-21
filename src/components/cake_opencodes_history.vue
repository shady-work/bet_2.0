<template>
    <div>
        <table border="1">
            <tr>
                <td>期数/时间</td>
                <td>开奖号码</td>
                <td colspan="5">总和</td>
                <td>波色</td>

            </tr>
            <tr v-for="v in list">
                <td><p>{{v.expect}}&nbsp;<span style="color:gray">{{v.opentime|get_time}}</span></p></td>
                <td >
                    <span v-for="val in v.details.ball_0" :class="returnColor(val)" class="open-code">{{val}}</span>
                </td>
                <td><span :class="returnColor(v.details.ball_1[0])" class="open-code" style="margin-left:5px;">{{v.details.ball_1[0]}}</span></td>
                <td>{{v.details.ball_2[0]}}</td>
                <td>{{v.details.ball_2[1]}}</td>
                <td>{{v.details.ball_2[2]}}</td>
                <td>{{v.details.ball_2[3]}}</td>
                <!--<td>{{v.details.ball_2[0]}}-{{v.details.ball_2[1]}}-{{v.details.ball_2[2]}}-{{v.details.ball_2[3]}}</td>-->
                <td v-if="v.details.ball_3[0]=='红波'" class="color-red">{{v.details.ball_3[0]}}</td>
                <td v-if="v.details.ball_3[0]=='蓝波'" style="color:blue">{{v.details.ball_3[0]}}</td>
                <td v-if="v.details.ball_3[0]=='绿波'" style="color:green">{{v.details.ball_3[0]}}</td>
                <td v-if="v.details.ball_3[0]=='白'" >{{v.details.ball_3[0]}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "cake_opencodes_history",
        data: function () {
            var data =
                {
                    table_lotterys:[1,0,0,0],
                    type:'ssc',//默认要的彩种数据
                    list:[],
                    page :1,
                    hasNext:false,
                    hasPrev:false,
                    nextPageUrl:'',
                    prevPageUrl:'',
                    sum:0,
                    pageNum:0,
                    isShow:false,
                    details:[],

                };
            return data;
        },
        filters:{
            get_time:function(str)
            {
                let data = str.substring(10);
                return data;
            }

        },
        methods:
            {

                close: function () {
                    this.$parent.showArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this.type = 'ssc';
                    this.table_lotterys = [1,0,0,0];
                },
                cancel: function (event) {
                    var e = event || window.event;
                    e.cancelBubble = true;
                },
                tab_lottery:function(idx,str)
                {
                    this.table_lotterys = [0,0,0,0];
                    this.table_lotterys[idx] = 1;
                    this.type = str;
                    this.list = this.get_codes(`${this.global.config.API}${this.type}/history/lottery`);
                },
                /**
                 * 获取开奖号码
                 * @param url
                 */
                get_codes:function(url = `${this.global.config.API}cake/history/lottery`)
                {
                    this.isShow = false;
                    this.$http.get(url).then(function(res)
                    {
                        if(res.data.status == 200)
                        {
                            console.log(res.data);
                            let data = res.data.data;
                            this.list = data.list;
                            this.hasPrev = data.hasPrev;
                            this.hasNext = data.hasNext;
                            this.sum = data.sum;
                            this.pageNum = data.pageNum;
                            this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
                            this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
                            this.page = data.curPage;
                        }

                    }).then(function()
                    {
                        this.isShow = true;
                    });

                },
                get_sum:function(arr)
                {
                    var sum = 0;
                    for(let i = 0;i <arr.length;i++)
                    {
                        sum += Number(arr[i]);
                    }
                    return sum;
                },
                returnColor:function(num)
                {
                    let className = '';
                    num = parseInt(num);
                    if(num%3 == 0)
                    {
                        className = 'bg-red';
                    }
                    if(num%3 == 1)
                    {
                        className = 'bg-green';
                    }
                    if(num%3 == 2)
                    {
                        className = 'bg-blue';
                    }

                    if(num == 0 || num == 13 || num == 14 || num ==27)
                    {
                        className = 'bg-white';
                    }
                    return className;

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

                        this.$http.get("http://lty-main.com" + this.prevPageUrl)
                            .then(function(res)
                            {
                                if(res.data.status == 200)
                                {
                                    let data = res.data.data;
                                    this.list = data.list;
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
                        this.$http.get("http://lty-main.com" + this.nextPageUrl)
                            .then(function(res){
                                if(res.data.status == 200)
                                {
                                    let data = res.data.data;
                                    this.list = data.list;
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

            },
        created:function(){
            if(window.sessionStorage.isLogin == 'ok')
            {
                this.$store.state.isShowSecond = true;
                this.get_codes();
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
    td{
        border: 1px solid #e5e5e5;
        padding:8px;

    }
    .open-code {
        float: left;
        width: 25px;
        height: 25px;
        background: url('../assets/img/ball.png');
        background-size: cover;
        margin-left:13px;
        margin-right: 2px;
        /*color: #5e6061;*/
        line-height: 25px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color:white;
    }
    .bg-red{
        background: #9c464d!important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }

    .bg-green{
        background: #3b9c6d !important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }


    .bg-blue{
        background: #285b9c !important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
    .bg-white{
        background: #9f9f9f !important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }

</style>