const PayBackWrap = React.createClass({
    render:function(){
        return (
            <div>
                <PayBack/>
                <BankCardList/>
            </div>
        )
    }
});

const PayBack = React.createClass({
    render:function(){
        return (
            <div>
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
            <div className="mask">
                <div className="popup">
                    <div className="popup-wrap">
                        <span className="popup-close"></span>
                        <div className="popup-title">选择银行卡</div>
                        <div className="bankcard-list">
                            <div className="bankcard">
                                <div className="checked"></div>
                                <div className="bank-name">工商银行（1212）</div>
                            </div>
                            <div className="bankcard">
                                <div className="checked"></div>
                                <div className="bank-name">工商银行（1212）</div>
                            </div>
                            <div className="bankcard">
                                <div className="checked"></div>
                                <div className="bank-name">工商银行（1212）</div>
                            </div>
                        </div>
                        <div className="add-bank-card"><img src="images/plus.jpg"/>添加银行卡</div>
                    </div>

                </div>
            </div>
        )
    }
});




$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"还款"}/>, document.getElementById('header'));
    ReactDOM.render(<PayBackWrap/>, document.getElementById('cnt'));
});
