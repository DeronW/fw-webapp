
class Detail extends React.Component {
    render() {
        let user = $FW.Store.getUserDict();
        let { data, loanGid } = this.props, st = data.extendStatus;

        let status_icon = status => {
            let d = {
                '103': 'icon1', '102': 'icon2',
                '100': 'icon3', '101': 'icon4',
                '5': 'icon5', '4': 'icon6'
            }
            return d[status] && <div className={d[status]}></div>
        }

        return (
            <div>
                <div className="loan-num">
                    <div className={st == 102 || st == 103 || st == 5 ? "loan-money overdue-color" : "loan-money pay-back-color"}>
                        {st == 100 ? data.repaymentAmountStr : data.loanLeftAmountStr}
                    </div>
                    <div className="loan-money-title">应还总额(元)</div>
                    {status_icon(st)}
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>到期还款日</span>
                        <span>{data.dueTimeStr}</span>
                    </div>
                    <div>
                        <span>待还本金(元)</span>
                        <span>{data.loanAmount.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>逾期费(元)</span>
                        <span>{data.overdueFee.toFixed(2)}</span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>借入金额(元)</span>
                        <span>{data.loanAmount.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>到账金额(元)</span>
                        <span>{data.netAmount.toFixed(2)}</span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>借款时间</span>
                        <span>{data.loanTimeStr}</span>
                    </div>
                </div>
                {(st == 102 || st == 103) &&
                    <Nav className="pay-back-btn" href={`/static/loan/bill-payback/index.html?loanGid=${loanGid}&token=${user.token}&userGid=${user.gid}&userId=${user.id}`}>立即还款</Nav>}

                {st == 4 && <div className="deposit-btn">打款中</div>}
                {st == 101 && <div className="deposit-btn">还款中</div>}
            </div>
        )
    }
}

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"详情"} />, HEADER_NODE);

    let loanGid = $FW.Format.urlQuery().uuid;

    $FXH.Post(`${API_PATH}/api/repayment/v1/loandetail.json`, { loanGid: loanGid })
        .then((data) => {
            ReactDOM.render(<Detail data={data} loanGid={loanGid} />, CONTENT_NODE);
        });
});
