
<template>
    <div id="recharge">

        <div class="recharge" v-show="!isShowTable" >

            <div class="right">
                <ul class="tabs">
                    <li @click="choose_one(0)" :class="isActive[0]?'active':''">银行</li>
                    <li @click="choose_one(1)" :class="isActive[1]?'active':''">支付宝</li>
                    <p style="text-align:left;line-height:30px;" v-for="(v,k) in history">当前可提款金额为:<b>{{$store.state.cash_money>0?$store.state.cash_money:0}}</b></p>
                </ul>

                <!--银行卡提现-->
                <div class="right-right" v-show="isActive[0]">
                    <!--<h2 class="mt5" style="margin-top:15px;">请填写您的银行信息</h2>-->
                    <div class="input-my">
                        <p>银行名称</p>
                        <input type="text" v-model="bank_topup.bank_name" placeholder="如：建设银行">
                    </div>

                    <div class="input-my">
                        <p>开户名称</p>
                        <input type="text" v-model="bank_topup.bank_where" placeholder="如：厦门分行">
                    </div>

                    <div class="input-my">
                        <p>银行户名</p>
                        <input type="text" v-model="bank_topup.store_name" placeholder="如：张三">
                    </div>

                    <div class="input-my">
                        <p>银行账号</p>
                        <input type="text" v-model="bank_topup.bank_number" placeholder="请输入您汇款时使用的银行卡卡号">
                    </div>

                    <div class="input-my">
                        <p>提现金额</p>
                        <input type="text" v-model="bank_topup.money" placeholder="请输入您此次汇款的金额（10-50000000）">
                    </div>

                    <button class="submit-btn" @click="submit_bank()">提交</button>
                </div>

                <!--线下提现-->
                <div class="right-right" v-show="isActive[1]" >
                    <!--<h2 class="mt5">请填写您的汇款信息</h2>-->
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

            <div class="left" style="margin-top:-4px;">
                  <h2 class="title">提现帮助</h2>
                  <p class="context">
                    尊敬的客户，您好!请按照你的提现方式，进行填写您的提现信息，请务必填写正确的信息，否则会导致提现失败。
                      <!--<br>-->
                      提现需要时间审核，请您耐心等待。
                  </p>
                  <!--<p  @click="isShowTable = true;" style="margin-top: 15px;cursor: pointer;font-size: 16px;text-decoration:underline;">查看提现记录</p>-->
                  <!--要显示的提现内容-->

                  <!--提现金额及银行明细-->
                <div class="history" style="margin-top:10px;">
                    <h2 style="width:480px;text-align:center;font-size: 16px;">
                        提现记录
                        <!--<a class="pull-right" style="margin-right: 15px;cursor: pointer;" @click="isShowTable=false;">返回</a>-->
                    </h2>
                    <table width="490" style="margin-top: 15px;">
                        <thead>
                        <tr>
                            <td width="130">日期</td>
                            <td>类型</td>
                            <!--<td>金额</td>-->
                            <td style="text-align:left;padding-left:80px;">详情</td>
                            <td>状态</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(v,k) in history">
                            <td>{{v.tp_time|get_time()}}</td>
                            <td>{{v.con}}</td>
                            <!--<td>{{v.money}}</td>-->
                            <td v-html="v.tp_mark+ '<br>提现金额 : '+ v.money" style="text-align:left;padding-left:30px;"></td>
                            <td>{{v.tp_stu==1?'审核中':(v.tp_stu==0?'拒绝':'已通过')}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <!--<div class="page-xy" style="width:400px;margin-top: 15px;">-->
                        <!--<span @click="prevPage">◀</span>-->
                        <!--<b>第{{page}}页</b>-->
                        <!--<span @click="nextPage">▶</span>-->
                        <!--<b>共{{pageNum}}页,{{sum}}条</b>-->
                    <!--</div>-->
                </div>
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
           this.$message(
             {
               message:res.data.msg,
               type:'success',
               center:true,
             });
         }
         else
         {
           this.$message(
             {
               message:'提现失败，请联系管理员，或稍后再试。',
               type:'warning',
               center:true,
             });
         }

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
              this.$message(
                {
                  message:res.data.msg,
                  type:'success',
                  center:true,
                });
              window.location.reload();
            }
            else
            {
              this.$message(
                {
                  message:'提现失败，请联系管理员，或稍后再试。',
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
               message:'卡号不对',
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
            this.$http.get(`${this.global.config.API}withdraw`)
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
    filters:{
        get_time:function (str) {
            let data=str.substring(0,16);
            return data;
        }
    },
    created()
    {
        this.get_history();
    }
  }
</script>


<style scoped>

    #recharge
    {
        overflow: hidden;
        overflow-x:auto;


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
    /*提款明细*/
    .left{
        height:700px;
        width:500px;
    }
    .left>ul>li{
        float:left;
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
        width:300px;
    }
    .tabs
    {
        width:295px;
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
        width:295px;
        height: 400px;
        float: left;
        margin-left: 19px;
        margin-top: 15px;
    }
    .input-my
    {

        margin-top: 15px;
        text-align:left;
    }
    .input-my>input
    {
        height:30px;
        width:260px;
        border-radius: 3px;
        color: #000;
        text-indent:5px;
        font-size: 12px;
        border: 1px solid #000;
        margin-top:10px;
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
        width:260px;
        margin-left:-30px;
        margin-top:20px;
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
        border: 1px solid #fff;
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