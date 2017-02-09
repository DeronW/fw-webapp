function gotoHandler(link) {
    location.href = encodeURI(link);
}

const ConfirmLoanWrap = React.createClass({
    getInitialState: function () {
        return {
            itemShow: false,
            verifyCodeShow: false,
            loanResult: false
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
    render: function () {
        return (
            <div>
                <ConfirmLoan callbackItemShow={this.itemShow} callbackVerifyCodeShow={this.getVerifyCodeShow}
                             accountInAmount
                                 ={this.props.accountInAmount} shouldRepaymentAmount={this.props.shouldRepaymentAmount}
                             dueTime={this.props.dueTimeStr} totalFeeAmount={this.props.totalFeeAmount}/>
                {this.state.itemShow ? <ItemDetail callbackItemDetailHide={this.itemDetailHide}
                                                   feeExtList={this.props.feeExtList}/> : null}
                {this.state.verifyCodeShow ?
                    <VerifyCode callbackCloseHanler={this.closeHandler} callbackResultShow={this.resultShow}/> : null}
                {this.state.loanResult ? <LoanResult callbackResultHide={this.resultHide}/> : null}
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
            $FW.Component.Toast("请同意芥末借款服务协议和芥末借款协议");
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
    render: function () {
        return (
            <div>
                <div className="transfer-box">
                    <div className="transfer-title">到账金额（元）</div>
                    <div className="transfer-money">{this.props.accountInAmount}</div>
                    <div className="loan-info">
                        <div className="transfer-lines">
                            <div className="return-money">
                                <span className="return-money-title">应还金额（元）</span>
                                <span className="return-money-num">{this.props.shouldRepaymentAmount}</span>
                            </div>
                            <div className="return-date">
                                <span className="return-date-title">应还日期</span>
                                <span className="return-date-day">{this.props.dueTime}</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                <div className="transfer-tip">请按时还款，避免<a href="">逾期费用</a>。</div>
                <div className="loan-fee">
                    <span className="loan-fee-num">借款费用{this.props.totalFeeAmount}元</span>
                    <span className="loan-right-arrow" onClick={this.detailHandler}>详情</span>
                </div>
                <div className="agreement-issue">
                    <div className={this.state.checked ? "checked-box" : "unchecked-box"}
                         onClick={this.checkHandler}></div>
                    <div className="check-item">同意<a href="">《芥末借款服务协议》</a>、<a href="https://cashloan.9888.cn/static/loan/protocol-borrowing/index.html">《芥末借款协议》</a>，未按时还款将计入信用卡银行的信用报告
                    </div>
                </div>
                <div className="confirm-btn" onClick={this.confirmHandler}>确定</div>
            </div>
        )
    }
});

const Notice = React.createClass({
    getInitialState: function () {
        return {
            noticeShow: this.props.code = 10000 ? true : false
        }
    },
    render: function () {
        return (
            <div className={this.state.noticeShow ? "mask" : "mask dis"}>
                <div className="notice-pop">
                    <div className="notice-close"></div>
                    <div className="notice-title">逾期费用说明</div>
                    <div className="notice-content">
                        第三届互联网金融全球峰会北大论坛于4月19-21日在北京召开。近期，互联网金融行业风险频发，很多平台陷入兑付危机，在这样的大环境下，导致很多P2P平台开始逐渐退出市场。金融工场副总裁李建光在接受央广网财经记者的采访时指出，2016年是监管落地的元年，在监管的因素落地之前，一定会有一个大浪淘沙的过程，之前的爆发式野蛮增长的过程中，发展出来的平台里面必然会有沙子，但是总体上看，随着监管的落地，互联网金融行业的趋势一定是良币驱逐劣币。
                    </div>
                    <div className="notice-btn">知道了</div>
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
        this.setState({ value: e.target.value });
    },
    closePopHandler: function () {
        this.props.callbackCloseHanler(false);
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
    componentDidMount: function () {
        let query = $FW.Format.urlQuery();
        let loanNum = query.loanNum;
        let orioleOrderGid = query.orioleOrderGid;
        let withdrawCardGid = query.withdrawCardGid;
        let phoneNum;
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/sendSmsverifycode.json`,
            method: "post",
            data: {
                token: localStorage.userToken,
                userGid: localStorage.userGid,
                userId: localStorage.userId,
                sourceType: 3,
                productId: 1,
                orioleOrderGid: orioleOrderGid,
                loanAmount: loanNum,
                withdrawCardGid: withdrawCardGid
            }
        }).then(data => {
            this.setState({phoneNum: data.mobile, orderGid: data.orderGid});
        }, (error) => console.log(error));
    },
    getSMSCode: function () {
        console.log(this.state.orderGid)
        if (this.state.remain <= 0) {
            this.tick();
            $FW.Ajax({
                url: `${API_PATH}api/loan/v1/resendverifycode.json`,
                method: "post",
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
        let query = $FW.Format.urlQuery();
        let loanNum = query.loanNum;
        let orioleOrderGid = query.orioleOrderGid;
        let withdrawCardGid = query.withdrawCardGid;
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/do.json`,
            method: "post",
            data: {
                token: localStorage.userToken,
                userGid: localStorage.userGid,
                userId: localStorage.userId,
                sourceType: 3,
                orderGid: this.state.orderId,
                orioleOrderGid: orioleOrderGid,
                loanAmount: loanNum,
                withdrawCardGid: withdrawCardGid,
                verifyCode: this.state.value,
                transPwd: 123456
            }
        }).then(d => {
            this.props.callbackResultShow(true);
            this.props.callbackCloseHanler(false);
        }, (error) => {
            this.setState({show_warn: true});
        });
    },
    render: function () {
        let frequent_tip = this.state.show_warn ? (<div className="wrong-tip">{this.state.show_text}</div>) : null;
        return (
            <div className="mask">
                <div className="verify-popup">
                    <div className="verify-popup-wrap">
                        <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div className="verify-popup-title">短信验证</div>
                        <div className="verify-popup-tip">
                            已向尾号（{this.state.phoneNum ? this.state.phoneNum.slice(-4) : null}）发送短信验证码。
                        </div>
                        <div className="verify-input">
                            <input className="sms-input" type="number" name="number" value={this.state.value}
                                   placeholder="输入验证码" onChange={this.changeValueHandler}/>
                            <span className="btn-countdown"
                                  onClick={this.getSMSCode}>{this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                        </div>
                        {frequent_tip}
                        <div className="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
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
        console.log(this.props.feeExtList)
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
            checkingResultShow: false,
            successResultShow: false,
            failResultShow: false
        }
    },
    resultHide: function () {
        this.props.callbackResultHide(false);
    },
    componentDidMount: function () {
        this.setState({successResultShow: true});
    },
    render: function () {
        return (
            <div className="loan-result">
                <div className="header">
                    <div className="arrow-left" onClick={this.resultHide}></div>
                    <div className="title">借款结果</div>
                </div>
                <div className="result-box">
                    <div className={this.state.waitingResultShow ? "waiting-result-box" : "waiting-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png" /></div>
                            <div className="loan-result1">
                                <div className="icon1"></div>
                                <div className="icon1-info">借款成功</div>
                                <div className="line"></div>
                                <div className="waiting-result">
                                    <div className="icon2"></div>
                                    <div className="icon2-info">预计58S之后给您处理结果</div>
                                </div>
                            </div>
                            <div className="customer-service">
                                <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a
                                    href="tel:400-0322-988">400-000-0000</a></div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.checkingResultShow ? "check-result-box" : "check-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png" /></div>
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
                                    href="tel:400-0322-988">400-000-0000</a></div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.successResultShow ? "success-result-box" : "success-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png" /></div>
                            <div className="loan-result3">
                                <div className="icon1"></div>
                                <div className="icon1-info">借款成功</div>
                                <div className="line"></div>
                                <div className="success-result-for-other">
                                    <div className="icon3"></div>
                                    <div className="icon3-info">
                                        <div className="icon3-info-top">已打款至</div>
                                        <div className="icon3-info-btm">银行卡（工商银行2233）</div>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-service">
                                <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a
                                    href="tel:400-0322-988">400-000-0000</a></div>
                            </div>
                        </div>
                        <div className="credit-btn">去提额</div>
                    </div>
                    <div className={this.state.failResultShow ? "fail-result-box" : "fail-result-box dis"}>
                        <div className="wrap-box">
                            <div className="fail-icon"><img src="images/fail-icon.png" /></div>
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
                                    href="tel:400-0322-988">400-000-0000</a></div>
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
    ReactDOM.render(<Header title={"确认信息"}/>, document.getElementById('header'));
    let query = $FW.Format.urlQuery();
    let loanNum = query.loanNum;
    let orioleOrderGid = query.orioleOrderGid;
    let withdrawCardGid = query.withdrawCardGid;
    $FW.Ajax({
        url: `${API_PATH}api/loan/v1/tryLoanBudget.json`,
        method: "post",
        data: {
            token: $FW.Store.getUserToken(),
            userGid: $FW.Store.getUserGid(),
            userId: $FW.Store.getUserId(),
            sourceType: 3,
            orioleOrderGid: orioleOrderGid,
            loanAmount: loanNum
        }
    }).then(d => {
        ReactDOM.render(<ConfirmLoanWrap {...d}/>, document.getElementById('cnt'));
    }, (error) => console.log(error));

    $FW.Ajax({
        url: `${API_PATH}api/oriole/v1/indexnotice.json`,
        method: "post",
        fail: () => true,
        data: {
            token: $FW.Store.getUserToken(),
            userGid: $FW.Store.getUserGid(),
            userId: $FW.Store.getUserId(),
            sourceType: 3
        }
    }).then(d => {
        ReactDOM.render(<Notice {...d}/>, document.getElementById('notice'));
    }, (error) => console.log(error));
});
