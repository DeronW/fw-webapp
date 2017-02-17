function gotoHandler(link) {
    location.href = encodeURI(link);
}

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
        this.setState({itemShow: val});
    },
    itemDetailHide: function (val) {
        this.setState({itemShow: val});
    },
    getVerifyCodeShow: function (val) {
        this.setState({verifyCodeShow: val});
    },
    closeHandler: function (booleanVal) {
        this.setState({verifyCodeShow: booleanVal});
    },
    resultShow: function (booleanVal) {
        this.setState({loanResult: booleanVal});
    },
    resultHide: function (booleanVal) {
        this.setState({loanResult: booleanVal});
    },
    noticeShow: function (booleanVal) {
        this.setState({noticeShow: booleanVal});
    },
    noticeHide: function (booleanVal) {
        this.setState({noticeShow: booleanVal});
    },
    getLoanResultSuccess: function (booleanVal) {
        this.setState({successResult: booleanVal});
    },
    getLoanResultFail: function (booleanVal) {
        this.setState({failResult: booleanVal});
    },
    getLoanResultCheck: function (booleanVal) {
        this.setState({checkResult: booleanVal});
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
                <ConfirmLoan callbackItemShow={this.itemShow} callbackVerifyCodeShow={this.getVerifyCodeShow}
                             accountInAmount
                                 ={this.props.accountInAmount} shouldRepaymentAmount={this.props.shouldRepaymentAmount}
                             dueTime={this.props.dueTimeStr} totalFeeAmount={this.props.totalFeeAmount}
                             callbackNoticeShow={this.noticeShow}/>
                {this.state.itemShow ? <ItemDetail callbackItemDetailHide={this.itemDetailHide}
                                                   feeExtList={this.props.feeExtList}/> : null}
                {this.state.noticeShow ?
                    <Notice content={this.props.latedescription} callbackNoticeHide={this.noticeHide}/> : null}
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

const ConfirmLoan = React.createClass({
    getInitialState: function () {
        return {
            checked: false
        }
    },
    confirmHandler: function () {
        if (this.state.checked == false) {
            $FW.Component.Toast("请同意放心花借款服务协议和放心花借款协议");
        } else {
            this.props.callbackVerifyCodeShow(true);
        }
    },
    checkHandler: function () {
        this.setState({checked: !this.state.checked});
    },
    detailHandler: function () {
        this.props.callbackItemShow(true);
    },
    clickHandler: function () {
        this.props.callbackNoticeShow(true);
    },
    render: function () {
        return (
            <div>
                <div className="transfer-box">
                    <div className="money-get">
                        <div className="transfer-money">{this.props.accountInAmount.toFixed(2)}</div>
                        <div className="transfer-title">到账金额（元）</div>
                    </div>
                    <div className="loan-info">
                        <div className="transfer-lines">
                            <div className="return-money">
                                <span className="return-money-num">{this.props.shouldRepaymentAmount.toFixed(2)}</span>
                                <span className="return-money-title">应还金额（元）</span>
                            </div>
                            <div className="return-date">
                                <span className="return-date-day">{this.props.dueTime}</span>
                                <span className="return-date-title">应还日期</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                <div className="transfer-tip">请按时还款，避免<a onClick={this.clickHandler}>逾期费用</a>。</div>
                <div className="loan-fee">
                    <span className="loan-fee-num">借款费用{this.props.totalFeeAmount.toFixed(2)}元</span>
                    <span className="loan-right-arrow" onClick={this.detailHandler}>详情</span>
                </div>
                <div className="agreement-issue">
                    <div className={this.state.checked ? "checked-box" : "unchecked-box"}
                         onClick={this.checkHandler}></div>
                    <div className="check-item">同意<a href="/static/loan/protocol-partner/index.html">《放心花借款服务协议》</a>、<a
                        href="/static/loan/protocol-borrowing/index.html">《放心花借款协议》</a>，未按时还款将计入信用卡银行的信用报告
                    </div>
                </div>
                <div className="confirm-btn" onClick={this.confirmHandler}>确定</div>
            </div>
        )
    }
});

const Notice = React.createClass({
    clickHandler: function () {
        this.props.callbackNoticeHide(false);
    },
    render: function () {
        return (
            <div className="mask">
                <div className="notice-pop">
                    <div className="notice-close"></div>
                    <div className="notice-title">逾期费用说明</div>
                    <div className="close-icon" onClick={this.clickHandler}></div>
                    <div className="notice-content">
                        {this.props.content}
                    </div>
                    <div className="notice-btn" onClick={this.clickHandler}>知道了</div>
                </div>
            </div>
        )
    }
});

const VerifyCode = React.createClass({
    getInitialState: function () {
        return {
            phoneNum: null,
            orderGid: null,
            remain: 0,
            show_warn: false,
            value: ''
        }
    },
    changeValueHandler: function (e) {
        this.setState({value: e.target.value});
    },
    closePopHandler: function () {
        this.props.callbackCloseHanler(false);
    },
    countingDown: function () {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({remain: this.state.remain - 1});
    },
    tick: function () {
        this.setState({remain: 60});
        window.clearInterval(this._timer);
        this._timer = setInterval(this.countingDown, 1000);
    },
    componentDidMount: function () {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        this.tick();
        let user = $FW.Store.getUserDict();
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/sendSmsverifycode.json`,
            method: "post",
            data: {
                token: user.token,
                userGid: user.gid,
                userId: user.id,
                sourceType: SOURCE_TYPE,
                orderGid: orderGid
            }
        }).then(data => {
            this.setState({orderGid: data.orderGid});
        }, (err) => $FW.Component.Toast(err));
    },
    getSMSCode: function () {
        let user = $FW.Store.getUserDict();
        if (this.state.remain <= 0) {
            this.tick();
            $FW.Ajax({
                url: `${API_PATH}api/loan/v1/resendverifycode.json`,
                method: "post",
                data: {
                    token: user.token,
                    userGid: user.gid,
                    userId: user.id,
                    sourceType: SOURCE_TYPE,
                    orderGid: this.state.orderGid
                }
            });
        }
    },
    confirmBtnHandler: function () {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        let user = $FW.Store.getUserDict();
        // $FW.Ajax({
        //     url: `${API_PATH}api/loan/v1/do.json`,
        //     method: "post",
        //     data: {
        //         token: user.token,
        //         userGid: user.gid,
        //         userId: user.id,
        //         sourceType: SOURCE_TYPE,
        //         orderGid: orderGid,
        //         verifyCode: this.state.value,
        //     }
        // }).then(d => {
        //     this.props.callbackResultShow(true);
        //     this.props.callbackCloseHanler(false);
        // }, (error) => {
        //     this.setState({ show_warn: true });
        // });

        $FW.Post(`${API_PATH}api/loan/v1/do.json`, {
            token: user.token,
            userGid: user.gid,
            userId: user.id,
            sourceType: SOURCE_TYPE,
            orderGid: orderGid,
            verifyCode: this.state.value,
        }).then(() => {
            return $FW.Post(`${API_PATH}api/loan/v1/status.json`, {
                token: user.token,
                userGid: user.gid,
                userId: user.id,
                orderGid: orderGid,
                sourceType: SOURCE_TYPE
            })
        }, e => $FW.Component.Toast(e.message)).then((data) => {
            this.props.callbackCloseHanler(false);
            this.props.callbackResultShow(true);
            if (data.loanStatus == 6) {
                this.props.callbackGetLoanResultSuccess(true);
            } else if (data.loanStatus == 5) {
                this.props.callbackGetLoanResultFail(true);
            } else if (data.loanStatus == 4) {
                this.props.callbackGetLoanResultCheck(true);
            }
        }, e => {

        });

    },

    render: function () {
        let frequent_tip = this.state.show_warn &&
            <div className="wrong-tip">{this.state.show_text}</div>;

        let phone = $FW.Store.get('phone');

        return (
            <div className="mask">
                <div className="verify-popup">
                    <div className="verify-popup-wrap">
                        <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div className="verify-popup-title">短信验证</div>
                        <div className="verify-popup-tip">
                            {/*已向尾号（{phone.slice(-4)}）发送短信验证码。*/}
                            已向{this.props.bankShortName}({this.props.cardNo.slice(-4)})银行预留手机号发送短信验证码。
                        </div>
                        <div className="verify-input">
                            <input className="sms-input" type="number" name="number"
                                   value={this.state.value}
                                   placeholder="输入验证码" onChange={this.changeValueHandler}/>
                            <span className="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.remain > 0 ? `${this.state.remain}s` : '获取验证码'}</span>
                        </div>
                        {frequent_tip}
                        <div className="btn-list">
                            <div className="cancel-btn" onClick={this.closePopHandler}>取消</div>
                            <div className="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
});

const ItemDetail = React.createClass({
    itemHideHandler: function () {
        this.props.callbackItemDetailHide(false);
    },
    render: function () {
        let item_list = (item, index) => {
            return (
                <div className="item-list" key={index}><span className="item-left">{item.feeName}</span><span
                    className="item-right">{item.feeAmoutStr}元</span></div>
            )
        };
        return (
            <div className="mask">
                <div className="detail-pop">
                    <div className="close-icon" onClick={this.itemHideHandler}></div>
                    <div className="item-title">借款费用详情</div>
                    <div className="item-wrap">
                        {this.props.feeExtList.map(item_list)}
                    </div>
                    <div className="know-btn" onClick={this.itemHideHandler}>知道了</div>
                </div>
            </div>
        )
    }
});

const LoanResult = React.createClass({
    getInitialState: function () {
        return {
            waitingResultShow: false,
            successResultShow: false,
            failResultShow: false,
            checkingResult:false,
            remain:0
        }
    },
    componentWillReceiveProps:function(nextProps){
        this.resetState(nextProps)
    },
    resetState: function(props){
        this.setState({
            waitingResultShow: props.check,
            successResultShow: props.success,
            failResultShow: props.fail
        });
    },
    countingDown: function () {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({remain: this.state.remain - 1});
    },
    tick: function () {
        this.setState({remain: 56});
        window.clearInterval(this._timer);
        this._timer = setInterval(this.countingDown, 1000);
    },
    componentDidMount(){
        this.resetState(this.props);
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        let user = $FW.Store.getUserDict();
        let loanStatus;
        if (this.state.waitingResultShow) {
            this.tick();
            function checkAjax() {
                $FW.Post(`${API_PATH}api/loan/v1/status.json`, {
                    token: user.token,
                    userGid: user.gid,
                    userId: user.id,
                    orderGid: orderGid,
                    sourceType: SOURCE_TYPE
                }).then((data) => {
                    loanStatus = data.loanStatus;
                }, (err) => {});
            }
            let timer = setInterval(checkAjax(), 10000);
            if (this.state.remain <= 1) window.clearInterval(timer);
            if (loanStatus == 6) {
                this.setState({
                    successResultShow: true,
                    waitingResultShow:false
                });
            } else if(loanStatus == 5){
                this.setState({
                    failResultShow: true,
                    waitingResultShow:false
                });
            } else if(loanStatus == 4){
                this.setState({
                    checkingResult: true,
                    waitingResultShow:false
                });
            }
        }
    },
    resultHide: function () {
        this.props.callbackResultHide(false);
    },
    render: function () {
        let user = $FW.Store.getUserDict();
        return (
            <div className="loan-result">
                <div className="header">
                    <div className="arrow-left" onClick={this.resultHide}></div>
                    <div className="title">借款结果</div>
                </div>
                <div className="result-box">
                    <div className={this.state.waitingResultShow ? "waiting-result-box" : "waiting-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png"/></div>
                            <div className="loan-result1">
                                <div className="icon1"></div>
                                <div className="icon1-info">借款成功</div>
                                <div className="line"></div>
                                <div className="waiting-result">
                                    <div className="icon2"></div>
                                    <div className="icon2-info">预计56S之后给您处理结果</div>
                                </div>
                            </div>
                            <div className="customer-service">
                                <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a
                                    href="tel:400-102-0066">400-102-0066</a></div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.checkingResult ? "check-result-box" : "check-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png"/></div>
                            <div className="loan-result2">
                                <div className="icon1"></div>
                                <div className="icon1-info">借款成功</div>
                                <div className="line"></div>
                                <div className="success-result-for-jrgc">
                                    <div className="icon3"></div>
                                    <div className="icon3-info">
                                        <div className="icon3-info-top">借款查询中</div>
                                        <div className="icon3-info-btm">一小时之内会打款至您的银行卡</div>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-service">
                                <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a
                                    href="tel:400-102-0066">400-102-0066</a></div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.successResultShow ? "success-result-box" : "success-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png"/></div>
                            <div className="loan-result3">
                                <div className="icon1"></div>
                                <div className="icon1-info">借款成功</div>
                                <div className="line"></div>
                                <div className="success-result-for-other">
                                    <div className="icon3"></div>
                                    <div className="icon3-info">
                                        <div className="icon3-info-top">已打款至</div>
                                        <div className="icon3-info-btm">
                                            银行卡（{this.props.bankShortName}{this.props.cardNo.slice(-4)}）
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-service">
                                <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a
                                    href="tel:400-102-0066">400-102-0066</a></div>
                            </div>
                        </div>
                        <div className="credit-btn"
                             onClick={() => gotoHandler(`/api/credit/v1/creditlist.shtml?sourceType=2&token=${user.token}&userId=${user.id}`)}>
                            去提额
                        </div>
                    </div>
                    <div className={this.state.failResultShow ? "fail-result-box" : "fail-result-box dis"}>
                        <div className="wrap-box">
                            <div className="fail-icon"><img src="images/fail-icon.png"/></div>
                            <div className="loan-result4">
                                <div className="icon4"></div>
                                <div className="icon4-info">
                                    <div className="icon4-info-top">借款失败</div>
                                    <div className="icon4-info-btm">由于银行问题导致借款失败</div>
                                </div>
                                <div className="line2"></div>
                                <div className="waiting-result">
                                    <div className="icon5"></div>
                                    <div className="icon5-info">请重新借款</div>
                                </div>
                            </div>
                            <div className="customer-service">
                                <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a
                                    href="tel:400-102-0066">400-102-0066</a></div>
                            </div>
                        </div>
                        <div className="apply-btn">重新借款</div>
                    </div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"确认信息"}/>, HEADER_NODE);
    let query = $FW.Format.urlQuery();
    let loanNum = query.loanNum;
    let orioleOrderGid = query.orioleOrderGid;
    let withdrawCardGid = query.withdrawCardGid;
    let user = $FW.Store.getUserDict();
    Promise.all([
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/tryLoanBudget.json`,
            method: "post",
            enable_loading: "mini",
            data: {
                token: user.token,
                userGid: user.gid,
                userId: user.id,
                sourceType: SOURCE_TYPE,
                orioleOrderGid: orioleOrderGid,
                loanAmount: loanNum
            }
        }),
        $FW.Ajax({
            url: `${API_PATH}api/bankcard/v1/bankcardlist.json`,
            method: "post",
            enable_loading: "mini",
            data: {
                token: user.token,
                userGid: user.gid,
                userId: user.id,
                sourceType: SOURCE_TYPE
            }
        }),
        $FW.Ajax({
            url: `${API_PATH}api/repayment/v1/latedescription.json`,
            method: "post",
            enable_loading: "mini",
            data: {
                token: user.token,
                userGid: user.gid,
                userId: user.id,
                sourceType: SOURCE_TYPE
            }
        })
    ]).then(d => {
        ReactDOM.render(<ConfirmLoanWrap {...d[0]} {...d[1]} {...d[2]} />, CONTENT_NODE);
    });
});
