<template>
  <div class="task" @click="close()">
    <div class="xinyongziliao" @click="cancel">
      <div class="xy-header">
        <img src="../assets/img/index_19_1.png" alt="">
        <span>历史开奖</span>
        <span class="pull-right close-2" @click="close()">X</span>
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
          <tr v-if="type == 'ssc'">
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


          <tr v-if="type == 'pk10'">
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
              <span v-for="val in v.open_codes" class="open-code">{{val}}</span>
            </td>
            <td width="60">{{parseInt(v.open_codes[0]) + parseInt(v.open_codes[1])}}</td>

          </tr>


          <tr v-if="type == 'cake'">
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
              <span v-for="val in v.details.ball_0" class="open-code">{{val}}</span>
            </td>
            <td>{{v.details.ball_1[0]}}</td>
            <td>{{v.details.ball_2[0]}}-{{v.details.ball_2[1]}}-{{v.details.ball_2[2]}}-{{v.details.ball_2[3]}}</td>
            <td>{{v.details.ball_3[0]}}</td>
          </tr>



          <tr v-if="type == 'egg'">
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
              <span v-for="val in v.details.ball_0" class="open-code">{{val}}</span>
            </td>
            <td>{{v.details.ball_1[0]}}</td>
            <td>{{v.details.ball_2[0]}}-{{v.details.ball_2[1]}}-{{v.details.ball_2[2]}}-{{v.details.ball_2[3]}}</td>
            <td>{{v.details.ball_3[0]}}</td>
          </tr>

        </table>
        <div class="page-xy">
          <span @click="prev_page">◀</span>
          <input type="text" v-model="page">
          <span @click="next_page">▶</span>
          <span class="pull-right" style="width:auto;">每页10条</span>
        </div>
      </div>

      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default
{
  data: function () {
    var data =
    {
        table_lotterys:[1,0,0,0],
        type:'ssc',//默认要的彩种数据
        next_url:'',
        prev_url:'',
        list:[],
        page :1,
    };
    return data;
  },
  methods:
  {

    close: function () {

      this.$parent.showArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
      this.list = this.get_codes(`${this.global.config.API}${this.type}/history/lottery/per_page/10`);
    },
    //下一页
    next_page:function(){
      if(this.next_url) this.list = this.get_codes(this.global.config.API + this.next_url);
      else alert('没有下一页');

    },
    //上一页
    prev_page:function(){
      if(this.prev_url) this.list = this.get_codes(this.global.config.API+this.prev_url);
      else alert('没有上一页');
    },
    get_codes:function(url = `${this.global.config.API}ssc/history/lottery/per_page/10`){
      this.$http.get(url).then(function(res){
        let data = res.data.data;
        this.list = data.list;
        this.page = data.curPage;
        this.next_url = data.nextPageUrl;
        this.prev_url = data.prevPageUrl;
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

  },
  created:function(){
    if(window.sessionStorage.isLogin == 'ok')
    {
      this.get_codes();
    }
  },

}
</script>


<style scoped>
  .task {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 3;
  }

  .xinyongziliao {
    width:900px;
    height: 445px;
    position: absolute;
    left: 50%;
    margin-left: -450px;
    top: 50px;
  }

  .xy-header {
    height: 30px;
    background: #e83a36;
    color: #f3f3f3;
  }

  .xy-header > img {
    float: left;
    width: 20px;
    margin-top: 5px;
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

  .close-2 {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 24px !important;
    cursor: pointer;
  }

  .xy-left {
    width: 155px;
    height: 515px;
    float: left;
    box-sizing: border-box;
    background: #fff;
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
    height: 515px;
    width: 745px;
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

  .page-xy {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    background: #e63636;
  }

  .page-xy > span {
    float: left;
    width: 30px;
    line-height: 30px;
    margin-left: 5px;
    margin-right: 3px;
    color: #f3f3f3;
    cursor: pointer;

  }

  .page-xy > input {
    width: 40px;
    height: 20px;
    margin-top: 5px;
    text-align: center;
    color: #f3f3f3;
    font-size: 12px;
    background: #ff7300;
    border: none;
    float: left;
  }
</style>
