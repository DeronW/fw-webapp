const BankManagement = React.createClass({
    getInitialState() {
        let filtered = this.props.data.userBankList.withdrawBankcard
            .filter(e => e.isRealNameBindCard === true);
        return {
            cardNo: filtered[0].cardNo
        }
    },
    componentDidMount() {
    },
    render() {
        let bank_item = (item, index) => {
            return (
                <div className="bank-management-list" key={index}>
                    <div className="list">
                        <div className="list-cnt">
                            <div className="t">
                                <div className="bank-logo">
                                    <img src={item.logoUrl} />
                                    <span className="name-text">{item.bankShortName}</span>
                                </div>
                            </div>

                            <div className="b">
                                <div className="card-info">
                                    <span className="text">{item.cardType == 0 ? "借记卡" : "信用卡"}</span>
                                    <span className="card-text">{item.cardNo}</span>
                                </div>
                                {item.isRealNameBindCard ?
                                    <div className="relieve-bind-btn"> 提现卡 </div> :
                                    null}
                            </div>
                        </div>
                    </div>
                    <div className="lin"></div>
                </div>
            )
        }


        return (
            <div>
                <div className="bank-management-cnt">
                    {this.props.data.userBankList.withdrawBankcard.map(bank_item)}
                    <div className="management-tip">
                        <div>1.储蓄卡(尾号{this.state.cardNo.slice(-4)})为默认提现卡，不可变更；</div>
                        <div>2.支持绑定多张银行卡。</div>
                    </div>
                </div>
                <div className="fixed-bottom-part">
                    <div className="fixed-tip">绑定银行卡越多，信用额度越高！</div>
                    <a className="add-card-btn" href='/static/loan/user-card-add/index.html'>马上添加</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"银行卡管理"} />, HEADER_NODE);
    let user = $FW.Store.getUserDict();
    $FW.Ajax({
        url: `${API_PATH}api/bankcard/v1/bankcardlist.json`,
        method: "post",
        data: {
            token: user.token,
            userGid: user.gid,
            userId: user.id,
            sourceType: 3
        }
    }).then(
        data => ReactDOM.render(<BankManagement data={data} />, CONTENT_NODE),
        e => $FW.Capture(e));
});

