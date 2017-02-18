const BankManagement = React.createClass({
    getInitialState() {
        let filtered = this.props.userBankList.withdrawBankcard
            .filter(e => e.isRealNameBindCard === true);
        return {
            cardNo: filtered[0].cardNo,
            popShow: false
        }
    },
    componentDidMount() {
        let borrowStatus = this.props.borrowBtnStatus;
        if (borrowStatus == 2) {
            this.setState({ popShow: true });
        }
    },
    closeHandler() {
        this.setState({ popShow: false });
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

        let user = $FW.Store.getUserDict();

        return (
            <div>
                <div className={this.props.userBankList.withdrawBankcard.length < 10 ? "bank-management-cnt margin-bottom1" : "bank-management-cnt margin-bottom2"}>
                    {this.props.userBankList.withdrawBankcard.map(bank_item)}
                    <div className="management-tip">
                        <div>1.储蓄卡(尾号{this.state.cardNo.slice(-4)})为默认提现卡，不可变更；</div>
                        <div>2.支持绑定多张银行卡。</div>
                    </div>
                </div>
                {this.props.userBankList.withdrawBankcard.length < 10 ? <div className="fixed-bottom-part">
                    <div className="fixed-tip">绑定银行卡越多，信用额度越高！</div>
                    <a className="add-card-btn" href='/static/loan/user-card-add/index.html'>马上添加</a>
                </div> : null}
                <div className={this.state.popShow ? "mask" : "mask dis"} style={{ zIndex: 10 }}>
                    <div className="verify-pop">
                        <div className="verify-tip">您离成功借钱只差一步<br />请先完成必填认证！</div>
                        <div className="verify-pop-close" onClick={this.closeHandler}></div>
                        <a className="verify-btn" href={`/api/credit/v1/creditlist.shtml?sourceType=2&token=${user.token}&userId=${user.id}`}>去认证</a>
                    </div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"银行卡管理"} />, HEADER_NODE);
    let user = $FW.Store.getUserDict();

    Promise.all([
        $FW.Post(`${API_PATH}api/bankcard/v1/bankcardlist.json`, {
            token: user.token,
            userGid: user.gid,
            userId: user.id,
            sourceType: SOURCE_TYPE
        }),
        $FW.Post(`${API_PATH}/api/loan/v1/baseinfo.json`, {
            token: user.token,
            userGid: user.gid,
            userId: user.id,
            sourceType: SOURCE_TYPE,
            productId: 1
        })
    ]).then(d => {
        ReactDOM.render(<BankManagement {...d[0]} {...d[1]} />, CONTENT_NODE)
    }, e => $FW.Component.Toast(e.message));
});
