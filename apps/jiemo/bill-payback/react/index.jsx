const PayBackWrap = React.createClass({
    render:function(){
        return (
            <div>
                <PayBack/>
                <BankCardList/>
                <VerifyCode/>
                <PayBackResult/>
            </div>
        )
    }
});

const PayBack = React.createClass({
    render:function(){
        return (
            <div className="payback-box">
                 <div className="loan-num">
                     <div className="loan-money overdue-color">1000000.00</div>
                     <div className="loan-status2">应还总额(元)</div>
                 </div>
                 <div className="loan-detail-box">
                     <div>
                         <span>待还本金（<a className="payback-detail">详情</a>）</span>
                         <span>2000元</span>
                     </div>
                     <div>
                         <span>罚息</span>
                         <span>2000元</span>
                     </div>
                     <div>
                         <span>账户管理费</span>
                         <span>2000元</span>
                     </div>
                 </div>
                <div className="loan-detail-box">
                    <div>
                        <span>还款卡</span>
                        <span>工商银行（2223）<img className="right-arrow" src="images/right-arrow.jpg"/></span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>还款金额</span>
                        <span><input className="pay-back-input" type="text" value="" placeholder="请输入还款金额"/></span>
                    </div>
                </div>
                <div className="payback-tips">
                    <div>友情提示：</div>
                    <div>1.当前只支持使用储蓄卡还款，请确保卡内余额充足；</div>
                    <div>2.单次还款金额不低于100元。</div>
                </div>
                <div className="pay-back-btn">立即还款</div>
            </div>
        )
    }
});

const BankCardList = React.createClass({
    render:function(){
        return (
            <div className="bank-card-list">
                <div className="header">
                    <div className="arrow-left"></div>
                    <div className="title">选择还款卡</div>
                    <div className="history-bill">添加</div>
                </div>
                <div className="bank-branch-list">
                    <div className="list-item"><img src="images/bank-icon.png"/>交通银行（1915）<span className="checked"></span></div>
                     <div className="list-item"><img src="images/bank-icon.png"/>交通银行（1915）</div>
                     <div className="list-item"><img src="images/bank-icon.png"/>交通银行（1915）</div>
                </div>
            </div>
        )
    }
});

const VerifyCode = React.createClass({
    render:function(){
        return (
            <div className="mask2" style={{zIndex:10}}>
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
        )
    }
});

const PayBackResult = React.createClass({
    render:function(){
        return (
            <div className="payback-result">
                 <div className="payback-result-success-img"><img src="images/payback-success.png"/></div>
                 <div className="payback-result-fail-img"><img src="images/payback-fail.png"/></div>
                 <div className="payback-result-ing-img"><img src="images/payback-ing.png"/></div>
                 <div className="payback-result-success-tip">
                     <div className="tip-top">还有2323.23元未还，请记得准时还款!</div>
                     <div className="tip-bottom"> 还款金额：<span>212.21</span>元</div>
                 </div>
                <div className="payback-result-fail-tip">请检查网络原因，本次还款失败</div>
                <div className="payback-result-ing-tip">稍后可到账单页面查看具体还款结果。</div>
                <div className="credit-btn">提升额度</div>
                <div className="apply-btn">申请用钱</div>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"还款"}/>, document.getElementById('header'));
    ReactDOM.render(<PayBackWrap/>, document.getElementById('cnt'));
});
