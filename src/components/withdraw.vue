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
    width:49%;
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
    width: 530px;
    height: 400px;
    float: left;
    margin-left: 19px;
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
              <h2 class="title">提现帮助</h2>
              <p class="context">
                尊敬的客户，您好。感谢您使用XXXX平台提现系统尊敬的客户，您好。
                感谢您使用XXXX平台提现系统尊敬的客户，您好。感谢您使用XXXX平台提现系统尊敬的客户，您好。感谢您使用XXXX平台提现系统
              </p>
              <!--要显示的提现内容-->
        </div>

        <div class="right">
            <ul class="tabs">
              <li @click="choose_one(0)" :class="isActive[0]?'active':''">银行</li>
              <li @click="choose_one(1)" :class="isActive[1]?'active':''">支付宝</li>
            </ul>

            <!--银行卡提现-->
            <div class="right-right" v-show="isActive[0]">
            <h2 class="mt5">请填写您的银行信息</h2>
            <div class="input-my">
              <span>银行名称</span>
              <input type="text" v-model="bank_topup.bank_name" placeholder="如：建设银行">
            </div>

            <div class="input-my">
              <span>开户名称</span>
              <input type="text" v-model="bank_topup.bank_where" placeholder="如：厦门分行">
            </div>

            <div class="input-my">
              <span>银行户名</span>
              <input type="text" v-model="bank_topup.store_name" placeholder="如：张三">
            </div>

            <div class="input-my">
              <span>银行账号</span>
              <input type="text" v-model="bank_topup.bank_number" placeholder="请输入您汇款时使用的银行卡卡号">
            </div>

            <div class="input-my">
              <span>提现金额</span>
              <input type="text" v-model="bank_topup.money" placeholder="请输入您此次汇款的金额（10-50000000）">
            </div>

            <button class="submit-btn" @click="submit_bank()">提交</button>
          </div>

            <!--线下提现-->
            <div class="right-right" v-show="isActive[1]" >
            <h2 class="mt5">请填写您的汇款信息</h2>
            <div class="input-my">
              <span>账号姓名</span>
              <input type="text" v-model="offline_topup.offline_name" placeholder="支付宝户名">
            </div>

            <div class="input-my">
              <span>存款账号</span>
              <input type="text" v-model="offline_topup.store_number" placeholder="支付宝账号">
            </div>

            <div class="input-my">
              <span>存款金额</span>
              <input type="text" v-model="offline_topup.money" placeholder="请输入您此次汇款的金额（10-50000000）">
            </div>

            <button class="submit-btn" @click="submit_offline()">提交</button>
          </div>



        </div>

    </div>
</template>


<script>
  export default
  {
    name:'Withdraw',
    data:function()
    {
      return{
        which_one:'',
        isActive:[1,0,0],//是否选中此类型的提现方式
        bank_topup:
        {
          //银行的提现提交信息
          bank_name:'',//存款的银行名称
          bank_where:'',//开户银行名称
          store_name:'',//存款的户主名
          bank_number:'',//卡号
          money:'',//多少钱

        },
        offline_topup:
        {
          //线下的提现提交信息
          offline_name:'',//转账户名
          store_number:'',//转账的账号
          money:'',//转账金额
        },
      }
    },
    methods:
    {


      /**
       * 切换提现类型
       * @param index
       */
      choose_one:function(index)
      {
        //var flag = 0;
        this.isActive = [0,0,0];
        this.isActive[index] = 1;

      },
      /**
       * 提交线下提现的信息
       */
      submit_offline:function ()
      {
        //验证
        if(!this.check_offline())
        {
          return;
        }

        this.$http.post(`${this.global.config.API}withdraw`,
        {
            money:this.offline_topup.money,
            con:'支付宝提现',
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
           alert('提现失败，请联系管理员，或稍后再试。');
         }
         return;
        });
      },
      /**
       * 提交银行提现内容
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
          con:'银行转账提现',
          tp_mark:
          '银行名称：' + this.bank_topup.bank_name + '<br>' +
          '存款账号：' + this.bank_topup.bank_number + "<br>"
          + "存款户名：" + this.bank_topup.store_name + "<br>"
          + "开户银行：" +this.bank_topup.bank_where,
        };

        this.$http.post(`${this.global.config.API}withdraw`,data)
          .then(function(res)
          {
            if(res.data.status == 200)
            {
              alert(res.data.msg);
              window.location.reload();
            }
            else
            {
              alert('提现失败，请联系管理员，或稍后再试。');
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
        let pattern2 = /^[0-9]{2,26}$/;

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

    }
  }
</script>


