function gotoHandler(link) {
    location.href = encodeURI(link);
}

const Detail = React.createClass({
    render: function () {
        let loanStatus = this.props.data.repaymentStatus;
        let query = $FW.Format.urlQuery();
        let loanGid = query.loanGid;
        return (
            <div>
                <div className="loan-num">
                    <div className={loanStatus ==2 || loanStatus ==3 ? "loan-money overdue-color" : "loan-money pay-back-color"}>{this.props.data.loanLeftAmountStr}</div>
                    <div className="loan-money-title">应还总额(元)</div>
                    {loanStatus == 3 ? <div className="icon1"></div> : null}
                    {loanStatus == 2 ? <div className="icon2"></div> : null}
                    {loanStatus == 0 ? <div className="icon3"></div> : null}
                    {loanStatus == 1 ? <div className="icon4"></div> : null}
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
                    <div>
                        <span>逾期费用</span>
                        <span>{this.props.data.overdueFee}元</span>
                    </div>
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
                {loanStatus == 2 ||  loanStatus == 3 ? <div className="pay-back-btn" onClick={() => gotoHandler(`/static/loan/bill-payback/index.html?loanGid=${loanGid}&token=${$FW.Store.getUserToken()}&userGid=${$FW.Store.getUserGid()}&userId=${$FW.Store.getUserId()}`)}>立即还款</div> : null}
                {loanStatus == 1 ? <div className="pay-back-btn" onClick={() => gotoHandler(``)}>去确认</div> : null}
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"详情"} />, HEADER_NODE);
    let query = $FW.Format.urlQuery();
    let loanGid = query.loanGid;
    $FW.Ajax({
        url: `${API_PATH}api/repayment/v1/loandetail.json`,
        method: "post",
        enable_loading:"mini",
        data: { token: $FW.Store.getUserToken(), userGid: $FW.Store.getUserGid(), userId: $FW.Store.getUserId(), sourceType: 3, loanGid: loanGid }
    }).then((data) => {
        console.log(data)
        ReactDOM.render(<Detail data={data} />, CONTENT_NODE);
    }, (error) => console.log(error));
});
