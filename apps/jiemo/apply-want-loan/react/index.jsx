const WantLoan = React.createClass({
    render:function(){
        return (
            <div>
                <div className="loan-box">
                    <div className="loan-box-title">借款金额（元）</div>
                    <input className="loan-num" type="text" value="568000.00"/>
                    <div className="horizonal-line">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <div className="loan-charge"><img className="icon" src="images/icon.png"/>日综合费率<span>2.3%</span>，期限<span>23天</span></div>
                </div>
                <div className="withdraw-card">
                    <span className="withdraw-card-title">提现卡</span>
                    <span className="withdraw-card-branch">工商银行（1232）</span>
                </div>
                <div className="loan-btn">立即借款</div>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"我要借款"}/>, document.getElementById('header'));
    ReactDOM.render(<WantLoan/>, document.getElementById('cnt'));
});
