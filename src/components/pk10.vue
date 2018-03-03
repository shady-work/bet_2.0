<template>
  <div id="cqssc">

        <!-- 期数 时间 开奖号码 -->
        <div class="head">
            <img src="../assets/img/navicons_11.png" alt="">

            <div class="details">
                <div class="left">
                    <p class="color-white">第634158期</p>
                    <p class="color-white mt5">开奖号码</p>
                </div>
                <div class="balls">
                    <span class="hao1">1</span>
                    <span class="hao2">2</span>
                    <span class="hao3">3</span>
                    <span class="hao4">4</span>
                    <span class="hao5">5</span>
                    <span class="hao6">6</span>
                    <span class="hao7">7</span>
                    <span class="hao8">8</span>
                    <span class="hao9">9</span>
                    <span class="hao10">10</span>
                    <div class="clear"></div>
                </div>
                <div class="description">
                    <p class="color-white">
                        10分钟一期，每天09:50-01:54:30销售
                    </p>
                    <p class="color-white mt5">
                        今天已售100期,还剩79期
                    </p>
                    <div class="pan">
                        <label>盘类</label>
                        <select name="" id="">
                            <option value="">B</option>
                        </select>
                    </div>
                </div>

                 <div class="left">
                    <p class="color-white text-right">第634158期</p>
                    <p class="color-white mt5 text-right">距离封盘</p>
                </div>

                <div class="count-down color-white">
                    <span>
                        00
                    </span>
                    <b>分</b>
                     <span>
                        00
                    </span>
                    <b>秒</b>
                </div>


                <img src="../assets/img/alert-1.png" alt="" class="audio">
                <div class="clear"></div>
            </div>

            <div class="clear"></div>
        </div>

        <!-- 下注内容区 -->
        <div id="bet-content">
            <form action="">
                <div class="bet-content-table">
                    <a  :class="showArray_cqssc[0]?'color-white active':'color-white'" @click="showType(0)">
                        两面盘
                        <span></span>
                    </a>
                    <a  :class="showArray_cqssc[1]?'color-white active':'color-white'" @click="showType(1)">
                        单名1-10
                        <span></span>
                    </a>
                    <a  :class="showArray_cqssc[2]?'color-white active':'color-white'" @click="showType(2)">
                       冠、亚军组合
                        <span></span>
                    </a>
                    <a  :class="showArray_cqssc[3]?'color-white active':'color-white'" @click="showType(3)">
                       三、四、五、六名
                        <span></span>
                    </a>
                    <a  :class="showArray_cqssc[4]?'color-white active':'color-white'" @click="showType(4)">
                        七、八、九、十名
                        <span></span>
                    </a>
                  
                </div>

                <div class="bet-content-input">
                     <div class="fast-bet">
                         快速下注金额
                         <input type="text" class="fast-bet-input">
                     </div>
                     <div class="bet-btns">
                          <a href="">50</a>
                          <a href="">100</a>
                          <a href="">200</a>
                          <a href="">500</a>
                          <a href="">1000</a>
                          <a href="">设置快速金额</a>
                          <a href="" class="pull-right">重填</a>
                           <a href="" class="pull-right">提交</a>
                     </div>
                     <div class="clear"></div>
                </div>

                <!-- 两面 -->
                <div class="bet-chooses" v-show="showArray_cqssc[0]">
                    <div class="bet-chooses-top">
                        <div class="first-ball mt0">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      龙  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                冠军
                            </div>
                        </div>

                        <div class="first-ball">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                亚军
                            </div>
                        </div>
                        <div class="first-ball ">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第三名
                            </div>
                        </div>

                        <div class="first-ball ">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第四名
                            </div>
                        </div>


                        <div class="first-ball ">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第五名
                            </div>
                        </div>
                        

                         <div class="first-ball mt0">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第六名
                            </div>
                        </div>


                         <div class="first-ball ">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第七名
                            </div>
                        </div>

                         <div class="first-ball ">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第八名
                            </div>
                        </div>

                         <div class="first-ball ">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第九名
                            </div>
                        </div>

                         <div class="first-ball ">
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      单  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                     双  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      大  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      小  
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-details text-0" >
                                <span class="he22 ">
                                      虎 
                                </span>
                                <span class="he22 ">
                                    1.943
                                </span>
                                <input type="text" class="innnn ">
                                <div class="clear"></div>
                            </div>
                            <div class="first-ball-top">
                                第十名
                            </div>
                        </div>

                        
                        <div class="clear"></div>

                        <div class="long-bet height-auto">
                            <div class="first-ball-top">
                                冠、亚军和
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>

                <!-- 单名1-10 -->
                <div class="bet-chooses" v-show="showArray_cqssc[1]">
                    <div class="bet-chooses-top">
                        <div class="first-ball mt0">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第冠军名
                            </div>
                        </div>
                        <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第亚名
                            </div>
                        </div>



                        <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第三名
                            </div>
                        </div>

                         <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第四名
                            </div>
                        </div>


                         <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第五名
                            </div>
                        </div>


                         <div class="first-ball mt0">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第六名
                            </div>
                        </div>

                         <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第七名
                            </div>
                        </div>


                         <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第八名
                            </div>
                        </div>


                         <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第九名
                            </div>
                        </div>

                         <div class="first-ball">
                              <div class="first-ball-details">
                                <span class="hao1">1</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao2">2</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao3">3</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao4">4</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao5">5</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao6">6</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao7">7</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao8">8</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>
                              <div class="first-ball-details">
                                <span class="hao9">9</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span class="hao10">10</span>
                                <span class="he22">
                                    1.943
                                </span>
                                <input type="text" class="innnn">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                第十名
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                

                <!-- 冠、亚军和 -->
                <div class="bet-chooses" v-show="showArray_cqssc[2]">
                    <div class="bet-chooses-top">
                          



                         <div class="long-bet height-auto">
                            <div class="first-ball-top">
                                冠、亚军和
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span>冠亚小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>


                <!-- 第二名 -->
                <div class="bet-chooses" v-show="showArray_cqssc[3]">
                    <div class="bet-chooses-top">
                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第二名
                            </div>
                            <div class="long-bet-content">
                                <span class="hao0 ml10 mt5">0</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao1 ml10 mt5">1</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao2 ml10 mt5">2</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span class="hao3 ml10 mt5">3</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao4 ml10 mt5">4</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao5 ml10 mt5">5</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao6 ml10 mt5">6</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao7 ml10 mt5">7</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao8 ml10 mt5">8</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao9 ml10 mt5">9</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第二名
                            </div>
                            <div class="long-bet-content">
                                <span>单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                         <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               总和、龙虎
                            </div>
                            <div class="long-bet-content">
                                <span>总和单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >总和小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >龙</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >虎</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >和</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        

                        <div class="first-ball mt0" style="width:30%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>

                <!-- 第三名 -->
                <div class="bet-chooses" v-show="showArray_cqssc[4]">
                    <div class="bet-chooses-top">
                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第三名
                            </div>
                            <div class="long-bet-content">
                                <span class="hao0 ml10 mt5">0</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao1 ml10 mt5">1</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao2 ml10 mt5">2</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span class="hao3 ml10 mt5">3</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao4 ml10 mt5">4</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao5 ml10 mt5">5</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao6 ml10 mt5">6</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao7 ml10 mt5">7</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao8 ml10 mt5">8</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao9 ml10 mt5">9</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第三名
                            </div>
                            <div class="long-bet-content">
                                <span>单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                         <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               总和、龙虎
                            </div>
                            <div class="long-bet-content">
                                <span>总和单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >总和小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >龙</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >虎</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >和</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        

                        <div class="first-ball mt0" style="width:30%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>
                
                 <!-- 第四名 -->
                 <div class="bet-chooses" v-show="showArray_cqssc[5]">
                    <div class="bet-chooses-top">
                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第四名
                            </div>
                            <div class="long-bet-content">
                                <span class="hao0 ml10 mt5">0</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao1 ml10 mt5">1</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao2 ml10 mt5">2</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span class="hao3 ml10 mt5">3</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao4 ml10 mt5">4</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao5 ml10 mt5">5</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao6 ml10 mt5">6</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao7 ml10 mt5">7</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao8 ml10 mt5">8</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao9 ml10 mt5">9</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第四名
                            </div>
                            <div class="long-bet-content">
                                <span>单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                         <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               总和、龙虎
                            </div>
                            <div class="long-bet-content">
                                <span>总和单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >总和小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >龙</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >虎</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >和</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        

                        <div class="first-ball mt0" style="width:30%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>
                
                 <!-- 第五名 -->
                 <div class="bet-chooses" v-show="showArray_cqssc[6]">
                    <div class="bet-chooses-top">
                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第五名
                            </div>
                            <div class="long-bet-content">
                                <span class="hao0 ml10 mt5">0</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao1 ml10 mt5">1</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span class="hao2 ml10 mt5">2</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span class="hao3 ml10 mt5">3</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao4 ml10 mt5">4</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao5 ml10 mt5">5</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao6 ml10 mt5">6</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao7 ml10 mt5">7</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao8 ml10 mt5">8</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="long-bet-content">
                                <span class="hao9 ml10 mt5">9</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                        <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               第五名
                            </div>
                            <div class="long-bet-content">
                                <span>单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                         <div class="long-bet" style="height:auto;">
                            <div class="first-ball-top">
                               总和、龙虎
                            </div>
                            <div class="long-bet-content">
                                <span>总和单</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和双</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                               <span>总和大</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >总和小</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >龙</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >虎</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="long-bet-content">
                                <span >和</span>
                                <span>1.943</span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        

                        <div class="first-ball mt0" style="width:30%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="first-ball " style="width:30%;margin-left:2%;">
                            <div class="first-ball-details">
                                <span>
                                     豹子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      顺子 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      对子  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>
                             <div class="first-ball-details">
                                <span>
                                      半顺 
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                             <div class="first-ball-details">
                                <span>
                                      杂六  
                                </span>
                                <span>
                                    1.943
                                </span>
                                <input type="text">
                                <div class="clear"></div>
                            </div>

                            <div class="first-ball-top">
                                前三
                            </div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>

                 <div class="bet-content-input mrt-55">
                     <div class="fast-bet">
                         快速下注金额
                         <input type="text" class="fast-bet-input">
                     </div>
                     <div class="bet-btns">
                          <a href="">50</a>
                          <a href="">100</a>
                          <a href="">200</a>
                          <a href="">500</a>
                          <a href="">1000</a>
                          <a href="">设置快速金额</a>
                          <a href="" class="pull-right">重填</a>
                          <a href="" class="pull-right">提交</a>
                     </div>
                     <div class="clear"></div>
                </div>

            </form>
           


        </div>

        <!-- 右边的历史记录 -->
        <div id="history">
            <div class="history-header">
                长龙排行
            </div>
            <div class="history-table">
                <a href="" class="active">长龙-不出</a>
                <a href="">长龙-出</a>
                <a href="">历史开奖</a>
            </div>
            <div class="history-list">
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                 <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
                 <p>
                    <span class="pull-left">龙虎[和]</span>  
                    <span class="pull-right">14期</span>
                    <span class="clear"></span>
                </p>
            </div>
            <div class="history-close ">
                <a href="">
                    关闭
                </a>
            </div>
        </div>


  </div>
</template>



<script>
import config from '../assets/js/config';
export default 
{
    name:"Cqssc",
    data()
    {
        var my_data = 
        {
            showArray_cqssc:[1,0,0,0,0,0,0]
        };
        return my_data;
    },
    created:function()
    {
        //检测是否登录
        if(this.$store.state.isLogin || (window.localStorage.isLogin == "ok"))
        {
            //获取用户的信息
            this.$http.get(config.API + "user/" + (this.$store.state.user_id?this.$store.state.user_id:window.localStorage.user_id) ).then(function (response) 
            {
               //将用户的信息保存到本地会话
               window.localStorage.admin = response.data.data.user.admin;
               window.localStorage.agent = response.data.data.user.agent;
               window.localStorage.manager = response.data.data.user.manager;
               window.localStorage.nickname = response.data.data.user.nickname;
               window.localStorage.type = response.data.data.user.type;
               window.localStorage.username = response.data.data.user.username;
            })
        }
        else
        {
            //没有登录跳转到登录页面
           window.location.href = '#/login';
        }
    },
    methods: 
    {
        showType:function(idx)
        {
               this.showArray_cqssc = [0,0,0,0,0,0,0];
               this.showArray_cqssc[idx] = 1;
        }, 
    }
}
</script>


<style scoped>
   @import '../assets/css/pk10.css';
   .first-ball-details
   {
       text-align:left;
       text-indent: 15px;
   }
   .first-ball-details>span
   {
       float: left;
   }
</style>
