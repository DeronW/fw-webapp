
const CreditImprovement= React.createClass({
    render : function(){
        return (
           <div>
               <div className="header">现金贷</div>
                <div className="loan-num">
                     <div className="max-loan-title">最高借款额度（元）</div>
                     <div className="max-loan-money">100000.00</div>
                </div>
                <div className="loan-info">
                    <div className="slider-area">

                    </div>
                    <div className="loan-info-items">
                        <div className="credit-lines">
                            <div className="credit-money">
                                <span className="credit-money-title">信用额度（元）</span>
                                <span className="credit-money-num">100000.00</span>
                            </div>
                            <div className="loan-duration">
                                <span className="loan-duration-title">借款期限（天）</span>
                                <span className="loan-duration-num">210</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                <div className="loan-btn">我要提额</div>
                <div className="loan-tip">完善授权信息可减免手续费</div>
           </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<CreditImprovement/>, document.getElementById('cnt'));
    ReactDOM.render(<BottomNavBar index={3}/>, document.getElementById('bottom-nav-bar'));
});

