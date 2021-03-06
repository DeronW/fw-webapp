const SMSCode = React.createClass({
    getInitialState: function () {
        return { value: '', remain: 0 }
    },
    changeValueHandler: function (e) {
        this.setState({ value: e.target.value });
        this.props.update_sms_code_handler(e.target.value);
    },
    getSmsCodeHandler: function () {
        var _this = this;
        if (!this.props.validate_before_sms_handler()) return;
        if (this.state.remain <= 0) {
            this.tick();
            $FW.Ajax({
                url: `${API_PATH}/mall/api/order/v1/SendPhoneVerifyPay.json`,
                enable_loading: true,
                method: 'post',
                success: function (data) {
                    if (data.validateCode)
                        $FW.Component.Alert('原来你在测试, 那就直接告诉你验证码\n ' + data.validateCode);
                },
                fail: function () {
                    _this.setState({ remain: 0 });
                }
            })
        }
    },
    countingDown: function () {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({ remain: this.state.remain - 1 });
    },
    tick: function () {
        this.setState({ remain: 60 });
        this._timer = setInterval(this.countingDown, 1000);
    },
    render: function () {
        return (
            <div className="test">
                <div className="test-cnt">
                    <div className="test-input">
                        <input type="text" value={this.state.value} onChange={this.changeValueHandler}
                            placeholder="请输入验证码" />
                    </div>
                    <div className={this.state.remain > 0 ? "btn-countdown" : "btn-test-blue"}
                        onClick={this.getSmsCodeHandler}>
                        {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}
                    </div>
                </div>
            </div>
        )
    }
});
