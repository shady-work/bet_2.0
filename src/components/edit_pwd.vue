<template>
  <div class="task" @click="close()">
        <div class="xinyongziliao" id="weijiesuan1">
                <div class="xy-header">
                    <img src="../assets/img/index_17_1.png" alt="">
                    <span>修改密码</span>
                    <span class="pull-right close-2" @click="close()">X</span>
                    <div class="clear"></div>
                </div>

                <div class="form-pwd">
                    <label >
                        原密码:
                    </label>
                    <input type="password"  v-model="old_pwd">

                    <div class="clear"></div>

                    <label >
                        新密码:
                    </label>
                    <input type="password" v-model="new_pwd">
                    <div class="clear"></div>
                    <label >
                        确认新密码:
                    </label>
                    <input type="password" v-model="new_pwd_comfire">
                    <div class="clear"></div>


                    <button class="change" @click="doPassWord">
                        密码修改
                    </button>
                </div>


                <div class="clear"></div>
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
          old_pwd:'',
          new_pwd:'',
          new_pwd_comfire:'',
       };
       return data;
   },
   methods:
   {

       close:function()
       {
           this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
       },
        cancel:function(event)
       {
           var e = event || window.event;
           e.cancelBubble = true;
       },
       /**@augments
        * 修改密码
        */
       doPassWord:function()
       {
           //验证密码
           let pwdPattern = /^[0-9a-zA-Z]{6,16}$/;

           if(this.old_pwd == "" || this.new_pwd == "")
           {
                alert("密码不能为空");
                return false;
           }
           if(!pwdPattern.test(this.old_pwd))
           {
              alert("老密码格式不对~");
              return false;
           }
            if(!pwdPattern.test(this.new_pwd))
           {
              alert("新密码格式不对~");
              return false;
           }
           if(this.new_pwd != this.new_pwd_comfire)
           {
               alert("两次密码不一致");
              return false;
           }
            //通过验证，发送请求
           this.$http.put(this.global.config.API + 'password',{old_pwd: this.old_pwd, pwd_1: this.new_pwd}).then(function(response)
           {
             //请求成功
             alert(response.data.msg);
             if(response.data.status == 201)
             {
                 //密码修改成功，退出登录
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
                window.location.href = '/';
             }
           },function(err)
           {
               //请求失败
               alert(`抱歉，服务器繁忙，请稍后再试。`);
               this.global.log(err);
           });
       },

   }
}

</script>


<style scoped>
   .task
   {
       position:fixed;
       width:100%;
       height: 100%;
       left:0;
       top:0;
       background: rgba(0,0,0,0.5);
       z-index:3;
   }
   .xinyongziliao
   {
       width:300px;
       height: 345px;
       position: absolute;
       left: 560px;
       top: 278px;
       /* border: 1px solid #000; */
   }
   .xy-header
   {
       height: 30px;
       background: #174262;
       color: #f3f3f3;
   }
   .xy-header>img
   {
       float: left;
       width: 20px;
       margin-top: 5px;
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
   .close-2
   {
       margin-right: 5px;
       width: 30px;
       height: 30px;
       line-height: 30px;
       font-size: 24px!important;
       cursor: pointer;
   }
   .form-pwd
   {
       width: 100%;
       height: 220px;
       background: #4294d0;
       margin:0 auto;
       box-sizing: border-box;
       padding:15px;
       color:#f3f3f3;
       padding-top:25px;
   }
   .form-pwd label
   {
       width: 80px;
       text-align:left;
       float: left;
       height:25px;
       line-height:25px;
       margin-left: 25px;
       font-size: 14px;
       margin-top: 15px;
   }
   .form-pwd input
   {
       background: none;
       border:1px solid #f3f3f3;
       width:140px;
       color:#f3f3f3;
       float: left;
       height: 25px;
       text-indent:5px;
       margin-top: 12px;
   }

   .change
   {
       background: #5598c5;
       font-size: 14px;
       padding: 3px;
       outline: none;
       border: 1px solid #f3f3f3;
       color:#f3f3f3;
       margin-top:15px;
       border-radius: 3px;
   }
</style>
