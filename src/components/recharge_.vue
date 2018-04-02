<style scoped>

  #recharge
  {
    overflow: hidden;
  }

  .left,.right
  {
    height: 700px;
    width: 500px;
    border: 1px solid #e5e5e5;
    margin-left: 25px;
    margin-top: 15px;
    float: left;
    color: #fff;
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
    border:1px solid #fff;
    border-bottom: none;
    line-height: 40px;
    cursor: pointer;
  }
  .right-left>ul>li:last-of-type
  {
    border-bottom:1px solid #fff;
  }
  .right-right
  {
    width: 410px;
    height: 400px;

    border:1px solid #fff;
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
    border: none;
    color: #000;
    text-indent:5px;
    font-size: 12px;
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
    background: #9988ff;
    color: white;
    outline: none;
    border: none;
  }
  .tabs .active,.right-left .active
  {
    background: rgba(255,255,255,0.5);
  }
  .article-context
  {
    width: 80%;
    margin:0 auto;
    border: 1px solid #fff;
    box-sizing: border-box;
    padding: 15px 5px;
    margin-top: 25px;
    font-size: 16px;
    line-height: 22px;
  }
</style>
<template>
    <div id="recharge">

        <div class="left">
              <h2 class="title">充值帮助</h2>
              <p class="context">
                尊敬的客户，您好。感谢您使用XXXX平台充值系统尊敬的客户，您好。
                感谢您使用XXXX平台充值系统尊敬的客户，您好。感谢您使用XXXX平台充值系统尊敬的客户，您好。感谢您使用XXXX平台充值系统
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
              <h2 class="mt5">该功能尚未完善</h2>
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
                alert('文章获取失败');
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
            alert(res.data.msg);
            window.location.reload();
         }
         else
         {
           alert('充值失败，请联系管理员，或稍后再试。');
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
              alert(res.data.msg);
              window.location.reload();
            }
            else
            {
              alert('充值失败，请联系管理员，或稍后再试。');
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
         let pattern2 = /^[0-9]{8,26}$/;

         if(!pattern.test(this.bank_topup.bank_name))
         {
            alert('银行名不对');
            return false;
         }
         if(!pattern.test(this.bank_topup.store_name))
         {
            alert('转账户名不对');
            return false;
         }
         if(!pattern2.test( parseInt(this.bank_topup.bank_number)))
         {
            alert('转账户名不对');
            return false;
         }
         if(!pattern2.test(parseInt(this.bank_topup.money)))
         {
            alert('金钱不对');
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
        let pattern2 = /^[0-9]{8,26}$/;

        if(!pattern.test(this.offline_topup.offline_name))
        {
          alert('账号户名不对');
          return false;
        }

        if(!pattern2.test(parseInt(this.offline_topup.money)))
        {
          alert('金钱不对');
          return false;
        }
        return true;
      },
    },
    created()
    {
      this.get_articles();
    }
  }
</script>


