<template>
        <div id="login">
            <div class="login">
                <p class="logo">LOGO</p>
                <p class="vip-login">会员登录</p>
                <p class="user-name">用户名</p>
                <div class="user">
                        <input type="text" placeholder="请输入账户名称" v-model="username">
                        <i></i>
                </div>
                <p class="user-name">密码</p>

                <div class="user">
                        <input type="password" placeholder="请输入密码" v-model="password">
                        <i></i>
                </div>
                <div class="user mt15">
                        <input type="text" placeholder="请输入验证码" class="code">
                        <img src="" alt="">
                </div>
                <button class="btn-login" @click="login">
                    登录
                </button>
                <div class="register-forget">
                    <a href="" class="pull-left">
                        注册
                    </a>

                    <a href="" class="pull-right">
                        忘记密码
                    </a>
                </div>
            </div>
        </div>
</template>


<script>
export default
{
    data:function()
    {
        var data =
        {
            username:"",
            password:"",
        };
        return data;
    },
    methods:
    {
        login: function()
        {

            //用户名验证
            let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            if(!uPattern.test(this.username))
            {
                alert("用户名格式不对~")
                return false;
            }
            //密码验证
            let pwdPattern = /^[0-9a-zA-Z]{6,16}$/;
            if(!pwdPattern.test(this.password))
            {
                alert("密码格式不对~")
                return false;
            }

            //发送登录请求
            this.$http.post(this.global.config.API + 'token', {username: this.username, pwd_1: this.password}).then(function (response)
            {
                //登录成功
                if(response.data.status == 200)
                {
                    this.$store.state.isLogin = true; //设置登录flag
                    this.$store.state.user_id = response.data.data.user_id;//设置登录user_id
                    window.sessionStorage.isLogin = 'ok';  //本地会话保存登录状态
                    window.sessionStorage.user_id = response.data.data.user_id;//本地会话保存user_id
                    this.$router.push('/');//跳转到主页 不刷新   window.location.href会刷新
                }
                else
                {
                    alert(response.data.msg);
                }
            });
        },
    },
    created:function()
    {
        //用户登录了，提示不能已登录  并跳转到主页
        if(this.$store.state.isLogin ||window.sessionStorage.isLogin == "ok")
        {
            alert('你已登录！');
            this.$router.push('/');
        }
    },
    watch:
    {
       username:function(n,o)
       {
        //    console.log(`new value is ${n}`);
        //    console.log(`old value is ${o}`);
       }
    }
}
</script>


<style  scoped>
 /* login */
    #login
    {
        width:100%;
        height:100%;
        position:fixed;
        left:0;
        top:0;
        background:url("../assets/img/login.jpg");
        z-index:4;
    }

    .login
    {
        width: 313px;
        height: 515px;
        background: rgba(0,0,0,0.5);
        position:absolute;
        left:40%;
        top: 20%;
        box-shadow: 0 0 10px 15px rgba(0,0,0,0.4);
        box-sizing:border-box;
    }
    .logo
    {
        color:blue;
        font-size: 30px;
        height: 30px;
        line-height: 30px;
        margin-top:15px;
    }
    .vip-login
    {
        color:#f3f3f3;
        margin-top:5px;
    }
    .user-name
    {
        text-align:left;
        text-indent:45px;
        margin-top: 18px;
        color:gray;
        font-size: 18px;
    }
    .user
    {
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        height:45px;
        position: relative;
        margin-top: 5px;
    }
    .user>input
    {
        float: left;
        margin-left: 45px;
        height:35px;
        width: 220px;
        background: none;
        outline: none;
        border: 1px solid #c2c5d3;
        text-indent:5px;
        color: #f3f3f3;
        font-size: 14px;
    }
    .user>input::-webkit-input-placeholder{ color:#c2c5d3; }
    .user>input::-moz-placeholder{   /* Mozilla Firefox 19+ */ color:#c2c5d3; }
    .user>input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */ color:#c2c5d3;}
    .user>input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ color:#c2c5d3;}
    .mt15
    {
        margin-top: 20px;
    }

    .user .code
    {
        float: left;
        width: 120px;
    }

    .btn-login
    {
        height: 40px;
        width: 227px;
        margin-top: 15px;
        background: #2a56ec;
        border: none;
        letter-spacing: 5px;
        font-weight: 700;
        color: white;
    }

    .register-forget
    {
        width: 227px;
        height: 30px;
        margin-left: 42px;
    }

    .register-forget>a
    {
        height: 30px;
        line-height: 30px;
        color: #f3f3f3;
        font-size: 14px;
    }
</style>

