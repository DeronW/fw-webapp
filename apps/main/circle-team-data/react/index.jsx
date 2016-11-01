'use strict';

const API_PATH = document.getElementById('api-path').value;

const HeaderTop = React.createClass({
   getInitialState: function () {
     return({
         backBtn:true
     })
   },
   render:function(){
       return(
           <div className='headerCon'>
               {
                   this.state.backBtn ? <div className="imgBtn" onClick ={this.props.backBtn}><img src="./images/back.png" alt=""/></div> : null
               }
               <div className='headerConText'>
                   {this.props.title}
               </div>
           </div>
       )
   }
});

const FooterBtn = React.createClass({
   render: function () {
       return(
           <div className="teamUpdateBtn">
               <p>{this.props.btnContent}</p>
           </div>
       )
   }
});

const TeamTop = React.createClass({
   render:function(){
       return(
           <div className="teamTop">
               <div className="teamTopUp">
                   <div className="teamUpLeft">
                       {
                           this.props.sculpture ? <img src={this.props.sculpture} alt=""/> : <img src="./images/aa.png" alt=""/>
                       }
                   </div>
                   <div className="teamUpRight">
                       <div className="teamUpName">
                           <div className="teamUpNameText">{this.props.teamName}</div>
                           <div className="teamUpNameImg">
                               <img src="./images/trophy.png" alt=""/>
                               <img src="./images/level.png" alt=""/>
                           </div>
                       </div>
                       <div className="teamUpId">
                           id:<span>{this.props.teamId}</span>
                       </div>
                       <div className="teamUpScore">
                           小队累计获得工分<span>{this.props.totalScore}</span>
                       </div>
                   </div>
               </div>
               <div className="teamTopDown">
                   <div className="teamDownLeft teamDownCom">
                       <div className="teamDownMark">
                           <span>{this.props.score}</span>
                       </div>
                       <p>工分池工分</p>
                   </div>
                   <div className="teamDownCen teamDownCom">
                       <div className="teamDownMark">
                           <span>{this.props.ratio}</span>
                           <img src="./images/arrowDown.png" alt=""/>
                       </div>
                       <p>奖励系数</p>
                   </div>
                   <div className="teamDownRight teamDownCom">
                       <div className="teamDownMark">
                           <span>{this.props.number}</span>/30人
                       </div>
                       <p>小队人数</p>
                   </div>
               </div>
           </div>
       )
   }
});

const TeamPool = React.createClass({
    render: function () {
        return(
            <div className="teamCenterPool">
                <div className="teamPoolLeft">{this.props.poolTitle}</div>
                {
                    this.props.poolScore ? <div className="teamPoolRight">
                                            <span>{this.props.poolScore}</span>工分
                                        </div> : null
                }
            </div>
        )
    }
});

const ScoreDes = React.createClass({
    render: function () {
        var scoreItem = function (des,index) {
            return  <div className='teamCenterDescribe' key={index}>
                <div className="teamDescribeTitle">
                    <img src={des.img} alt=""/>
                    <div className="teamDescribeTitleText">{des.text}</div>
                    <div className="teamDescribeTitleScore"><span>{des.score}</span>工分</div>
                </div>
                <div className="teamDescribeCon">
                    {des.content}
                </div>
            </div>
        };
        return(
            <div>
                {
                    this.props.scoreList.map(scoreItem)
                }
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
                score:'13000',
                content:'(当月团队任务奖励工分 + 当月全员个人任务贡献工分总和）* 奖励系数。'
            }
        ];
        return <ScoreDes scoreList={desData}/>
    }
});
const ScoreProportion = React.createClass({
    render: function () {
        var proportionItem = function (proportion,index) {
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
        }
        return(
            <div>
                {
                    this.props.proportion.map(proportionItem)
                }
            </div>
        )
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
            },
            {
                leftText:'14',
                name:'张是的',
                img:'./images/vip1.png',
                des1:'200300',
                des2:'33333123',
                imgArrow:'./images/arrow-right.png'
            }
        ];
        return <div>
                <ScoreProportion proportion={proData}/>
                <div className="loadMore">
                    向上滑动加载更多
                </div>
            </div>

    }
});
const TeamColumn = React.createClass({
   render: function () {
       return(
           <div className="teamCenterColumn">

           </div>
       )
   }
});

const TeamCurve = React.createClass({
   render: function () {
       return(
           <div className="teamCenterCurve">

           </div>
       )
   }
});
const TeamData = React.createClass({
    backFun: function () {
        window.history.back();
    },
   render: function () {
       var topData = {
           sculpture:"./images/sculpture.png",
           teamName:"梦之队",
           teamId:34343434121,
           totalScore:"56000",
           score:"48000",
           ratio:"1.5",
           number:"18"
       };
       return (
           <div className="container">
               <HeaderTop title={"小队数据"} backBtn={this.backFun}/>
               <TeamTop sculpture={topData.sculpture}
                        teamName={topData.teamName}
                        teamId={topData.teamId}
                        totalScore={topData.totalScore}
                        score={topData.score}
                        ratio={topData.ratio}
                        number={topData.number}/>
               <div className="teamUpgrade">
                   <span>小队数据页面升级啦，请立即更新</span>
                   <img src="./images/arrowRight.png" alt=""/>
               </div>
               <div className="teamCenter">
                   <TeamPool poolTitle={"当月工分池构成"}
                             poolScore={48000}/>
                   <TeamColumn />
                   <Describe />
                   <div className="teamCenterBtn">查看流水</div>
               </div>
               <div className="teamMiddle">
                   <TeamPool poolTitle={"奖励系数变更"}/>
                   <TeamCurve />
               </div>
               <div className="teamFooter">
                   <TeamPool poolTitle={"当月个人团队占比"}/>
                   <Proportion />
               </div>
               <FooterBtn btnContent={"小队升级"} />
           </div>
       )
   }
});

ReactDOM.render(
  <TeamData />,
    document.getElementById("cnt")
);
