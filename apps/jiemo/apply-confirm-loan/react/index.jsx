const ConfirmLoan = React.createClass({
    render:function(){
        return (
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
                     <span className="loan-right-arrow"></span>
                 </div>
                 <div className="agreement-issue">
                     <div className="check-box"></div>
                     <div className="check-item">同意<a href="">《xxx借款服务协议》</a>、<a href="">《xxx借款协议》</a>，未按时还款将计入信用卡银行的信用报告</div>
                 </div>
                 <div className="confirm-btn">确定</div>
            </div>
        )
    }
});



$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"确认信息"}/>, document.getElementById('header'));
    ReactDOM.render(<ConfirmLoan/>, document.getElementById('cnt'));
});
