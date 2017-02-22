const PayBackResult = React.createClass({
    getInitialState: function () {
        return {
            payback_status: null,
            repaymentGid: this.props.repaymentGid
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            repaymentGid: nextProps.repaymentGid
        }, this.queryResult);
    },
    componentDidMount() {
        if (this.state.repaymentGid) this.queryResult()
    },
    queryResult() {
        $FW.Post(`${API_PATH}api/repayment/v1/repaymentstatus.json`, {
            repaymentGid: this.state.repaymentGid,
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE
        }).then((data) => {
            this.setState({
                payback_status: data.status
            });
        }, e => $FW.Component.Toast(e.message));
    },
    render: function () {
        let {payback_status} = this.state;

        if (!payback_status) return null;

        return (
            <div className="payback-result">
                {payback_status == 1 &&
                    <div className="payback-result-success-img">
                        <img src="images/payback-success.png" />
                    </div>}
                {payback_status >= 2 &&
                    <div className="payback-result-fail-img">
                        <img src="images/payback-fail.png" />
                    </div>}
                {payback_status == 0 &&
                    <div className="payback-result-ing-img">
                        <img src="images/payback-ing.png" />
                    </div>}
                {payback_status == 1 &&
                    <div className="payback-result-success-tip">
                        <div className="tip-top">欢迎再次使用!</div>
                        <div className="tip-bottom"> 还款金额：<span>{this.props.paybackNum.toFixed(2)}</span>元</div>
                        <a className="credit-btn" href={`/api/credit/v1/creditlist.shtml?sourceType=2&token=${USER.token}&userId=${USER.id}`}>
                            提升额度</a>
                        <div className="apply-btn" onClick={() => gotoHandler(`/static/loan/home/index.html`)}>申请用钱</div>
                    </div>}
                {payback_status >= 2 &&
                    <div>
                        <div className="payback-result-fail-tip">{data.failReason}</div>
                        <div className="payback-customer-service"><img src="images/phone.png" />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
                    </div>
                }
                {payback_status == 0 &&
                    <div>
                        <div className="payback-result-ing-tip">稍后可到账单页面<br />查看具体还款结果。</div>
                        <div className="payback-customer-service"><img src="images/phone.png" />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
                    </div>
                }
            </div>
        )
    }
});
