<template>
    <div class="money-change" >
        <div class="xy-header">
            <i class="fa  fa-user-o"></i>
            <span>个人中心</span>
            <span class="pull-right pointer" style="margin-right: 30px;" @click="$store.state.isShowSecond = false;">关闭</span>
            <div class="clear"></div>
        </div>

        <div class="xy-left">
            <div class="xy-left">

                <div class="xy-list">
                    <div class="xy-list">
                        <a @click="isShow=[1,0,0,0,0];" :class="isShow[0]?'active':''">登入记录</a>
                        <a @click="isShow=[0,1,0,0,0];" :class="isShow[1]?'active':''">修改登入密码</a>
                        <!--<a @click="isShow=[0,0,1,0,0];" :class="isShow[2]?'active':''">我的银行卡</a>-->

                    </div>
                </div>
            </div>

        </div>


        <div class="xy-right" style="height:654px;">


            <div v-show="isShow[0]" >
                <table>
                    <tr class="color-red">
                        <td>IP</td>
                        <td>登入时间</td>
                        <td>地区</td>

                    </tr>
                    <tr v-for="(v,k) in login_list">
                        <!--<td>{{k}}</td>-->
                        <td>{{v.loginip}}</td>
                        <td>{{v.logintime}}</td>
                        <td>未知</td>

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
            <div v-show="isShow[1]" style="height:714px;">
                <div class="task">
                    <div class="xinyongziliao" >


                        <div class="form-pwd">
                            <label style="float:left;color:black;color:black;display:inline-block;margin-left:54px;font-size:14px;height:40px;line-height:40px;padding:5px;">
                                请输入旧登入密码:
                            </label>
                            <div>
                            <input type="password"  v-model="old_pwd" placeholder="请输入旧密码" style="width:85%;margin-left:-5px;height:30px;padding:5px;display: inline-block;border: 1px solid #ccc;border-radius:5px;">

                            <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;color:black;display:inline-block;margin-left:54px;font-size:14px;height:40px;line-height:40px;padding:5px;">
                                请输入新登入密码:
                            </label>
                            <div>
                            <input type="password" v-model="new_pwd" placeholder="请输入新密码" style="width:85%;height:30px;padding:5px;margin-left:-5px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                            <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;color:black;display:inline-block;margin-left:54px;font-size:14px;height:40px;line-height:40px;padding:5px;">
                                确认新密码:
                            </label>
                            <div>
                            <input type="password" v-model="new_pwd_comfire" placeholder="请输入新密码" style="width:85%;height:30px;padding:5px;margin-left:-1px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                            <div class="clear"></div>
                            </div>

                            <button class="change" style="width:20%;height:30px;margin-top:20px;display:inline-block;background:red;border:none;color:white;padding:5px;" @click="doPassWord">
                                密码修改
                            </button>
                        </div>


                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div v-show="isShow[2]">
                <div class="task">
                    <div class="xinyongziliao">


                        <div class="form-pwd" >

                            <label style="float:left;color:black;display:inline-block;margin-left:54px;font-size:15px;height:40px;line-height:40px;padding:5px;">
                                真实姓名
                            </label>
                            <div>
                                <input type="password"  v-model="old_pwd" placeholder="填写姓名不能有空格" style="width:85%;margin-left:-1px;height:30px;padding:5px;display: inline-block;border: 1px solid #ccc;border-radius:5px;">

                                <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;display:inline-block;margin-left:54px;font-size:15px;height:40px;line-height:40px;padding:5px;">
                                出款银行名称
                            </label>
                            <div>
                                <input type="password" v-model="new_pwd" placeholder="请选择银行" style="width:85%;height:30px;padding:5px;margin-left:-5px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                                <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;display:inline-block;margin-left:54px;font-size:15px;height:40px;line-height:40px;padding:5px;">
                                开户银行省份
                            </label>
                            <div>
                                <input type="password" v-model="new_pwd_comfire" placeholder="请输入省份" style="width:85%;height:30px;padding:5px;margin-left:-1px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                                <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;display:inline-block;margin-left:54px;font-size:15px;height:40px;line-height:40px;padding:5px;">
                                开户银行县市
                            </label>
                            <div>
                                <input type="password" v-model="new_pwd_comfire" placeholder="请输入县市" style="width:85%;height:30px;padding:5px;margin-left:-1px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                                <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;display:inline-block;margin-left:54px;font-size:15px;height:40px;line-height:40px;padding:5px;">
                                银行账号
                            </label>
                            <div>
                                <input type="password" v-model="new_pwd_comfire" placeholder="只可输入数字" style="width:85%;height:30px;padding:5px;margin-left:-1px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                                <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;display:inline-block;margin-left:54px;font-size:15px;height:40px;line-height:40px;padding:5px;">
                                绑定资金密码
                            </label>
                            <div>
                                <input type="password" v-model="new_pwd_comfire"  style="width:85%;height:30px;padding:5px;margin-left:-1px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                                <div class="clear"></div>
                            </div>

                            <label style="float:left;color:black;display:inline-block;margin-left:54px;font-size:15px;height:40px;line-height:40px;padding:5px;">
                                再次输入资金密码
                            </label>
                            <div>
                                <input type="password" v-model="new_pwd_comfire"  style="width:85%;height:30px;padding:5px;margin-left:-1px;display: inline-block;border:1px solid #ccc;border-radius:5px;">
                                <div class="clear"></div>
                            </div>
                            <button class="change" style="width:20%;height:30px;margin-top:20px;display:inline-block;background:red;border:none;color:white;padding:5px;background:gray;margin-bottom:20px;">
                                重设
                            </button>
                            <button class="change" style="width:20%;height:30px;margin-top:20px;display:inline-block;background:red;border:none;color:white;padding:5px;">
                                确定
                            </button>
                            <!--<button style="width:40%;margin-left:580px;height:30px;margin-top:20px;display:inline-block;background:red;border:none;color:white;padding:5px;">2222</button>-->


                        </div>


                        <div class="clear"></div>
                    </div>
                </div>
            </div>


        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    export default
    {
        name:'personal',
        data:function()
        {
            var data =
                {
                    old_pwd:'',
                    new_pwd:'',
                    new_pwd_comfire:'',
                    isShow:[1,0,0,0,0,0],
                    login_list:[], //登录日志数据
                    hasNext:false,
                    hasPrev:false,
                    next_url:'',
                    prev_url:'',
                    list:[],
                    page :1,
                    pageNum:0,
                    sum:0,
                    data:[],
                };
            return data;
        },
        methods:
            {


                /**@augments
                 * 修改密码
                 */
                doPassWord:function()
                {
                    //验证密码
                    let pwdPattern = /^[0-9a-zA-Z]{6,16}$/;

                    if(this.old_pwd == "" || this.new_pwd == "")
                    {
                        //alert("密码不能为空");
                        this.$message.error('密码不能为空');
                        return false;
                    }
                    if(!pwdPattern.test(this.old_pwd))
                    {
                        this.$message.error("老密码格式不对~");
                        // alert("老密码格式不对~");
                        return false;
                    }
                    if(!pwdPattern.test(this.new_pwd))
                    {
                        this.$message.error("新密码格式不对~");
                        // alert("新密码格式不对~");
                        return false;
                    }
                    if(this.new_pwd != this.new_pwd_comfire)
                    {
                        this.$message.error("两次密码不一致");
                        // alert("两次密码不一致");
                        return false;
                    }
                    //通过验证，发送请求
                    this.$http.put(this.global.config.API + 'password',{old_pwd: this.old_pwd, pwd_1: this.new_pwd}).then(function(response)
                    {


                        //200表示请求成功,提示修改成功并退出登录,返回到登录页面
                        if(response.data.status == 200)
                        {
                            //
                            this.$message(
                                {
                                    dangerouslyUseHTMLString: true,
                                    message: response.data.msg,
                                    center: true,
                                    type: 'success'
                                });
                            //退出登录
                            this.log_out();
                        }else{
                            //除了修改成功之外的都提示系统下发的消息
                            this.$message.error(response.data.msg);
                        }
                    });
                },
                /**
                 * 退出登录
                 */
                log_out:function()
                {
                    this.$http.delete(`${this.global.config.API}token`).then(function(res){
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
                        //跳转到登录页面
                        this.$router.push("/");
                    });

                },

                get_user_log:function(){
                    //"http://lty-main.com/loginList"
                    this.$http.get(this.global.config.API + 'loginList',{}).then(function(response){


                        if(response.data.status == 200){
                        //    请求成功
                            this.login_list  = response.data.data.list;

                            let data = response.data.data;
                            this.hasPrev = data.hasPrev;
                            this.hasNext = data.hasNext;
                            this.sum = data.sum;
                            this.pageNum = data.pageNum;
                            this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
                            this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
                            this.page = data.curPage;
                        }else{
                        //数据加载失败
                            this.$message.error('登录日志获取失败');
                        }
                    })
                },
                prevPage:function()
                {
                    if(!this.hasPrev)
                    {
                        alert('没有上一页了');
                        return;
                    }
                    else
                    {

                        this.$http.get(this.prevPageUrl)
                            .then(function(res)
                            {
                                if(res.data.status == 200)
                                {
                                    this.login_list  = res.data.data.list;
                                    let data = res.data.data;
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
                        alert('没有下一页了');
                        return;
                    }
                    else
                    {
                        this.$http.get(this.nextPageUrl)
                            .then(function(res){
                                if(res.data.status == 200)
                                {
                                    this.login_list  = res.data.data.list;
                                    let data = res.data.data;
                                    // this.data  = data.list;
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
            },//methods end
        created:function()
        {
            if(window.sessionStorage.isLogin == 'ok')
            {
                this.$store.state.isShowSecond = true;
                // this.get_money_details();
                this.get_user_log();
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
                        this.$router.push(window.sessionStorage.which_lty);
                    }
                }
            }
    }

</script>

<style scoped>
    .page-xy
    {
        font-size: 16px;
        color: #000;
        padding:8px 0;
        position: absolute;
        bottom:24px;
        left:355px;

    }
    .page-xy>span
    {
        cursor: pointer;
    }

    .money-change
    {
        width:1080px;
        margin-left:10px;
        margin-top:5px;
    }
    .xy-header
    {
        height: 30px;
        background: #e83a36;
        color: #f3f3f3;
    }
    .xy-header>i
    {
        float: left;
        width: 20px;
        margin-top: 8px;
        height: 20px;
        margin-left: 15px;
    }
    .xy-header>span
    {
        float: left;
        height:30px;
        line-height: 30px;
        font-size: 14px;
        margin-left:5px;

    }
    table
    {
        width:100%;
    }
    table tr td
    {
        border: 1px solid #e5e5e5;
        padding:8px 3px;
    }
    .xy-left
    {
        width: 185px;
        height:654px;
        float: left;
        box-sizing: border-box;
        background: #fff;
        border-right: 1px solid #e5e5e5;

    }
    .xy-list>a
    {
        display: block;
        width: 100%;
        padding: 3px;
        text-align: left;
        text-indent:35px;
        height: 30px;
        line-height:30px;
        color:#000;
        font-size: 14px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .xy-list>.active
    {
        background: -webkit-linear-gradient(left,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* 标准的语法 */
    }
    .xy-right
    {
        height:100%;
        width:895px;
        background: #fff;
        float: left;
        position: relative;
    }
    /*修改登入密码样式*/
</style>