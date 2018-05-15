<template>
    <div id="cqssc">
        <!-- 期数 时间 开奖号码 -->
        <div class="head">
            <div class="details">
                <img src="../assets/img/icon_ssc.png" class="logo-tubiao" alt="" >
                <div class="left">
                    <!--<p class="color-white"> 最新开奖：第{{lastExpect}}期,每日120期，今日剩余{{120-sales_+1}}期</p>-->
                    <p class="color-white" >第&nbsp;{{$store.state.cqssc.lastExpect}}&nbsp;期开奖结果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今日期数 {{sales_}}/120</p>
                    <div class="balls">
                        <span v-for="v in $store.state.cqssc.open_codes" :class="'hhao'+v">{{v}}</span>
                        <div class="clear"></div>
                    </div>
                </div>

                <div class="right">
                    <p class="first-pppp">第&nbsp;{{thisExpect}}&nbsp;期</p>
                    <div class="right-left">
                        <!--<p style="color:#209F16;">第{{thisExpect}}期</p>-->
                        <p>{{tips}}</p>
                    </div>
                    <div class="right-right">
                        <span class="fen">{{mins}} </span>
                        <span>分</span>
                        <span class="fen">{{seconds}}</span>
                        <span >秒</span>
                    </div>
                </div>
                <!-- 右边的历史记录 -->
                <div id="history">
                    <div class="history-table">
                      <el-popover
                        placement="bottom"
                        title=""
                        width="600"
                        trigger="click"
                        popper-class="my-click-class">
                        <table class="history-tables-ssc text-center">
                          <tr>
                            <td >期号/时间</td>
                            <td width="160"><p>开奖号码</p></td>
                            <td colspan="3">总和</td>
                            <td>龙虎</td>
                            <td>前三</td>
                            <td>中三</td>
                            <td>后三</td>
                          </tr>
                          <tr v-for="(val,key) in history_list">
                            <td>{{val.expect}}{{val.opentime|get_time2}}</td>
                            <td>
                              <span v-for="v in val.open_codes" class="code-ball" :class="'hhao' + v">{{v}}</span>
                            </td>
                            <td>{{get_sum(val.open_codes)}}</td>
                            <td v-if="val.details.dragon_and_tiger[1] == '总和单'" style="color:red;">{{val.details.dragon_and_tiger[1]|delete_str}}</td>
                            <td v-else >{{val.details.dragon_and_tiger[1]|delete_str}}</td>
                            <td v-if="val.details.dragon_and_tiger[0] == '总和大'"  style="color: red;">{{val.details.dragon_and_tiger[0]|delete_str}}</td>
                            <td v-else  >{{val.details.dragon_and_tiger[0]|delete_str}}</td>
                            <td :class="val.details.dragon_and_tiger[2] == '龙'?'color-red':''">{{val.details.dragon_and_tiger[2]}}</td>
                            <td>{{val.details.front_3[0]}}</td>
                            <td>{{val.details.medium_3[0]}}</td>
                            <td>{{val.details.end_3[0]}}</td>
                          </tr>
                        </table>
                        <el-button slot="reference" style="float:left;background:none;border: none;color: white;" size="mini">今日开奖</el-button>

                      </el-popover>

                      <el-popover
                        placement="bottom"
                        title="长龙排行"
                        width="280"
                        center="true"
                        trigger="click"
                        popper-class="my-click-class">
                          <p v-for="(v,k) in data" v-if="k<10" class="text-left" style="border-bottom:1px dashed rgba(200, 200, 200, 0.8);line-height: 20px;height: 30px;">
                            <span>{{v.name}}</span>
                            <span class="pull-right mr10">{{v.num}}期</span>
                          </p>

                        <el-button slot="reference" style="float:left;background:none;border: none;color: white;" size="mini">长龙排行</el-button>

                      </el-popover>
                      <div class="clear"></div>
                    </div>




                </div >
                <div class="clear"></div>
            </div>

            <div class="clear"></div>
        </div>

        <!-- 下注内容区 -->
        <div id="bet-content">
            <form action="" >
                <div class="bet-content-table" >
                    <div class="pan">
                        <label style="color:#fff;">盘口</label>
                        <select v-model="which_handicap">
                            <option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">{{return_upper(v.ratewin_name)}}盘 <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span></option>
                        </select>
                    </div>
                    <a :class="showArray_cqssc[0]?'color-white active':'color-white'" @click="showType(0)">
                        两面盘
                        <span></span>
                    </a>
                    <a :class="showArray_cqssc[1]?'color-white active':'color-white'" @click="showType(1)">
                        单球1-5
                        <span></span>
                    </a>
                    <a :class="showArray_cqssc[2]?'color-white active':'color-white'" @click="showType(2)">
                        第一球
                        <span></span>
                    </a>
                    <a :class="showArray_cqssc[3]?'color-white active':'color-white'" @click="showType(3)">
                        第二球
                        <span></span>
                    </a>
                    <a :class="showArray_cqssc[4]?'color-white active':'color-white'" @click="showType(4)">
                        第三球
                        <span></span>
                    </a>
                    <a :class="showArray_cqssc[5]?'color-white active':'color-white'" @click="showType(5)">
                        第四球
                        <span></span>
                    </a>
                    <a :class="showArray_cqssc[6]?'color-white active':'color-white'" @click="showType(6)">
                        第五球
                        <span></span>
                    </a>
                </div>


                <!-- 两面 -->
                <div class="bet-chooses" v-show="showArray_cqssc[0]">
                    <div class="bet-chooses-top">
                        <div v-for="(v,k,index) in  odds.double_aspect"  :class="index==0?'first-ball mt0':'first-ball'">
                            <div v-for="(val,key,ind) in v" class="first-ball-details text-0">
                                <span class="he22 padding3 w50">{{odds.ball_5_half_str[key]}}</span>
                                <span class="he22 padding3 color-red f700 w50" >{{val}}</span>
                                <input type="text" class="innnn padding3" v-model="bet_content['ball_'+ (index+1) +'_half'][key]" @click="double_1(k,key)"  @change="double_1_change(k,key)" style="padding:1px;">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                {{odds.single_ball_1_5_str[index]}}
                            </div>
                        </div>
                        <div class="clear"></div>

                        <div class="long-bet">
                            <div class="first-ball-top">
                                总和、龙虎
                            </div>

                            <div v-for="(v,k) in odds.dragon_and_tiger" class="long-bet-content">
                                <span>{{odds.dragon_and_tiger_str[k]}}</span>
                                <span class="color-red f700">{{v}}</span>
                                <input type="text" v-model="bet_content.dragon_and_tiger[k]" @click="double_2(k)" @change="double_2_change(k)">
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 单球1-5 -->
                <div class="bet-chooses" v-show="showArray_cqssc[1]">
                    <div class="bet-chooses-top">

                        <div v-for="(v,k,index) in odds.single_ball_1_5" :class="index==0?'first-ball mt0':'first-ball'">
                            <div v-for="(val,key,idx) in v" class="first-ball-details text-9">
                                <span class="hao0 color-white w50 ml10" :class="'hhao'+key">{{key}}</span>
                                <span class=" color-red f700 w50 ml5" style="text-indent:5px;height: 30px;line-height: 30px;">{{val}}</span>
                                <input type="text" class="innnn" v-model="bet_content.single_ball_1_5['ball_'+ (index+1) +'_digit'][key]"  @click="single_ball_1(index,key)"  @change="single_ball_1_change(index,key)" style="margin-left:3px;margin-top:7px;width: 50px;">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                {{odds.single_ball_1_5_str[index]}}
                            </div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>


                <!-- 第一球 -->
                <div v-for="(v,k) in odds.single_ball_1_5_str"  class="bet-chooses" v-show="showArray_cqssc[(k+2)]">
                    <div class="bet-chooses-top">
                        <!--第一球特码-->
                        <div class="long-bet" style="height:120px;">
                            <div class="first-ball-top">
                                {{v}}
                            </div>
                            <div v-for="(item,index) in odds.single_ball_1_5['ball_'+(k+1)+'_digit']" class="long-bet-content">
                                <span class="hao0 ml10 mt5 w50" :class="'hhao'+index" style="color: white">{{index}}</span>
                                <span class=" color-red f700 w50" style="text-indent:5px;margin-top:5px;margin-left:5px;">{{item}}</span>
                                <input type="text" v-model="bet_content.single_ball_1_5['ball_'+ (k+1) +'_digit'][index]" @click="ball_1_5(k,index,'tm')"    @change="ball_1_5_change(k,index,'tm')" style="margin-top:10px;width:65px;height:17px;margin-left:5px;">
                                <div class="clear"></div>
                            </div>

                            <div class="clear"></div>
                        </div>
                        <!--大小单双-->
                        <div   class="long-bet" style="height:55px;">
                            <div class="first-ball-top">
                                {{v}}
                            </div>
                            <div v-for="(item,index) in odds.double_aspect['ball_'+(k+1)+'_half']" class="long-bet-content">
                                <span>{{odds.ball_5_half_str[index]}}</span>
                                <span class="he22 color-red f700" style="margin-top:5px;margin-left:-14px;">{{item}}</span>
                                <input type="text" v-model="bet_content['ball_'+ (k+1) +'_half'][index]" @click="ball_1_5(k,index,'lm')"  @change="ball_1_5_change(k,index,'lm')" style="margin-top:5px;width:45px;heigth:16px;margin-left:11px;">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                                总和、龙虎
                            </div>
                            <div v-for="(item,index) in odds.dragon_and_tiger" class="long-bet-content">
                                <span>{{odds.dragon_and_tiger_str[index]}}</span>
                                <span class="he22 color-red f700" style="margin-top:5px;margin-left:-3px;">{{item}}</span>
                                <input type="text" v-model="bet_content.dragon_and_tiger[index]" @click="ball_1_5(k,index,'he')" @change="ball_1_5_change(k,index,'he')" style="margin-top:5px;width:45px;heigth:16px;margin-left:11px;">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>


                        <div v-for="(item,index) in odds.ball_3" :class="index=='front3'?'first-ball mt0':'first-ball'" style="width: 31%;margin-left:16px;" >
                            <div v-for="(i,idx) in item" class="first-ball-details">
                                <span class="ml10">{{odds.ball_3_str[idx]}}</span>
                                <span class="he22 color-red f700" style="width: 100px;">{{i}}</span>
                                <input type="text" v-model="bet_content.ball_3[index][idx]" @click="ball_1_5(index,idx,'qzhs')" @change="ball_1_5_change(index,idx,'qzhs')" style="width: 60px;">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top" v-if="index=='front3'">
                                前三
                            </div>
                            <div class="first-ball-top" v-if="index=='medium3'">
                                中三
                            </div>
                            <div class="first-ball-top" v-if="index=='end3'">
                                后三
                            </div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>


                <!--选择下注内容-->
                <div class="bet-content-input mt5" >
                    <div class="fast-bet" style="color:#606266;text-indent:8px;">
                        快速下注金额
                        <el-input v-model="fast_money" placeholder="请输入内容" class="my-input-elm"></el-input>
                    </div>
                    <div class="bet-btns">

                        <el-button @click="setBetMoney(fast_bet_money[0])" class="btn-fast" >{{fast_bet_money[0]}}</el-button>
                        <el-button @click="setBetMoney(fast_bet_money[1])" class="btn-fast">{{fast_bet_money[1]}}</el-button>
                        <el-button @click="setBetMoney(fast_bet_money[2])" class="btn-fast">{{fast_bet_money[2]}}</el-button>
                        <el-button @click="setBetMoney(fast_bet_money[3])" class="btn-fast">{{fast_bet_money[3]}}</el-button>
                        <el-button @click="setBetMoney(fast_bet_money[4])" class="btn-fast">{{fast_bet_money[4]}}</el-button>
                        <el-button @click="setBetMoney(fast_bet_money[5])" class="btn-fast">{{fast_bet_money[5]}}</el-button>
                        <!--设置快速下注金额-->
                        <el-popover
                                placement="top"
                                width="50"
                        >
                            <el-input v-model="fast_bet_money[0]" placeholder="请输入内容" class="my-input-elm-set" ></el-input>
                            <el-input v-model="fast_bet_money[1]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                            <el-input v-model="fast_bet_money[2]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                            <el-input v-model="fast_bet_money[3]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                            <el-input v-model="fast_bet_money[4]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                            <el-input v-model="fast_bet_money[5]" placeholder="请输入内容" class="my-input-elm-set"></el-input>
                            <el-button slot="reference" class="set-fast-money">设置快速下注金额</el-button>
                        </el-popover>
                        <!--/设置快速下注金额-->
                        <el-button class="btn-fast pull-right" @click="clear_bet">重填</el-button>
                        <el-button v-if="open_state"  class="btn-fast pull-right" @click="comfire_content">提交</el-button>
                        <el-button v-if="!open_state"  class="btn-fast pull-right" disabled >提交</el-button>
                    </div>
                    <div class="clear"></div>
                </div>

            </form>
        </div>





        <!--下注提示框-->
        <el-dialog
                title="确认下注"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <div v-html="bet_html" @click="delete_it($event)" ></div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="do_bet()">确 定</el-button>
      </span>
        </el-dialog>





    </div>
</template>


<script>

  export default {
    name: "Cqssc",
    data() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      month = month < 10 ? ("0" + month) : month;
      let day = time.getDate();
      day = day < 10 ? ("0" + day) : day;
      let my_data =
        {
          centerDialogVisible:false,
          bet_html:'',
          showArray_cqssc: [1, 0, 0, 0, 0, 0, 0],
          mins:'00',
          seconds:'00',
          history_tables: [0, 0, 0],
          history_flag: 0,
          history_str: "收起",
          lastOpenCode: [1, 1, 1, 1, 1],          //最后一期开奖号码
          lastExpect: `${year}${month}${day}`,//今天日期
          thisExpect: 20180312000,//这期下注的期数
          sales_: 0,//今日已销售的期数
          fast_money:10,//快速下注初始值
          end_time:60,//倒计时
          open_time:60,//开奖时间
          data:[],
          //下注金额的集合
          bet_content:
            {
              ball_1_half:['','','',''],
              ball_2_half:['','','',''],
              ball_3_half:['','','',''],
              ball_4_half:['','','',''],
              ball_5_half:['','','',''],
              dragon_and_tiger:['','','','','','',''],
              single_ball_1_5:
                {
                  ball_1_digit:['','','','','','','','','',''],
                  ball_2_digit:['','','','','','','','','',''],
                  ball_3_digit:['','','','','','','','','',''],
                  ball_4_digit:['','','','','','','','','',''],
                  ball_5_digit:['','','','','','','','','',''],
                },
              ball_3:
                {
                  front3:['','','','',''],
                  medium3:['','','','',''],
                  end3:['','','','',''],
                },
            },
          //赔率的集合
          odds:
            {
              double_aspect:
                {
                  ball_1_half    :[1.9430,1.9430,1.9430,1.9430],
                  ball_2_half    :[1.9430,1.9430,1.9430,1.9430],
                  ball_3_half    :[1.9430,1.9430,1.9430,1.9430],
                  ball_4_half    :[1.9430,1.9430,1.9430,1.9430],
                  ball_5_half    :[1.9430,1.9430,1.9430,1.9430],
                },
              ball_5_half_str:["大","小","单","双"],
              dragon_and_tiger:[1.9000,1.9000,1.9000,1.9000,1.9000,1.9000,1.9000],
              dragon_and_tiger_str:["总和大","总和小","总和单","总和双","龙","虎","和"],
              single_ball_1_5:
                {
                  ball_1_digit:[1,1,1,1,1,1,1,1,1,1],
                  ball_2_digit:[1,1,1,1,1,1,1,1,1,1],
                  ball_3_digit:[1,1,1,1,1,1,1,1,1,1],
                  ball_4_digit:[1,1,1,1,1,1,1,1,1,1],
                  ball_5_digit:[1,1,1,1,1,1,1,1,1,1],
                },
              single_ball_1_5_str:['第一球','第二球','第三球','第四球','第五球'],
              ball_3:
                {
                  front3:[1,2,3,4,5],
                  medium3:[1,2,3,4,5],
                  end3:[1,2,3,4,5],
                },
              ball_3_str:['豹子','对子','顺子','半顺','杂六']
            },
          bets:[],//下注内容的集合

          //纯赔率列表
          all_odds:
            [],
          dicrationaries:
            [
              'ball_1_half__K','ball_1_half__L','ball_1_half__M','ball_1_half__N',
              'dragon_and_tiger__A','dragon_and_tiger__B','dragon_and_tiger__C','dragon_and_tiger__D','dragon_and_tiger__E','dragon_and_tiger__F','dragon_and_tiger__G',
              'ball_2_half__K','ball_2_half__L','ball_2_half__M','ball_2_half__N',
              'ball_3_half__K','ball_3_half__L','ball_3_half__M','ball_3_half__N',
              'ball_4_half__K','ball_4_half__L','ball_4_half__M','ball_4_half__N',
              'ball_5_half__K','ball_5_half__L','ball_5_half__M','ball_5_half__N',
              'ball_1_digit__A','ball_1_digit__B','ball_1_digit__C','ball_1_digit__D','ball_1_digit__E','ball_1_digit__F','ball_1_digit__G','ball_1_digit__H','ball_1_digit__I','ball_1_digit__J',
              'ball_2_digit__A','ball_2_digit__B','ball_2_digit__C','ball_2_digit__D','ball_2_digit__E','ball_2_digit__F','ball_2_digit__G','ball_2_digit__H','ball_2_digit__I','ball_2_digit__J',
              'ball_3_digit__A','ball_3_digit__B','ball_3_digit__C','ball_3_digit__D','ball_3_digit__E','ball_3_digit__F','ball_3_digit__G','ball_3_digit__H','ball_3_digit__I','ball_3_digit__J',
              'ball_4_digit__A','ball_4_digit__B','ball_4_digit__C','ball_4_digit__D','ball_4_digit__E','ball_4_digit__F','ball_4_digit__G','ball_4_digit__H','ball_4_digit__I','ball_4_digit__J',
              'ball_5_digit__A','ball_5_digit__B','ball_5_digit__C','ball_5_digit__D','ball_5_digit__E','ball_5_digit__F','ball_5_digit__G','ball_5_digit__H','ball_5_digit__I','ball_5_digit__J',
              'front_3__A','front_3__B','front_3__C','front_3__D','front_3__E',
              'medium_3__A','medium_3__B','medium_3__C','medium_3__D','medium_3__E',
              'end_3__A','end_3__B','end_3__C','end_3__D','end_3__E',
            ],
          dicrationaries_2:
            [
              '第一球大','第一球小','第一球单','第一球双',
              '总和-单','总和-双','总和-大','总和-小','总和-龙','总和-虎','总和-和',
              '第二球大','第二球小','第二球单','第二球双',
              '第三球大','第三球小','第三球单','第三球双',
              '第四球大','第四球小','第四球单','第四球双',
              '第五球大','第五球小','第五球单','第五球双',
              '第一球-特码-0','第一球-特码-1','第一球-特码-2','第一球-特码-3','第一球-特码-4','第一球-特码-5','第一球-特码-6','第一球-特码-7','第一球-特码-8','第一球-特码-9',
              '第二球-特码-0','第二球-特码-1','第二球-特码-2','第二球-特码-3','第二球-特码-4','第二球-特码-5','第二球-特码-6','第二球-特码-7','第二球-特码-8','第二球-特码-9',
              '第三球-特码-0','第三球-特码-1','第三球-特码-2','第三球-特码-3','第三球-特码-4','第三球-特码-5','第三球-特码-6','第三球-特码-7','第三球-特码-8','第三球-特码-9',
              '第四球-特码-0','第四球-特码-1','第四球-特码-2','第四球-特码-3','第四球-特码-4','第四球-特码-5','第四球-特码-6','第四球-特码-7','第四球-特码-8','第四球-特码-9',
              '第五球-特码-0','第五球-特码-1','第五球-特码-2','第五球-特码-3','第五球-特码-4','第五球-特码-5','第五球-特码-6','第五球-特码-7','第五球-特码-8','第五球-特码-9',
              '前三-豹子','前三-顺子','前三-对子','前三-半顺','前三-杂六',
              '中三-豹子','中三-顺子','中三-对子','中三-半顺','中三-杂六',
              '后三-豹子','后三-顺子','后三-对子','后三-半顺','后三-杂六',
            ],

          curPage:1,//当前页面
          hasNext:true,//是否有下一页
          hasPrev:false,//是否有上一页
          history_list:[],//开奖列表
          nextPageUrl:'',//下页的url
          prevPageUrl:'',//上页的url
          history_codes:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],],//开奖号码的集合
          history_expects:[],//开奖期数的集合

          //更新odds和开奖数据，未结算数据的定时器
          timeId:0,
          timeId2:5,
          timeId3:10,

          //查看用户可选的盘口
          handicaps:[],
          //当前是哪个盘口
          which_handicap:'',


          vaild_lotteries:[],//  用户拥有哪些彩种
          fanshui:'',
          orderData:[],//未结算数据
          tips:'距离本期封盘还有',


          dec_limit:
            {
              //7里面找
              ball_1_digit:{},
              ball_2_digit:{},
              ball_3_digit:{},
              ball_4_digit:{},
              ball_5_digit:{},
              //6页面找
              ball_1_half:{},
              ball_2_half:{},
              ball_3_half:{},
              ball_4_half:{},
              ball_5_half:{},
              dragon_and_tiger:{},
              //1页面找
              front_3:{},
              medium_3:{},
              end_3:{},
            },

          open_state:false,//是否开盘,true是开盘,false是封盘了
          fast_bet_money:[10,50,100,200,500,1000],//快速下注的金额

        };
      return my_data;
    },
    created: function ()
    {

      if(this.$store.state.isLogin)
      {
        //查看是否有cqssc这个彩种
        this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
        {
          let  data = response.data.data.user;
          this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
          if(this.vaild_lotteries.indexOf('cqssc') != -1)
          {
            // 1 获取重庆时时彩的时间和期数
            this.get_time();
            // 2 获取最新的开奖号码
            this.get_last_code();
            // 3 获取用户拥有哪些盘口
            this.get_users_handicaps();
            // 4 获取用户的赔率
            this.get_odds();
            // 5 获取开奖历史
            this.get_history();
            // 6 获取未结算清单
            this.get_ssc_unclear();
            // 7.获取长龙出数据
            this.get_londDragon_data();
          }
          else
          {
            this.$router.push('pk10');
          }

        });
      }

    },
    filters:{

      delete_str(str)
      {
        let data = str.replace('总和','');
        return data;
      },
      get_time2(str)
      {
        let data = str.substring(10);
        return data;
      }
    },
    mounted: function ()
    {
      //在created之后创建的构子
      var that = this;

      //获取赔率、最新开奖结果的倒计时 5s一次
      this.timeId = setInterval(function()
      {
        that.get_odds();
        that.get_last_code();
      },10000);
      //获取未结算数据 45s一次
      this.timeId3 = setInterval(function()
      {
        that.get_ssc_unclear();
      },45000);



    },

    /**
     * 离开这个路由时触发的函数，摧毁定时器
     */
    destroyed()
    {
      clearInterval(this.timeId);
      clearInterval(this.timeId2);
      clearInterval(this.timeId3);
    },
    /**
     * 监听用户切换盘时 刷新赔率
     */
    watch:
      {
        /**
         *  监听用户选择的盘口，切换盘口时，获取对应盘口的赔率
         * @param n
         * @param o
         */
        "which_handicap":function(n,o)
        {
          this.get_odds(n);
          for(let i = 0;i<this.handicaps.length;i++)
          {
            if(n == this.handicaps[i].ratewin_name)
            {
              this.fanshui = this.handicaps[i].fs;
            }
          }
        },
        /**
         * 当open_time<0时，说明已经销售完了，关闭所有请求，
         * @param n
         */
        "open_time":function(n)
        {
          if(n<0)
          {
            clearInterval(this.timeId);
          }else if (n === 0)
          {
            clearInterval(this.timeId);
            var that = this;
            //获取赔率、最新开奖结果的倒计时 5s一次
            this.timeId = setInterval(function()
            {
              that.get_odds();
              that.get_last_code();
            },10000);
          }
        },

        "dec_limit":function(n)
        {
          console.log(n);
        }
      },
    methods:
      {
        get_sum:function(arr)
        {
          var sum = 0;
          for(let i = 0;i <arr.length;i++)
          {
            sum += Number(arr[i]);
          }
          return sum;
        },
        /**
         * 选择玩法
         * @param idx
         */
        showType: function (idx)
        {
          this.showArray_cqssc = [0, 0, 0, 0, 0, 0, 0];
          this.showArray_cqssc[idx] = 1;
          //清空数据
          this.bets = [];
          //重置ui  每个tab就可以下注当前的，不可以两个tab同时下
          this.bet_content =
            {
              ball_1_half:['','','',''],
              ball_2_half:['','','',''],
              ball_3_half:['','','',''],
              ball_4_half:['','','',''],
              ball_5_half:['','','',''],
              dragon_and_tiger:['','','','','','',''],
              single_ball_1_5:
                {
                  ball_1_digit:['','','','','','','','','',''],
                  ball_2_digit:['','','','','','','','','',''],
                  ball_3_digit:['','','','','','','','','',''],
                  ball_4_digit:['','','','','','','','','',''],
                  ball_5_digit:['','','','','','','','','',''],
                },
              ball_3:
                {
                  front3:['','','',''],
                  medium3:['','','',''],
                  end3:['','','',''],
                },
            };
          //更新视图层
          this.bet_content.ball_1_half.reverse().reverse();
        },
        /**
         * 历史开奖的tab
         * @param idx
         */
        showTables: function (idx)
        {

          if(idx == 1)
          {
            this.history_tables[1] = !this.history_tables[1];
            this.history_tables[2] = 0;
          }
          if(idx == 2)
          {
            this.history_tables[2] = !this.history_tables[2];
            this.history_tables[1] = 0;
          }

        },
        //长龙出的数据
        get_londDragon_data()
        {
          this.$http.get(this.global.config.API + 'ssc/longDragon', {}).then(function (res) {

            this.data = res.data.data;


          });
        },
        /**
         * close history tab
         */
        close_history: function ()
        {

          this.history_tables = [0, 0, 0, 0, 0, 0, 0];
          $(".history-close").slideUp();
          $(".history-list").slideUp();
          this.history_str = "展开";
        },
        /**
         * show history_tab
         */
        showHistory: function ()
        {
          if (this.history_str == "展开")
          {
            $(".history-close").slideDown();
            $(".history-list").eq(this.history_flag).slideDown();
            $(".history-table").slideDown();
            this.history_tables = [0, 0, 0, 0, 0, 0, 0];
            this.history_tables[1] =1  ;
            this.history_str = "收起";
          }
          else
          {
            this.close_history();
          }
        },

        /**
         * 获取最新一期的开奖数据
         */
        get_last_code: function ()
        {
          this.$http.get(this.global.config.API + 'ssc/lastLty', {}).then(function (res)
          {
            //获取到最新一期的数据
            let data = res.data;
            this.lastOpenCode = data.opencode;
            this.lastExpect = `${data.expect}`;
          });
        },
        /**
         * 获取赔率
         */
        get_odds:function(which_handicap = null){
          //获取两面盘的赔率
          if(which_handicap || this.which_handicap)
          {
            this.$http.get(`${this.global.config.API}ssc/odds/6?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(response)
            {
              if(response.data.status == 200)
              {
                let data = response.data.data;
                let odds = data.odds;
                // console.log(odds);
                //获取趺背数据
                this.dec_limit.ball_1_half = odds.ball_1_half.dec_odds;
                this.dec_limit.ball_2_half = odds.ball_2_half.dec_odds;
                this.dec_limit.ball_3_half = odds.ball_3_half.dec_odds;
                this.dec_limit.ball_4_half = odds.ball_4_half.dec_odds;
                this.dec_limit.ball_5_half = odds.ball_5_half.dec_odds;
                this.dec_limit.dragon_and_tiger = odds.dragon_and_tiger.dec_odds;
                let bet_area = Object.keys(odds);//["ball_1_half", "ball_2_half", "ball_3_half", "ball_4_half", "ball_5_half", "dragon_and_tiger"]
                let Alphabet = ['K','L','M','N'];
                for(let i = 0;i<this.odds.double_aspect.ball_1_half.length;i++)
                {
                  this.odds.double_aspect.ball_1_half[i] = data.odds.ball_1_half[Alphabet[i]];
                  this.odds.double_aspect.ball_2_half[i] = data.odds.ball_2_half[Alphabet[i]];
                  this.odds.double_aspect.ball_3_half[i] = data.odds.ball_3_half[Alphabet[i]];
                  this.odds.double_aspect.ball_4_half[i] = data.odds.ball_4_half[Alphabet[i]];
                  this.odds.double_aspect.ball_5_half[i] = data.odds.ball_5_half[Alphabet[i]];
                  //全部赔率
                  this.all_odds[i] = data.odds.ball_1_half[Alphabet[i]];
                  this.all_odds[(i+11)] = data.odds.ball_2_half[Alphabet[i]];
                  this.all_odds[(i+15)] = data.odds.ball_3_half[Alphabet[i]];
                  this.all_odds[(i+19)] = data.odds.ball_4_half[Alphabet[i]];
                  this.all_odds[(i+23)] = data.odds.ball_5_half[Alphabet[i]];

                }
                //由于直接给vue的data赋值，不会触发视图层更新，所以使用reverser来更新视图层
                this.odds.double_aspect.ball_1_half.reverse().reverse();
                Alphabet = ['A','B','C','D','E','F','G'];
                for(let i = 0;i<this.odds.dragon_and_tiger.length;i++)
                {
                  this.odds.dragon_and_tiger[i] = data.odds.dragon_and_tiger[Alphabet[i]];
                  this.all_odds[(i+4)] =          data.odds.dragon_and_tiger[Alphabet[i]];
                }
              }

            });

            //获取单球1-5的赔率
            this.$http.get(`${this.global.config.API}ssc/odds/7?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(response)
            {
              if(response.data.status == 200)
              {
                let data = response.data.data.odds;
                //获取趺背数据
                this.dec_limit.ball_1_digit = data.ball_1_digit.dec_odds;
                this.dec_limit.ball_2_digit = data.ball_2_digit.dec_odds;
                this.dec_limit.ball_3_digit = data.ball_3_digit.dec_odds;
                this.dec_limit.ball_4_digit = data.ball_4_digit.dec_odds;
                this.dec_limit.ball_5_digit = data.ball_5_digit.dec_odds;
                let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];
                for(let i=0;i<Alphabet.length;i++) {
                  this.odds.single_ball_1_5.ball_1_digit[i] = data.ball_1_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_2_digit[i] = data.ball_2_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_3_digit[i] = data.ball_3_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_4_digit[i] = data.ball_4_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_5_digit[i] = data.ball_5_digit[Alphabet[i]];
                  this.all_odds[(i+27)] = data.ball_1_digit[Alphabet[i]];
                  this.all_odds[(i+37)] = data.ball_2_digit[Alphabet[i]];
                  this.all_odds[(i+47)] = data.ball_3_digit[Alphabet[i]];
                  this.all_odds[(i+57)] = data.ball_4_digit[Alphabet[i]];
                  this.all_odds[(i+67)] = data.ball_5_digit[Alphabet[i]];
                }
                this.odds.single_ball_1_5.ball_1_digit.reverse().reverse();
              }
            });

            //获取第一球的赔率
            this.$http.get(`${this.global.config.API}ssc/odds/1?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(response)
            {
              if(response.data.status == 200)
              {
                this.dec_limit.end_3 = response.data.data.odds.end_3.dec_odds;
                this.dec_limit.front_3 = response.data.data.odds.front_3.dec_odds;
                this.dec_limit.medium_3 = response.data.data.odds.medium_3.dec_odds;
                let Alphabet = ['A','B','C','D','E'];
                for(let i=0;i<this.odds.ball_3.front3.length;i++){
                  this.odds.ball_3.front3[i] = response.data.data.odds.front_3[Alphabet[i]];
                  this.odds.ball_3.medium3[i] = response.data.data.odds.medium_3[Alphabet[i]];
                  this.odds.ball_3.end3[i] = response.data.data.odds.end_3[Alphabet[i]];
                  this.all_odds[(i+77)] = response.data.data.odds.front_3[Alphabet[i]];
                  this.all_odds[(i+82)] = response.data.data.odds.medium_3[Alphabet[i]];
                  this.all_odds[(i+87)] = response.data.data.odds.end_3[Alphabet[i]];
                }
              }

            });
          }
        },
        /**
         * 确认下注
         */
        comfire_content:function()
        {
          //过滤掉相同的对象
          this.filter_same();
          //当用户没有选择下注内容的时候要提示用户选择
          if(this.bets.length < 1)
          {
            this.$message(
              {
                dangerouslyUseHTMLString: true,
                message: '请选择下注内容后再提交',
                center: true,
                type: 'warning'
              });
            return 0;
          }

          /*开始拼接数据*/

          //下注总金额
          let sumMoney = 0;
          //下注显示框的html
          let html = `<table class="bet-table"><tr><td>注单明细</td><td>赔率</td><td>下注金额</td><td>操作</td></tr>`;
          //将this.bets的内容转化成html显示在页面的弹框上
          for(let i = 0; i<this.bets.length;i++)
          {
            //赔率
            let str = '';
            //下注内容的下标，对应可以找到下注内容的中文，和赔率
            var index = this.dicrationaries.indexOf(this.bets[i].content);
            //是否趺倍，子盘才有的趺倍
            if(this.$store.state.son_off)
            {
              if(this.is_dec(this.bets[i].content,this.bets[i].money))
              {
                let odds = (Number(this.all_odds[index]) - Number(this.is_dec(this.bets[i].content,this.bets[i].money))).toFixed(4);
                str += `${odds}`;
              }
              else
              {
                str += `${this.all_odds[index]}`;
              }
            }
            else
            {
              str += `${this.all_odds[index]}`;
            }

            //组织成html页面
            html += `<tr>
                        <td>${this.dicrationaries_2[index]}</td>
                        <td class="color-red">${str}</td>
                        <td>${this.bets[i].money}</td>
                        <td><button  class='${this.bets[i].content}' attr='my-btn-1'>删除</button></td>
                     </tr>`;
            //算下注的总金额
            sumMoney += parseInt(this.bets[i].money);
          }
          html +=   `</table>`;
          html += `<div style='text-align:center;margin-top:15px;' id='sum' >共 <span style="color:blue;font-weight:700;">${this.bets.length}</span> 条 <span style="color:blue;font-weight:700;">${sumMoney}</span>￥</div>`;

          //显示弹框
          this.centerDialogVisible = true;
          //将html转化成vue的属性，显示在页面中
          this.bet_html = html;
          return;


        },
        //是否趺背，趺多少
        is_dec:function(content,money)
        {
          let returnData = null;
          let patterns =
            {
              pattern1 : 'dragon_and_tiger',
              pattern2 : 'front_3',
              pattern3 : 'medium_3',
              pattern4 : 'end_3',
              pattern5 : 'ball_1_digit',
              pattern6 : 'ball_2_digit',
              pattern7 : 'ball_3_digit',
              pattern8 : 'ball_4_digit',
              pattern9 : 'ball_5_digit',
              pattern10 : 'ball_1_half',
              pattern11 : 'ball_2_half',
              pattern12 : 'ball_3_half',
              pattern13 : 'ball_4_half',
              pattern14 : 'ball_5_half',
            };
          let flag = false;
          let index = 0;
          for(let i = 1 ; i<15;i++)
          {
            if(content.match(patterns['pattern' + i]))
            {
              flag = true;
              index = i;
              break;
            }
          }
          if(flag)
          {
            let data = this.dec_limit[patterns['pattern' + index]];
            for(let i = 0 ; i<data.length;i++)
            {
              if(money>=data[i].limit)
              {
                returnData = data[i].dec_odds;
              }
            }
          }
          return returnData;

        },



        //删除某个下注选择
        delete_it(event)
        {

          if(event.target.innerHTML == '删除')
          {
            //删除这个下注项
            for(let i = 0 ; i<this.bets.length;i++)
            {
              if(this.bets[i].content == event.target.className)
              {
                this.bets.splice(i, 1);
              }
            }

            //移除这个html元素
            let line = event.target.parentNode.parentNode;
            let bigDaddy = line.parentNode;
            bigDaddy.removeChild(line);

            //重写统计
            let len = this.bets.length;//几条
            //当this.bets没有内容时，提示用户选择下注内容,并清空下注内容
            if(len <1)
            {
              this.centerDialogVisible = false;
              this.$message.error('请重新选择下注内容');
              this.clear_bet();

            }
            let totalMoney = 0;//总金额
            for(let i = 0;i<len;i++)
            {
              totalMoney += this.bets[i].money;
            }
            document.getElementById('sum').innerHTML = `共${len}条,${totalMoney}￥`;
          }
        },
        //两面盘下注方法1
        double_1:function(key,index)
        {
          if(this.bet_content[key][index] != "")
          {
            return false;
          }
          let keys = ['K','L','M','N'];//组织数组
          this.bet_content[key][index] = this.fast_money;//改变下注金额
          this.bet_content[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + keys[index],money:this.fast_money});//添加到下注内容区
        },
        //两面盘下注方法1 在用户更改下注金钱时触发的函数
        double_1_change(key,index)
        {
          let keys = ['K','L','M','N'];//组织数组
          this.bet_content[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + keys[index],money:this.bet_content[key][index]});//添加到下注内容区
        },

        //两面盘下注方法2
        double_2:function (index) {
          let keys = ['A','B','C','D','E','F','G'];//组织数组
          let key  = 'dragon_and_tiger';//组织数组
          if(this.bet_content[key][index] != "")
          {
            return false;
          }
          this.bet_content[key][index] = this.fast_money;//改变下注金额
          this.bet_content[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + keys[index],money:this.fast_money});//添加到下注内容区

        },
        //两面盘下注方法2 在用户更改下注金钱时触发的函数
        double_2_change:function (index) {

          let keys = ['A','B','C','D','E','F','G'];//组织数组
          let key  = 'dragon_and_tiger';//组织数组
          this.bet_content[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + keys[index],money:this.bet_content[key][index]});//添加到下注内容区

        },
        //单球的下注
        single_ball_1:function (k,index) {

          let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
          let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
          let key  = keys[k];//组织数组
          if(this.bet_content.single_ball_1_5[key][index] != "")
          {
            return false;
          }
          this.bet_content.single_ball_1_5[key][index] = this.fast_money;//改变下注金额
          this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + Alphabet[index],money:this.fast_money});//添加到下注内容区

        },
        //单球的下注 在用户改变下注金额的时候触发的函数
        single_ball_1_change(k,index)
        {
          let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
          let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
          let key  = keys[k];//组织数组
          this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
          this.bets.push({content:key + '__' + Alphabet[index],money: this.bet_content.single_ball_1_5[key][index]});//添加到下注内容区
        },


        //1-5球的下注
        ball_1_5:function (k,i,type) {
          if(type == 'tm')
          {
            let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
            let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
            let key  = keys[k];//组织数组
            if(this.bet_content.single_ball_1_5[key][i] != "")
            {
              return false;
            }
            this.bet_content.single_ball_1_5[key][i] = this.fast_money;//改变下注金额
            this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + Alphabet[i],money:this.fast_money});//添加到下注内容区
          }
          else if (type == 'lm')
          {
            let arr = ['ball_1_half','ball_2_half','ball_3_half','ball_4_half','ball_5_half'];//组织数组
            let keys = ['K','L','M','N'];//组织数组
            let key = arr[k];
            if(this.bet_content[key][i] != "")
            {
              return false;
            }
            this.bet_content[key][i] = this.fast_money;//改变下注金额
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[i],money:this.fast_money});//添加到下注内容区
          }
          else if(type == 'he')
          {
            let keys = ['A','B','C','D','E','F','G'];//组织数组
            let key  = 'dragon_and_tiger';//组织数组
            if(this.bet_content[key][i] != "")
            {
              return false;
            }
            this.bet_content[key][i] = this.fast_money;//改变下注金额
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[i],money:this.fast_money});//添加到下注内容区
          }
          else if(type == 'qzhs')
          {
            let keys = ['A','B','C','D','E'];
            if(this.bet_content.ball_3[k][i])
            {
              return false;
            }

            this.bet_content.ball_3[k][i] = this.fast_money;//改变下注金额
            this.bet_content.ball_3[k].reverse().reverse();//触发视图层改变

            if(k=='front3')
            {
              this.bets.push({content:'front_3' + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }
            if(k=='medium3')
            {

              this.bets.push({content:'medium_3' + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }
            if(k=='end3')
            {
              this.bets.push({content:'end_3' + '__' + keys[i],money:this.fast_money});//添加到下注内容区
            }

            return
          }

        },


        //1-5球的下注 在用户改变下注金额的时候触发的函数
        ball_1_5_change:function (k,i,type) {
          if(type == 'tm')
          {
            let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];//组织数组  ball_1_digit
            let keys = ['ball_1_digit','ball_2_digit','ball_3_digit','ball_4_digit','ball_5_digit'];
            let key  = keys[k];//组织数组
            this.bet_content.single_ball_1_5[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + Alphabet[i],money:this.bet_content.single_ball_1_5[key][i]});//添加到下注内容区
          }
          else if (type == 'lm')
          {
            let arr = ['ball_1_half','ball_2_half','ball_3_half','ball_4_half','ball_5_half'];//组织数组
            let keys = ['K','L','M','N'];//组织数组
            let key = arr[k];
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[i],money:this.bet_content[key][i]});//添加到下注内容区
          }
          else if(type == 'he')
          {
            let keys = ['A','B','C','D','E','F','G'];//组织数组
            let key  = 'dragon_and_tiger';//组织数组
            this.bet_content[key].reverse().reverse();//触发视图层改变
            this.bets.push({content:key + '__' + keys[i],money:this.bet_content[key][i]});//添加到下注内容区
          }
          else if(type == 'qzhs')
          {
            let keys = ['A','B','C','D','E'];
            if(k=='front3')
            {
              this.bets.push({content:'front_3' + '__' + keys[i],money:this.bet_content.ball_3[k][i]});//添加到下注内容区
            }
            if(k=='medium3')
            {
              this.bets.push({content:'medium_3' + '__' + keys[i],money:this.bet_content.ball_3[k][i]});//添加到下注内容区
            }
            if(k=='end3')
            {
              this.bets.push({content:'end_3' + '__' + keys[i],money:this.bet_content.ball_3[k][i]});//添加到下注内容区
            }
            return
          }
        },
        /**
         * 清除下注内容{清空数据,重置ui}
         */
        clear_bet:function ()
        {
          //清空数据
          this.bets = [];
          //重置ui
          this.bet_content =
            {
              ball_1_half:['','','',''],
              ball_2_half:['','','',''],
              ball_3_half:['','','',''],
              ball_4_half:['','','',''],
              ball_5_half:['','','',''],
              dragon_and_tiger:['','','','','','',''],
              single_ball_1_5:
                {
                  ball_1_digit:['','','','','','','','','',''],
                  ball_2_digit:['','','','','','','','','',''],
                  ball_3_digit:['','','','','','','','','',''],
                  ball_4_digit:['','','','','','','','','',''],
                  ball_5_digit:['','','','','','','','','',''],
                },
              ball_3:
                {
                  front3:['','','','',''],
                  medium3:['','','','',''],
                  end3:['','','','',''],
                },
            };
          //更新视图层
          this.bet_content.ball_1_half.reverse().reverse();

        },

        /**
         * 过滤掉相同的数组
         */
        filter_same:function ()
        {
          for(let i = 0; i < this.bets.length;i++)
          {
            let key =  this.bets[i].content;
            var flag = false;
            for(let j = i+1;j<this.bets.length;j++)
            {
              if(key == this.bets[j].content)
              {
                this.bets.splice(i,1);
                flag = true;
                break;
              }
            }
            if(!this.bets[i].money)
            {
              this.bets.splice(i,1);
              flag = true;
            }
            if(flag)
            {
              this.filter_same();
              break;
            }
          }

        },

        /**
         *提交下注！！！
         */
        do_bet:function ()
        {

          this.centerDialogVisible = false;
          this.$http.post(`${this.global.config.API}ssc/order`,{bets:this.bets,odds_table:this.which_handicap}).then(function(res){
            if(res.data.status == 200)
            {
              //清除下注内容
              this.clear_bet();
              //从服务器上获取余额
              this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
              {
                let  data = response.data.data.user;
                this.$set(this.$store.state,'cash_money',data.money.cash_money)
              });

              //提示下注成功
              this.$message(
                {
                  dangerouslyUseHTMLString: true,
                  message: res.data.msg,
                  center: true,
                  type: 'success',
                  duration:1500,
                });
              //设置未结算清单
              this.get_ssc_unclear();
              //显示未结算的数据
              this.$store.state.isShowUnclear = true;
              //显示ssc的数据
              this.$store.state.which_lottery = 'ssc';
            }
            else
            {
              this.$message.error(res.data.msg);
            }

          });
        },
        /**
         * 获取重庆时时彩的时间和期数
         */
        get_time:function ()
        {
          this.$http.get(`${this.global.config.API}ssc/time`).then(function(res){
            //console.log(res.data);
            let data = res.data;
            this.sales_ = data.saleNum;//已卖期数
            this.end_time = data.endtime;//这期的封盘时间
            this.open_time = data.opentime;//下期的开盘时间
            this.thisExpect = data.expect;//这期下注期数
            this.count_down();
          });
        },
        /**
         * 倒计时
         */
        count_down:function ()
        {
          let that  = this;
          //封盘倒计时
          this.timeId2 = setInterval(function(){
            if(that.end_time <= 0)
            {
              that.mins = '00';
              that.seconds = that.open_time<10?('0' + that.open_time.toString()):that.open_time;
              that.tips = "离开盘还有";
              that.open_state = false;
              if(that.end_time == 0)
              {
                that.thisExpect = parseInt(that.thisExpect) + 1;
              }
              if(that.open_time <= 0 )
              {
                if(that.open_time < -100)
                {
                  that.mins = "--";
                  that.seconds = "--";
                  that.tips = '请等待开盘';
                }
                if(that.open_time == 0)
                {
                  //清除定时器
                  clearInterval(that.timeId2);
                  //重新获取时间
                  that.get_time();
                  //获取未结算的订单
                  that.get_ssc_unclear();
                  that.tips = "距离本期封盘还有";
                  that.open_state = true;
                }
                else
                {
                  that.open_time++
                }
                return;
              }
            }
            else
            {
              let mins = Math.floor(that.end_time/60);
              mins = '0' + mins;
              that.mins = mins;
              let seconds = Math.abs(Math.floor(that.end_time%60));
              seconds  = seconds>9?seconds:('0'+seconds);
              that.seconds = seconds;
              that.open_state = true;
            }

            that.end_time--;
            that.open_time--;
          },1000);
          //开盘倒计时
        },

        /**
         * 获取历史开奖
         */
        get_history:function()
        {
          let url = `${this.global.config.API}ssc/history/lottery?range=today`;
          this.history_codes = [];
          this.$http.get(url).then(function(res){
            let data = res.data.data;
            this.history_list = data.list;
            for(let i = 0; i<this.history_list.length;i++)
            {
              let expect = this.history_list[i].expect;
              this.history_expects.push(expect);
              let codes = this.history_list[i].opencode.split(',');
              this.history_codes.push(codes);
            }
            this.history_codes.reverse().reverse();
          });
        },
        /**
         * 设置下注金额
         */
        setBetMoney:function(money)
        {
          this.fast_money = money;
        },

        /**
         * 查看用户可选盘口
         */
        get_users_handicaps:function()
        {
          this.$http.get(`${this.global.config.API}ssc/pans`)
            .then(function(res)
            {

              this.handicaps = [];
              if(res.data.status == 200)
              {
                for(let i = 0 ; i <res.data.data.ratelist.length;i++)
                {
                  this.handicaps.push(res.data.data.ratelist[i]);
                  this.which_handicap = res.data.data.ratelist[0].ratewin_name;
                  this.fanshui = res.data.data.ratelist[0].fs;
                }
              }
            });
        },
        return_percent:function(str)
        {
          return str;
        },
        return_upper:function(str)
        {
          return str.toUpperCase();
        },
        /**
         * 获取cqssc未结算的清单
         */
        get_ssc_unclear:function()
        {

          //获取cqssc未结算的数据
          this.$http.get(`${this.global.config.API}ssc/history/clear/0`).then(function(res)
          {
            if(res.data.status == 403) return false;
            this.orderData = [];
            let data = res.data.data;
            let list  = data.list;
            for(let i = 0; i<list.length;i++)
            {

              this.orderData.push(list[i]);
            }
            //设置全局的未结算清单
            this.$set(this.$store.state,'unclear',this.orderData);

          });
        },
      },

  }
</script>


<style scoped>
    @import '../assets/css/cqssc.css';

    .first-ball-details {
        text-align: left;
        text-indent: 15px;
    }

    .first-ball-details > span {
        float: left;
    }


    button[attr='my-btn-1']
    {
        /*float:right;*/
        /*margin-right:12px;*/
        color:#fff;
        background:#f56c6c;
        border: 1px solid #dcdfe6;padding:3px;
    }

</style>
<style>
    .el-dialog--center .el-dialog__body
    {
        padding-bottom: 15px;
    }
    button[attr='my-btn-1']
    {
        /*margin-right:27px;*/
        color:#fff;
        background:#f56c6c;
        border: 1px solid #dcdfe6;padding:3px;
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
    .bet-table
    {
        width: 100%;
        text-align:center;
    }
    .bet-table td
    {
        padding:8px;
        border: 1px solid #e5e5e5;
        text-align:center;
    }
    .bet-content-input{
        position: fixed;
        bottom:30px;
        width: 1080px;
    }
</style>
