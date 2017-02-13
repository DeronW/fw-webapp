function gotoHandler(link) {
    location.href = encodeURI(link);
}
function formatDate(now) {
    var now = new Date();
    var yy = now.getFullYear();
    var mm = now.getMonth() + 1;
    var dd = now.getDate();
    var clock = yy + "-";
    if (mm < 10) clock += "0";
    clock += mm + "-";
    if (dd < 10) clock += "0";
    clock += dd + " ";
    return clock;
}

const Bill = React.createClass({
    getInitialState: function () {
        return {
            billList: this.props.data.loanList
        }
    },
    render: function () {
        let bill_item = (item, index) => {
            return (
                <div className="bill-item-wrap">
                    <div className="bill-item" key={index} onClick={ () => gotoHandler(`/static/loan/bill-detail/index.html?loanGid=${item.loanGid}`) }>
                        <div className="bill-detail">
                            <div className="bill-detail-wrap">
                                <span className="bill-money">{item.loanLeftAmount}</span>
                                {item.exceedDays > 0 ? <span className="bill-status"></span>:null}
                            </div>
                            <span className="bill-deadline">{item.dueTimeStr}到期</span>
                        </div>
                    </div>
                    <div className="pay-back-btn-wrap">
                        {item.status == 0 ? <div className="pay-back-btn-status1">打款中</div> : <div className="pay-back-btn-status2" onClick={() => gotoHandler(`/static/loan/bill-payback/index.html?loanGid=${item.loanGid}&token=${$FW.Store.getUserToken()}&userGid=${$FW.Store.getUserGid()}&userId=${$FW.Store.getUserId()}`)}>还款</div>}
                    </div>
                </div>

            )
        };

        return (
            <div>
                <div className="header">
                    <div className="title">账单</div>
                    <div className="history-bill" onClick={() => gotoHandler(`/static/loan/bill-history/index.html`)}>历史账单</div>
                </div>
                {this.props.data.loanList.length == 0 ? (<div className="no-data-box">
                    <img className="no-data-img" src="images/no-data.png" />
                </div>) : (<div className="data-box">
                    <div className="transfer-box">
                        <div className="loan-headline-money">
                            <div className="transfer-money">{this.props.data.undueAmount}</div>
                            <div className="transfer-title">当前账单(元)</div>
                        </div>

                        <div className="loan-info">
                            <div className="transfer-lines">
                                <div className="return-money">
                                    <span className="return-money-num">{this.props.data.creditLine}</span>
                                    <span className="return-money-title">信用额度(元)</span>
                                </div>
                                <div className="return-date">
                                    <span className="return-date-day">{this.props.data.canBorrowAmount}</span>
                                    <span className="return-date-title">剩余可借(元)</span>
                                </div>
                            </div>
                            <span className="vertical-line"></span>
                        </div>
                    </div>
                    {this.state.billList.map(bill_item)}
                </div>)}
            </div>
        )
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: `${API_PATH}api/oriole/v1/loanloadpage.json`,
        method: "post",
        enable_loading:"mini",
        data: {
            token: $FW.Store.getUserToken(),
            userGid: $FW.Store.getUserGid(),
            userId: $FW.Store.getUserId(),
            sourceType: 3 }
    }).then((data) => {
        ReactDOM.render(<Bill data={data} />, CONTENT_NODE);
    }, (error) => console.log(error));
    ReactDOM.render(<BottomNavBar index={2} />, document.getElementById('bottom-nav-bar'));
});
