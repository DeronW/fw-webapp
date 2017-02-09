function gotoHandler(link) {
    location.href = encodeURI(link);
}

const Detail = React.createClass({
    render:function(){
        let loanStatus = this.props.data.loanStatus;
        return (
            <div>
                 <div className="loan-num">
                     <div className={loanStatus == 1 ? "loan-money pay-back-color" : (loanStatus == 5 ? "loan-money overdue-color" : "loan-money overdue-color marginTop")}>{this.props.data.loanLeftAmount}</div>
                     {loanStatus == 5 ?<div className="loan-status1"><img src="images/overdue.jpg"/></div>:null}
                     {loanStatus == 1 ? <div className="loan-status2">已还清</div>:null}
                 </div>
                 <div className="loan-detail-box">
                     <div>
                         <span>到期还款日</span>
                         <span>{this.props.data.dueTimeStr}</span>
                     </div>
                     <div>
                         <span>待还本金</span>
                         <span>{this.props.data.loanAmount}元</span>
                     </div>
                     {loanStatus == 5 ? (<div>
                             <span>逾期费用</span>
                             <span>{this.props.data.overdueFee}元</span>
                         </div>):null}
                 </div>
                <div className="loan-detail-box">
                    <div>
                        <span>借入金额</span>
                        <span>{this.props.data.loanAmount}元</span>
                    </div>
                    <div>
                        <span>到账金额</span>
                        <span>{this.props.data.netAmount}元</span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>借款时间</span>
                        <span>{this.props.data.loanTimeStr}</span>
                    </div>
                </div>
                {loanStatus == 4 || loanStatus == 5 ? <div className="pay-back-btn" onClick={() => gotoHandler(`/static/loan/bill-payback/index.html?deductionGid=${item.deductionGid}&loanGid=${item.loanGid}&loanType=${item.loanType}`)}>立即还款</div> : null}
            </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"详情"}/>, document.getElementById('header'));
    let query = $FW.Format.urlQuery();
    let loanType = query.loanType;
    let loanGid = query.loanGid;
    $FW.Ajax({
        url: `${API_PATH}api/repayment/v1/loandetail.json`,
        method: "post",
        data: {token:$FW.Store.getUserToken(), userGid:$FW.Store.getUserGid(),userId:$FW.Store.getUserId(), sourceType:3, loanType:loanType, loanGid:loanGid}
    }).then((data) => {
        console.log(data)
        ReactDOM.render(<Detail data={data}/>, document.getElementById('cnt'));
    }, (error) => console.log(error));
});
