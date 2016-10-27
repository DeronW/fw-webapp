'use strict';

const API_PATH = document.getElementById('api-path').value;

const ScoreStream = React.createClass({
    getInitialState: function () {
      return {
          isChange:'true',
          isListShow:'false',
          isMonth:'12月'
      }
    },
    handleChange:function(){
      this.setState({
          isChange: !this.state.isChange
      })
    },
    handleShowList: function () {
      this.setState({
          isListShow:!this.state.isListShow
      })
    },
    getElementValue: function (event) {
      this.setState({
          isListShow:!this.state.isListShow,
          isMonth:event.target.id
      })
    },
    render: function () {
        console.log(this.state.isListShow);
        var listShowStyle = {
          display:this.state.isListShow ? 'none':'block'
        };
        var imgChange = !this.state.isListShow ? './images/arrowRotate.png' : './images/arrow.png';
        var month = this.state.isMonth;
        return (
            <div className="container">
                <div className='headerCon'>
                    <img src="./images/back.png" alt=""/>
                    <div className='headerConText'>
                        工分池流水
                    </div>
                </div>
                <div className="stream">
                    <div className="streamMonth">
                        <div className="MonthLeft">
                            <div className="MonthLeftShow" onClick={this.handleShowList}>
                                <span>{month}</span>
                                <img src={imgChange} alt=""/>
                            </div>
                            <div className="MonthLeftHide" style={listShowStyle}>
                                <ul onClick={this.getElementValue} style={listShowStyle}>
                                    <li className="hideSelf" id="12月">12月</li>
                                    <li id="4月">4月</li>
                                    <li id="3月">3月</li>
                                    <li id="2月">2月</li>
                                    <li id="1月">1月</li>
                                </ul>
                            </div>
                        </div>
                        <div className="MonthRight">
                            <div className="MonthRightText">显示全部</div>
                            <div className={this.state.isChange ? 'MonthRightBtn' : 'MonthRightBtnRed'} onClick={this.handleChange}>
                                <div className="MonthRightBtnChange"></div>
                            </div>
                        </div>
                    </div>
                    <div className="streamList">
                        <Item />
                        <div className="streamMore">
                            向上滑动加载更多
                        </div>
                    </div>
                </div>
            </div>)
    }
});

const Item = React.createClass({
   render: function () {
       var itemData = [
           {
               time:'2016-7-31',
               changeScore:"+550",
               remainderText:'工分池余额',
               remainderScore:'400',
               person:'+425',
               team:'+50',
               reward:'+30'
           },
           {
               time:'2016-7-31',
               changeScore:"+550",
               remainderText:'工分池余额',
               remainderScore:'400',
               person:'+425',
               team:'+50',
               reward:'+30'
           },
           {
               time:'2016-7-31',
               changeScore:"+550",
               remainderText:'工分池余额',
               remainderScore:'400',
               person:'+425',
               team:'+50',
               reward:'+30'
           }
       ];
       return(
           <div>
               {
                   itemData.map((item,index) => {
                       return  <div className="ListItem" key={index}>
                           <div className="ListItemTop">
                               <div className="itemTopTime">{item.time}</div>
                               <div className="itemTopSore"><span>{item.changeScore}</span></div>
                           </div>
                           <div className="ListItemCenter">
                               <div className="itemCenterRemainder">
                                   <div className="itemCenterRemainderWrap">
                                       <div className="itemCenterRemainderText">{item.remainderText}</div>
                                       <div className="itemCenterRemainderScore">{item.remainderScore}</div>
                                   </div>
                               </div>
                               <ul className="itemCenterReward">
                                   <li>
                                       <div className="itemCenterRewardLeft">个人贡献</div>
                                       <div className="itemCenterRewardRight"><span>{item.person}</span></div>
                                   </li>
                                   <li>
                                       <div className="itemCenterRewardLeft">团队贡献</div>
                                       <div className="itemCenterRewardRight"><span>{item.team}</span></div>
                                   </li>
                                   <li>
                                       <div className="itemCenterRewardLeft">小队奖励</div>
                                       <div className="itemCenterRewardRight"><span>{item.reward}</span></div>
                                   </li>
                               </ul>
                           </div>
                           <div className="itemFooter">
                               <div>备注：小队升级，小队由<span>1</span>级升至<span>2</span>级。奖励系数由<span>0.1</span>变更为<span>0.2</span>。</div>
                           </div>
                       </div>
                   })
               }
           </div>
       )
   }
});

ReactDOM.render(
  <ScoreStream />,
    document.getElementById('cnt')
);
