function gotoHandler(link) {
    location.href = encodeURI(link);
}
function formatDate() {
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
        return { billList: this.props.data.loanList }
    },
    render: function () {
        let bill_item = (item, index) => {
            let st = item.status === 0 ?
                <div className="pay-back-btn-status1">打款中</div> :
                <a className="pay-back-btn-status2" href={`/static/loan/bill-payback/index.html?loanGid=${item.loanGid}&token=${USER.token}&userGid=${USER.gid}&userId=${$USER.id}`}>还款</a>;

            return (
                <div className="bill-item-wrap">
                    <a className="bill-item" key={index}
                        href={`/static/loan/bill-detail/index.html?loanGid=${item.loanGid}`}>
                        <div className="bill-detail">
                            <div className="bill-detail-wrap">
                                <span className="bill-money">{item.loanLeftAmount.toFixed(2)}</span>
                                {item.exceedDays > 0 ? <span className="bill-status"></span> : null}
                            </div>
                            <span className="bill-deadline">{item.dueTimeStr}到期</span>
                        </div>
                    </a>
                    <div className="pay-back-btn-wrap"> {st} </div>
                </div>

            )
        };

        let empty = <div className="no-data-box">
            <img className="no-data-img" src="images/no-data.png" />
        </div>;

        return (
            <div>
                <div className="header">
                    <div className="title">账单</div>
                    <div className="history-bill" onClick={() => gotoHandler(`/static/loan/bill-history/index.html`)}>历史账单</div>
                </div>
                {this.props.data.loanList.length === 0 ? empty : (<div className="data-box">
                    <div className="transfer-box">
                        <div className="loan-headline-money">
                            <div className="transfer-money">
                                {this.props.data.undueAmount.toFixed(2)}</div>
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
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        )
    }
});

const USER = $FW.Store.getUserDict();

$FW.DOMReady(function () {
    $FW.Post(`${API_PATH}api/oriole/v1/loanloadpage.json`, {
        token: USER.token,
        userGid: USER.gid,
        userId: USER.id,
        sourceType: 3
    }).then((data) => {
        ReactDOM.render(<Bill data={data} />, CONTENT_NODE);
    }, e => $FW.Component.Toast(e.message));
    ReactDOM.render(<BottomNavBar index={2} />, BOTTOM_NAV_NODE);
});
