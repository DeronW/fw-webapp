'use strict';

const API_PATH = document.getElementById('api-path').value;
const TeamData = React.createClass({
   render: function () {
       return (
           <div className="container">
               <div className='headerCon'>
                   <img src="./images/back.png" alt=""/>
                   <div className='headerConText'>
                       个人数据
                       </div>
               </div>
               <div className="teamTop">
                    <div className="teamTopUp">
                        <div className="teamUpLeft">
                            <img src="./images/aa.png" alt=""/>
                        </div>
                        <div className="teamUpCenter">
                            <div className="teamUpName">
                                <div className="teamUpNameText">136****4523</div>
                            </div>
                            <div className="teamUpId">
                                id:<span>451254578</span>
                            </div>
                        </div>
                        <div className="teamUpRight">
                            <img src="./images/vip2.png" alt=""/>
                        </div>
                    </div>
                   <div className="teamTopDown">
                        <div className="teamDownLeft teamDownCom">
                            <div className="teamDownMark">
                                <span>8</span>%
                            </div>
                            <p>团队贡献占比</p>
                        </div>
                       <div className="teamDownCen teamDownCom">
                           <div className="teamDownMark">
                               <span>48000</span>
                           </div>
                           <p>预期个人月结总工分</p>
                       </div>
                       <div className="teamDownRight teamDownCom">
                           <div className="teamDownMark">
                               <span>0.25</span>
                           </div>
                           <p>奖励系数</p>
                       </div>
                   </div>
               </div>
               <div className="teamCenter">
                   <div className="teamCenterColumn">

                   </div>
                   {
                      <Describe />
                   }
               </div>
               <div className="teamUpgrade">
                   <span>贡献值太低、工分太少，怎么解？</span>
                   <span>更多任务<img src="./images/arrowRight.png" alt=""/></span>
               </div>
               <div className="teamSettle">
                    <div className="teamSettleTitle">
                        <div className="teamSettleTitleText">预期结算工分</div>
                        <div className="teamSettleTitleCon">我的预期结算工分=我的任务工分+我的月结团队奖励工分 +我的奖励工分。如下：</div>
                    </div>
                   <div className="teamSettleContent">
                       <Settle />
                   </div>
               </div>
               <div className="teamHistoryScore">
                    <div className="teamHistoryScoreTitle">
                        历史个人结算工分
                    </div>
                   <div className="teamHistoryScoreContent">
                        <div className="teamHistoryScoreContentTop">
                            数据只包含我的月结小队奖励工分，当月退队的结算工分不展示在下图：
                        </div>
                       <div className="teamHistoryScoreContentCurve">

                       </div>
                       <div className="teamHistoryScoreContentFooter">
                           <span><img src="./images/des4.png" alt=""/>个人月结小队奖励工分</span>
                           <span><img src="./images/des5.png" alt=""/>队长奖励公分</span>
                       </div>
                   </div>
                   <div className="teamHistoryScoreHost">
                       当月预期结算工分为预估值，请以结算日数据为准
                   </div>
               </div>
               <div className="getScore">
                    <p>我要赚工分</p>
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
                text:'全员个人任务贡献工分总和'
            },
            {
                img:'./images/des2.png',
                text:'团队任务奖励工分'
            },
            {
                img:'./images/des3.png',
                text:'小队奖励工分'
            }
        ];
        return <div>
            {
                desData.map((des, index) => {
                    return <div className='teamCenterDescribe' key={index}>
                        <div className="teamDescribeTitle">
                            <img src={des.img} alt=""/>
                            <div className="teamDescribeTitleText">{des.text}</div>
                        </div>
                    </div>
                })
            }
        </div>
    }
});

const Settle = React.createClass({
    render:function(){
        var setData = [
            {
                img:'./images/one.png',
                textTop:'我的月结个人任务贡献工分 / 全员个人任务贡献工分总和',
                textScale1:'250002400',
                textScale2:'2500025000',
                textFooter:'我的月结个人任务贡献工分 ：个人当月完成的个人任务贡献工分总和。'
            },
            {
                img:'./images/two.png',
                textTop:'我的月结团队奖励工分 / 团队任务奖励工分',
                textScale1:'250002400',
                textScale2:'2500025000',
                textFooter:'我的月结团队奖励工分=工分池中团队任务部分*个人团队占比。'
            },
            {
                img:'./images/three.png',
                textTop:'我的月结小队奖励工分/ 小队奖励工分',
                textScale1:'250002400',
                textScale2:'2500025000',
                textFooter:'我的月结小队奖励工分=当月小队奖励工分 * 当月个人团队贡献占比。'
            }
        ];
        return <div>
            {
                setData.map((sett,index) => {
                    return <div className="teamSettleContentText" key={index}>
                        <div className="teamContentTextTop">
                            <img src={sett.img} alt=""/>
                            <span>{sett.textTop}</span>
                        </div>
                        <div className="teamContentTextCen">
                            <div className="teamContentTextCenScale">
                                <span className="textScale1">{sett.textScale1}</span> / <span className="textScale2">{sett.textScale2}</span>
                            </div>
                            <div className="teamContentTextCenProgress">
                                <div className="teamContentTextCenProgressUp"></div>
                            </div>
                        </div>
                        <div className="teamContentTextFooter">
                            {sett.textFooter}<span>更多>></span>
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
