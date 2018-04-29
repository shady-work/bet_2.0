<template>

  <div id="history" >
    <div class="xy-header">
      <i class="fa fa-history"></i>
      <span>历史开奖</span>
      <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
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
      <router-view/>
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
          isShow:false,
        };
      return data;
    },
    methods:
      {


        tab_lottery:function(idx,str)
        {
          this.table_lotterys = [0,0,0,0];
          this.table_lotterys[idx] = 1;
          this.type = str;
          if(idx == 0)
          {
            this.$router.push('/open_history/ssc');
          }
          if(idx == 1)
          {
            this.$router.push('/open_history/pk10');
          }
          if(idx == 2)
          {
            this.$router.push('/open_history/cake');
          }
          if(idx == 3)
          {
            this.$router.push('/open_history/egg');
          }
          return;

        },
        /**
         * 获取开奖号码
         * @param url
         */
        get_codes:function(url = `${this.global.config.API}ssc/history/lottery`)
        {
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


      },
    created:function()
    {
      if(window.sessionStorage.isLogin == 'ok')
      {
        this.$router.push('/open_history/ssc');
        this.$store.state.isShowSecond = true;
        this.get_codes();
      }
    },
    mounted()
    {
      this.$router.push('/open_history/ssc');
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

  #history
  {
    margin-top:1px;
    margin-left:10px;
    padding-bottom:15px;
    background: #fff;
    width: 1200px;
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
    float: left;
    box-sizing: border-box;
    background: #fff;
    /*border-right: 1px solid #e5e5e5;*/
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
    background: #fff;
    float: left;
  }




</style>
