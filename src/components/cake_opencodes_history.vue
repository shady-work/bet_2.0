<template>
    <div>
        <div class="filter-header" style="height: auto;overflow:hidden;margin-bottom: 15px;margin-top: 15px;">
            <div class="pull-left" style="width: 600px;">
                <div style-="height:30px;width:100%">
                    <el-form ref="form">
                        <el-form-item label="车号分布">
                            <el-checkbox-group v-model="type">
                                <el-checkbox label="0" name="type" v-bind:value="0"></el-checkbox>
                                <el-checkbox label="1" name="type" v-bind:value="1"></el-checkbox>
                                <el-checkbox label="2" name="type"></el-checkbox>
                                <el-checkbox label="3" name="type"></el-checkbox>
                                <el-checkbox label="4" name="type"></el-checkbox>
                                <el-checkbox label="5" name="type"></el-checkbox>
                                <el-checkbox label="6" name="type"></el-checkbox>
                                <el-checkbox label="7" name="type"></el-checkbox>
                                <el-checkbox label="8" name="type"></el-checkbox>
                                <el-checkbox label="9" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>

                <div style-="height:30px;width:100%">
                    <el-form ref="form">
                        <el-form-item label="车道分布">
                            <el-checkbox-group v-model="type2">
                                <el-checkbox label="1" name="type"></el-checkbox>
                                <el-checkbox label="2" name="type"></el-checkbox>
                                <el-checkbox label="3" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="block" style="float:right; ">
                <el-date-picker
                        v-model="value1"
                        align="right"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="指定日期"
                        :picker-options="pickerOptions1">
                </el-date-picker>

                <el-button type="success  ml10" @click="get_data_by_date()">查询</el-button>
            </div>
        </div>
        <div class="clear"></div>
        <table border="1">
            <tr>
                <td>期数/时间</td>
                <td>开奖号码</td>
                <td colspan="5">总和</td>
                <td>波色</td>

            </tr>
            <tr v-for="(v,k) in list">
                <td><p>{{v.expect}}&nbsp;<span style="color:gray">{{v.opentime|get_time}}</span></p></td>
                <td style="padding-left:110px;">
                    <span v-for="(val,key) in v.details.ball_0" :class="isLight(data[k]['codes' + (key+1)].islight,data[k]['codes' + (key+1)].no_,val)" class="open-code">{{val}}</span>
                </td>
                <td style="padding-left:45px;"><span :class="returnColor(v.details.ball_1[0])" class="open-code" style="margin-left:10px;">{{v.details.ball_1[0]}}</span></td>
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
                    value1: '',
                    pickerOptions1: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                    },
                    type:[],
                    type2:[],
                  data:[],

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
                              for(let i = 0; i<this.list.length;i++)
                              {
                                this.data.push(
                                  {
                                    codes1:{ num:this.list[i].details.ball_0[0],islight:false,no_:"1"},
                                    codes2:{ num:this.list[i].details.ball_0[1],islight:false,no_:"2"},
                                    codes3:{ num:this.list[i].details.ball_0[2],islight:false,no_:"3"},

                                  })
                              }
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
              isLight(isLight,no,val)
              {
                val = val.toString();
                //如果没有筛选条件，全亮
                if(this.type.length <1 && this.type2.length < 1)
                {
                  return this.returnColor(val);
                }
                else
                {
                  //有筛选条件的时候
                  if(this.type2.length>0)
                  {
                    //如果选了车道的话，就第几道车道有亮
                    if(this.type2.indexOf(no) != -1)
                    {
                      //如果第一个筛选条件也有话
                      if(this.type.length > 0)
                      {
                        if(this.type.indexOf(val) != -1)
                        {
                          return this.returnColor(val);
                        }
                        else
                        {
                          return '';
                        }
                      }
                      else
                      {
                        return this.returnColor(val);
                      }


                    }
                    else
                    {
                      return '';
                    }
                  }
                  else
                  {
                    if(this.type.indexOf(val) != -1)
                    {
                      return this.returnColor(val);
                    }
                    else
                    {
                      return '';
                    }
                  }
                }
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
                //获取加拿大历史数据
                get_cake_history(date)
                {
                    let url = ``;
                    if(date)
                    {
                        url = `${this.global.config.API}cake/history/lottery?per_page=300&range=${date}`;
                    }
                    else
                    {
                        url = `${this.global.config.API}cake/history/lottery?per_page=300`;
                    }
                    this.isShow = false;
                    this.$http.get(url).then(function(res)
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

                    })
                },
                get_data_by_date()
                {
                    this.get_cake_history(this.value1);
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
        /*background: url('../assets/img/ball.png');*/
        background-size: cover;
        margin-left:13px;
        margin-right: 2px;

        line-height: 25px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color:gray;
    }
    .bg-red{
        background: #9c464d!important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: #fff;
    }

    .bg-green{
        background: #3b9c6d !important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: #fff;
    }


    .bg-blue{
        background: #285b9c !important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: #fff;
    }
    .bg-white{
        background: #9f9f9f !important;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: #fff;
    }
    table{
        width:1000px;
    }
</style>