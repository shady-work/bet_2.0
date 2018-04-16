<template>

    <div class="xinyongziliao" >
      <div class="xy-header">
        <i class="fa fa-history"></i>
        <span>历史开奖</span>
        <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>\
        <div class="clear"></div>
      </div>

      <div class="xy-left">

        <div class="xy-list">
          <a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0,'ssc')">
            重庆时时彩
          </a>
          <a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1,'pk10')">
            北京赛车pk10
          </a>
          <a :class="table_lotterys[2]?'active':''" @click="tab_lottery(2,'cake')">
            加拿大28
          </a>
          <a :class="table_lotterys[3]?'active':''" @click="tab_lottery(3,'egg')">
            pc蛋蛋
          </a>
        </div>
      </div>


      <div class="xy-right">
        <!--<div class="xy-right-top">
          <span>时间:</span>
          <input type="date">
          <span>-</span>
          <input type="date">
          <button>
            查询
          </button>
        </div>-->
        <table border="1">
          <tr v-if="type == 'ssc'" class="color-red">
            <td>日期</td>
            <td>期数</td>
            <td style="width:200px;">
              <p>开奖号码</p>
            </td>
            <td>总和</td>
            <td>总和单双</td>
            <td>总和大小</td>
            <td>龙虎</td>
            <td>前三</td>
            <td>中三</td>
            <td>后三</td>
          </tr >
          <tr v-for="v in list" v-if="type == 'ssc'">
            <td><p>{{v.opentime}}</p></td>
            <td>{{v.expect}}</td>
            <td>
              <span v-for="val in v.open_codes" class="open-code">{{val}}</span>
            </td>
            <td>{{get_sum(v.open_codes)}}</td>
            <td>{{v.details.dragon_and_tiger[1]}}</td>
            <td>{{v.details.dragon_and_tiger[0]}}</td>
            <td>{{v.details.dragon_and_tiger[2]}}</td>
            <td>{{v.details.front_3[0]}}</td>
            <td>{{v.details.medium_3[0]}}</td>
            <td>{{v.details.end_3[0]}}</td>
          </tr>

          <tr v-if="type == 'pk10'" class="color-red">
            <td>日期</td>
            <td>期数</td>
            <td style="width:200px;">
              <p>开奖号码</p>
            </td>
            <td>冠亚和</td>
          </tr>
          <tr v-for="v in list" v-if="type == 'pk10'">
            <td><p>{{v.opentime}}</p></td>
            <td>{{v.expect}}</td>
            <td width="400">
              <span v-for="val in v.open_codes" :class="'hao'+(val/10*10)" class="color-white open-code">{{val}}</span>
            </td>
            <td width="60">{{parseInt(v.open_codes[0]) + parseInt(v.open_codes[1])}}</td>

          </tr>

          <tr v-if="type == 'cake'" class="color-red">
            <td>日期</td>
            <td width="80">期数</td>
            <td style="width:115px;">
              <p>开奖号码</p>
            </td>
            <td width="80">总和</td>
            <td>总和大小-总和单双-总和小单小双-总和极值</td>
            <td width="80">波色</td>

          </tr>
          <tr v-for="v in list" v-if="type == 'cake'">
            <td><p>{{v.opentime}}</p></td>
            <td>{{v.expect}}</td>
            <td >
              <span v-for="val in v.details.ball_0" :class="returnColor(val)" class="color-white open-code">{{val}}</span>
            </td>
            <td><span :class="returnColor(v.details.ball_1[0])" class="color-white open-code" style="margin-left:22px;">{{v.details.ball_1[0]}}</span></td>
            <td>{{v.details.ball_2[0]}}-{{v.details.ball_2[1]}}-{{v.details.ball_2[2]}}-{{v.details.ball_2[3]}}</td>
            <td>{{v.details.ball_3[0]}}</td>
          </tr>

          <tr v-if="type == 'egg'" class="color-red">
            <td>日期</td>
            <td width="80">期数</td>
            <td style="width:115px;">
              <p>开奖号码</p>
            </td>
            <td width="80">总和</td>
            <td>总和大小-总和单双-总和小单小双-总和极值</td>
            <td width="80">波色</td>

          </tr>
          <tr v-for="v in list" v-if="type == 'egg'">
            <td><p>{{v.opentime}}</p></td>
            <td>{{v.expect}}</td>
            <td >
              <span v-for="val in v.details.ball_0" :class="returnColor(val)" class="color-white open-code">{{val}}</span>
            </td>
            <td><span :class="returnColor(v.details.ball_1[0])" class="color-white open-code" style="margin-left:22px;">{{v.details.ball_1[0]}}</span></td>
            <td>{{v.details.ball_2[0]}}-{{v.details.ball_2[1]}}-{{v.details.ball_2[2]}}-{{v.details.ball_2[3]}}</td>
            <td>{{v.details.ball_3[0]}}</td>
          </tr>
        </table>
          <div class="page-xy">
              <span v-if="hasPrev" @click="prevPage">◀</span>
              <span v-if="!hasPrev" style="color:gray;">◀</span>
              <b>第{{page}}页</b>
              <span v-if="hasNext" @click="nextPage">▶</span>
              <span v-if="!hasNext" style="color:gray;">▶</span>
              <b>共{{pageNum}}页,{{sum}}条</b>
          </div>
      </div>

      <div class="clear"></div>
    </div>

</template>

<script>
export default {

  name:'open_history',
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
    };
    return data;
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
    get_codes:function(url = `${this.global.config.API}ssc/history/lottery`)
    {
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
            this.$router.push('index/');
        }
      }
  }

}
</script>


<style scoped>

  .xinyongziliao
  {
      width:1080px;
      margin-top:5px;
      margin-left:10px;

  }

  .xy-header {
    height: 30px;
    background: #e83a36;
    color: #f3f3f3;
  }

  .xy-header > i {
    float: left;
    width: 20px;
    margin-top: 8px;
    height: 20px;
    margin-left: 15px;
  }

  .xy-header > span {
    float: left;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-left: 5px;

  }


  .xy-left {
    width: 155px;
    height: 795px;
    float: left;
    box-sizing: border-box;
    background: #fff;
    border-right: 1px solid #e5e5e5;
  }



  .xy-list > a {
    display: block;
    width: 100%;
    padding: 3px;
    text-align: left;
    text-indent: 35px;
    height: 30px;
    line-height: 30px;
    color: #000;
    font-size: 14px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .xy-list > .active {
    background: -webkit-linear-gradient(left,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* 标准的语法 */
  }

  .xy-right {
    height: 795px;
    width: 925px;
    background: #fff;
    float: left;
  }


  .edu > p {
    height: 20px;
    line-height: 20px;
    color: #f3f3f3;
    font-size: 14px;
  }

  table {
    width: 100%;
    border: 1px solid #e5e5e5;
    color: #000;
    font-size: 14px;
    height: 485px;
  }

  td > span {
    display: block;
    padding: 3px;
  }

  .open-code {
    float: left;
    width: 25px;
    height: 25px;
    background: url('../assets/img/ball.png');
    background-size: cover;
    margin-left: 5px;
    margin-right: 2px;
    color: #5e6061;
    line-height: 25px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }

  .xy-right-top > span {
    float: left;
    height: 30px;
    margin-top: 7px;
    line-height: 30px;
    font-size: 14px;
    margin-left: 5px;
    color: #f3f3f3;
  }

  .xy-right-top > input {
    width: 138px;
    float: left;
    background: none;
    outline: none;
    border: 1px solid #f3f3f3;
    color: #f3f3f3;
    float: left;
    height: 22px;;
    margin-top: 11px;
    margin-left: 5px;
    border-radius: 3px;
  }

  .xy-right-top > button {
    float: left;
    background: #5598c5;
    font-size: 14px;
    padding: 3px;
    outline: none;
    border: 1px solid #f3f3f3;
    color: #f3f3f3;
    margin-top: 9px;
    border-radius: 3px;
    margin-left: 15px;
    width: 70px;
  }

  .page-xy
  {
      font-size: 16px;
      color: #000;
      padding:8px 0;
  }
  .page-xy>span
  {
      cursor: pointer;
  }
  td
  {
      border: 1px solid #e5e5e5;
      padding:8px 3px;
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
