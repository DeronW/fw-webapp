const VerifyCode = React.createClass({
    getInitialState: function () {
        return {
            phoneNum: null,
            countdown: 0,
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
    countingDown() {
        this.setState({
            countdown: 60
        });
        this.timer = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1
            });
            if (this.state.countdown == 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    },
    componentDidMount: function () {
        this.countingDown();
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    },
    getSMSCode: function () {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        if (this.state.countdown <= 0) {
            this.countingDown();
            $FXH.Post(`${API_PATH}/api/loan/v1/resendverifycode.json`,{orderGid: orderGid});
        }
    },
    confirmBtnHandler: function () {
        let query = $FW.Format.urlQuery();
        let orderGid = query.orderGid;
        if (this.state.value == '')
            return $FW.Component.Toast("请输入短信验证码");

        $FXH.Post(`${API_PATH}/api/loan/v1/do.json`, {
            orderGid: orderGid,
            verifyCode: this.state.value
        }).then(() => {
            if($FW.Browser.inApp()){
                gotoHandler(`/static/loan/apply-result/index.html?orderGid=${orderGid}`);
            }else{
                this.props.callbackCloseHanler(false);
                this.props.callbackResultShow(true);
                this.props.callbackGetLoanResultCheck(true);
            }
        }, e => $FW.Component.Toast(e.message));
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
                            已向{this.props.bankShortName}( {this.props.cardNo.slice(-4)} )银行预留手机号发送短信验证码。
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
        )
    }
});
