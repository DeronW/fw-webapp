function gotoHandler(link) {
    location.href = encodeURI(link);
}

const PayBackWrap = React.createClass({
    getInitialState: function () {
        let cashBank = this.props.userBankList.withdrawBankcard;

        function isRealNameBindCard(ele) {
            return ele.isRealNameBindCard == true;
        }

        let filtered = cashBank.filter(isRealNameBindCard)[0];
        let cardGid = filtered.cardGid;
        return {
            paybackShow: true,
            bankCardListShow: false,
            verifyCodeShow: false,
            payBackResultShow: false,
            cardGid: cardGid,
            repaymentAmount: this.props.loanLeftAmount,
            bankName: filtered.bankShortName,
            bankNo: filtered.cardNo,
            selectedBankName: null,
            index: 0,
            cardType: 0,
            repaymentGid: null,
            orderGid: null,
            paybackSuccessState: false,
            paybackFailState: false,
            paybackCheckState: false
        }
    },
    componentDidMount: function () {
    },
    getBankCardListShow: function (booleanVal) {
        this.setState({bankCardListShow: booleanVal});
    },
    getVerifyCodeShow: function (booleanVal) {
        this.setState({verifyCodeShow: booleanVal});
    },
    indexItem: function (booleanVal) {

    },
    getPayBackResultShow: function (val1, val2) {
        this.setState({
            payBackResultShow: val1,
            paybackShow: val2,
            verifyCodeShow: val2
        });
    },
    popHideHandler: function (booleanVal) {
        this.setState({bankCardListShow: booleanVal});
    },
    closeHandler: function (booleanVal) {
        this.setState({verifyCodeShow: booleanVal});
    },
    getBankName: function (val) {
        this.setState({bankName: val});
    },
    getBankNo: function (val) {
        this.setState({bankNo: val});
    },
    getBankCardGid: function (val) {
        this.setState({cardGid: val});
    },
    getBankIndex: function (index) {
        this.setState({index: index})
    },
    getBankType: function (val) {
        this.setState({cardType: val})
    },
    getPaybackSuccess: function (val) {
        this.setState({paybackSuccessState: val});
    },
    getPaybackFail: function (val) {
        this.setState({paybackFailState: val});
    },
    getPaybackCheck: function (val) {
        this.setState({paybackCheckState: val});
    },
    getOrderGid: function (val) {
        this.setState({orderGid: val});
    },
    getRepaymentGid: function (val) {
        this.setState({repaymentGid: val});
    },
    render: function () {
        return (
            <div>
                {this.state.paybackShow ? <PayBack callbackBankListShow={this.getBankCardListShow}
                                                   callbackVerifyCodeShow={this.getVerifyCodeShow}
                                                   loanLeftAmount={this.props.loanLeftAmount}
                                                   loanAmount={this.props.loanAmount} loanStatus={this.props.loanStatus}
                                                   overdueFee={this.props.overdueFee}
                                                   bankName={this.state.bankName}
                                                   bankNo={this.state.bankNo}
                                                   cardType={this.state.cardType}
                                                   extendStatus={this.props.extendStatus}
                                                   repaymentAmount={this.state.repaymentAmount}
                                                   cardGid={this.state.cardGid}
                                                   callbackGetOrderGid={this.getOrderGid}
                    /> : null}
                {this.state.bankCardListShow ?
                    <BankCardList bankList={this.props.userBankList.withdrawBankcard} callbackIndexItem={this.indexItem}
                                  callbackPopHide={this.popHideHandler} callbackBankName={this.getBankName}
                                  callbackBankNo={this.getBankNo} callbackBankCardGid={this.getBankCardGid}
                                  callbackGetBankType={this.getBankType}
                                  bankName={this.state.bankName}
                                  bankNo={this.state.bankNo}
                                  cardGid={this.state.cardGid}
                                  callbackGetBankIndex={this.getBankIndex}
                                  callbackIndex={this.state.index}
                    /> : null}
                {this.state.verifyCodeShow ?
                    <VerifyCode callbackResultShow={this.getPayBackResultShow} cardGid={this.state.cardGid}
                                callbackCloseHanler={this.closeHandler}
                                repaymentAmount={this.state.repaymentAmount}
                                bankName={this.state.bankName}
                                bankNo={this.state.bankNo}
                                callbackGetPaybackSuccess={this.getPaybackSuccess}
                                callbackGetPaybackFail={this.getPaybackFail}
                                callbackGetPaybackCheck={this.getPaybackCheck}
                                orderGid={this.state.orderGid}
                                callbackGetRepaymentGid={this.getRepaymentGid}
                    /> : null}
                {this.state.payBackResultShow ? <PayBackResult paybackNum={this.props.loanLeftAmount}
                                                               success={this.state.paybackSuccessState}
                                                               fail={this.state.getPaybackFail}
                                                               check={this.state.getPaybackCheck}
                                                               repaymentGid={this.state.repaymentGid}
                    /> : null}
            </div>
        )
    }
});

const USER = $FW.Store.getUserDict()

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"还款"}/>, HEADER_NODE);
    var query = $FW.Format.urlQuery();
    var loanGid = query.loanGid;
    var loanType = query.loanType;

    Promise.all([
        $FW.Ajax({
            url: `${API_PATH}api/bankcard/v1/bankcardlist.json`,
            method: "post",
            data: {
                token: USER.token,
                userGid: USER.gid,
                userId: USER.id,
                sourceType: SOURCE_TYPE
            }
        }),
        $FW.Ajax({
            url: `${API_PATH}api/repayment/v1/loandetail.json`,
            method: "post",
            data: {
                loanGid: loanGid,
                loanType: loanType,
                token: USER.token,
                userGid: USER.gid,
                userId: USER.id,
                sourceType: SOURCE_TYPE
            }
        })
    ]).then(d => ReactDOM.render(<PayBackWrap {...d[0]} {...d[1]} />, CONTENT_NODE));
});
