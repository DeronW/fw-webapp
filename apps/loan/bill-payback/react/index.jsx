function gotoHandler(link) {
    location.href = encodeURI(link);
}

class PayBackWrap extends React.Component{
    constructor(props){
        super(props)
        let cashBank = this.props.userBankList.withdrawBankcard;

        function isRealNameBindCard(ele) {
            return ele.isRealNameBindCard == true;
        }

        let filtered = cashBank.filter(isRealNameBindCard)[0];
        let cardGid = filtered && filtered.cardGid || "";
        let bankNo = filtered && filtered.cardNo || "";
        this.state={
            paybackShow: true,
            bankCardListShow: false,
            verifyCodeShow: false,
            payBackResultShow: false,
            cardGid: cardGid,
            repaymentAmount: this.props.loanLeftAmount,
            bankName: filtered && filtered.bankShortName,
            bankNo: bankNo,
            selectedBankName: null,
            index: 0,
            cardType: 0,
            repaymentGid: null,
            orderGid: null,
            paybackSuccessState: false,
            paybackFailState: false,
            paybackCheckState: false
        }
        this.getBankCardListShow = this.getBankCardListShow.bind(this);
        this.getVerifyCodeShow = this.getVerifyCodeShow.bind(this);
        this.getPayBackResultShow = this.getPayBackResultShow.bind(this);
        this.popHideHandler = this.popHideHandler.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.getBankName = this.getBankName.bind(this);
        this.getBankNo = this.getBankNo.bind(this);
        this.getBankCardGid = this.getBankCardGid.bind(this);
        this.getBankIndex = this.getBankIndex.bind(this);
        this.getBankType = this.getBankType.bind(this);
        this.getPaybackSuccess = this.getPaybackSuccess.bind(this);
        this.getPaybackFail = this.getPaybackFail.bind(this);
        this.getPaybackCheck = this.getPaybackCheck.bind(this);
        this.getOrderGid = this.getOrderGid.bind(this);
        this.getRepaymentGid = this.getRepaymentGid.bind(this);
    }
    componentDidMount() {
}
    getBankCardListShow(booleanVal) {
    this.setState({bankCardListShow: booleanVal});
}
    getVerifyCodeShow(booleanVal) {
    this.setState({verifyCodeShow: booleanVal});
}
    getPayBackResultShow(val1, val2) {
    this.setState({
        payBackResultShow: val1,
        paybackShow: val2,
        verifyCodeShow: val2
    });
}
    popHideHandler(booleanVal) {
    this.setState({bankCardListShow: booleanVal});
}
    closeHandler(booleanVal) {
    this.setState({verifyCodeShow: booleanVal});
}
    getBankName(val) {
    this.setState({bankName: val});
}
    getBankNo(val) {
    this.setState({bankNo: val});
}
    getBankCardGid(val) {
    this.setState({cardGid: val});
}
    getBankIndex(index) {
    this.setState({index: index})
}
    getBankType(val) {
    this.setState({cardType: val})
}
    getPaybackSuccess(val) {
    this.setState({paybackSuccessState: val});
}
    getPaybackFail(val) {
    this.setState({paybackFailState: val});
}
    getPaybackCheck(val) {
    this.setState({paybackCheckState: val});
}
    getOrderGid(val) {
    this.setState({orderGid: val});
}
    getRepaymentGid(val) {
    this.setState({repaymentGid: val});
}
    render() {
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
}

const USER = $FW.Store.getUserDict()

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"还款"}/>, HEADER_NODE);
    var query = $FW.Format.urlQuery();
    var loanGid = query.loanGid;
    var loanType = query.loanType;

    Promise.all([
        $FXH.Post(`${API_PATH}/api/bankcard/v1/bankcardlist.json`),
        $FXH.Post(`${API_PATH}/api/repayment/v1/loandetail.json`,{
            loanGid: loanGid,
            loanType: loanType
        })
    ]).then(d => ReactDOM.render(<PayBackWrap {...d[0]} {...d[1]} />, CONTENT_NODE));
});
