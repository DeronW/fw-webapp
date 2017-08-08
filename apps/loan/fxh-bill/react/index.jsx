
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        window.history.back();
    }
    render() {
        let user = $FW.Store.getUserDict();
        let { data, loanGid } = this.props, st = data.extendStatus;

        let status_icon = status => {
            let d = {
                '0': 'icon1', '1': 'icon1',
                '2': 'icon2', '3': 'icon2',
                '5': 'icon2', '100': 'icon4',
                '101': 'icon3', '102': 'icon3'
            }
            return d[status] && <div className={d[status]}></div>
        }

        return (
            <div>
                <div className="header">
                    <div className="back-arrow" onClick={this.clickHandler}></div>
                    <div className="page-name">账单详情</div>
                    {data.haveRepaymentRecord && <a className="bill-history-entry" href={`/static/loan/account/index.html#/repayment-fangxin-records?repaymentUuid=${data.repaymentUuid}`}>还款记录</a>}
                </div>
                <div className="logo-box">
                    <img className="logo-img" src="images/logo.png" />
                    <div className="logo-brand">放心花</div>
                    {status_icon(st)}
                </div>
                <div className="detail-items">
                    <div className="loan-info">
                        <div className="transfer-lines">
                            <div className="return-money">
                                <span className="return-money-num">{data.loanAmountStr}</span>
                                <span className="return-money-title">借款金额</span>
                            </div>
                            <div className="return-date">
                                <span className="return-date-day">{data.productPeriod}</span>
                                <span className="return-date-title">借款期限</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>

                    {(st == 100 || st == 101 || st == 102 || st == 103) && <div className="loan-detail-box">
                        <div>
                            <span>到账金额(元)</span>
                            <span>{data.netAmountStr}</span>
                        </div>
                        <div>
                            <span>已还金额(元)</span>
                            <span>{data.repaymentAmountStr}</span>
                        </div>
                        {(st == 103 || st == 100) && <div>
                            <span>逾期费(元)</span>
                            <span>{data.overdueFeeStr}</span>
                        </div>}
                        <div>
                            <span>待还金额(元)</span>
                            <span>{data.loanLeftAmountStr}</span>
                        </div>
                    </div>}
                    {(st == 100 || st == 101 || st == 102 || st == 103) && <div className="loan-detail-box">
                        <div>
                            <span>借款时间</span>
                            <span>{data.loanTimeStr}</span>
                        </div>
                        <div>
                            <span>到期还款日</span>
                            <span>{data.dueTimeStr}</span>
                        </div>
                    </div>}
                    {(st == 0 || st == 1 || st == 2 || st == 3 || st == 5) && <div className="loan-detail-box">
                        <div>
                            <span>借款时间</span>
                            <span>{data.loanTimeStr}</span>
                        </div>
                    </div>}
                </div>
                {(st == 102 || st == 103) &&
                    <div className="pay-back-btn-box" >
                        <a href={`/static/loan/account/index.html#/repayment-fangxin?id=${loanGid}`}>
                            立即还款</a></div>}
                {st == 101 &&
                    <div className="pay-back-btn-box"><span>立即还款</span></div>}
            </div>
        )
    }
}

$FW.DOMReady(function () {
    let loanGid = $FW.Format.urlQuery().uuid;

    $FXH.Post(`${API_PATH}/api/repayment/v1/loandetail.json`, { loanGid: loanGid })
        .then((data) => {
            ReactDOM.render(<Detail data={data} loanGid={loanGid} />, CONTENT_NODE);
        });
});
