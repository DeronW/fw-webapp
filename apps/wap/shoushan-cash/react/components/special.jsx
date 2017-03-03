
const Special = React.createClass({
    getInitialState: function () {
        this._timing = false;

        return {
            seconds: null,
            forbid: true,
            codeType: 1,
            isVmsType: "SMS"
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (!this._timing && +new Date() - nextProps.callbackVoice < 10) {
            this.setState(
                {
                    codeType: 3,
                    isVmsType: "VMS"
                },
                this.handlerTestClick
            );
        } else {
            if (+new Date() - nextProps.callbackVoice < 10) {
                if (this.state.seconds > 0 && this.state.seconds !== 60) {
                    $FW.Component.Toast(this.state.seconds + "s后才能获取");
                }
            }
        }

    },
    componentWillUnmount: function () {
        clearInterval(this.timer);
    },
    handlerTestClick: function () {
        var _this = this;

        // 首山的接口不能添加 API_PATH 参数, 它的域名是独立的: assets-api.9888.cn
        $FW.Ajax({
            url: "/api/sspay/withdraw/v1/validate.shtml?reflectAmount=" + this.props.propsMoneyValue,
            success: function (data) {
                _this.props.callbackPromptShow(true);

                _this.setState({
                    forbid: false,
                    seconds: 60
                });

                _this._timing = true;
                _this.timer = setInterval(() => {
                    _this.setState(
                        {
                            seconds: _this.state.seconds - 1
                        }
                    );

                    if (_this.state.seconds == 0) {
                        clearInterval(_this.timer)

                        _this._timing = false;
                        _this.setState({
                            seconds: null,
                            forbid: true
                        });
                    }
                }, 1000);


                // 首山的接口不能添加 API_PATH 参数, 它的域名是独立的: assets-api.9888.cn
                $FW.Ajax({
                    url: "/api/sspay/withdraw/v1/sendCode.shtml?type=" + _this.state.codeType + "&destPhoneNo=" + _this.props.propsPhone + "&isVms=" + _this.state.isVmsType,
                    success: function (data) {
                    },
                    fail: function () {
                        _this.setState(
                            {
                                seconds: null,
                                forbid: true
                            }
                        );

                        clearInterval(_this.timer);
                        _this.timer = null;
                    }
                })

            },
            fail: function () {

            }
        })


    },
    inputCodeOnChange: function (e) {
        this.props.callbackCode(e.target.value);
    },

    render: function () {
        return (
            <div>
                <div className="qing clearfix">

                    <div className="shyan">
                        <div className="mzysq" value={this.props.verify_code} onCodeChange={this.changeHandler}>
                            <input className="odec" type="text" onChange={this.inputCodeOnChange}
                                placeholder="请输入手机验证码" />
                        </div>
                    </div>
                    <div className={this.state.forbid ? "miaoh" : "miaoh c"}>
                        {
                            this.state.seconds !== null ?
                                this.state.seconds + "秒后重新获取" :
                                <span className="zmy" onClick={this.handlerTestClick}><span
                                    className="text">获取验证码</span></span>
                        }
                    </div>
                </div>
            </div>
        )
    }
})
