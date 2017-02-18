
const ConfirmLoanWrap = React.createClass({
    getInitialState: function () {
        return {
            itemShow: false,
            verifyCodeShow: false,
            loanResult: false,
            noticeShow: false,
            successResult: false,
            failResult: false,
            checkResult: false
        }
    },
    itemShow: function (val) {
        this.setState({ itemShow: val });
    },
    itemDetailHide: function (val) {
        this.setState({ itemShow: val });
    },
    getVerifyCodeShow: function (val) {
        this.setState({ verifyCodeShow: val });
    },
    closeHandler: function (booleanVal) {
        this.setState({ verifyCodeShow: booleanVal });
    },
    resultShow: function (booleanVal) {
        this.setState({ loanResult: booleanVal });
    },
    resultHide: function (booleanVal) {
        this.setState({ loanResult: booleanVal });
    },
    noticeShow: function (booleanVal) {
        this.setState({ noticeShow: booleanVal });
    },
    noticeHide: function (booleanVal) {
        this.setState({ noticeShow: booleanVal });
    },
    getLoanResultSuccess: function (booleanVal) {
        this.setState({ successResult: booleanVal });
    },
    getLoanResultFail: function (booleanVal) {
        this.setState({ failResult: booleanVal });
    },
    getLoanResultCheck: function (booleanVal) {
        this.setState({ checkResult: booleanVal });
    },
    render: function () {
        let cashBank = this.props.userBankList.withdrawBankcard;

        function isRealNameBindCard(ele) {
            return ele.isRealNameBindCard == true;
        }
        console.log(this.state.successResult);
        let filtered = cashBank.filter(isRealNameBindCard);
        return (
            <div>
                <ConfirmLoan callbackItemShow={this.itemShow}
                    callbackVerifyCodeShow={this.getVerifyCodeShow}
                    accountInAmount={this.props.accountInAmount}
                    shouldRepaymentAmount={this.props.shouldRepaymentAmount}
                    dueTime={this.props.dueTimeStr}
                    totalFeeAmount={this.props.totalFeeAmount}
                    callbackNoticeShow={this.noticeShow} />
                {this.state.itemShow ? <ItemDetail callbackItemDetailHide={this.itemDetailHide}
                    feeExtList={this.props.feeExtList} /> : null}
                {this.state.noticeShow ?
                    <Notice content={this.props.latedescription} callbackNoticeHide={this.noticeHide} /> : null}
                {this.state.verifyCodeShow ?
                    <VerifyCode callbackCloseHanler={this.closeHandler} callbackResultShow={this.resultShow}
                        bankShortName={filtered[0].bankShortName} cardNo={filtered[0].cardNo}
                        callbackGetLoanResultSuccess={this.getLoanResultSuccess}
                        callbackGetLoanResultFail={this.getLoanResultFail}
                        callbackGetLoanResultCheck={this.getLoanResultCheck}
                    /> : null}

                {this.state.loanResult ?
                    <LoanResult callbackResultHide={this.resultHide} bankShortName={filtered[0].bankShortName}
                        cardNo={filtered[0].cardNo} success={this.state.successResult}
                        fail={this.state.failResult} check={this.state.checkResult}
                    /> : null}
            </div>
        )
    },
});
