const Bill = React.createClass({
     render:function(){
         return (
             <div>
                 <div className="header">
                     <div className="arrow-left"></div>
                     <div className="title">账单</div>
                     <div className="history-bill">历史账单</div>
                 </div>
                 <div className="transfer-box">
                     <div className="transfer-title">当前账单(元)</div>
                     <div className="transfer-money">100000.00</div>
                     <div className="loan-info">
                         <div className="transfer-lines">
                             <div className="return-money">
                                 <span className="return-money-title">信用额度(元)</span>
                                 <span className="return-money-num">100000.00</span>
                             </div>
                             <div className="return-date">
                                 <span className="return-date-title">剩余可借(元)</span>
                                 <span className="return-date-day">100000.00</span>
                             </div>
                         </div>
                         <span className="vertical-line"></span>
                     </div>
                 </div>
                 <div className="bill-item">
                     <div className="bill-detail">
                         <div className="bill-detail-wrap">
                             <span className="bill-money">90000.00</span>
                             <span className="bill-status"></span>
                         </div>
                         <span className="bill-deadline">2016-12-16到期</span>
                     </div>
                     <div className="pay-back-btn-wrap">
                          <div className="pay-back-btn">还款</div>
                     </div>
                 </div>
             </div>
         )
     }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Bill/>, document.getElementById('cnt'));
    ReactDOM.render(<BottomNavBar index={2}/>, document.getElementById('bottom-nav-bar'));
});
