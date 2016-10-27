'use strict';

const API_PATH = document.getElementById('api-path').value;
const TeamData = React.createClass({
   render: function () {
       return (
           <div className="container">
               <div className='headerCon'>
                   <img src="./images/back.png" alt=""/>
                   <div className='headerConText'>
                       小队数据
                   </div>
               </div>
               <div className="teamTop">
                    <div className="teamTopUp">
                        <div className="teamUpLeft">
                            <img src="./images/aa.png" alt=""/>
                        </div>
                        <div className="teamUpRight">
                            <div className="teamUpName">
                                <div className="teamUpNameText">梦之队</div>
                                <div className="teamUpNameImg">
                                    <img src="./images/trophy.png" alt=""/>
                                    <img src="./images/level.png" alt=""/>
                                </div>
                            </div>
                            <div className="teamUpId">
                                id:<span>451254578</span>
                            </div>
                            <div className="teamUpScore">
                                小队累计获得工分<span>99999999</span>
                            </div>
                        </div>
                    </div>
                   <div className="teamTopDown">
                        <div className="teamDownLeft teamDownCom">
                            <div className="teamDownMark">
                                <span>48000</span>
                            </div>
                            <p>工分池工分</p>
                        </div>
                       <div className="teamDownCen teamDownCom">
                           <div className="teamDownMark">
                               +<span>0.25</span>
                               <img src="./images/arrowDown.png" alt=""/>
                           </div>
                           <p>奖励系数</p>
                       </div>
                       <div className="teamDownRight teamDownCom">
                           <div className="teamDownMark">
                               <span>20</span>/30人
                           </div>
                           <p>小队人数</p>
                       </div>
                   </div>
               </div>
               <div className="teamUpgrade">
                   <span>小队数据页面升级啦，请立即更新</span>
                   <img src="./images/arrowRight.png" alt=""/>
               </div>
               <div className="teamCenter">
                    <div className="teamCenterPool">
                        <div className="teamPoolLeft">当月工分池构成</div>
                        <div className="teamPoolRight">
                            <span>48000</span>工分
                        </div>
                    </div>
                   <div className="teamCenterColumn">

                   </div>
                   {
                      <Describe />
                   }
                   <div className="teamCenterBtn">查看流水</div>
               </div>
               <div className="teamMiddle">
                   <div className="teamCenterPool">
                       <div className="teamPoolLeft">当月工分池构成</div>
                   </div>
                    <div className="teamCenterCurve"></div>
               </div>
               <div className="teamFooter">
                   <div className="teamCenterPool teamCenterScale">
                       <div className="teamPoolLeft">当月工分池构成</div>
                   </div>
                   <Proportion />
                   <div className="loadMore">
                       向上滑动加载更多
                   </div>
               </div>
               <div className="teamUpdateBtn">
                   <p>小队升级</p>
               </div>
           </div>
       )
   }
});
const Describe = React.createClass({
   getInitialState: function () {
       return {
           desDefault:[]
       }
   },
    render: function () {
        var desData = [
            {
                img:'./images/des1.png',
                text:'全员个人任务贡献工分总和',
                score:'16000',
                content:'当月内该小队每个队员的个人任务贡献工分的总和。'
            },
            {
                img:'./images/des2.png',
                text:'团队任务奖励工分',
                score:'16000',
                content:'该小队当月内完成的全部团队任务所累积的工分总和。。'
            },
            {
                img:'./images/des3.png',
                text:'小队奖励工分',
                score:'16000',
                content:'(当月团队任务奖励工分 + 当月全员个人任务贡献工分总和）* 奖励系数。'
            }
        ];
        return <div>
            {
                desData.map((des, index) => {
                    return <div className='teamCenterDescribe' key={index}>
                        <div className="teamDescribeTitle">
                            <img src={des.img} alt=""/>
                            <div className="teamDescribeTitleText">{des.text}</div>
                            <div className="teamDescribeTitleScore"><span>{des.score}</span>工分</div>
                        </div>
                        <div className="teamDescribeCon">
                            {des.content}
                        </div>
                    </div>
                })
            }
        </div>
    }
});

const Proportion = React.createClass({
   render: function () {
       var proData = [
           {
               leftText:'11',
               name:'张继科',
               img:'./images/vip4.png',
               des1:'200300',
               des2:'33333123',
               imgArrow:'./images/arrow-right.png'
           },
           {
               leftText:'12',
               name:'刘诗诗',
               img:'./images/vip3.png',
               des1:'200300',
               des2:'33333123',
               imgArrow:'./images/arrow-right.png'
           },
           {
               leftText:'13',
               name:'马龙',
               img:'./images/vip2.png',
               des1:'200300',
               des2:'33333123',
               imgArrow:'./images/arrow-right.png'
           },
           {
               leftText:'14',
               name:'张三',
               img:'./images/vip1.png',
               des1:'200300',
               des2:'33333123',
               imgArrow:'./images/arrow-right.png'
           }
       ];
       return <div>
           {
               proData.map((proportion,index) => {
                   return <div className="teamCenterProportion" key={index}>
                       <div className="teamProportionLeft">
                           <span>{proportion.leftText}</span>%
                       </div>
                       <div className="teamProportionCenter">
                           <div className="teamProportionCenterText">
                               <div className="teamProportionCenterName">{proportion.name}</div>
                               <img src={proportion.img} alt="div"/>
                           </div>
                           <div className="teamProportionCenterDes">
                               预期结算<span>{proportion.des1}</span>工分 / 累计结算<span>{proportion.des2}</span>工分
                           </div>
                       </div>
                       <div className="teamProportionRight">
                           <img src={proportion.imgArrow} alt=""/>
                       </div>
                       <div className="teamCenterProportionFoot">
                           <div className="teamCenterProportionFoot1"><img src="./images/point.png" alt=""/><span>个人团队占比精度有偏差，最终请以实际结算工分为准。</span></div>
                           <div className="teamCenterProportionFoot2"><img src="./images/point.png" alt=""/><span>个人团队占比=个人任务贡献工分/当月小队全员个人任务贡献 工分总和 。</span></div>
                       </div>
                   </div>
               })
           }
       </div>
   }
});
ReactDOM.render(
  <TeamData />,
    document.getElementById("cnt")
);
