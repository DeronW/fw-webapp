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
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 使用返现券收益 </div>
                            <div className='moneyRight'>￥<span>100.00</span></div>
                        </div>
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 使用返息券收益 </div>
                            <div className='moneyRight'>￥<span>5.00</span> (工豆)</div>
                        </div>
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 会员等级年化加息奖励 </div>
                            <div className='moneyRight'>￥<span>10.00</span> (工豆)</div>
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
                    <p>投资奖励</p>
                </div>
                <div className='imgMove'>
                    <ul>
                        <li>
                            <img src="./images/move1.png" alt=""/>
                            <p>￥50返现券</p>
                        </li>
                        <li>
                            <img src="./images/move2.png" alt=""/>
                            <p>5%返息券</p>
                        </li>
                        <li>
                            <img src="./images/move3.png" alt=""/>
                            <p>2个兑换券</p>
                        </li>
                        <li>
                            <img src="./images/move4.png" alt=""/>
                            <p>+20000工分</p>
                        </li>
                    </ul>
                </div>
                <div className='smallTitle reward'>
                    <p>圈子奖励</p>
                    <span>
                        小队数据页面
                        <img src="./images/arrow.png" alt=""/>
                    </span>
                </div>
                <div className='interest circleReward'>
                    <div className='money'>
                        <div className='moneyLeft'> 获得个人任务贡献分</div>
                        <div className='moneyRight'><span>+3000</span></div>
                    </div>
                    <div className='money moneyNoBorder'>
                        <div className='moneyLeft'> 获得小队奖励工分</div>
                        <div className='moneyRight'><span>+3000</span></div>
                    </div>
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
                    <div className='money'>
                        <div className='moneyLeft'> 年化加息奖励</div>
                        <div className='moneyRight'><span className='fontColor'>3.5%</span></div>
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
                            <p>￥50返现券</p>
                        </li>
                        <li>
                            <img src="./images/pop2.png" alt=""/>
                            <p>5%返息券</p>
                        </li>
                        <li>
                            <img src="./images/pop3.png" alt=""/>
                            <p>2个兑换券</p>
                        </li>
                        <li>
                            <img src="./images/pop4.png" alt=""/>
                            <p>+20000工分</p>
                        </li>
                    </ul>
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