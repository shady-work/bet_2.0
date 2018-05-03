<template>
    <div id="recharge">
        <div class="recharge" v-show="!isShowTable">
            <div class="top">
                <ul class="tabs">
                    <li @click="choose_one(0)" :class="isActive[0]?'active':''">充值线路一[银行存款]</li>
                    <li @click="choose_one(1)" :class="isActive[1]?'active':''">充值线路二[线下]</li>
                    <li @click="choose_one(2)" :class="isActive[2]?'active':''">充值线路三[第三方]</li>
                    <li @click="choose_one(3)" :class="isActive[3]?'active':''">充值线路四</li>
                    <li @click="choose_one(4)" :class="isActive[4]?'active':''">充值线路五</li>
                    <li @click="choose_one(5)" :class="isActive[5]?'active':''">充值线路六</li>
                    <!--<li @click="choose_one(2)" :class="isActive[2]?'active':''">充值线路七</li>-->
                </ul>
            </div>


            <div class="bottom" style="margin-top:0px;">

                <div class="left">

                    <h2 class="title" style="font-size:30px;font-weight:300;">收款信息
                    </h2>
                    <!--信息-->
                    <div class="context" v-show="isActive[0]">
                         <div class="context-top">

                                <span >开户银行:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中国工商银行</span><br>
                                 <span>银行卡号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;618586552487845</span><br>
                                 <span>收款名称:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;王某某</span><br>
                         </div>

                          <div class="context-bottom" style="margin-top:50px;">
                              <p style="padding-left:20px;">操作说明:</p>
                              <p style="margin-top:20px;padding-left:20px;text-indent:30px;">请使用实时到账方式转账,如果柜员机因中国银行法规,在柜员机转账后24小时内可操作取消转账操作,所以审核到账时间会在24小时内确认到账后才会充值成功</p>
                          </div>
                    </div>
                    <!--第三方收款信息-->
                    <div class="context" v-show="isActive[2]">
                        <div class="context-top">
                            <img src="../assets/img/erweima2.jpg" alt="" style="width:200px;margin-top: 15px;margin-left:80px;" v-show="isActive[2]">
                        </div>
                    </div>
                </div>

                <div class="right" style="margin-left:10px;width:630px;">
                    <h2 class="title" style="font-size:30px;font-weight:300;">付款信息
                    </h2>
                    <div class="context">
                        <!--银行卡充值-->
                        <div class="context-top " style="width:500px;" >
                            <form action="" v-show="isActive[0]">
                                <p style="margin-bottom:30px;margin-left:80px;">充值线路:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;充值线路一[银行存款]<br></p>
                                <p style="margin-bottom:30px;margin-left:80px;">订单编号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;li-username-20180503-123456789</p>
                                <p style="margin-bottom:30px;margin-left:80px;">充值金额:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"  v-model="bank_topup.money"></p>
                                <p style="margin-bottom:30px;margin-left:80px;">付款银行:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"  v-model="bank_topup.bank_name"></p>
                                <p style="margin-bottom:30px;margin-left:80px;">银行卡号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"  v-model="bank_topup.bank_number"></p>
                                <p style="margin-bottom:30px;margin-left:80px;">开户姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"  v-model="bank_topup.store_name"></p>
                                <button style="width:300px;height:40px;margin-left:165px;" @click="submit_bank()">我已完成打款,确认提交</button>
                                <!--<p style="margin-bottom:30px;margin-left:80px;">打款时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"></p>-->
                            </form>
                        </div>
                        <!--线下充值-->
                        <div class="context-top " style="width:500px;">
                            <form action=""  v-show="isActive[1]">
                                <p style="margin-bottom:30px;margin-left:80px;">充值线路:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;充值线路二[线下]<br></p>
                                <p style="margin-bottom:30px;margin-left:80px;">订单编号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;li-username-20180503-123456789</p>
                                <p style="margin-bottom:30px;margin-left:80px;">账号姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="offline_topup.offline_name" placeholder="微信昵称/支付宝户名"></p>
                                <p style="margin-bottom:30px;margin-left:80px;">存款账号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="offline_topup.store_number" placeholder="微信号/支付宝账号"></p>
                                <p style="margin-bottom:30px;margin-left:80px;">存款金额:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="offline_topup.money" placeholder="请输入您此次汇款的金额"></p>
                                <button style="width:300px;height:40px;margin-left:165px;" @click="submit_offline()">我已完成打款,确认提交</button>
                            </form>
                        </div>
                        <!--第三方-->
                        <div class="context-top " style="width:500px;">
                            <form action=""  v-show="isActive[2]">
                                <p style="margin-bottom:30px;margin-left:80px;">充值线路:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;充值线路三[第三方]<br></p>
                                <p style="margin-bottom:30px;margin-left:80px;">订单编号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;li-username-20180503-123456789</p>
                            </form>
                        </div>


                    </div>
                </div>




                <!--<div class="left">-->
                    <!--<div class="right-left">-->
                        <!--<ul>-->
                            <!--<li v-for="(v,k) in articles" @click="get_an_article(v.id,k)" v-if="v.type == condition"-->
                                <!--:class="isActive2[k]?'active':''">-->
                                <!--{{v.title}}-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</div>-->

                    <!--&lt;!&ndash;银行卡充值&ndash;&gt;-->
                    <!--<div class="right-right" v-show="condition==0">-->
                        <!--<h2 class="mt5">请填写您的汇款信息</h2>-->
                        <!--<div class="input-my">-->
                            <!--<p>银行名称</p>-->
                            <!--<input type="text" v-model="bank_topup.bank_name" placeholder="请输入您汇款时使用的银行卡归属银行">-->
                        <!--</div>-->

                        <!--<div class="input-my">-->
                            <!--<p>存款姓名</p>-->
                            <!--<input type="text" v-model="bank_topup.store_name" placeholder="请输入您汇款时使用的银行卡的户名">-->
                        <!--</div>-->

                        <!--<div class="input-my">-->
                            <!--<p>存款账号</p>-->
                            <!--<input type="text" v-model="bank_topup.bank_number" placeholder="请输入您汇款时使用的银行卡卡号">-->
                        <!--</div>-->

                        <!--<div class="input-my">-->
                            <!--<p>存款金额</p>-->
                            <!--<input type="text" v-model="bank_topup.money" placeholder="请输入您此次汇款的金额（10-50000000）">-->
                        <!--</div>-->

                        <!--<button class="submit-btn" @click="submit_bank()">提交</button>-->
                    <!--</div>-->

                    <!--&lt;!&ndash;线下充值&ndash;&gt;-->
                    <!--<div class="right-right" v-show="condition==1">-->
                        <!--<h2 class="mt5">请填写您的汇款信息</h2>-->
                        <!--<div class="input-my">-->
                            <!--<span>账号姓名</span>-->
                            <!--<input type="text" v-model="offline_topup.offline_name" placeholder="微信昵称/支付宝户名">-->
                        <!--</div>-->

                        <!--<div class="input-my">-->
                            <!--<span>存款账号</span>-->
                            <!--<input type="text" v-model="offline_topup.store_number" placeholder="微信号/支付宝账号">-->
                        <!--</div>-->

                        <!--<div class="input-my">-->
                            <!--<span>存款金额</span>-->
                            <!--<input type="text" v-model="offline_topup.money" placeholder="请输入您此次汇款的金额（10-50000000）">-->
                        <!--</div>-->

                        <!--<button class="submit-btn" @click="submit_offline()">提交</button>-->
                    <!--</div>-->

                    <!--<div class="right-right" v-show="condition==2">-->
                        <!--<img src="../assets/img/erweima2.jpg" alt="" style="width: 300px;margin-top: 15px;">-->
                    <!--</div>-->


                <!--</div>-->
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

        <!--充值提示框-->
        <el-dialog
                title="充值成功"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <div v-html="bet_html"></div>

            <span slot="footer" class="dialog-footer">
     <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        name: 'Recharge',
        data: function () {
            return {
                centerDialogVisible: false,
                bet_html: '',
                which_one: '',
                articles: [],//所有文章
                bank: [],//银行的文章
                third: [],//第三方的文章
                offline: [],//线下的文章
                content: '',//文章内容
                condition: 0,//  筛选条件
                isActive: [1, 0, 0,0,0,0],//是否选中此类型的充值方式
                isActive2: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//是否选中这篇文章
                bank_topup:
                    {
                        //银行的充值提交信息
                        bank_name: '',//存款的银行名称
                        store_name: '',//存款的户主名
                        bank_number: '',//卡号
                        money: '',//多少钱
                    },
                offline_topup:
                    {
                        //线下的充值提交信息
                        offline_name: '',//转账户名
                        store_number: '',//转账的账号
                        money: '',//转账金额
                    },
                history: [],//充值历史
                isShowTable: false,//是否显示充值记录
                page: 1,
                per_page: 15,
                hasNext: false,
                hasPrev: false,
                nextPageUrl: '',
                prevPageUrl: '',
                pageNum: 0,
                sum: 0,
                bet_html: '',
            }
        },
        methods:
            {

                /**
                 * 获取所有的文章
                 */
                get_articles: function () {
                    this.$http.get(`${this.global.config.API}articles`)
                        .then(function (res) {

                            if (res.data.status == 200) {

                                this.articles = res.data.data.articles.list;
                                this.classify_articles();
                            }
                            else {
                                console.log('文章加载失败');
                            }
                        });
                },
                /**
                 * 文章分类
                 */
                classify_articles: function () {
                    for (let i = 0; i < this.articles.length; i++) {
                        if (this.articles[i].type === 0) {
                            this.bank.push(this.articles[i]);
                        }
                        else if (this.articles[i].type == 1) {
                            this.offline.push(this.articles[i]);
                        }
                        else {
                            this.third.push(this.articles[i]);
                        }
                    }
                    this.get_an_article(this.bank[0].id, 0);

                },
                /**
                 * 获取某个文章内容
                 * @param a_id
                 */
                get_an_article: function (a_id, index) {

                    this.$http.get(`${this.global.config.API}articles/${a_id}`)
                        .then(function (res) {
                            if (res.data.status == 200) {
                                this.$set(this, 'content', res.data.data.article.content);
                                this.which_one = res.data.data.article.title;
                            }
                            else {
                                this.$message(
                                    {
                                        message: '文章获取失败~',
                                        type: 'warning',
                                        center: true,
                                    });
                            }
                        });
                    this.isActive2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this.isActive2[index] = 1;


                },
                /**
                 * 切换充值类型
                 * @param index
                 */
                choose_one: function (index) {
                    //var flag = 0;
                    this.isActive = [0, 0, 0];
                    this.isActive[index] = 1;
                    this.condition = index;
                    for (let i = 0; i < this.articles.length; i++) {
                        if (this.articles[i].type === index) {
                            this.get_an_article(this.articles[i].id, i);
                            break;
                        }

                    }

                },
                /**
                 * 提交线下充值的信息
                 */
                submit_offline: function () {
                    //验证
                    if (!this.check_offline()) {
                        return;
                    }
                    this.$http.post(`${this.global.config.API}topup`,
                        {
                            money: this.offline_topup.money,
                            con: this.which_one + '充值',
                            tp_mark: '存款账号：' + this.offline_topup.store_number + "<br>" + "存款户名：" + this.offline_topup.offline_name,
                        }).then(function (res) {
                        if (res.data.status == 200) {

                            this.bet_html = `<p>${res.data.data.topup.tp_mark}</p><p>订单号:${res.data.data.topup.order_no}</p>`;
                            this.centerDialogVisible = true;
                            // this.$message(
                            //   {
                            //     message:res.data.msg,
                            //     type:'success',
                            //     center:true,
                            //   });
                            this.bank_topup =
                                {
                                    //银行的充值提交信息
                                    bank_name: '',//存款的银行名称
                                    store_name: '',//存款的户主名
                                    bank_number: '',//卡号
                                    money: '',//多少钱
                                };
                            this.offline_topup =
                                {
                                    //线下的充值提交信息
                                    offline_name: '',//转账户名
                                    store_number: '',//转账的账号
                                    money: '',//转账金额
                                };
                        }
                        else {
                            this.$message(
                                {
                                    message: res.data.msg,
                                    type: 'warning',
                                    center: true,
                                });
                        }

                        return;
                    });
                },
                /**
                 * 提交银行充值内容
                 */
                submit_bank: function () {
                    //验证
                    if (!this.check_bank()) {
                        return;
                    }

                    let data =
                        {
                            money: this.bank_topup.money,
                            con: this.which_one + '充值',
                            tp_mark:
                            '银行名称：' + this.bank_topup.bank_name + '<br>' +
                            '存款账号：' + this.bank_topup.bank_number + "<br>"
                            + "存款户名：" + this.bank_topup.store_name,
                        };

                    this.$http.post(`${this.global.config.API}topup`, data)
                        .then(function (res) {
                            if (res.data.status == 200) {
                                this.bet_html = `<p>${res.data.data.topup.tp_mark}</p><p>订单号:${res.data.data.topup.order_no}</p>`;
                                this.centerDialogVisible = true;
                                this.bank_topup =
                                    {
                                        //银行的充值提交信息
                                        bank_name: '',//存款的银行名称
                                        store_name: '',//存款的户主名
                                        bank_number: '',//卡号
                                        money: '',//多少钱
                                    };
                                this.offline_topup =
                                    {
                                        //线下的充值提交信息
                                        offline_name: '',//转账户名
                                        store_number: '',//转账的账号
                                        money: '',//转账金额
                                    };

                            }
                            else {
                                this.$message(
                                    {
                                        message: res.data.msg,
                                        type: 'warning',
                                        center: true,
                                    });
                            }
                            return;
                        });
                },
                /**
                 * 检测银行转账时的信息
                 */
                check_bank: function () {
                    //验证中文名
                    let pattern = /^[\u4e00-\u9fa5 ]{2,20}$/;
                    //银行卡的正则
                    let pattern2 = /^[0-9]{2,26}$/;

                    if (!pattern.test(this.bank_topup.bank_name)) {

                        this.$message(
                            {
                                message: '银行名不对，银行名是2位-10位的中文',
                                type: 'warning',
                                center: true,
                            });
                        return false;
                    }
                    if (!pattern.test(this.bank_topup.store_name)) {

                        this.$message(
                            {
                                message: '转账户名不对，账户名是2-6位的中文',
                                type: 'warning',
                                center: true,
                            });
                        return false;
                    }
                    if (!pattern2.test(parseInt(this.bank_topup.bank_number))) {
                        this.$message(
                            {
                                message: '卡号不对，卡号为16-20位之间的数据',
                                type: 'warning',
                                center: true,
                            });
                        return false;
                    }
                    if (!pattern2.test(parseInt(this.bank_topup.money))) {
                        this.$message(
                            {
                                message: '金钱不对',
                                type: 'warning',
                                center: true,
                            });
                        return false;
                    }
                    return true;
                },
                /**
                 * 检测线下的信息
                 */
                check_offline: function () {
                    //验证中文名
                    let pattern = /^[\u4e00-\u9fa5 ]{2,20}$/;
                    //银行卡的正则
                    let pattern2 = /^[0-9]{2,26}$/;

                    if (!pattern.test(this.offline_topup.offline_name)) {
                        this.$message(
                            {
                                message: '账号户名不对',
                                type: 'warning',
                                center: true,
                            });
                        return false;
                    }

                    if (!pattern2.test(parseInt(this.offline_topup.money))) {
                        this.$message(
                            {
                                message: '金钱不对',
                                type: 'warning',
                                center: true,
                            });
                        return false;
                    }
                    return true;
                },
                /**
                 * 获取充值记录
                 */
                get_history() {
                    this.$http.get(`${this.global.config.API}topup`)
                        .then((res) => {

                            if (res.data.status == 200) {
                                this.history = res.data.data.list;
                                this.hasPrev = res.data.data.hasPrev;
                                this.hasNext = res.data.data.hasNext;
                                this.sum = res.data.data.sum;
                                this.pageNum = res.data.data.pageNum;
                                this.prevPageUrl = this.hasPrev ? res.data.data.prevPageUrl : '';
                                this.nextPageUrl = this.hasNext ? res.data.data.nextPageUrl : '';
                            }
                        });
                },

                prevPage: function () {
                    if (!this.hasPrev) {
                        this.$message.error('没有上一页了');
                        return;
                    }
                    else {
                        this.$http.get(this.prevPageUrl)
                            .then(function (res) {
                                if (res.data.status == 200) {
                                    this.history = res.data.data.list;
                                    this.hasPrev = res.data.data.hasPrev;
                                    this.hasNext = res.data.data.hasNext;
                                    this.sum = res.data.data.sum;
                                    this.pageNum = res.data.data.pageNum;
                                    this.prevPageUrl = this.hasPrev ? res.data.data.prevPageUrl : '';
                                    this.nextPageUrl = this.hasNext ? res.data.data.nextPageUrl : '';
                                }
                                else {
                                    this.$message.error('充值记录数据加载失败！');
                                }
                            });
                    }
                },
                nextPage: function () {
                    if (!this.hasNext) {
                        this.$message.error('没有下一页了');
                        return;
                    }
                    else {
                        this.$http.get(this.nextPageUrl)
                            .then(function (res) {
                                if (res.data.status == 200) {
                                    this.history = res.data.data.list;
                                    this.hasPrev = res.data.data.hasPrev;
                                    this.hasNext = res.data.data.hasNext;
                                    this.sum = res.data.data.sum;
                                    this.pageNum = res.data.data.pageNum;
                                    this.prevPageUrl = this.hasPrev ? res.data.data.prevPageUrl : '';
                                    this.nextPageUrl = this.hasNext ? res.data.data.nextPageUrl : '';
                                }
                                else {
                                    this.$message.error('充值记录数据加载失败！');
                                }
                            });
                    }
                },
            },
        created() {
            this.get_articles();
            this.get_history();
        }
    }
</script>


<style scoped>

    #recharge {
        width: 1080px;
        overflow: hidden;
    }

    .left, .right {
        border: 1px solid gray;
        height: 700px;
        width:370px;
        margin-left:35px;
        margin-top: 45px;
        float: left;
        color: #000;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 8px;
        overflow: hidden;
    }

    .title {
        margin-top: 15px;
        font-size: 16px;
        font-weight:700;
    }

    .context {
        width: 300px;
        line-height: 20px;
        text-align: left;
        margin-top:40px;
    }
    .context>p{
        width:300px;
       margin-left: 30px;
    }
    .context>.context-top>span{
        display: inline-block;
        margin-bottom:30px;
        padding-left:20px;
    }
    .right {
        width:600px;
    }
    .bottom>.right>form>p{
        margin-bottom:20px;
    }
    .tabs {


        height: 45px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top:30px;
        margin-left:30px;
        /*border-bottom: 1px dashed gray;*/
    }

    .tabs > li {
        float: left;
        line-height: 45px;
        text-align: center;
        width:165px;
        font-size: 16px;
        font-weight: 700;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid gray;
        margin-left:5px;
        cursor: pointer;
        margin-top:5px;
    }

    .right-left {
        width: 120px;
        height: 40px;
        margin-left: 16px;
        margin-top: 15px;

        float: left;
    }

    .right-left > ul > li {
        width: 100%;
        height: 40px;
        border: 1px solid #000;
        border-bottom: none;
        line-height: 40px;
        cursor: pointer;
    }

    .right-left > ul > li:last-of-type {
        border-bottom: 1px solid #000;
    }

    .right-right {
        width: 410px;
        height: 400px;

        /*border:1px solid #000;*/
        float: left;
        margin-left: 5px;
        margin-top: 15px;
    }

    .input-my {
        margin-top: 15px;
        text-align: left;
    }

    .input-my > input {
        height: 30px;
        width: 410px;
        border-radius: 3px;
        color: #000;
        text-indent: 5px;
        font-size: 12px;
        border: 1px solid #000;
        margin-top: 10px;
    }

    .input-my > input::-webkit-input-placeholder {
        color: gray;

    }

    .input-my > input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: gray;
    }

    .input-my > input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: gray;
    }

    .input-my > input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: gray;
    }

    .submit-btn {
        width: 410px;
        margin-top: 15px;
        height: 30px;
        background: #ff0000;
        color: white;
        outline: none;
        border: none;
        margin-top: 20px;
    }

    .tabs .active, .right-left .active {
        background: #ff7300;
    }

    .article-context {
        width: 100%;
        margin: 25px auto;
        box-sizing: border-box;
        padding: 15px 5px;
        text-align: left;
        font-size: 16px;
        line-height: 22px;
        border: 1px solid #c1c1c1;
        text-indent:5px;

    }

    td {
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        padding: 5px 2px;
    }

    .page-xy {
        font-size: 16px;
        color: #000;
    }

    .page-xy > span {
        cursor: pointer;
    }

</style>
