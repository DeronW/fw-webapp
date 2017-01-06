const ApplyLoan = React.createClass({
    sliderHandler:function(){

    },
    render : function(){
        return (
           <div>
               <div className="header">现金贷</div>
                <div className="loan-num">
                     <div className="max-loan-title">最高借款额度（元）</div>
                     <div className="max-loan-money">10000</div>
                </div>
                <div className="loan-info">
                    <div className="slider-area">
                        <div className="scale">
                            <div className="scale-progress"></div>
                            <span className="btn" onTouchMove={this.sliderHandler}></span>
                        </div>
                        <div className="start-point"></div>
                        <div className="end-point"></div>
                        <div className="start-point-num">500</div>
                        <div className="end-point-num">10000</div>
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
                <div className="loan-btn">申请借款</div>
                <div className="credit-btn">
                    <div className="credit-improvement-btn">我要提额</div>
                    <div className="credit-apply-btn">我要借款</div>
                </div>
                <div className="loan-tip">完善授权信息可减免手续费</div>
           </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<ApplyLoan/>, document.getElementById('cnt'));
    ReactDOM.render(<BottomNavBar index={1}/>, document.getElementById('bottom-nav-bar'));
});

