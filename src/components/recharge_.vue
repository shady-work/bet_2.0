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
</style>
<template>

    <div id="recharge">
        <div class="left">
              <h2 class="title">充值帮助</h2>
              <p class="context">
                尊敬的客户，您好。感谢您使用XXXX平台充值系统尊敬的客户，您好。
                感谢您使用XXXX平台充值系统尊敬的客户，您好。感谢您使用XXXX平台充值系统尊敬的客户，您好。感谢您使用XXXX平台充值系统
              </p>
              <div class="article-context" v-html="content">
              
              </div>
        </div>


        <div class="right">
            <ul class="tabs">
              <li>银行</li>
              <li>线下</li>
              <li>第三方</li>
            </ul>
            <div class="right-left">
               <ul>
                 <li v-for="(v,k) in articles" @click="get_an_article(v.id)">
                    {{v.title}}
                 </li>
               </ul>
            </div>
            <div class="right-right">

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
        articles:[],//所有文章
        bank:[],//银行的文章
        third:[],//第三方的文章
        offline:[],//线下的文章
        content:'',//文章内容
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

      },
      /**
       * 获取某个文章内容
       * @param a_id
       */
      get_an_article:function(a_id)
      {
          this.$http.get(`${this.global.config.API}articles/${a_id}`)
            .then(function(res)
            {
              console.log(res.data);
              if(res.data.status == 200)
              {
                    this.$set(this,'content',res.data.data.article.content);
              }
              else
              {
                alert('文章获取失败');
              }
            });

      }
    },
    created()
    {
      this.get_articles();
    }
  }
</script>


