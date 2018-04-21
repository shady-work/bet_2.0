<template>
    <div>
    <table border="1">
        <tr>
            <td>期号/时间</td>
            <td>显示号码</td>
            <td colspan="3">冠亚军和</td>
            <td colspan="5">1~5龙虎</td>
        </tr>
        <tr v-for="v in list">
            <td><p>{{v.expect}}&nbsp;<span style="color:gray">{{v.opentime|get_time}}</span></p></td>

            <td width="400">
                <span v-for="val in v.open_codes" :class="'hao'+(val/10*10)" class="open-code">{{val}}</span>
            </td>
            <td width="60">{{v.details.sum[0]}}</td>
            <td width="60" v-if="v.details.sum[2]=='大'" class="color-red">{{v.details.sum[2]}}</td>
            <td width="60" v-if="v.details.sum[2]=='小'" >{{v.details.sum[2]}}</td>
            <td width="60">{{v.details.sum[1]}}</td>
            <td width="60" :class="v.details.ball_1[3]=='龙'?'color-red':''">{{v.details.ball_1[3]}}</td>
            <td width="60" :class="v.details.ball_2[3]=='龙'?'color-red':''">{{v.details.ball_2[3]}}</td>
            <td width="60" :class="v.details.ball_3[3]=='龙'?'color-red':''">{{v.details.ball_3[3]}}</td>
            <td width="60" :class="v.details.ball_4[3]=='龙'?'color-red':''">{{v.details.ball_4[3]}}</td>
            <td width="60" :class="v.details.ball_5[3]=='龙'?'color-red':''">{{v.details.ball_5[3]}}</td>

        </tr>
    </table>
    </div>


</template>

<script>
    export default {
        name: "pk10_opencodes_history",
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
                get_codes:function(url = `${this.global.config.API}pk10/history/lottery`)
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
 .hao1
 {
     background: #959612;
 }
 .hao2
 {
     background: #0060ff;
 }
 .hao3
 {
     background: #4d4d4d;
 }
 .hao4
 {
     background: #ff7300;
 }
 .hao5
 {
     background: #00adad;
 }
 .hao6
 {
     background:#5200ff;
 }
 .hao7
 {
     background: #666666;
 }
 .hao8
 {
     background: #ff0000;
 }
 .hao9
 {
     background:#760000;
 }
 .hao10
 {
     background:#167301;
 }
</style>