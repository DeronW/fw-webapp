class ConfirmLoanWrap extends React.Component{
    constructor(props){
        super(props)
        this.state={
            itemShow: false,
            verifyCodeShow: false,
            loanResult: false,
            noticeShow: false,
            successResult: false,
            failResult: false,
            checkResult: false,
            reSetState:false
        }
        this.itemShow = this.itemShow.bind(this);
        this.itemDetailHide = this.itemDetailHide.bind(this);
        this.getVerifyCodeShow = this.getVerifyCodeShow.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.resultShow = this.resultShow.bind(this);
        this.resultHide = this.resultHide.bind(this);
        this.noticeShow = this.noticeShow.bind(this);
        this.noticeHide = this.noticeHide.bind(this);
        this.getLoanResultSuccess = this.getLoanResultSuccess.bind(this);
        this.getLoanResultFail = this.getLoanResultFail.bind(this);
        this.getLoanResultCheck = this.getLoanResultCheck.bind(this);
    }
    itemShow(val) {
        this.setState({ itemShow: val });
    }
    itemDetailHide(val) {
        this.setState({ itemShow: val });
    }
    getVerifyCodeShow(val) {
        this.setState({ verifyCodeShow: val });
    }
    closeHandler(booleanVal) {
        this.setState({ verifyCodeShow: booleanVal });
    }
    resultShow(booleanVal) {
        this.setState({ loanResult: booleanVal });
    }
    resultHide(booleanVal) {
        this.setState({ loanResult: booleanVal });
    }
    noticeShow(booleanVal) {
        this.setState({ noticeShow: booleanVal });
    }
    noticeHide(booleanVal) {
        this.setState({ noticeShow: booleanVal });
    }
    getLoanResultSuccess(booleanVal) {
        this.setState({ successResult: booleanVal });
    }
    getLoanResultFail(booleanVal) {
        this.setState({ failResult: booleanVal });
    }
    getLoanResultCheck(booleanVal) {
        this.setState({ checkResult: booleanVal });
    }
    reGetState = (booleanVal) => {
        this.setState({reSetState:booleanVal});
    }

    render() {
    let cashBank = this.props.userBankList.withdrawBankcard;

    function isRealNameBindCard(ele) {
        return ele.isRealNameBindCard == true;
    }
    let filtered = cashBank.filter(isRealNameBindCard);
    return (
        <div>
            <ConfirmLoan callbackItemShow={this.itemShow}
                         callbackVerifyCodeShow={this.getVerifyCodeShow}
                         accountInAmount={this.props.accountInAmount}
                         shouldRepaymentAmount={this.props.shouldRepaymentAmount}
                         dueTime={this.props.dueTimeStr}
                         totalFeeAmount={this.props.totalFeeAmount}
                         callbackNoticeShow={this.noticeShow}
                         callbackResultShow={this.resultShow}
                         callbackGetLoanResultCheck={this.getLoanResultCheck}

            />
            {this.state.itemShow ? <ItemDetail callbackItemDetailHide={this.itemDetailHide}
                                               feeExtList={this.props.feeExtList} /> : null}
            {this.state.noticeShow ?
                <Notice content={this.props.latedescription} callbackNoticeHide={this.noticeHide} /> : null}
            {/*{this.state.verifyCodeShow ?*/}
                {/*<VerifyCode callbackCloseHanler={this.closeHandler} callbackResultShow={this.resultShow}*/}
                            {/*bankShortName={filtered[0].bankShortName} cardNo={filtered[0].cardNo}*/}
                            {/*callbackGetLoanResultSuccess={this.getLoanResultSuccess}*/}
                            {/*callbackGetLoanResultFail={this.getLoanResultFail}*/}
                            {/*callbackGetLoanResultCheck={this.getLoanResultCheck}*/}
                            {/*reSetState={this.reGetState}*/}
                            {/*stateProps={this.state.reSetState}*/}
                {/*/> : null}*/}

            {this.state.loanResult ?
                <LoanResult callbackResultHide={this.resultHide} bankShortName={filtered[0].bankShortName}
                            cardNo={filtered[0].cardNo} success={this.state.successResult}
                            fail={this.state.failResult} check={this.state.checkResult}
                /> : null}
        </div>
    )
}
}

