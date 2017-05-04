class PayBack extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderGid: null,
            repaymentAmount: '',
            disableInput: false
        };
    }

    componentDidMount() {
        if (this.props.loanLeftAmount <= 200) {
            let repaymentAmount = this.props.loanLeftAmount.toFixed(2);
            this.setState({
                repaymentAmount: repaymentAmount.toString(),
                disableInput: true
            });
        }
    }

    bankListHandler = () => {
        this.props.callbackBankListShow(true);
    }

    paybackHandler = () => {
        if (!this.repaymentAmountValid) return this.setState({repaymentAmount: ''});

        var query = $FW.Format.urlQuery();
        var loanGid = query.loanGid;
        if (this.props.cardType == 1) {
            $FW.Component.Toast("信用卡暂不支持还款");
        } else {
            $FXH.Post(`${API_PATH}/api/repayment/v1/checksmsverifycode.json`, {
                repaymentAmount: this.state.repaymentAmount,
                loanGid: loanGid,
                cardGid: this.props.cardGid
            }).then(d => {
                this.props.callbackVerifyCodeShow(true);
                this.setState({ phoneNum: d.mobile, orderGid: d.orderGid });
                this.props.callbackGetOrderGid(d.orderGid);
            }, e => $FW.Component.Toast(e.message))
        }
    }

    get repaymentAmountValid () {
        let loanLeftAmount = Number(this.props.loanLeftAmount),
            repaymentAmount = Number(this.state.repaymentAmount);
        if (repaymentAmount === 0) return $FW.Component.Toast("请输入还款金额");
        if (repaymentAmount === NaN) return $FW.Component.Toast("还款金额输入不合法！");
        if (repaymentAmount > loanLeftAmount) return $FW.Component.Toast("还款金额不得超过待还金额！");
        if (repaymentAmount < 100) return $FW.Component.Toast("单笔还款金额需大于100.00元！");
        return true;
    }

    handleInput = (e) => {
        this.setState({repaymentAmount: e.target.value});
    }

    render() {
        let loanLeftAmount = this.props.loanLeftAmount.toFixed(2);
        return (
        <div className="payback-box">
            <div className="fxh-banner"></div>
            <div className="loan-detail-box">
                <div>
                    <span>待还金额(元)</span>
                    <span>{loanLeftAmount}</span>
                </div>
                <div>
                    <span>还款金额(元)</span>
                    <input
                        className="repay-input"
                        type="number"
                        placeholder="每笔最低100.00"
                        value={this.state.repaymentAmount}
                        disabled={this.state.disableInput}
                        onChange={this.handleInput}>
                    </input>
                </div>
                <div>
                    <span>还款卡</span>
                    <span onClick={this.bankListHandler}>
                            {this.props.bankName}({this.props.bankNo.slice(-4)})<img className="right-arrow"
                                                                                     src="images/right-arrow.jpg" /></span>
                </div>
            </div>
            { (this.props.extendStatus == 102 || this.props.extendStatus == 103) &&
                <div className="pay-back-btn-wrap">
                    <div className="pay-back-btn" onClick={this.paybackHandler}>立即还款</div>
                </div>
            }

        </div>
    )
}
}
