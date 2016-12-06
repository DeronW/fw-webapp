const HeaderTop = React.createClass({
    getInitialState: function () {
        return {
            backBtn:true
        }
    },
    render:function(){
        return  (
            <div className='headerCon' >
                {
                    this.state.backBtn ? <div className="imgBtn" onClick ={this.props.backBtn}><img src="./images/back.png" alt="" /></div> : null
                }
                <div className='headerConText'>
                    {this.props.title}
                </div>
            </div>
        )
    }
});
const TeamTop = React.createClass({
    render:function(){
        var teamTopData = {
            sculpture : "./images/aa.png",
            phoneNum : '136****4523',
            teamId:"34373647873",
            vipImg:"./images/vip2.png",
            scale:"8",
            score:"48000",
            ratio:"0.25"
        };
        return(
            <div className="teamTop">
                <div className="teamTopUp">
                    <div className="teamUpLeft">
                        {
                            teamTopData.sculpture ? <img src={teamTopData.sculpture} alt=""/> : <img src="./images/aa.png" alt=""/>
                        }
                    </div>
                    <div className="teamUpCenter">
                        <div className="teamUpName">
                            <div className="teamUpNameText">{teamTopData.phoneNum}</div>
                        </div>
                        <div className="teamUpId">
                            id:<span>{teamTopData.teamId}</span>
                        </div>
                    </div>
                    <div className="teamUpRight">
                        <img src={teamTopData.vipImg} alt=""/>
                    </div>
                </div>
                <div className="teamTopDown">
                    <div className="teamDownLeft teamDownCom">
                        <div className="teamDownMark">
                            <span>{teamTopData.scale}</span>%
                        </div>
                        <p>团队贡献占比</p>
                    </div>
                    <div className="teamDownCen teamDownCom">
                        <div className="teamDownMark">
                            <span>{teamTopData.score}</span>
                        </div>
                        <p>预期个人月结总工分</p>
                    </div>
                    <div className="teamDownRight teamDownCom">
                        <div className="teamDownMark">
                            <span>{teamTopData.ratio}</span>
                        </div>
                        <p>奖励系数</p>
                    </div>
                </div>
            </div>
        )
    }
});
const TeamSettleTitle = React.createClass({
   render: function () {
       return(
           <div className="teamSettleTitle">
               <div className="teamSettleTitleText">{this.props.settleTitle}</div>
               {
                   this.props.settleCon ?  <div className="teamSettleTitleCon">{this.props.settleCon}</div>:null
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
        var describeItem = function (des,index) {
            return <div className='teamCenterDescribe' key={index}>
                <div className="teamDescribeTitle">
                    <img src={des.img} alt=""/>
                    <div className="teamDescribeTitleText">{des.text}</div>
                </div>
            </div>
        };
        return (
            <div className="teamCenter">
                <div className="teamCenterColumn">

                </div>
                {
                    desData.map(describeItem)
                }
                <div className="teamUpgrade">
                    <span>贡献值太低、工分太少，怎么解？</span>
                    <span>更多任务<img src="./images/arrowRight.png" alt=""/></span>
                </div>
            </div>
        )
    }
});
const Settle = React.createClass({
    render:function(){
        var setData = [
            {
                img:'./images/one.png',
                textTop:'我的月结个人任务贡献工分/全员个人任务贡献工分总和',
                textScale1:'250002400',
                textScale2:'2500025000',
                textFooter:'我的月结个人任务贡献工分 ：个人当月完成的个人任务贡献工分总和。'
            },
            {
                img:'./images/two.png',
                textTop:'我的月结团队奖励工分/团队任务奖励工分',
                textScale1:'250002400',
                textScale2:'2500025000',
                textFooter:'我的月结团队奖励工分=工分池中团队任务部分*个人团队占比。'
            },
            {
                img:'./images/three.png',
                textTop:'我的月结小队奖励工分/小队奖励工分',
                textScale1:'250002400',
                textScale2:'2500025000',
                textFooter:'我的月结小队奖励工分=当月小队奖励工分 * 当月个人团队贡献占比。'
            }
        ];
        var settleData = function (sett, index) {
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
        };
        return (
            <div className="teamSettle">
                <TeamSettleTitle settleTitle={"预期结算工分"}
                                 settleCon={"我的预期结算工分=我的任务工分+我的月结团队奖励工分 +我的奖励工分。如下："}/>
                <div className="teamSettleContent">
                    {
                        setData.map(settleData)
                    }
                </div>
            </div>
        )
    }
});
const HistoryScore = React.createClass({
   render: function () {
       return(
           <div className="teamSettle">
               <TeamSettleTitle settleTitle={"历史个人结算工分"}/>
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
       )
   }
});

const TeamData = React.createClass({
    backFun: function () {
        window.history.back();
    },
    render: function () {

        return (
            <div className="container">
                <HeaderTop title={"个人数据"}
                           backBtn={this.backFun}/>
                <TeamTop />
                <Describe />
                <Settle />
                <HistoryScore />
                <div className="getScore">
                    <p>我要赚工分</p>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
  <TeamData />,
    document.getElementById("cnt")
);
