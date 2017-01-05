const HistoryBill = React.createClass({
     render:function(){
         return (
             <div>
                 <div className="data-box">
                     <div className="bill-item">
                         <div className="bill-detail">
                             <div className="bill-detail-wrap">
                                 <span className="bill-money">90000.00</span>
                             </div>
                             <span className="bill-deadline">2016-12-22 15:44:38</span>
                         </div>
                         <div className="pay-back-btn-wrap">
                             <span className="bill-status">已还款<img src="images/right-arrow.jpg"/></span>
                         </div>
                     </div>
                 </div>
                 <div className="no-data-box">
                     <img className="no-data-img" src="images/no-data.png"/>
                 </div>
             </div>
         )
     }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"历史账单"}/>, document.getElementById('header'));
    ReactDOM.render(<HistoryBill/>, document.getElementById('cnt'));
});
