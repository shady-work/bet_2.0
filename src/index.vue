<style>
    body
    {
        background: #ea4c4c;
    }
    #center
    {
        float: left;
        min-width: 1100px;
        height: 100%;
        background: #f5f5f5;
        overflow-x: hidden;
        min-height: 1000px;
    }
    #scroll
    {
        position: fixed;
        bottom: 0;
        left: 230px;
        min-width: 1200px;
        height: 29px;
        box-sizing: border-box;
        text-indent: 0;
        color: #000;
        width: 85%;

    }
    #notice
    {
        width: 30px;
        height: 100%;
        min-height: 600px;
        box-sizing: border-box;
        position:fixed;
        right:0;
        top:0;
        padding-top: 78px;
        background: #e83a36;
    }
    .notice
    {
        width: 100%;
        height: 30px;
        display: block;
        background: rgba(100,50,50,0.5);
        line-height: 30px;
        font-size: 16px;
        cursor: pointer;
        position: relative;
        margin-bottom: 15px;
    }
    .recenter-bet
    {
        width: 30px;
        height: 30px;
        display: block;
        background: rgba(100,50,50,0.5);
        line-height: 30px;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 15px;
        position: relative;
        /*position: fixed;
        right: 0;
        bottom:0;*/
    }
    .bet-list
    {
        position: absolute;
        width: 400px;
        left: -400px;
        top: -44px;
        padding-bottom: 10px;
        background: #fff;
        box-sizing: border-box;
        z-index: 10;
        border: 1px solid #e5e5e5;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

    }
    .bet-list td
    {
        padding: 3px;
        border: 1px solid #e5e5e5;
    }
    #bottom
    {
        min-width: 1400px;
        width: 100%;
        min-height: 800px;
    }
</style>
<template>
   <div id="index">
     <!-- 头部 -->
     <my-header></my-header>


    <div id="bottom">

        <!-- 左边的信息 -->
        <left-nav></left-nav>

        <!-- 中间下注区 -->
        <div id="center">

            <router-view/>
            <div class="clear"></div>
        </div>

        <div class="clear"></div>

    </div>



     <div class="clear"></div>
    <!-- 底部的滚动条 -->
     <div id="scroll">
         <marquee behavior="" direction="">Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 Node.js 的包管理器 npm，是全球最大的开源库生态系统。</marquee>
     </div>

     <!--右侧消息通知-->
     <div id="notice">
          <div class="notice" >
              <i class="fa fa-bell color-white"></i>
          </div>
         <div class="clear"></div>

         <div class="recenter-bet" >
             <i class="fa fa-indent color-white" @click="showUnclear()" ></i>
             <div class="bet-list" v-show="$store.state.isShowUnclear">
                 <el-tabs v-model="activeName"  @tab-click="handleClick">
                     <!--ssc-->
                     <el-tab-pane label="重庆时时彩" name="ssc">
                         <table style="width: 100%;font-size: 12px;">
                             <tr>
                                 <td>期数</td>
                                 <td>下注内容</td>
                                 <td>下注金额</td>
                                 <td>赔率</td>
                                 <td>操作</td>
                             </tr>
                             <tr v-for="(v,k) in $store.state.unclear">
                                 <td>{{v.expect}}</td>
                                 <td>{{v.mark_a}}{{v.mark_b}}</td>
                                 <td>{{v.money}}</td>
                                 <td>{{v.rate}}</td>
                                 <td> <el-button type="warning" size="mini" @click="cancelOrder(v.id)" round>取消</el-button></td>
                             </tr>
                         </table>
                     </el-tab-pane>
                     <!--pk10-->
                     <el-tab-pane label="北京PK10" name="pk10">
                         <table style="width: 100%;font-size: 12px;">
                         <tr>
                             <td>期数</td>
                             <td>下注内容</td>
                             <td>下注金额</td>
                             <td>赔率</td>
                             <td>操作</td>
                         </tr>
                         <tr v-for="(v,k) in $store.state.unclear">
                             <td>{{v.expect}}</td>
                             <td>{{v.mark_a}}{{v.mark_b}}</td>
                             <td>{{v.money}}</td>
                             <td>{{v.rate}}</td>
                             <td> <el-button type="warning" size="mini" @click="cancelOrder(v.id)" round>取消</el-button></td>
                         </tr>
                     </table>
                     </el-tab-pane>
                     <!--pcegg-->
                     <el-tab-pane label="PC蛋蛋" name="egg">
                         <table style="width: 100%;font-size: 12px;">
                         <tr>
                             <td>期数</td>
                             <td>下注内容</td>
                             <td>下注金额</td>
                             <td>赔率</td>
                             <td>操作</td>
                         </tr>
                         <tr v-for="(v,k) in $store.state.unclear">
                             <td>{{v.expect}}</td>
                             <td>{{v.mark_a}}{{v.mark_b}}</td>
                             <td>{{v.money}}</td>
                             <td>{{v.rate}}</td>
                             <td> <el-button type="warning" size="mini" @click="cancelOrder(v.id)" round>取消</el-button></td>
                         </tr>
                     </table>
                     </el-tab-pane>
                     <!--cakeno-->
                     <el-tab-pane label="加拿大28" name="cake">
                         <table style="width: 100%;font-size: 12px;">
                         <tr>
                             <td>期数</td>
                             <td>下注内容</td>
                             <td>下注金额</td>
                             <td>赔率</td>
                             <td>操作</td>
                         </tr>
                         <tr v-for="(v,k) in $store.state.unclear">
                             <td>{{v.expect}}</td>
                             <td>{{v.mark_a}}{{v.mark_b}}</td>
                             <td>{{v.money}}</td>
                             <td>{{v.rate}}</td>
                             <td> <el-button type="warning" size="mini" @click="cancelOrder(v.id)" round>取消</el-button></td>
                         </tr>
                     </table>
                     </el-tab-pane>
                 </el-tabs>

                 <div style="margin-top: 15px;">
                     <el-button type="primary" size="small" @click="shutDown()">关闭</el-button>
                 </div>
             </div>
         </div>
     </div>
   </div>
</template>

<script>
  import Header from './components/header.vue';
  import Left from './components/left_nav.vue';
  import Login from './components/login.vue';
  export default
  {
      data:function(){
          return {
            timeId:0,
            timeId3:1,
            activeName:'ssc',//选中哪个彩种
          }
      },
      components:
      {
        'my-header':Header,
        'left-nav':Left,
        'login':Login
      },
      methods:
      {
        /**
         *  每10秒获取用户的个人信息,如果没有成功的话，前去登录页面，清除绶存
         */
        get_users_info:function()
        {
           this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
           {
             if(response.data.status == 200)
             {
               let  data = response.data.data.user;
               this.$store.state.username = data.username;//用户名
               this.$store.state.nickname = data.nickname;//昵称
               this.$store.state.cash_money = data.money.cash_money;//现金额度
               this.$store.state.credit_money = data.money.credit_money;//信用额度
               this.$store.state.win_lost_today = data.yk;//盈亏
             }
             else
             {
               this.$store.state.isLogin    = false; //设置登录flag
               this.$store.state.user_id    = null;//设置登录user_id
               window.sessionStorage.isLogin  = null;  //本地会话保存登录状态
               window.sessionStorage.user_id  = null;//本地会话保存user_id
               window.sessionStorage.admin    = null;
               window.sessionStorage.agent    = null;
               window.sessionStorage.manager  = null;
               window.sessionStorage.nickname = null;
               window.sessionStorage.type     = null;
               window.sessionStorage.username = null;
               window.sessionStorage.token = null;
               window.sessionStorage.index = null;
               clearInterval(this.timeId);
               this.$router.push('/');
             }

           });
         },

        unclear()
        {
            //未结算的数据

        },
        //选项卡切换，加载不同的数据;
        handleClick(obj)
        {
          //获取cqssc未结算的数据
          this.$http.get(`${this.global.config.API}${obj.name}/history/clear/0`).then(function(res)
          {
            if(res.data.status == 403) return false;
            this.orderData = [];
            let data = res.data.data;
            let list  = data.list;
            for(let i = 0; i<list.length;i++)
            {
              this.orderData.push(list[i]);
            }
            //设置全局的未结算清单
            this.$set(this.$store.state,'unclear',this.orderData);

          });
        },
        //关闭未结算的数据
        shutDown()
        {
          this.$store.state.isShowUnclear = false;
        },
        //打开未结算的数据
        showUnclear()
        {
          this.$store.state.isShowUnclear = !this.$store.state.isShowUnclear;
        },
        //取消订单
        cancelOrder(order_id)
        {
          this.$http.delete(`${this.global.config.API}${this.activeName}/order`,{body:{ids:[order_id]}})
            .then(function(res)
            {
              if(res.data.status == 200)
              {
                if(res.data.data.success.indexOf(order_id.toString()) != -1)
                {

                  this.$notify({
                    title: '成功',
                    message: '取消成功',
                    type: 'success',
                    duration:1500,
                  });

                }
                else
                {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.data.msg.msg,
                    duration:1500,
                  });
                }
                //重新加载数据
                let data = {name:this.activeName}
                this.handleClick(data);
              }
              else
              {
                this.$message.error(res.data.msg);
              }
            })
        },
      },
      beforeCreate:function()
      {
        //检测是否登录
        if(window.sessionStorage.isLogin == 'ok')
        {
          this.$http.get(this.global.config.API + 'ifLogin').then(function(res)
          {
            let data = res.data;
            if(data.status == 200)
            {
              this.global.log('欢迎回来~');
              //获取用户信息
              this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
              {
                let  data = response.data.data.user;
                this.$store.state.username = data.username;//用户名
                this.$store.state.nickname = data.nickname;//昵称
                this.$store.state.cash_money = data.money.cash_money;//现金额度
                this.$store.state.credit_money = data.money.credit_money;//信用额度
                this.$store.state.win_lost_today = data.yk;//信用额度
                this.$store.state.return_present = data.fs;//信用额度
              });
              //跳转到cqssc
              this.$router.push('home');
            }
            else
            {

              this.$router.push('/');
              return false;
            }
          });
        }
        else
        {
          this.$router.push('/');
        }


      },
      created:function()
      {
        if(this.$store.state.isLogin)
        {
           clearInterval(this.timeId);
           let that = this ;
           this.timeId = setInterval(that.get_users_info,30000);

           //每25秒刷新未结算的订单，在每次下注后，也会对应刷新；
           /*this.timeId3 = setInterval(function()
           {
             that.$set(that.$store.state,'unclear',that.getOrder());
           },40000);*/
        }

        $(function()
        {
          let browserHeight = $(window).height();
          let headerHeight  = 78;
          $("#left-nav").height(browserHeight - headerHeight);
          //$("#center").height(browserHeight - headerHeight + 80);
          $('.recent-content').height($("#left-nav").height() - 381);
        });

      },
      destroyed()
      {
        clearInterval(this.timeId);
      },
      watch:
      {
        "$store.state.which_lottery":function(n,o)
        {
            this.activeName = n;
        },
      }
  }




</script>


