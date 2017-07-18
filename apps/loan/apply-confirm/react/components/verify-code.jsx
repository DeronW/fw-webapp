class VerifyCode extends React.Component{
    constructor(props){
        super(props)
        this.state={
            phoneNum: null,
            countdown: 0,
            show_warn: false,
            value: '',
            codePop:true,
            otherTip:false,
            loanShow:false,
            failMsg:''
        }
        this.changeValueHandler = this.changeValueHandler.bind(this);
        this.closePopHandler = this.closePopHandler.bind(this);
        this.countingDown = this.countingDown.bind(this);
        this.getSMSCode = this.getSMSCode.bind(this);
        this.confirmBtnHandler = this.confirmBtnHandler.bind(this);
    }
    changeValueHandler(e) {
        this.setState({value: e.target.value});
}
    closePopHandler() {
        this.props.callbackCloseHanler(false);
}
    countingDown() {
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
    componentDidMount() {
        this.countingDown();
    }

    componentWillReceiveProps() {
        this.setState({codePop:this.props.stateProps})
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
             }else{
                 finishFlag = false
             }

             if(this.state.countdown <= 0){
                  if(data.loanStatus == 2 || data.loanStatus == 3){
                     this.setState({codePop:false,loanShow:true,failMsg:data.failReason})
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
    getSMSCode() {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        if (this.state.countdown <= 0) {
            this.countingDown();
            $FXH.Post(`${API_PATH}/api/loan/v1/resendverifycode.json`,{orderGid: orderGid});
        }
}
    confirmBtnHandler() {
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
        this.props.reSetState(true);
    }

    render() {
    let frequent_tip = this.state.show_warn &&
        <div className="wrong-tip">{this.state.show_text}</div>;

    let phone = $FW.Store.get('phone');

    return (
        <div>
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
                            <div className="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={this.state.otherTip ? "mask": "mask dis"}>
                <div className="tip-pop">
                    <span className="tip-1">提示</span>
                    <span className="tip-2">为方便您快速借到钱，推荐您尝试其他借款产品。</span>
                    <Nav className="to-zhangzhong" href={`/static/loan/home/index.html`}>尝试其他</Nav>
                    <img className="close-icon" src="images/close-icon.jpg" onClick={() => {this.setState({otherTip: false})}}/>
                </div>
            </div>
        </div>
    )
}
}
