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
            selectedBankName:null,
            index:0
        }
    },
    componentDidMount: function () {
        console.log(this.state.cardGid)
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
    componentDidMount: function () {
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
    getBankIndex:function(index){
        this.setState({
            index: index
        })
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
                /> : null}
                {this.state.bankCardListShow ?
                    <BankCardList bankList={this.props.userBankList.withdrawBankcard} callbackIndexItem={this.indexItem}
                        callbackPopHide={this.popHideHandler} callbackBankName={this.getBankName} callbackBankNo={this.getBankNo} callbackBankCardGid={this.getBankCardGid}
                      bankName={this.state.bankName}
                      bankNo={this.state.bankNo}
                      cardGid={this.state.cardGid}
                      callbackGetBankIndex={this.getBankIndex}
                      callbackIndex= {this.state.index}

                    /> : null}
                {this.state.verifyCodeShow ?
                    <VerifyCode callbackResultShow={this.getPayBackResultShow} cardGid={this.state.cardGid}
                        callbackCloseHanler={this.closeHandler}
                        repaymentAmount={this.state.repaymentAmount} /> : null}
                {this.state.payBackResultShow ? <PayBackResult /> : null}
            </div>
        )
    }
});

const PayBack = React.createClass({
    bankListHandler: function () {
        this.props.callbackBankListShow(true);

    },
    paybackHandler: function () {
        this.props.callbackVerifyCodeShow(true);
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
                        <span>待还本金</span>
                        <span>{this.props.loanAmount.toFixed(2)}元</span>
                    </div>
                   <div>
                        <span>逾期费用</span>
                        <span>{this.props.overdueFee.toFixed(2)}元</span>
                    </div>
                </div>
                <div className="loan-detail-box">
                    <div>
                        <span>还款卡</span>
                        <span onClick={this.bankListHandler}>
                            {this.props.bankName}（{this.props.bankNo.slice(-4)}）<img className="right-arrow"
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
                <div className="pay-back-btn" onClick={this.paybackHandler}>立即还款</div>
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
            cardGid: this.props.cardGid
        }
    },
    backHandler: function () {
        this.props.callbackPopHide(false);
    },
    confirmHandler:function(){
        this.props.callbackPopHide(false);
        this.props.callbackBankName(this.state.bankName);
        this.props.callbackBankNo(this.state.bankNo);
        this.props.callbackBankCardGid(this.state.cardGid);
        this.props.callbackGetBankIndex(this.state.checked);
    },
    clickHandler: function (index) {
        this.setState({
            checked: index,
            bankName: this.props.bankList[index].bankShortName,
            bankNo: this.props.bankList[index].cardNo,
            cardGid: this.props.bankList[index].cardGid
        })
    },
    render: function () {
        let list_item = (item, index) => {
            return (
                <div className="list-item" key={index} onClick={() => { this.clickHandler(index) }}>
                    <img
                        src={item.logoUrl} />
                            {item.bankShortName}（{item.cardNo.slice(-4)}）
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
                    <a className="history-bill" href='/static/loan/user-card-add/index.html'>添加</a>
                </div>
                <div className="bank-branch-list">
                    {this.props.bankList.map(list_item)}
                </div>
                <div className="banklist-btn" onClick={this.confirmHandler}>确定</div>
            </div>
        )
    }
});

const VerifyCode = React.createClass({
    getInitialState: function () {
        return {
            phoneNum: null,
            value: '',
            remain: 0,
            orderGid: null
        }
    },
    closePopHandler: function () {
        this.props.callbackCloseHanler(false);
    },
    componentDidMount: function () {
        var query = $FW.Format.urlQuery();
        var loanGid = query.loanGid;
        this.tick();
        $FW.Ajax({
            url: `${API_PATH}api/repayment/v1/checksmsverifycode.json`,
            method: "post",
            enable_loading:"mini",
            data: {
                repaymentAmount: this.props.repaymentAmount,
                loanGid: loanGid,
                cardGid: this.props.cardGid,
                token: localStorage.userToken,
                userGid: localStorage.userGid,
                userId: localStorage.userId,
                sourceType: 3
            }
        }).then(d => {
            this.setState({ phoneNum: d.mobile, orderGid: d.orderGid });
        }, (error) => console.log(error)
            )
    },
    changeValueHandler: function (e) {
        this.setState({ value: e.target.value });
    },
    countingDown: function () {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({ remain: this.state.remain - 1 });
    },
    tick: function () {
        this.setState({ remain: 60 });
        window.clearInterval(this._timer);
        this._timer = setInterval(this.countingDown, 1000);
    },
    getSMSCode: function () {
        if (this.state.remain <= 0) {
            this.tick();
            $FW.Ajax({
                url: `${API_PATH}api/repayment/v1/resendverifycode.json`,
                method: "post",
                enable_loading:"mini",
                data: {
                    token: localStorage.userToken,
                    userGid: localStorage.userGid,
                    userId: localStorage.userId,
                    sourceType: 3,
                    orderGid: this.state.orderGid
                }
            }).then(d => {
                console.log(d)
            }, (error) => {

            });
        }
    },
    confirmBtnHandler: function () {
        if(this.state.value==''){
            $FW.Component.Toast("请输入验证码");
        }else{
            $FW.Ajax({
                url: `${API_PATH}api/repayment/v1/do.json`,
                method: "post",
                enable_loading:"mini",
                data: {
                    orderGid: this.state.orderGid,
                    token: localStorage.userToken,
                    userGid: localStorage.userGid,
                    userId: localStorage.userId,
                    sourceType: 3,
                    verifyCode: this.state.value
                }
            }).then(d => {
                    this.props.callbackResultShow(true, false);
                }, (error) => $FW.Component.Toast(error)
            )
        }
    },
    render: function () {
        return (
            <div className="mask">
                <div className="verify-popup">
                    <div className="verify-popup-wrap">
                        <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div className="verify-popup-title">短信验证</div>
                        <div className="verify-popup-tip"> 已向尾号（{localStorage.phone.slice(-4)}）发送短信验证码。</div>
                        <div className="verify-input">
                            <input className="sms-input" type="number" name="number" value={this.state.value}
                                placeholder="输入验证码" onChange={this.changeValueHandler} />
                            <span className="btn-countdown"
                                onClick={this.getSMSCode}>{this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                        </div>
                        <div className="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                    </div>
                </div>
            </div>
        )
    }
});

const PayBackResult = React.createClass({
    getInitialState: function () {
        return {
            payback_success: true,
            payback_fail: false,
            payback_ing: false
        }
    },
    render: function () {
        return (
            <div className="payback-result">
                {this.state.payback_success &&
                    <div className="payback-result-success-img">
                        <img src="images/payback-success.png" />
                    </div>}
                {this.state.payback_fail &&
                    <div className="payback-result-fail-img">
                        <img src="images/payback-fail.png" />
                    </div>}
                {this.state.payback_ing &&
                    <div className="payback-result-ing-img">
                        <img src="images/payback-ing.png" />
                    </div>}
                {/*<div className="payback-result-success-tip">
                 <div className="tip-top">还有2323.23元未还，请记得准时还款!</div>
                 <div className="tip-bottom"> 还款金额：<span>212.21</span>元</div>
                 </div>*/}
                {this.state.payback_fail ? <div className="payback-result-fail-tip">请检查网络原因，本次还款失败</div> : null}
                {this.state.payback_ing ? <div className="payback-result-ing-tip">稍后可到账单页面查看具体还款结果。</div> : null}
                <div className="credit-btn"
                    onClick={() => gotoHandler(`/api/credit/v1/creditlist.shtml?sourceType=2&token=${localStorage.userToken}&userId=${localStorage.userId}`)}>
                    提升额度
                </div>
                <div className="apply-btn" onClick={() => gotoHandler(`/static/loan/home/index.html`)}>申请用钱</div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"还款"} />, HEADER_NODE);
    var query = $FW.Format.urlQuery();
    var loanGid = query.loanGid;
    var loanType = query.loanType;
    Promise.all([
        $FW.Ajax({
            url: `${API_PATH}api/bankcard/v1/bankcardlist.json`,
            method: "post",
            enable_loading:"mini",
            data: {
                token: $FW.Store.getUserToken(),
                userGid: $FW.Store.getUserGid(),
                userId: $FW.Store.getUserId(),
                sourceType: 3
            }
        }),
        $FW.Ajax({
            url: `${API_PATH}api/repayment/v1/loandetail.json`,
            method: "post",
            enable_loading:"mini",
            data: {
                loanGid: loanGid,
                loanType: loanType,
                token: $FW.Store.getUserToken(),
                userGid: $FW.Store.getUserGid(),
                userId: $FW.Store.getUserId(),
                sourceType: 3
            }
        })
    ]).then(d => {
        ReactDOM.render(<PayBackWrap {...d[0]} {...d[1]} />, CONTENT_NODE);
    }, (error) => console.log(error));
});
