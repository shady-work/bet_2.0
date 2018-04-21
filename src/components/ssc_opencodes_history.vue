<template>

    <div>
        <div class="history" style="margin-left: 15px;margin-top: 15px;">
            <table border="1" >
                <tr  class="color-red">
                    <td>期号/时间</td>
                    <td style="width: 200px;">
                        <p>开奖号码</p>
                    </td>
                    <td colspan="3">总和</td>
                    <td>龙虎</td>
                    <td>前三</td>
                    <td>中三</td>
                    <td>后三</td>
                </tr >
                <tr v-for="v in list" >
                    <td>
                        <p>{{v.expect}} &nbsp; <span style="color: gray;">{{v.opentime|get_time}}</span></p></td>
                    <td>
                        <span v-for="val in v.open_codes" class="open-code">{{val}}</span>
                    </td>
                    <td>{{get_sum(v.open_codes)}}</td>
                    <td v-if="v.details.dragon_and_tiger[1] == '总和单'" style="color:red;">{{v.details.dragon_and_tiger[1]|delete_str}}</td>
                    <td v-else >{{v.details.dragon_and_tiger[1]|delete_str}}</td>


                    <td v-if="v.details.dragon_and_tiger[0] == '总和大'"  style="color: red;">{{v.details.dragon_and_tiger[0]|delete_str}}</td>
                    <td v-else  >{{v.details.dragon_and_tiger[0]|delete_str}}</td>


                    <td>{{v.details.dragon_and_tiger[2]}}</td>
                    <td>{{v.details.front_3[0]}}</td>
                    <td>{{v.details.medium_3[0]}}</td>
                    <td>{{v.details.end_3[0]}}</td>
                </tr>
            </table>
        </div>




    </div>
</template>

<script>
  export default {
    name: "ssc_opencodes_history",
    data()
    {
      return{
        list:[],//历史数据
      }
    },//end data
    methods:{
      //获取cqssc的历史数据
      get_ssc_history()
      {

          this.isShow = false;
          this.$http.get(`${this.global.config.API}ssc/history/lottery`).then(function(res)
          {
            if(res.data.status == 200)
            {
              let data = res.data.data;
              this.list = data.list;
              this.hasPrev = data.hasPrev;
              this.hasNext = data.hasNext;
              this.sum = data.sum;
              this.pageNum = data.pageNum;
              this.prevPageUrl = this.hasPrev?data.prevPageUrl:'';
              this.nextPageUrl = this.hasNext?data.nextPageUrl:'';
              this.page = data.curPage;
            }

          })
      },//end get_ssc_history
      get_sum:function(arr)
      {
        var sum = 0;
        for(let i = 0;i <arr.length;i++)
        {
          sum += Number(arr[i]);
        }
        return sum;
      },

    },//end methods

    created(){
      this.get_ssc_history();
    },//end created
    filters:{

      delete_str(str)
      {
         let data = str.replace('总和','');
         return data;
      },
      get_time(str)
      {
        let data = str.substring(10);
        return data;
      }



    }
  }
</script>

<style scoped>
td
{
    border: 1px solid #e5e5e5;
    padding:8px;
}

.xinyongziliao
{
    width:1080px;
    margin-top:5px;
    margin-left:10px;

}

.xy-header {
    height: 30px;
    background: #e83a36;
    color: #f3f3f3;
}

.xy-header > i {
    float: left;
    width: 20px;
    margin-top: 8px;
    height: 20px;
    margin-left: 15px;
}

.xy-header > span {
    float: left;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-left: 5px;

}


.xy-left {
    width: 155px;
    height: 795px;
    float: left;
    box-sizing: border-box;
    background: #fff;
    border-right: 1px solid #e5e5e5;
}



.xy-list > a {
    display: block;
    width: 100%;
    padding: 3px;
    text-align: left;
    text-indent: 35px;
    height: 30px;
    line-height: 30px;
    color: #000;
    font-size: 14px;
    box-sizing: border-box;
    cursor: pointer;
}

.xy-list > .active {
    background: -webkit-linear-gradient(left,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right,rgba(230,0,0,0.3),rgba(200,200,200,0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(230,0,0,0.3),rgba(200,200,200,0)); /* 标准的语法 */
}

.xy-right {
    height: 795px;
    width: 925px;
    background: #fff;
    float: left;
}


.edu > p {
    height: 20px;
    line-height: 20px;
    color: #f3f3f3;
    font-size: 14px;
}

table {
    width: 1000px;
    border: 1px solid #e5e5e5;
    color: #000;
    font-size: 14px;
    height: 485px;
}

td > span {
    display: block;
    padding: 3px;
}

.open-code {
    float: left;
    width: 25px;
    height: 25px;
    background: url('../assets/img/ball.png');
    background-size: cover;
    margin-left: 5px;
    margin-right: 2px;
    color: #5e6061;
    line-height: 25px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
}

.xy-right-top > span {
    float: left;
    height: 30px;
    margin-top: 7px;
    line-height: 30px;
    font-size: 14px;
    margin-left: 5px;
    color: #f3f3f3;
}

.xy-right-top > input {
    width: 138px;
    float: left;
    background: none;
    outline: none;
    border: 1px solid #f3f3f3;
    color: #f3f3f3;
    float: left;
    height: 22px;;
    margin-top: 11px;
    margin-left: 5px;
    border-radius: 3px;
}

.xy-right-top > button {
    float: left;
    background: #5598c5;
    font-size: 14px;
    padding: 3px;
    outline: none;
    border: 1px solid #f3f3f3;
    color: #f3f3f3;
    margin-top: 9px;
    border-radius: 3px;
    margin-left: 15px;
    width: 70px;
}

.page-xy
{
    font-size: 16px;
    color: #000;
    padding:8px 0;
}
.page-xy>span
{
    cursor: pointer;
}
td
{
    border: 1px solid #e5e5e5;
    padding:8px 3px;
}

.hao1
{
    background: #959612;
}
.hao2
{
    background: #0060ff;
}
.hao3
{
    background: #4d4d4d;
}
.hao4
{
    background: #ff7300;
}
.hao5
{
    background: #00adad;
}
.hao6
{
    background:#5200ff;
}
.hao7
{
    background: #666666;
}
.hao8
{
    background: #ff0000;
}
.hao9
{
    background:#760000;
}
.hao10
{
    background:#167301;
}

.bg-red{
    background: #9c464d!important;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.bg-green{
    background: #3b9c6d !important;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}


.bg-blue{
    background: #285b9c !important;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
.bg-white{
    background: #9f9f9f !important;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
</style>