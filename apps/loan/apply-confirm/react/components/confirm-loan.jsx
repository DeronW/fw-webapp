class ConfirmLoan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checked: true,
            orderGid: null,
            phoneNum: null,
            countdown: 0,
            show_warn: false,
            value: '',
            codePop:false,
            otherTip:false,
            loanShow:false,
            failMsg:''
        }
    }
    confirmHandler = () => {
        if (this.state.checked == false) {
            $FW.Component.Toast("请同意借款服务协议，借款确认书和代扣服务协议");
        } else {
            let query = $FW.Format.urlQuery();
            let orderGid = query.orderGid;
            $FXH.Post(`${API_PATH}/api/loan/v1/sendSmsverifycode.json`,{
                orderGid: orderGid
            }).then(() => {
                 this.setState({codePop:true});
                 this.countingDown();
                //this.setState({orderGid: data.orderGid});
            }, (err) => $FW.Component.Toast(err.message));
        }
    }
    checkHandler = () => {
        this.setState({ checked: !this.state.checked });
    }
    detailHandler = () => {
        this.props.callbackItemShow(true);
    }
    clickHandler = () => {
        this.props.callbackNoticeShow(true);
    }

    changeValueHandler = (e) => {
        this.setState({value: e.target.value});
    }
    closePopHandler = () => {
        this.setState({codePop:false})
    }
    countingDown = () => {
        this.setState({
            countdown: 60
        });
        this.checkAjax();
        this.timer = setInterval(() => {
            let c = this.state.countdown;
            if (c % 5 === 0) this.checkAjax();
            this.setState({
                countdown: c - 1
            });
            if (this.state.countdown <= 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    checkAjax = () => {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        $FXH.Post(`${API_PATH}/api/loan/v1/status.json`, {
            orderGid: orderGid,
            with_out_loading:true
        }).then((data) => {
            let finishFlag = true;
            if(data.loanStatus == 2 || data.loanStatus == 3){
                this.setState({codePop:false,loanShow:true,failMsg:data.failReason})
            }else if(data.loanStatus >= 4){
                clearInterval(this.timer);
            }else{
                finishFlag = false
            }

            if(this.state.countdown <= 0){
                if(data.loanStatus == 2 || data.loanStatus == 3){
                    this.setState({codePop:false,loanShow:true,failMsg:data.failReason})
                }else if(data.loanStatus >= 4){
                    clearInterval(this.timer);
                }else{
                    finishFlag = false
                }
            }

            if (finishFlag) clearInterval(this.timer);

        }, (err) => {
            clearInterval(this.timer);
            this.setState({codePop:false,loanShow:true,failMsg:err.message})
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    getSMSCode = () => {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        if (this.state.countdown <= 0) {
            this.countingDown();
            $FXH.Post(`${API_PATH}/api/loan/v1/resendverifycode.json`,{orderGid: orderGid});
        }
    }
    codeConfirmBtnHandler = () => {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        if (this.state.value == '')
            return $FW.Component.Toast("请输入短信验证码");

        $FXH.Post(`${API_PATH}/api/loan/v1/do.json`, {
            orderGid: orderGid,
            verifyCode: this.state.value
        }).then(() => {
                if($FW.Browser.inJRGCApp()){
                    gotoHandler(`/static/loan/apply-result/index.html?orderGid=${orderGid}`);
                }else{
                    this.props.callbackCloseHanler(false);
                    this.props.callbackResultShow(true);
                    this.props.callbackGetLoanResultCheck(true);
                }
            }, e => {
                if(e.code == 603002){
                    this.setState({codePop:false, loanShow:true, failMsg:e.message});
                }else{
                    $FW.Component.Toast(e.message)}
            }
        );
    }

    callbackHandler = () => {
        this.setState({loanShow:false});
    }

    render() {
        let frequent_tip = this.state.show_warn &&
            <div className="wrong-tip">{this.state.show_text}</div>;

        let phone = $FW.Store.get('phone');
    return (
        <div>
            <div className="transfer-box">
                <div className="money-get">
                    <div className="transfer-money">{this.props.accountInAmount.toFixed(2)}</div>
                    <div className="transfer-title">到账金额(元)</div>
                </div>
                <div className="loan-info">
                    <div className="transfer-lines">
                        <div className="return-money">
                            <span className="return-money-num">{this.props.shouldRepaymentAmount.toFixed(2)}</span>
                            <span className="return-money-title">应还金额(元)</span>
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
                <div className="check-item">同意<a href="/static/loan/protocol-borrowing/index.html">《借款服务协议》</a>、<a
                    href="/static/loan/protocol-partner/index.html">《借款确认书》</a>，<a href="/static/loan/protocol-cost/index.html">《代扣服务协议》</a>，未按时还款将计入信用卡银行的信用报告
                </div>
            </div>
            <div className="confirm-btn" onClick={this.confirmHandler}>确定</div>
            {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} errorMessage={this.state.failMsg} popTitle={"审核未通过"}/>}
            <div className={this.state.codePop ? "mask" : "mask dis"}>
                <div className="verify-popup">
                    <div className="verify-popup-wrap">
                        <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div className="verify-popup-title">短信验证</div>
                        <div className="verify-popup-tip">
                            已向手机号(尾号{phone.slice(-4)})发送短信验证码
                            {/* 已向{this.props.bankShortName}( {this.props.cardNo.slice(-4)} )银行预留手机号发送短信验证码。 */}
                        </div>
                        <div className="verify-input">
                            <input className="sms-input" type="number" name="number"
                                   value={this.state.value}
                                   placeholder="输入验证码" onChange={this.changeValueHandler}/>
                            <span className="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.countdown > 0 ? `${this.state.countdown}s` : '获取验证码'}</span>
                        </div>
                        {frequent_tip}
                        <div className="btn-list">
                            <div className="cancel-btn" onClick={this.closePopHandler}>取消</div>
                            <div className="confirm-btn" onClick={this.codeConfirmBtnHandler}>确定</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
