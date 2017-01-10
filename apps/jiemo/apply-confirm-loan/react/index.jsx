
const ConfirmLoan = React.createClass({
    render:function(){
        return (
            <div>
                <div>
                    <div className="transfer-box">
                        <div className="transfer-title">到账金额（元）</div>
                        <div className="transfer-money">100000.00</div>
                        <div className="loan-info">
                            <div className="transfer-lines">
                                <div className="return-money">
                                    <span className="return-money-title">应还金额（元）</span>
                                    <span className="return-money-num">100000.00</span>
                                </div>
                                <div className="return-date">
                                    <span className="return-date-title">应还日期</span>
                                    <span className="return-date-day">2016-12-21</span>
                                </div>
                            </div>
                            <span className="vertical-line"></span>
                        </div>
                    </div>
                    <div className="transfer-tip">请按时还款，避免<a href="">逾期费用</a>。</div>
                    <div className="loan-fee">
                        <span className="loan-fee-num">借款费用230.00元</span>
                        <span className="loan-right-arrow">详情</span>
                    </div>
                    <div className="agreement-issue">
                        <div className="check-box"></div>
                        <div className="check-item">同意<a href="">《芥末借款服务协议》</a>、<a href="">《芥末借款协议》</a>，未按时还款将计入信用卡银行的信用报告</div>
                    </div>
                    <div className="confirm-btn">确定</div>
                </div>
                <div className="mask1">
                    <div className="detail-pop">
                        <div className="close-icon"></div>
                        <div className="item-wrap">
                            <div className="item-list"><span className="item-left">出借人利息</span><span className="item-right">3.12元</span></div>
                            <div className="item-list"><span className="item-left">快递信审费</span><span className="item-right">3.12元</span></div>
                            <div className="item-list"><span className="item-left">质保服务专款</span><span className="item-right">3.12元</span></div>
                            <div className="item-list"><span className="item-left">账户管理</span><span className="item-right">3.12元</span></div>
                            <div className="item-list"><span className="item-left">代收通道费</span><span className="item-right">3.12元</span></div>
                        </div>
                        <div className="know-btn">知道了</div>
                    </div>
                </div>
                <div className="mask2">
                    <div className="notice-pop">
                        <div className="notice-close"></div>
                        <div className="notice-title">逾期费用说明</div>
                        <div className="notice-content">第三届互联网金融全球峰会北大论坛于4月19-21日在北京召开。近期，互联网金融行业风险频发，很多平台陷入兑付危机，在这样的大环境下，导致很多P2P平台开始逐渐退出市场。金融工场副总裁李建光在接受央广网财经记者的采访时指出，2016年是监管落地的元年，在监管的因素落地之前，一定会有一个大浪淘沙的过程，之前的爆发式野蛮增长的过程中，发展出来的平台里面必然会有沙子，但是总体上看，随着监管的落地，互联网金融行业的趋势一定是良币驱逐劣币。</div>
                        <div className="notice-btn">知道了</div>
                    </div>
                </div>
                <div className="mask3">
                    <div className="verify-popup">
                        <div className="verify-popup-wrap">
                            <div className="verify-popup-close"></div>
                            <div className="verify-popup-title">短信验证</div>
                            <div className="verify-popup-tip"> 已向工商银行（2233）银行预留手机号发送短信验证码。</div>
                            <div className="verify-input">
                                <input className="sms-input" type="text" value="" placeholder="输入验证码"/>
                                <span className="btn-countdown">获取验证码</span>
                            </div>
                            <div className="confirm-btn">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"确认信息"}/>, document.getElementById('header'));
    ReactDOM.render(<ConfirmLoan/>, document.getElementById('cnt'));
});
