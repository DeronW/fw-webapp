
const ApplyLoan = React.createClass({
    render : function(){
        return (
           <div>
               <div className="header">现金贷</div>
                <div className="loan-num">
                     <div className="max-loan-title">最高借款额度（元）</div>
                     <div className="max-loan-money">10000.00</div>
                </div>
                <div className="loan-info">
                    <div className="slider-area">

                    </div>
                    <div className="credit-lines">
                         <div className="credit-money">
                              <span>信用额度（元）</span>
                              <span>10000.00</span>
                         </div>
                        <div className="loan-duration">
                            <span>借款期限（天）</span>
                            <span>21</span>
                        </div>
                    </div>
                </div>
                <div className="loan-btn">申请借款</div>
                <div className="loan-tip">完善授权信息可减免手续费</div>
           </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<ApplyLoan/>, document.getElementById('cnt'));
});

