function gotoHandler(link) {
    location.href = encodeURI(link);
}

const LoanResult = React.createClass({
    getInitialState: function () {
        let cashBank = this.props.data.userBankList.withdrawBankcard;
        function isRealNameBindCard(ele) {
            return ele.isRealNameBindCard == true;
        }
        let filtered = cashBank.filter(isRealNameBindCard);
        return {
            waitingResultShow: true,
            successResultShow: false,
            failResultShow: false,
            checkingResult: false,
            countdown: 0,
            loanStatus: null,
            bankName: filtered[0].bankShortName,
            bankNo: filtered[0].cardNo.slice(-4),
            failReason:null
        }
    },
    // componentWillReceiveProps: function (nextProps) {
    //     this.resetState(nextProps)
    // },
    componentWillUnmount() {
        clearInterval(this.timer);
    },
    // resetState: function (props) {
    //     this.setState({
    //         waitingResultShow: props.check,
    //         //successResultShow: props.success,
    //         //failResultShow: props.fail
    //     });
    // },
    countingDown() {
        let { countdown } = this.state;
        this.setState({ countdown: 56 });
        this.checkAjax();
        this.timer = setInterval(() => {
            if (countdown % 10 === 0) this.checkAjax();
            this.setState({ countdown: countdown - 1 });
            if (countdown <= 0) clearInterval(this.timer);
        }, 1000);
    },
    checkAjax() {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        $FW.Post(`${API_PATH}api/loan/v1/status.json`, {
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            orderGid: orderGid,
            sourceType: SOURCE_TYPE
        }).then((data) => {
            let finishFlag = true;
            if (data.loanStatus == 6) {
                this.setState({
                    waitingResultShow: false,
                    successResultShow: true,
                });
            } else if (data.loanStatus == 5) {
                this.setState({
                    waitingResultShow: false,
                    failResultShow: true,
                    failReason:data.failReason
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
                } else if (data.loanStatus == 5) {
                    this.setState({
                        waitingResultShow: false,
                        failResultShow: true,
                        failReason:data.failReason
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
        }, (err) => { $FW.Component.Toast(err.message) });

    },
    componentDidMount() {

        this.countingDown();
        //this.resetState(this.props);

    },
    // resultHide: function () {
    //     this.props.callbackResultHide(false);
    // },
    copyHandler(){
      NativeBridge.clipboard("fxhuaba");
    },
    render: function () {
        return (
            <div className="loan-result">
                {$FW.Browser.inAndroid() &&
                    <div className="header">
                        <div className="arrow-left" onClick={()=>{$FW.Browser.inApp()?NativeBridge.close():gotoHandler("/static/loan/home/index.html")}}></div>
                        <div className="title">借款结果</div>
                    </div>
                }
                <div className="result-box">
                    <div className={this.state.waitingResultShow ? "waiting-result-box" : "waiting-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png" /></div>
                            <div className="loan-result1">
                                <div className="icon1"></div>
                                <div className="icon1-info">申请成功</div>
                                <div className="line"></div>
                                <div className="waiting-result">
                                    <div className="icon2"></div>
                                    <div className="icon2-info">预计{this.state.countdown > 0 ? `${this.state.countdown}s` : 0}之后给您处理结果</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.checkingResult ? "check-result-box" : "check-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png" /></div>
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
                        </div>
                        <div className="btn-wrap">
                            <div className="credit-btn" onClick={() => {$FW.Browser.inApp()? NativeBridge.close(): gotoHandler('/static/loan/home/index.html')}}>返回</div>
                        </div>
                    </div>
                    <div className={this.state.successResultShow ? "success-result-box" : "success-result-box dis"}>
                        <div className="wrap-box">
                            <div className="success-icon"><img src="images/success-icon.png" /></div>
                            <div className="loan-result3">
                                <div className="icon1"></div>
                                <div className="icon1-info">申请成功</div>
                                <div className="line"></div>
                                <div className="success-result-for-other">
                                    <div className="icon3"></div>
                                    <div className="icon3-info">
                                        <div className="icon3-info-top">已打款至</div>
                                        <div className="icon3-info-btm">
                                            银行卡（{this.state.bankName}{this.state.bankNo}）
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-wrap">
                            <div className="credit-btn" onClick={() => {$FW.Browser.inApp()? NativeBridge.close(): gotoHandler('/static/loan/home/index.html')}}>返回</div>
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
                        </div>
                        <div className="btn-wrap">
                            <div className="credit-btn" onClick={()=>{$FW.Browser.inApp()? NativeBridge.close():gotoHandler('/static/loan/home/index.html')}}>重新借款</div>
                        </div>
                    </div>
                    <div className="weixin-attention">
                        <div className="weixin-attention-wrap">
                            <div>关注微信公众号fxhuaba<span className="copy-qr" onClick={this.copyHandler}>点击复制公众号</span></div>
                            <div>可获得更高借款额度，且随时查看还款计划</div>
                        </div>
                    </div>
                </div>
                <div className="customer-service">
                    <div className="service-wrap"><img src="images/phone.png" />如有问题请致电：<a
                        href="tel:400-102-0066">400-102-0066</a></div>
                </div>
            </div>
        )
    }
});

const USER = $FW.Store.getUserDict();
$FW.DOMReady(function () {
    $FW.Browser.inAndroid() && NativeBridge.hideHeader();
    $FW.Browser.inIOS() && NativeBridge.setTitle('借款结果');
    ReactDOM.render(<Header title={"借款结果"} />, HEADER_NODE);
    $FW.Post(`${API_PATH}api/bankcard/v1/bankcardlist.json`,{
        token: USER.token,
        userGid: USER.gid,
        userId: USER.id,
        sourceType: SOURCE_TYPE
    }).then((data)=>{
        ReactDOM.render(<LoanResult data={data}/>, CONTENT_NODE);
    });
});
