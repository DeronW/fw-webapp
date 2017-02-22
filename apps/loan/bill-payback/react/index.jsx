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
            cardType:0,
            orderGid:null,
            paybackSuccessState: false,
            paybackFailState: false,
            paybackCheckState: false
        }
    },
    componentDidMount: function () {
    },
    getBankCardListShow: function (booleanVal) {
        this.setState({ bankCardListShow: booleanVal });
    },
    getVerifyCodeShow: function (booleanVal) {
        this.setState({ verifyCodeShow: booleanVal });
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
        this.setState({ bankCardListShow: booleanVal });
    },
    closeHandler: function (booleanVal) {
        this.setState({ verifyCodeShow: booleanVal });
    },
    getBankName: function (val) {
        this.setState({ bankName: val });
    },
    getBankNo: function (val) {
        this.setState({ bankNo: val });
    },
    getBankCardGid: function (val) {
        this.setState({ cardGid: val });
    },
    getBankIndex: function (index) {
        this.setState({ index: index })
    },
    getBankType:function (val) {
        this.setState({ cardType: val })
    },
    getPaybackSuccess: function (val) {
        this.setState({ paybackSuccessState: val });
    },
    getPaybackFail: function (val) {
        this.setState({ paybackFailState: val });
    },
    getPaybackCheck: function (val) {
        this.setState({ paybackCheckState: val });
    },
    getOrderGid:function(val){
        this.setState({ orderGid: val });
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
                    /> : null}
                {this.state.payBackResultShow ? <PayBackResult paybackNum={this.props.loanLeftAmount}
                    success={this.state.paybackSuccessState}
                    fail={this.state.getPaybackFail}
                    check={this.state.getPaybackCheck}
                /> : null}
            </div>
        )
    }
});

const BankCardList = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.callbackIndex,
            bankName: this.props.bankName,
            bankNo: this.props.bankNo,
            cardGid: this.props.cardGid,
            cardType: this.props.cardType
        }
    },
    backHandler: function () {
        this.props.callbackPopHide(false);
    },
    confirmHandler: function () {
        this.props.callbackPopHide(false);
        this.props.callbackBankName(this.state.bankName);
        this.props.callbackBankNo(this.state.bankNo);
        this.props.callbackBankCardGid(this.state.cardGid);
        this.props.callbackGetBankIndex(this.state.checked);
        this.props.callbackGetBankType(this.state.cardType);
    },
    clickHandler: function (index) {
        this.setState({
            checked: index,
            bankName: this.props.bankList[index].bankShortName,
            bankNo: this.props.bankList[index].cardNo,
            cardGid: this.props.bankList[index].cardGid,
            cardType:this.props.bankList[index].cardType
        })
    },
    render: function () {
        let list_item = (item, index) => {
            return (
                <div className="list-item" key={index} onClick={() => {
                    this.clickHandler(index)
                }}>
                    <img
                        src={item.logoUrl} />
                    {item.bankShortName}({item.cardNo.slice(-4)})
                    {
                        this.state.checked == index ?
                            <div className="checked"></div> : null
                    }
                </div>
            )
        };
        return (
            <div className="bank-card-list">
                <div className="header">
                    <div className="arrow-left" onClick={this.backHandler}></div>
                    <div className="title">选择还款卡</div>
                    {this.props.bankList.length < 10 ?
                        <a className="history-bill" href='/static/loan/user-card-add/index.html'>添加</a> : null}
                </div>
                <div className="bank-branch-list">
                    {this.props.bankList.map(list_item)}
                </div>
                <div className="banklist-btn-wrap">
                    <div className="banklist-btn" onClick={this.confirmHandler}>确定</div>
                </div>
            </div>
        )
    }
});

const PayBackResult = React.createClass({
    getInitialState: function () {
        return {
            payback_success: false,
            payback_fail: false,
            payback_ing: false
        }
    },
    componentWillReceiveProps:function(nextProps){
        this.resetState(nextProps)
    },
    resetState: function(props){
        this.setState({
            payback_success: props.success,
            payback_fail: props.fail,
            payback_ing: props.check
        });
    },
    render: function () {
        return (
            <div className="payback-result">
                {this.state.payback_success &&
                <div className="payback-result-success-img">
                    <img src="images/payback-success.png"/>
                </div>}
                {this.state.payback_fail &&
                <div className="payback-result-fail-img">
                    <img src="images/payback-fail.png"/>
                </div>}
                {this.state.payback_ing &&
                <div className="payback-result-ing-img">
                    <img src="images/payback-ing.png"/>
                </div>}
                { this.state.payback_success &&
                    <div className="payback-result-success-tip">
                        <div className="tip-top">欢迎再次使用!</div>
                        <div className="tip-bottom"> 还款金额：<span>{this.props.paybackNum.toFixed(2)}</span>元</div>
                        <a className="credit-btn" href={`/api/credit/v1/creditlist.shtml?sourceType=2&token=${USER.token}&userId=${USER.id}`}>
                            提升额度</a>
                        <div className="apply-btn" onClick={() => gotoHandler(`/static/loan/home/index.html`)}>申请用钱</div>
                    </div>}
                {this.state.payback_fail &&
                    <div>
                        <div className="payback-result-fail-tip">请检查网络原因，本次还款失败</div>
                        <div className="payback-customer-service"><img src="images/phone.png" />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
                    </div>
                }
                {this.state.payback_ing &&
                    <div>
                        <div className="payback-result-ing-tip">稍后可到账单页面<br/>查看具体还款结果。</div>
                        <div className="payback-customer-service"><img src="images/phone.png" />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
                    </div>
                }
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
