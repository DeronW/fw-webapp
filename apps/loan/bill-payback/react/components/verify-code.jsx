class VerifyCode extends React.Component{
    constructor(props){
        super(props)
        this.state={
            phoneNum: null,
            value: '',
            remain: 0,
            orderGid: this.props.orderGid
        }
        this.closePopHandler = this.closePopHandler.bind(this);
        this.changeValueHandler = this.changeValueHandler.bind(this);
        this.countingDown = this.countingDown.bind(this);
        this.tick = this.tick.bind(this);
        this.getSMSCode = this.getSMSCode.bind(this);
        this.confirmBtnHandler = this.confirmBtnHandler.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({orderGid: nextProps.orderGid});
    }
    closePopHandler() {
    this.props.callbackCloseHanler(false);
}
    componentDidMount() {
    this.tick();
}
    changeValueHandler(e) {
    this.setState({value: e.target.value});
}
    countingDown() {
    if (this.state.remain <= 1) window.clearInterval(this._timer);
    this.setState({remain: this.state.remain - 1});
}
    tick() {
    this.setState({remain: 60});
    window.clearInterval(this._timer);
    this._timer = setInterval(this.countingDown, 1000);
}
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    getSMSCode() {
    if (this.state.remain <= 0) {
        this.tick();
        $FXH.Post(`${API_PATH}/api/repayment/v1/resendverifycode.json`, {
            orderGid: this.state.orderGid
        }).then(() => {
        }, e => $FW.Component.Toast(e.message));
    }
}
    confirmBtnHandler() {
    if (this.state.value == '') {
        $FW.Component.Toast("请输入验证码");
    } else {
        $FXH.Post(`${API_PATH}/api/repayment/v1/do.json`, {
            orderGid: this.state.orderGid,
            verifyCode: this.state.value
        }).then(data => {
            $FW.Component.showAjaxLoading()
            return new Promise(resolve => setTimeout(() => {
                $FW.Component.hideAjaxLoading()
                resolve(data)}, 8000))
        }).then(data => {
                this.props.callbackResultShow(true, false);
                this.props.callbackGetRepaymentGid(data.repaymentGid);
            }, e => $FW.Component.Toast(e.message)
        );
    }
}
    render() {
    return (
        <div className="mask">
            <div className="verify-popup">
                <div className="verify-popup-wrap">
                    <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                    <div className="verify-popup-title">短信验证</div>
                    <div className="verify-popup-tip">
                        {/* 已向手机号(尾号{$FW.Store.get('phone').slice(-4)})发送短信验证码 */}
                        已向{this.props.bankName}(尾号{this.props.bankNo.slice(-4)})预留的手机号发送短信验证码
                    </div>
                    <div className="verify-input">
                        <input className="sms-input" type="number" name="number" value={this.state.value}
                               placeholder="输入验证码" onChange={this.changeValueHandler}/>
                        <span className="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                    </div>
                    <div className="btn-list">
                        <div className="cancel-btn" onClick={this.closePopHandler}>取消</div>
                        <div className="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
