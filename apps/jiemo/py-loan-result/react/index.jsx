const LoanResult = React.createClass({
    render:function(){
        return (
           <div>
               <div className="result-box">
                   <div className="success-icon"><img src="images/success-icon.png"/></div>
                   <div className="fail-icon"><img src="images/fail-icon.png"/></div>
                   <div className="loan-result1">
                       <div className="icon1"></div>
                       <div className="icon1-info">借款成功</div>
                       <div className="line"></div>
                       <div className="waiting-result">
                           <div className="icon2"></div>
                           <div className="icon2-info">预计58S之后给您处理结果</div>
                       </div>
                   </div>
                   <div className="loan-result2">
                       <div className="icon1"></div>
                       <div className="icon1-info">借款成功</div>
                       <div className="line"></div>
                       <div className="success-result-for-jrgc">
                           <div className="icon3"></div>
                           <div className="icon3-info">
                               <div className="icon3-info-top">等待打款至徽商账户</div>
                               <div className="icon3-info-btm">打款成功您会收到短信通知</div>
                           </div>
                       </div>
                   </div>
                   <div className="loan-result3">
                       <div className="icon1"></div>
                       <div className="icon1-info">借款成功</div>
                       <div className="line"></div>
                       <div className="success-result-for-other">
                           <div className="icon3"></div>
                           <div className="icon3-info">
                               <div className="icon3-info-top">已打款至</div>
                               <div className="icon3-info-btm">银行卡（工商银行2233）</div>
                           </div>
                       </div>
                   </div>
                   <div className="loan-result4">
                       <div className="icon4"></div>
                       <div className="icon4-info">
                           <div className="icon4-info-top">借款失败</div>
                           <div className="icon4-info-btm">由于银行问题导致借款失败</div>
                       </div>
                       <div className="line2"></div>
                       <div className="waiting-result">
                           <div className="icon5"></div>
                           <div className="icon5-info">请重新借款</div>
                       </div>
                   </div>
                   <div className="customer-service">
                       <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a href="tel:400-0322-988">400-000-0000</a></div>
                   </div>
               </div>
               <div className="credit-btn">去提额</div>
               <div className="apply-btn">重新借款</div>
           </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"借款结果"}/>, document.getElementById('header'));
    ReactDOM.render(<LoanResult/>, document.getElementById('cnt'));
});
