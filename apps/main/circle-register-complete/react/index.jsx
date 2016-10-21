'use strict';

const API_PATH = document.getElementById('api-path').value;

const  Register = React.createClass({
    getInitialState: function () {
        return{
            isTeam:false,
            openFalse: false
        }
    },
    joinTeam: function () {
      this.setState({
          isTeam:true
      })
    },
    closeNotice: function () {
        this.setState({
            openFalse: false
        })
    },
    openNotice: function () {
        this.setState({
            openFalse: true
        })
    },
   render:function(){
       var _this = this;

       var first = function () {
            return <div className="registerFirst">
                <div className="registerFirstTop">
                    <img className='firstMedal' src="./images/medal.png" alt=""/>
                    <div className="registerScore">
                        +<span>2</span>
                    </div>
                    <div className="registerText">
                        签到成功
                    </div>
                </div>
                <div className="firstBigText">
                    已连续签到<span>3</span>天，明日签到奖励<p>2</p>工分
                </div>
                <div className="firstSmallText">
                    连续签到7天可额外获得10工分
                </div>
                <div className="firstBtn">
                    <span>进队后还有收益 <img className='firstArrow' src="./images/arrow.png" alt=""/></span>
                </div>
            </div>
        };
       var already = function () {
           return <div className="registerAlready">
               <div className="registerFirstTop">
                   <img className='firstMedal' src="./images/medal.png" alt=""/>
                   <div className="registerScore">
                       +<span>2</span>
                   </div>
                   <div className="registerText">
                       签到成功
                   </div>
               </div>
               <div className="alreadyTop">
                   已完成“入队签到任务”，为小队工分池贡献<span>Y</span>工分
               </div>
               <div className="firstBigText">
                   已连续签到<span>3</span>天，明日签到奖励<p>2</p>工分
               </div>
               <div className="alreadyFooter">
                   连续签到7天可额外获得10工分
               </div>
           </div>
       };
       var openDeml = function() {
           return <div className="notice">
               <div className="close"  onClick={_this.closeNotice}></div>
               <div className="noticeText">
                   <p>签到规则</p>
                   <p>1、用户每日参与签到可获得2工分；</p>
                   <p>2、加入小队后每日还可帮其他队员签到或请其他队员帮自己签到，但代签后自己不可再签到;</p>
                   <p>3、2工分可获得1次翻牌抽奖机会，每日最多可抽10次/人</p>
                   <p>4、若存在用户恶意刷奖行为，金融工场有权取消获奖资格，并保留相关法律权利</p>
                   <p>5、本活动解释权归金融工场所有</p>
               </div>
           </div>
       };

       return (

           <div className="container">
               <div className='headerCon'>
                   <img src="./images/back.png" alt=""/>
                   <div className='headerConText'>
                       签到成功
                   </div>
                   <div className="headerRule" onClick={this.openNotice}>
                       签到规则
                   </div>
               </div>
               <div className="register">
                   {
                       this.state.isTeam ? already() : first()
                   }
                   {
                       this.state.openFalse ? openDeml() : null
                   }
               </div>


           </div>
       )
   }
});

ReactDOM.render(
  <Register />,
    document.getElementById("cnt")
);