const ConfirmPop = React.createClass({
    getInitialState: function () {
        return {
            show: false,
            value: '',
            remain: 0,
            show_warn: false,
            show_text: '',
            loading: false
        }
    },
    show: function () {
        this.setState({show: true});
    },
    hide: function () {
        this.setState({
            show: false,
            value: '',
            remain: 0,
            show_warn: false,
            show_text: ''
        })
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
    getSmsCodeHandler: function () {
        var _this = this;
        if (this.state.remain <= 0) {
            this.tick();
            $FW.Ajax({
                url: `${API_PATH}/mall/api/order/v1/SendPhoneVerifyPay.json`,
                fail: function (code, message, response) {
                    _this.setState({
                        show_warn: true,
                        show_text: message,
                        remain: 0
                    });
                    if (code == 40101) {
                        $FW.Utils.loginMall();
                    }
                    return true;
                }
            })
        }
    },
    submitHandler: function () {
        var _this = this;
        var form_data = rechargePanel.getFormData();
        if (this.state.loading)
            return;
        this.setState({loading: true})

        var sourceType;

        if ($FW.Browser.inApp()) {
            if ($FW.Browser.inAndroid()) {
                sourceType = 4
            }
            else {
                sourceType = 3
            }
        }
        else {
            sourceType = 2
        }

        $FW.Ajax({
            url: API_PATH + '/mall/api/v1/getToken.json',
            success: function (data) {
                var token = data.token;
                $FW.Ajax({
                    url: API_PATH + '/mall/api/v1/phone/recharge-order.json',
                    enable_loading: true,
                    method: 'get',
                    data: {
                        phone: form_data.phone,
                        sms_code: _this.state.value,
                        bizNo: form_data.bizNo,
                        sourceType: sourceType,
                        tokenStr: token
                    },
                    complete: function () {
                        _this.setState({loading: true});
                    },
                    success: function () {
                        _this.setState({
                            show: false,
                            show_warn: false,
                            remain: 0,
                            value: '',
                            loading: false
                        });
                        window.rechargePanel.costPayScore();
                        $FW.Component.Alert("充值成功！");
                    },
                    fail: function (code, message, response) {
                        _this.setState({
                            show_warn: true,
                            show_text: message,
                            loading: false
                        });
                        return true;
                    }
                })
            }
        });
    },

    render: function () {
        if (!this.state.show) return null;

        let frequent_tip;
        if (this.state.show_warn)
            frequent_tip = <div className="wrong-tip">{this.state.show_text}</div>;

        return (
            <div className="pop-wrap">
                <div className="confirm-pop">
                    <div className="pop-header">输入验证码<span className="pop-close" onClick={this.hide}></span>
                    </div>
                    <div className="pop-content">
                        <div className="confirm-sms-code">
                            <input type="text" placeholder="请输入验证码" className="sms-input" value={this.state.value}
                                   onChange={this.changeValueHandler}/>
                            <span className={this.state.remain > 0 ? "btn-countdown" : "sms-btn"}
                                  onClick={this.getSmsCodeHandler}>
                                {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                        </div>
                        {frequent_tip}
                        <div className={this.state.loading ? "pop-confirm-btn gray" : "pop-confirm-btn"}
                             onClick={this.submitHandler}>确认
                        </div>
                        <div className="pop-tip"></div>
                    </div>
                </div>
            </div>
        );
    }
});
