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
            <tr class="color-red">
                <td width="200">期号/时间</td>
                <td>开奖号码</td>
                <td colspan="3">冠亚军和</td>
                <td colspan="5">1~5龙虎</td>
            </tr>
            <tr v-for="v in list">
                <td><p>{{v.expect}}&nbsp;<span style="color:gray">{{v.opentime|get_time}}</span></p></td>
                <td width="360">
                    <span v-for="val in v.open_codes" :class="'hao'+(val/10*10)" class="open-code">{{val/10*10}}</span>
                </td>
                <td>{{v.details.sum[0]}}</td>
                <td v-if="v.details.sum[2]=='大'" class="color-red">{{v.details.sum[2]}}</td>
                <td v-if="v.details.sum[2]=='小'">{{v.details.sum[2]}}</td>
                <td>{{v.details.sum[1]}}</td>
                <td :class="v.details.ball_1[3]=='龙'?'color-red':''">{{v.details.ball_1[3]}}</td>
                <td :class="v.details.ball_2[3]=='龙'?'color-red':''">{{v.details.ball_2[3]}}</td>
                <td :class="v.details.ball_3[3]=='龙'?'color-red':''">{{v.details.ball_3[3]}}</td>
                <td :class="v.details.ball_4[3]=='龙'?'color-red':''">{{v.details.ball_4[3]}}</td>
                <td :class="v.details.ball_5[3]=='龙'?'color-red':''">{{v.details.ball_5[3]}}</td>
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
          table_lotterys: [1, 0, 0, 0],
          type: 'pk10',//默认要的彩种数据
          list: [],
          page: 1,
          hasNext: false,
          hasPrev: false,
          nextPageUrl: '',
          prevPageUrl: '',
          sum: 0,
          pageNum: 0,
          isShow: false,
          details: [],
          value1: '',
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
          type:[],

        };
      return data;
    },
    filters: {
      get_time: function (str) {
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
        get_codes: function (url = `${this.global.config.API}pk10/history/lottery`) {
          this.isShow = false;
          this.$http.get(url).then(function (res) {
            if (res.data.status == 200) {
              let data = res.data.data;
              this.list = data.list;
              this.hasPrev = data.hasPrev;
              this.hasNext = data.hasNext;
              this.sum = data.sum;
              this.pageNum = data.pageNum;
              this.prevPageUrl = this.hasPrev ? data.prevPageUrl : '';
              this.nextPageUrl = this.hasNext ? data.nextPageUrl : '';
              this.page = data.curPage;
            }

          }).then(function () {
            this.isShow = true;
          });

        },
       
        returnColor: function (num) {
          let className = '';
          num = parseInt(num);
          if (num % 3 == 0) {
            className = 'bg-red';
          }
          if (num % 3 == 1) {
            className = 'bg-green';
          }
          if (num % 3 == 2) {
            className = 'bg-blue';
          }

          if (num == 0 || num == 13 || num == 14 || num == 27) {
            className = 'bg-white';
          }
          return className;

        },
        //获取pk10的数据
          get_pk10_history(date)
          {
              let url = ``;
              if(date)
              {
                  url = `${this.global.config.API}pk10/history/lottery?per_page=300&range=${date}`;
              }
              else
              {
                  url = `${this.global.config.API}pk10/history/lottery?per_page=300`;
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
              this.get_pk10_history(this.value1);
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

      },
    created: function () {
      if (window.sessionStorage.isLogin == 'ok') {
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
        "$store.state.isShowSecond": function (n) {
          if (n === false) {
            this.$router.push(window.sessionStorage.which_lty);
          }
        }
      }
  }
</script>

<style scoped>
    td {
        border: 1px solid #e5e5e5;
        padding: 2px 4px;

    }

    .open-code {
        float: left;
        width: 25px;
        height: 25px;
        background: url('../assets/img/ball.png');
        background-size: cover;
        margin-left: 8px;
        margin-right: 2px;
        /*color: #5e6061;*/
        line-height: 25px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: white;
    }

    .hao1 {
        background: #959612;
    }

    .hao2 {
        background: #0060ff;
    }

    .hao3 {
        background: #4d4d4d;
    }

    .hao4 {
        background: #ff7300;
    }

    .hao5 {
        background: #00adad;
    }

    .hao6 {
        background: #5200ff;
    }

    .hao7 {
        background: #666666;
    }

    .hao8 {
        background: #ff0000;
    }

    .hao9 {
        background: #760000;
    }

    .hao10 {
        background: #167301;
    }

    table {
        width: 1000px;
        border: 1px solid #e5e5e5;
        color: #000;
        font-size: 14px;
        height: 485px;
    }
</style>