const Detail = React.createClass({
    render:function(){
        return (
            <div>
                 <div className="loan-num">
                     <div className="loan-money overdue-color">1000000.00</div>
                     <div className="loan-status1"><img src="images/overdue.jpg"/></div>
                     <div className="loan-status2">已还清</div>
                 </div>
                 <div className="loan-detail-box">
                     <div>
                         <span>到期还款日</span>
                         <span>2018-01-01</span>
                     </div>
                     <div>
                         <span>待还本金（<a>详情</a>）</span>
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
                        <span>借入金额</span>
                        <span>2000元</span>
                    </div>
                    <div>
                        <span>到账金额</span>
                        <span>2000元</span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>借款时间</span>
                        <span>2016-12-19 10:39:18</span>
                    </div>
                </div>
                <div className="pay-back-btn">立即还款</div>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"详情"}/>, document.getElementById('header'));
    ReactDOM.render(<Detail/>, document.getElementById('cnt'));
});
