<template>

    <div>

        <table border="1" >
            <tr  class="color-red">
                <td>期号/时间</td>
                <td >
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
                <td>{{v.details.dragon_and_tiger[1]|delete_str}}</td>
                <td>{{v.details.dragon_and_tiger[0]|delete_str}}</td>

                <td>{{v.details.dragon_and_tiger[2]}}</td>
                <td>{{v.details.front_3[0]}}</td>
                <td>{{v.details.medium_3[0]}}</td>
                <td>{{v.details.end_3[0]}}</td>
            </tr>
        </table>



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
</style>