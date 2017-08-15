class LoanResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            waitingResultShow: true,
            successResultShow: false,
            failResultShow: false,
            checkingResult: false,
            countdown: 0,
            loanStatus: null,
            failReason: null,
            activityRecomUrl: ""
        }
        this.resetState = this.resetState.bind(this);
        this.countingDown = this.countingDown.bind(this);
        this.checkAjax = this.checkAjax.bind(this);
        this.resultHide = this.resultHide.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    resetState(props) {
        this.setState({
            waitingResultShow: props.check,
            //successResultShow: props.success,
            //failResultShow: props.fail
        });
    }

    countingDown() {
        this.setState({countdown: 56});
        this.checkAjax();

        this.timer = setInterval(() => {
            let c = this.state.countdown;
            if (c % 10 === 0) this.checkAjax();
            this.setState({countdown: c - 1});
            if (c <= 0) clearInterval(this.timer);
        }, 1000);
    }

    checkAjax() {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;

        $FXH.Post(`${API_PATH}/api/loan/v1/status.json`, {
            orderGid: orderGid
        }).then((data) => {
            let finishFlag = true;
            this.setState({
                activityRecomUrl: data.activityRecomUrl,
                loanStatus: data.loanStatus
            });


            if (data.loanStatus == 6) {
                this.setState({
                    waitingResultShow: false,
                    successResultShow: true,
                });
                if (this.state.activityRecomUrl) {
                    setTimeout(() => {
                        $FW.Browser.inApp()? NativeBridge.goto(`https://m.easyloan888.com/${this.state.activityRecomUrl}`,false,"放心花"):
                        location.href  = `${this.state.activityRecomUrl}`;
                        // location.href  = `/static/loan/features/index.html#/invite-activity`;
                    }, 2000)

                }
                    // setTimeout(() => {
                    //     $FW.Browser.inApp()? NativeBridge.goto(`https://m.easyloan888.com/static/loan/features/index.html#/invite-activity`,false,"放心花"):
                    //     location.href  = `/static/loan/features/index.html#/invite-activity`;
                    // }, 2000)
            } else if (data.loanStatus == 5) {
                this.setState({
                    waitingResultShow: false,
                    failResultShow: true,
                    failReason: data.failReason
                });
            } else {
                finishFlag = false
            }

            if (this.state.countdown <= 0) {
                if (data.loanStatus == 6) {
                    this.setState({
                        waitingResultShow: false,
                        successResultShow: true,
                    });
                    // if(activityRecomUrl){
                    //     gotoHandler(`${data.activityRecomUrl}`);
                    // }

                } else if (data.loanStatus == 5) {
                    this.setState({
                        waitingResultShow: false,
                        failResultShow: true,
                        failReason: data.failReason
                    });
                } else if (data.loanStatus == 4) {
                    this.setState({
                        waitingResultShow: false,
                        checkingResult: true
                    });
                } else {
                    finishFlag = false
                }
            }
            if (finishFlag) clearInterval(this.timer);
        }, (err) => {
            $FW.Component.Toast(err.message)
        });

    }

    componentDidMount() {

        this.countingDown();
        this.resetState(this.props);

    }

    resultHide() {
        this.props.callbackResultHide(false);
    }

    render() {
        return (
            <div className="loan-result">
                <div className="header">
                    <div className="arrow-left" onClick={() => {
                        gotoHandler("/static/loan/products/index.html#/")
                    }}></div>
                    <div className="title">借款结果</div>
                </div>
                <div className="result-box">
                    <div className={this.state.waitingResultShow ? "waiting-result-box" : "waiting-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png"/></div>
                            <div className="loan-result1">
                                <div className="icon1"></div>
                                <div className="icon1-info">申请成功</div>
                                <div className="line"></div>
                                <div className="waiting-result">
                                    <div className="icon2"></div>
                                    <div className="icon2-info">
                                        预计{this.state.countdown > 0 ? `${this.state.countdown}s` : '1s'}之后给您处理结果
                                    </div>
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
                                <div className="icon1-info">申请成功</div>
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
                                <div className="icon1-info">申请成功</div>
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
                             onClick={() => gotoHandler(`/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`)}>
                            去提额
                        </div>
                    </div>
                    <div className={this.state.failResultShow ? "fail-result-box" : "fail-result-box dis"}>
                        <div className="wrap-box">
                            <div className="fail-icon"><img src="images/fail-icon.png"/></div>
                            <div className="loan-result4">
                                <div className="icon4"></div>
                                <div className="icon4-info">
                                    <div className="icon4-info-top">申请成功</div>
                                </div>
                                <div className="line2"></div>
                                <div className="waiting-result">
                                    <div className="icon5"></div>
                                    <div className="icon5-info">借款失败</div>
                                    <div className="icon5-info-btm">{this.state.failReason}</div>
                                </div>
                            </div>
                            <div className="customer-service">
                                <div className="service-wrap"><img src="images/phone.png"/>如有问题请致电：<a
                                    href="tel:400-102-0066">400-102-0066</a></div>
                            </div>
                        </div>
                        <div className="apply-btn" onClick={() => gotoHandler('/static/loan/products/index.html#/')}>
                            重新借款
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

