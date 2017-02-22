
const PayBack = React.createClass({
    getInitialState: function () {
        return {
            orderGid: null
        }
    },
    bankListHandler: function () {
        this.props.callbackBankListShow(true);

    },
    paybackHandler: function () {
        var query = $FW.Format.urlQuery();
        var loanGid = query.loanGid;
        if (this.props.cardType == 1) {
            $FW.Component.Toast("信用卡暂不支持还款");
        } else {
            $FW.Post(`${API_PATH}api/repayment/v1/checksmsverifycode.json`, {
                repaymentAmount: this.props.repaymentAmount,
                loanGid: loanGid,
                cardGid: this.props.cardGid,
                token: USER.token,
                userGid: USER.gid,
                userId: USER.id,
                sourceType: SOURCE_TYPE
            }).then(d => {
                this.props.callbackVerifyCodeShow(true);
                this.setState({ phoneNum: d.mobile, orderGid: d.orderGid });
                this.props.callbackGetOrderGid(d.orderGid);
            }, e => $FW.Component.Toast(e.message))
        }
    },
    render: function () {
        return (
            <div className="payback-box">
                <div className="loan-num">
                    <div className="loan-money overdue-color">{this.props.loanLeftAmount.toFixed(2)}</div>
                    <div className="loan-status2">应还总额(元)</div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>待还本金(元)</span>
                        <span>{this.props.loanAmount.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>逾期费(元)</span>
                        <span>{this.props.overdueFee.toFixed(2)}</span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>还款卡</span>
                        <span onClick={this.bankListHandler}>
                            {this.props.bankName}({this.props.bankNo.slice(-4)})<img className="right-arrow"
                                src="images/right-arrow.jpg" /></span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>还款金额(元)</span>
                        <span className="payback-num">{this.props.loanLeftAmount.toFixed(2)}</span>
                    </div>
                </div>
                <div className="payback-tips">
                    <div>友情提示：</div>
                    <div>1.当前只支持使用储蓄卡还款，请确保卡内余额充足；</div>
                    <div>2.单次还款金额不低于100元。</div>
                </div>
                {this.props.extendStatus == 102 || this.props.extendStatus == 103 ? <div className="pay-back-btn" onClick={this.paybackHandler}>立即还款</div> : null}

            </div>
        )
    }
});
