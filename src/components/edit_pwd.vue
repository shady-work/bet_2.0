<template>
  <div class="task" @click="close()">
        <div class="xinyongziliao">
                <div class="xy-header">
                    <img src="../assets/img/index_17_1.png" alt="">
                    <span>修改密码</span>
                    <span class="pull-right close-2" @click="close()">X</span>
                    <div class="clear"></div>
                </div>

                <div class="form-pwd">
                    <label for="">
                        原密码:
                    </label>
                    <input type="password" name="old_pwd">

                    <div class="clear"></div>

                    <label for="">
                        新密码:
                    </label>
                    <input type="password" name="old_pwd">
                    <div class="clear"></div>
                    <label for="">
                        确认新密码:
                    </label>
                    <input type="password" name="old_pwd">
                    <div class="clear"></div>


                    <button class="change">
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
          
       };
       return data;
   },
   methods:
   {
       
       close:function()
       {
           
           this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
       }
   
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
