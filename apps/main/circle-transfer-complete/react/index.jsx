'use strict';

const API_PATH = document.getElementById('api-path').value;

const HeaderTitle = React.createClass({
    getInitialState: function() {
        return {
            tabShow: false,
            deg: 0
        }
    },
    handlerTab: function() {
        this.setState({
            tabShow: !this.state.tabShow,
            deg: !this.state.tabShow ? "180" : "0"
        });
    },
    render:function(){
        var tabBlock = function() {
            return <div className="hideInterest">
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 预期收益 </div>
                            <div className='moneyRight'>￥<span>200.00</span></div>
                        </div>
                    </div>
        };

        var rotateStyle = {
            transform: "rotate("+ this.state.deg + "deg)"
        };


        return (
            <div className='container'>
                <div className='headerCon'>
                    <img src="./images/back.png" alt=""/>
                    <div className='headerConText'>
                        投标成功
                    </div>
                </div>
                <div className='banner'>
                    <img src="./images/banner.png" alt=""/>
                </div>
                <div className='smallTitle'>
                    <p>投资获利</p>
                </div>
                <div className='interest'>
                    <div className='money'>
                        <div className='moneyLeft'> 投资金额</div>
                        <div className='moneyRight'>￥<span>10.00</span></div>
                    </div>
                    <div className='money' onClick={this.handlerTab}>
                        <div className='moneyLeft'> 总收益</div>
                        <img src="./images/arrow.png" alt="" style={rotateStyle}/>
                        <div className='moneyRight'>￥<span>10.00</span></div>
                    </div>
                    {
                        this.state.tabShow ? tabBlock() : null
                    }
                </div>
                <div className='smallTitle'>
                    <p>会员等级</p>
                </div>
                <div className='interest level'>
                    <div className='money'>
                        <div className='moneyLeft'> 获得贡献值</div>
                        <div className='moneyRight'><span>+3000</span></div>
                    </div>
                    <div className='money'>
                        <div className='moneyLeft'> 当前会员等级</div>
                        <div className='moneyRight'><img src="./images/vip.png" alt=""/></div>
                    </div>
                </div>
                <div className='smallTitle reward'>
                    <p>人气兑换</p>
                    <span>
                        赚了工分？去商城转转
                        <img src="./images/arrow.png" alt=""/>
                    </span>
                </div>
                <div className='imgMove popular'>
                    <ul>
                        <li>
                            <img src="./images/pop1.png" alt=""/>
                            <div className='popScore'><span>399</span>工分</div>
                        </li>
                        <li>
                            <img src="./images/pop2.png" alt=""/>
                            <div className='popScore'><span>3999</span>工分</div>
                        </li>
                        <li>
                            <img src="./images/pop3.png" alt=""/>
                            <div className='popScore'><span>399</span>工分</div>
                        </li>
                        <li>
                            <img src="./images/pop4.png" alt=""/>
                            <div className='popScore'><span>3399</span>工分</div>
                        </li>
                    </ul>
                </div>
                <div className="tranColor">
                </div>
                <div className="seeReward">
                    <div className="seeRewardText">查看投资奖励</div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <HeaderTitle />,
    document.getElementById("cnt")
);