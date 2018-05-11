<!-- header.vue -->
<template>
  <div id="header">
    <!-- 上面的选择 -->
    <div class="a-waps">
      <div id="logo"><img src="" alt=""></div>
      <div id="list">
        <a  @click="showOne(0,'home')" class="nav-top" :class="showArray[0]?'active':''">
          <i class="fa  fa-th-list"></i>
          <p>开奖中心</p>
        </a>

        <a  @click="showOne(1,'money_change')" class="nav-top" :class="showArray[1]?'active':''">
          <i class="fa fa-credit-card"></i>
          <p>资金明细</p>
        </a>


        <a  @click="showOne(2,'unclear_diagam')" class="nav-top" :class="showArray[2]?'active':''">
          <i class="fa fa-line-chart"></i>
          <p>未结明细</p>
        </a>

        <a   @click="showOne(3,'clear_diagam')" class="nav-top" :class="showArray[3]?'active':''">
          <i class="fa fa-bar-chart"></i>
          <p>已结历史</p>
        </a>

        <a @click="showOne(4,'sum_diagam')" class="nav-top" :class="showArray[4]?'active':''">
          <i class="fa fa-pie-chart"></i>
          <p>结算报表</p>
        </a>


        <a  @click="showOne(5,'/open_history/ssc')" class="nav-top" :class="showArray[5]?'active':''">
          <i class="fa fa-clock-o"></i>
          <p>历史开奖</p>
        </a>

        <a @click="showOne(6,'bet_rules')" class="nav-top" :class="showArray[6]?'active':''">
          <i class="fa fa-navicon"></i>
          <p>玩法资讯</p>
        </a>

        <a   @click="showOne(7,'rules')" class="nav-top" :class="showArray[7]?'active':''">
          <i class="fa fa-list-ol"></i>
          <p>玩法规则</p>
        </a>

        <a   @click="showOne(8,'recharge')" class="nav-top" :class="showArray[8]?'active':''">
          <i class="fa fa-usd" aria-hidden="true"></i>
          <p>充值</p>
        </a>


        <a   @click="showOne(9,'withdraw')" class="nav-top" :class="showArray[9]?'active':''">
          <i class="fa fa-yen" aria-hidden="true"></i>
          <p>提现</p>
        </a>

        <a    @click="showOne(10,'personal')" class="nav-top" :class="showArray[10]?'active':''">
          <i class="fa fa-user-o font36"></i>
          <p>个人中心</p>
        </a>

        <a @click="log_out()" class="nav-top">
          <i class="fa fa-sign-out"></i>
          <p>安全退出</p>
        </a>
        <div class="clear"></div>
      </div>

    </div>



  </div>


</template>

<script>


  export default {
    name: "Header",
    data: () => {
      var my_data =
        {
          showArray: [1, 0, 0, 0, 0, 0, 0, 0, 0],
        };
      return my_data;
    },
    methods:
      {

        showOne: function (idx,url) {
          this.showArray = [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0];
          this.showArray[idx] = 1;

          this.$router.push(url);
        },
        /**
         * 退出登录
         */
        log_out: function () {
          this.$http.delete(`${this.global.config.API}token`).then(function (res) {
            this.$store.state.isLogin = false; //设置登录flag
            this.$store.state.user_id = null;//设置登录user_id
            window.sessionStorage.isLogin = null;  //本地会话保存登录状态
            window.sessionStorage.user_id = null;//本地会话保存user_id
            window.sessionStorage.admin = null;
            window.sessionStorage.agent = null;
            window.sessionStorage.manager = null;
            window.sessionStorage.nickname = null;
            window.sessionStorage.type = null;
            window.sessionStorage.username = null;
            window.sessionStorage.token = null;
            window.sessionStorage.index = null;
            window.location.href = '/';
          });

        },



      },
    created: () => {
      //当页面加载时触发的函数
    },

  }

</script>

<style scoped>
  #header {
    width: 100%;
    height: 78px;
    /*background:url('../assets/img/title.jpg');*/
    background: #ea4c4c;
    background-size: cover;
    min-width: 1400px;

  }

  #header > .a-waps {
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  #header a:hover {
    background: #f07873;
  }
  #header .active
  {
    background: #f07873;
  }
  #logo {
    display: block;
    float: left;
    width: 230px;
    height: 100%;
  }

  .nav-top {
    display: block;
    float: left;
    width: 90px;
    height: 78px;
    box-sizing: border-box;
    /* border: 1px solid #000; */
    cursor: pointer;
  }

  .nav-top > img {
    display: block;
    width: 35px;
    height: 35px;
    margin: 0 auto;
    margin-top: 10px;
    opacity: 0.5;
  }

  .nav-top > i {
    display: block;
    width: 35px;
    height: 35px;
    margin: 0 auto;
    margin-top: 10px;
    color: #fff;
    font-size: 32px;
    padding-top: 3px;
    font-weight: 200;
  }

  .nav-top > .font36 {
    font-size: 36px;
  }

  .nav-top > p {
    font-size: 14px;
    margin-top: 5px;
    color: #fff;
    font-weight: 700;
  }

  .nav-top:hover {
    text-decoration: none;
  }
</style>
