
<template>
    <div id="recharge">
        <div class="recharge" v-show="!isShowTable" >
            <div class="left">
                <h2 class="title">充值帮助 <a @click="isShowTable = true;" style="font-size: 18px;cursor: pointer;">(充值记录)</a></h2>
                <p class="context">
                    尊敬的客户，您好！
                    本站充值分为三种：
                    银行转账，线下转账（支付宝，微信），第三方。<br>
                    （1）银行转账：请手动转账到对应的本站的收款银行，并且将您的转账信息填写到右侧；<br>
                    （2）线下转账（支付宝，微信）：请手动转账到对应的本站的收款账号，并且将您的转账信息填写到右侧；<br>
                    （3）第三方：点击右侧第三方支付，并按照提示进行；<br>


                </p>
                <!--要显示的充值内容-->
                <div class="article-context mt5" style="text-align: left;" v-html="content"></div>
            </div>

            <div class="right">
                <ul class="tabs">
                    <li @click="choose_one(0)" :class="isActive[0]?'active':''">银行</li>
                    <li @click="choose_one(1)" :class="isActive[1]?'active':''">线下</li>
                    <li @click="choose_one(2)" :class="isActive[2]?'active':''">第三方</li>
                </ul>
                <div class="right-left">
                    <ul>
                        <li v-for="(v,k) in articles" @click="get_an_article(v.id,k)" v-if="v.type == condition" :class="isActive2[k]?'active':''">
                            {{v.title}}
                        </li>
                    </ul>
                </div>

                <!--银行卡充值-->
                <div class="right-right" v-show="condition==0">
                    <h2 class="mt5">请填写您的汇款信息</h2>
                    <div class="input-my">
                        <span>银行名称</span>
                        <input type="text" v-model="bank_topup.bank_name" placeholder="请输入您汇款时使用的银行卡归属银行">
                    </div>

                    <div class="input-my">
                        <span>存款姓名</span>
                        <input type="text" v-model="bank_topup.store_name" placeholder="请输入您汇款时使用的银行卡的户名">
                    </div>

                    <div class="input-my">
                        <span>存款账号</span>
                        <input type="text" v-model="bank_topup.bank_number" placeholder="请输入您汇款时使用的银行卡卡号">
                    </div>

                    <div class="input-my">
                        <span>存款金额</span>
                        <input type="text" v-model="bank_topup.money" placeholder="请输入您此次汇款的金额（10-50000000）">
                    </div>

                    <button class="submit-btn" @click="submit_bank()">提交</button>
                </div>

                <!--线下充值-->
                <div class="right-right" v-show="condition==1" >
                    <h2 class="mt5">请填写您的汇款信息</h2>
                    <div class="input-my">
                        <span>账号姓名</span>
                        <input type="text" v-model="offline_topup.offline_name" placeholder="微信昵称/支付宝户名">
                    </div>

                    <div class="input-my">
                        <span>存款账号</span>
                        <input type="text" v-model="offline_topup.store_number" placeholder="微信号/支付宝账号">
                    </div>

                    <div class="input-my">
                        <span>存款金额</span>
                        <input type="text" v-model="offline_topup.money" placeholder="请输入您此次汇款的金额（10-50000000）">
                    </div>

                    <button class="submit-btn" @click="submit_offline()">提交</button>
                </div>

                <div class="right-right" v-show="condition==2" >
                    <img src="../assets/img/erweima2.jpg" alt="" style="width: 300px;margin-top: 15px;">
                </div>


            </div>
        </div>


        <div class="history" v-show="isShowTable">
           <h2 style="width: 1015px;text-align:center;margin-top: 15px;font-size: 18px;">
               充值记录
               <a class="pull-right" style="margin-right: 15px;cursor: pointer;" @click="isShowTable=false;">返回</a>
           </h2>
           <table width="1000" style="margin-left: 15px;margin-top: 15px;">
               <thead>
                <tr>
                    <td>日期</td>
                    <td>类型</td>
                    <td>金额</td>
                    <td>详情</td>
                    <td>状态</td>
                </tr>
               </thead>
               <tbody>
               <tr v-for="(v,k) in history">
                   <td>{{v.tp_time}}</td>
                   <td>{{v.con}}</td>
                   <td>{{v.money}}</td>
                   <td v-html="v.tp_mark"></td>
                   <td>{{v.tp_stu==1?'审核中':(v.tp_stu==0?'拒绝':'已通过')}}</td>
               </tr>
               </tbody>
           </table>

            <div class="page-xy" style="width: 1015px;margin-top: 15px;">
                <span @click="prevPage">◀</span>
                <b>第{{page}}页</b>
                <span @click="nextPage">▶</span>
                <b>共{{pageNum}}页,{{sum}}条</b>
            </div>
        </div>

    </div>
</template>


<script>
  export default
  {
    name:'Recharge',
    data:function()
    {
      return{
        which_one:'',
        articles:[],//所有文章
        bank:[],//银行的文章
        third:[],//第三方的文章
        offline:[],//线下的文章
        content:'',//文章内容
        condition:0,//  筛选条件
        isActive:[1,0,0],//是否选中此类型的充值方式
        isActive2:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//是否选中这篇文章
        bank_topup:
        {
          //银行的充值提交信息
          bank_name:'',//存款的银行名称
          store_name:'',//存款的户主名
          bank_number:'',//卡号
          money:'',//多少钱
        },
        offline_topup:
        {
          //线下的充值提交信息
          offline_name:'',//转账户名
          store_number:'',//转账的账号
          money:'',//转账金额
        },
        history:[],//充值历史
        isShowTable:false,//是否显示充值记录
        page:1,
        per_page:15,
        hasNext:false,
        hasPrev:false,
        nextPageUrl:'',
        prevPageUrl:'',
          pageNum:0,
        sum:0,
      }
    },
    methods:
    {

      /**
       * 获取所有的文章
       */
      get_articles:function()
      {
         this.$http.get(`${this.global.config.API}articles`)
           .then(function(res)
           {

             if(res.data.status == 200)
              {
                this.articles = res.data.data.articles.list;
                this.classify_articles();
              }
              else
              {
                console.log('文章加载失败');
              }
           });
      },
      /**
       * 文章分类
       */
      classify_articles:function()
      {
          for(let i = 0;i<this.articles.length;i++)
          {
              if(this.articles[i].type === 0)
              {
                this.bank.push(this.articles[i]);
              }
              else if (this.articles[i].type == 1)
              {
                this.offline.push(this.articles[i]);
              }
              else
              {
                this.third.push(this.articles[i]);
              }
          }
          this.get_an_article(this.bank[0].id,0);

      },
      /**
       * 获取某个文章内容
       * @param a_id
       */
      get_an_article:function(a_id,index)
      {

          this.$http.get(`${this.global.config.API}articles/${a_id}`)
            .then(function(res)
            {
              if(res.data.status == 200)
              {
                    this.$set(this,'content',res.data.data.article.content);
                    this.which_one = res.data.data.article.title;
              }
              else
              {
                this.$message(
                {
                  message:'文章获取失败~',
                  type:'warning',
                  center:true,
                });
              }
            });
          this.isActive2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
          this.isActive2[index] = 1;




      },
      /**
       * 切换充值类型
       * @param index
       */
      choose_one:function(index)
      {
        //var flag = 0;
        this.isActive = [0,0,0];
        this.isActive[index] = 1;
        this.condition = index;
        for(let i = 0;i<this.articles.length;i++)
        {
          if(this.articles[i].type === index)
          {
            this.get_an_article(this.articles[i].id,i);
            break;
          }

        }

      },
      /**
       * 提交线下充值的信息
       */
      submit_offline:function ()
      {
        //验证
        if(!this.check_offline())
        {
          return;
        }

        this.$http.post(`${this.global.config.API}topup`,
        {
            money:this.offline_topup.money,
            con:this.which_one  + '充值',
            tp_mark:'存款账号：' + this.bank_topup.store_number + "<br>" + "存款户名：" + this.offline_topup.offline_name,
        }).then(function(res)
        {
         if(res.data.status == 200)
         {
           this.$message(
             {
               message:res.data.msg,
               type:'success',
               center:true,
             });
             this.bank_topup=
                 {
                     //银行的充值提交信息
                     bank_name:'',//存款的银行名称
                     store_name:'',//存款的户主名
                     bank_number:'',//卡号
                     money:'',//多少钱
                 };
             this.offline_topup=
                 {
                     //线下的充值提交信息
                     offline_name:'',//转账户名
                     store_number:'',//转账的账号
                     money:'',//转账金额
                 };
         }
         else
         {
           this.$message(
           {
             message:'充值失败，请联系管理员，或稍后再试。~',
             type:'warning',
             center:true,
           });
         }
         return;
        });
      },
      /**
       * 提交银行充值内容
       */
      submit_bank:function()
      {
        //验证
        if(!this.check_bank())
        {
          return;
        }

        let data =
        {
          money:this.bank_topup.money,
          con:this.which_one  + '充值',
          tp_mark:
          '银行名称：' + this.bank_topup.bank_name + '<br>' +
          '存款账号：' + this.bank_topup.bank_number + "<br>"
          + "存款户名：" + this.bank_topup.store_name,
        };

        this.$http.post(`${this.global.config.API}topup`,data)
          .then(function(res)
          {
            if(res.data.status == 200)
            {
              //充值成功，提示语，清空刚刚填写的信息
              this.$message(
                {
                  message:res.data.msg,
                  type:'success',
                  center:true,
                });

                this.bank_topup=
                {
                    //银行的充值提交信息
                    bank_name:'',//存款的银行名称
                        store_name:'',//存款的户主名
                    bank_number:'',//卡号
                    money:'',//多少钱
                };
                this.offline_topup=
                {
                    //线下的充值提交信息
                    offline_name:'',//转账户名
                        store_number:'',//转账的账号
                    money:'',//转账金额
                };

            }
            else
            {
              this.$message(
                {
                  message:'充值失败，请联系管理员，或稍后再试。',
                  type:'warning',
                  center:true,
                });
            }
            return;
          });
      },
      /**
       * 检测银行转账时的信息
       */
      check_bank:function()
      {
         //验证中文名
         let pattern =  /^[\u4e00-\u9fa5 ]{2,20}$/;
         //银行卡的正则
         let pattern2 = /^[0-9]{2,26}$/;

         if(!pattern.test(this.bank_topup.bank_name))
         {

           this.$message(
             {
               message:'银行名不对',
               type:'warning',
               center:true,
             });
            return false;
         }
         if(!pattern.test(this.bank_topup.store_name))
         {

           this.$message(
             {
               message:'转账户名不对',
               type:'warning',
               center:true,
             });
            return false;
         }
         if(!pattern2.test( parseInt(this.bank_topup.bank_number)))
         {
           this.$message(
             {
               message:'卡名不对',
               type:'warning',
               center:true,
             });
            return false;
         }
         if(!pattern2.test(parseInt(this.bank_topup.money)))
         {
           this.$message(
             {
               message:'金钱不对',
               type:'warning',
               center:true,
             });
            return false;
         }
         return true;
      },
      /**
       * 检测线下的信息
       */
      check_offline:function()
      {
        //验证中文名
        let pattern =  /^[\u4e00-\u9fa5 ]{2,20}$/;
        //银行卡的正则
        let pattern2 = /^[0-9]{2,26}$/;

        if(!pattern.test(this.offline_topup.offline_name))
        {
          this.$message(
            {
              message:'账号户名不对',
              type:'warning',
              center:true,
            });
          return false;
        }

        if(!pattern2.test(parseInt(this.offline_topup.money)))
        {
          this.$message(
            {
              message:'金钱不对',
              type:'warning',
              center:true,
            });
          return false;
        }
        return true;
      },
     /**
      * 获取充值记录
      */
      get_history()
      {
          this.$http.get(`${this.global.config.API}topup`)
              .then((res)=>
              {

                 if(res.data.status == 200)
                 {
                     this.history = res.data.data.list;
                     this.hasPrev = res.data.data.hasPrev;
                     this.hasNext = res.data.data.hasNext;
                     this.sum = res.data.data.sum;
                     this.pageNum = res.data.data.pageNum;
                     this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                     this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                 }
              });
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
                this.$http.get(this.prevPageUrl)
                    .then(function(res)
                    {
                        if(res.data.status == 200)
                        {
                            this.history = res.data.data.list;
                            this.hasPrev = res.data.data.hasPrev;
                            this.hasNext = res.data.data.hasNext;
                            this.sum = res.data.data.sum;
                            this.pageNum = res.data.data.pageNum;
                            this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                            this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                        }
                        else
                        {
                            this.$message.error('充值记录数据加载失败！');
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
                this.$http.get(this.nextPageUrl)
                    .then(function(res){
                        if(res.data.status == 200)
                        {
                            this.history = res.data.data.list;
                            this.hasPrev = res.data.data.hasPrev;
                            this.hasNext = res.data.data.hasNext;
                            this.sum = res.data.data.sum;
                            this.pageNum = res.data.data.pageNum;
                            this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                            this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                        }
                        else
                        {
                            this.$message.error('充值记录数据加载失败！');
                        }
                    });
            }
        },
    },
    created()
    {
      this.get_articles();
      this.get_history();
    }
  }
</script>


<style scoped>

    #recharge
    {
        overflow: hidden;
    }

    .left,.right
    {
        height: 700px;
        width: 300px;
        margin-left: 25px;
        margin-top: 15px;
        float: left;
        color: #000;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 8px;
        overflow: hidden;
    }
    .title
    {
        margin-top: 15px;
        font-size: 16px;
    }
    .context
    {
        text-indent: 8px;
        line-height: 20px;
        text-align: left;
        margin-top: 5px;
    }
    .right
    {
        width: 600px;
    }
    .tabs
    {
        width: 550px;
        margin:0 auto;
        height: 45px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .tabs>li
    {
        float: left;
        line-height: 45px;
        text-align:center;
        width:32.33333%;
        font-size: 16px;
        font-weight: 700;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border:1px solid gray;
        margin-left: 1px;
        cursor: pointer;
    }
    .right-left
    {
        width: 120px;
        height: 40px;
        margin-left: 16px;
        margin-top: 15px;

        float: left;
    }
    .right-left>ul>li
    {
        width: 100%;
        height: 40px;
        border:1px solid #000;
        border-bottom: none;
        line-height: 40px;
        cursor: pointer;
    }
    .right-left>ul>li:last-of-type
    {
        border-bottom:1px solid #000;
    }
    .right-right
    {
        width: 410px;
        height: 400px;

        border:1px solid #000;
        float: left;
        margin-left: 2px;
        margin-top: 15px;
    }
    .input-my
    {
        margin-top: 15px;
    }
    .input-my>input
    {
        height: 30px;
        width: 248px;
        border-radius: 3px;
        color: #000;
        text-indent:5px;
        font-size: 12px;
        border:1px solid #000;
    }
    .input-my>input::-webkit-input-placeholder{
        color:gray;

    }
    .input-my>input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:gray;
    }
    .input-my>input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:gray;
    }
    .input-my>input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:gray;
    }
    .submit-btn
    {
        width: 310px;
        margin-top: 15px;
        height: 30px;
        background: #ff0000;
        color: white;
        outline: none;
        border: none;
    }
    .tabs .active,.right-left .active
    {
        background: #ff7300;
    }
    .article-context
    {
        width: 80%;
        margin:0 auto;
        border: 1px solid #000;
        box-sizing: border-box;
        padding: 15px 5px;
        margin-top: 25px;
        font-size: 16px;
        line-height: 22px;
    }
    td
    {
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        padding:5px 2px;
    }

    .page-xy
    {
        font-size: 16px;
        color: #000;
    }
    .page-xy>span
    {
        cursor: pointer;
    }
</style>
