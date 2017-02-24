const VerifyCode = React.createClass({
    getInitialState: function () {
        return {
            phoneNum: null,
            value: '',
            remain: 0,
            orderGid: this.props.orderGid
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({orderGid: nextProps.orderGid});
    },
    closePopHandler: function () {
        this.props.callbackCloseHanler(false);
    },
    componentDidMount: function () {
        this.tick();
    },
    changeValueHandler: function (e) {
        this.setState({value: e.target.value});
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
    componentWillUnmount() {
        clearInterval(this._timer);
    },
    getSMSCode: function () {
        if (this.state.remain <= 0) {
            this.tick();
            $FW.Post(`${API_PATH}api/repayment/v1/resendverifycode.json`, {
                token: USER.token,
                userGid: USER.gid,
                userId: USER.id,
                sourceType: SOURCE_TYPE,
                orderGid: this.state.orderGid
            }).then(() => {
            }, e => $FW.Component.Toast(e.message));
        }
    },
    confirmBtnHandler: function () {
        if (this.state.value == '') {
            $FW.Component.Toast("请输入验证码");
        } else {
            $FW.Post(`${API_PATH}api/repayment/v1/do.json`, {
                orderGid: this.state.orderGid,
                token: USER.token,
                userGid: USER.gid,
                userId: USER.id,
                sourceType: SOURCE_TYPE,
                verifyCode: this.state.value
            }).then(data => {
                return new Promise(resolve => setTimeout(() => resolve(data), 5000))
            }).then(data => {
                    this.props.callbackResultShow(true, false);
                    this.props.callbackGetRepaymentGid(data.repaymentGid);
                }, e => $FW.Component.Toast(e.message)
            );
        }
    },
    render: function () {
        return (
            <div className="mask">
                <div className="verify-popup">
                    <div className="verify-popup-wrap">
                        <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div className="verify-popup-title">短信验证</div>
                        <div className="verify-popup-tip">
                            {/*已向尾号（{$FW.Store.get('phone').slice(-4)}）发送短信验证码。*/}
                            已向{this.props.bankName}({this.props.bankNo.slice(-4)})银行预留手机号发送短信验证码。
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
});
