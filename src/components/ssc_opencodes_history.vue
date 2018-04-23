<template>

    <div style="width: 1000px;margin-top: 15px;">
           <!--筛选条件-->
           <div class="filter-header" style="height: auto;overflow:hidden;margin-bottom: 15px;">
               <div class="pull-left" style="width: 600px;">
                   <div style-="height:30px;width:100%">
                       <el-form ref="form"  >
                       <el-form-item label="车号分布" >
                           <el-checkbox-group v-model="type">
                               <el-checkbox label="0" name="type" v-bind:value="0"></el-checkbox>
                               <el-checkbox label="1" name="type" v-bind:value="1"></el-checkbox>
                               <el-checkbox label="2" name="type"></el-checkbox>
                               <el-checkbox label="3" name="type"></el-checkbox>
                               <el-checkbox label="4" name="type"></el-checkbox>
                               <el-checkbox label="5" name="type"></el-checkbox>
                               <el-checkbox label="6" name="type"></el-checkbox>
                               <el-checkbox label="7" name="type"></el-checkbox>
                               <el-checkbox label="8" name="type"></el-checkbox>
                               <el-checkbox label="9" name="type"></el-checkbox>
                           </el-checkbox-group>
                       </el-form-item>
                       </el-form>
                   </div>

                   <div style-="height:30px;width:100%">
                       <el-form ref="form"  >
                           <el-form-item label="位置分布">
                               <el-checkbox-group v-model="type2">
                                   <el-checkbox label="第一球" name="type"  ></el-checkbox>
                                   <el-checkbox label="第二球" name="type"></el-checkbox>
                                   <el-checkbox label="第三球" name="type"></el-checkbox>
                                   <el-checkbox label="第四球" name="type"></el-checkbox>
                                   <el-checkbox label="第五球" name="type"></el-checkbox>
                               </el-checkbox-group>
                           </el-form-item>
                       </el-form>
                   </div>
               </div>
                <div class="block" style="float:right; ">
                    <el-date-picker
                            v-model="value1"
                            align="right"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="指定日期"
                            :picker-options="pickerOptions1">
                    </el-date-picker>

                    <el-button type="success  ml10" >查询</el-button>
                </div>
           </div>
            <div class="clear"></div>
            <table border="1" v-show="true">
                <tr  class="color-red">
                    <td style="width: 200px;">期号/时间</td>
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
                        <span :class="color(v.open_codes[0],0)?('hao'+v.open_codes[0]):''" class="open-code">{{v.open_codes[0]}}</span>
                        <span :class="color(v.open_codes[1],1)?('hao'+v.open_codes[1]):''" class="open-code">{{v.open_codes[1]}}</span>
                        <span :class="color(v.open_codes[2],2)?('hao'+v.open_codes[2]):''" class="open-code">{{v.open_codes[2]}}</span>
                        <span :class="color(v.open_codes[3],3)?('hao'+v.open_codes[3]):''" class="open-code">{{v.open_codes[3]}}</span>
                        <span :class="color(v.open_codes[4],4)?('hao'+v.open_codes[4]):''" class="open-code">{{v.open_codes[4]}}</span>
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
</template>

<script>
  export default {
    name: "ssc_opencodes_history",
    data()
    {
      return{
        list:[],//历史数据
        value1:"",
        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        type:[1],//选择的号码
        type2:[],//选择的号码
        isFilter:false,//是否筛选
      }
    },//end data
    methods:{
      //获取cqssc的历史数据
      get_ssc_history()
      {

          this.isShow = false;
          this.$http.get(`${this.global.config.API}ssc/history/lottery?per_page=300`).then(function(res)
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
      color(v,k)
      {
         //当没有选球的时候
        if(this.type2.length < 1 )
        {
          if(this.type.indexOf(v) != -1)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        else
        {

          //有选择球的时候
          let array = ['第一球','第二球','第三球','第四球','第五球'];
          for(let i = 0;i<this.type2.length;i++)
          {
             if(array.indexOf(this.type2[i]) != -1)
             {
                if(array.indexOf(this.type2[i]) == k)
                {
                  return true;
                }
                else
                {
                  return false;
                }
             }
          }
        }
      },

    },//end methods

    created(){
      this.get_ssc_history();
    },//end created
    //过滤器
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
    },
    watch:
    {
        "type":function(n,o)
        {
          this.isFilter = true;
          this.color();
        },
        "type2":function(n,o)
        {

          this.color();
        },
    }
  }
</script>

<style scoped>
td
{
    border: 1px solid #e5e5e5;
    padding:8px;
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
    /*background: url('../assets/img/ball.png');*/
    background: gray;
    -webkit-border-radius: 50%;
    color: #fff;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-size: cover;
    margin-left: 5px;
    margin-right: 2px;
    line-height: 25px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
}

.hao0{
    background:#24C500;
}
.hao1{
    background:#760000;
}
.hao2{
    background:#FF0000;
}
.hao3{
    background: #C4C4EA;
}
.hao4{
    background:#5200ff;
}
.hao5{
    background:#82FFFF;
}
.hao6{
    background:#FF7200;
}
.hao7{
    background:#4A4A4A;
}
.hao8{
    background:#008AFF;
}
.hao9{
    background: #e3ee66;
}
</style>
<style>
    .el-checkbox__label
    {
        padding-left: 2px;
    }
    .el-form-item
    {
        margin-bottom: -5px;
    }
    .el-checkbox-group
    {
        text-align: left;
    }
</style>