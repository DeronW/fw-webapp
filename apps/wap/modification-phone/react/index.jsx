//手机号验证
function checkPhone(phoneValue) {
    return /^1[34578]\d{9}$/.test(phoneValue))
}

const ModificationPhoneFrom = React.createClass({
    getInitialState() {
        return {
            showGetCode: true,
            countdown: 0,
            codeValue: '',
            next: false,
            phone: PHONE,
            phoneValue: '',
            updatePhoneNoTicket: '',
            bottomPhoneShow: false
        }
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    },
    sountdownFun(isVms) {
        var _this = this;

        this.setState({
            showGetCode: false,
            countdown: 60
        })

        this.timer = setInterval(() => {
            this.setState({ countdown: this.state.countdown - 1 });
            if (this.state.countdown == 0) {
                clearInterval(this.timer);
                this.setState({ showGetCode: true });
            }
        }, 1000)

        $FW.Ajax({
            url: `${API_PATH}/mpwap/api/v1/sendCode.shtml`,
            data: {
                type: this.state.next ? 10 : 9,
                isVms: isVms,
                destPhoneNo: this.state.next && this.state.phoneValue
            }
        }).then(data => {
            if (_this.state.next)
                _this.setState({ bottomPhoneShow: true });
        })
    },

    handlerGetCode(isVms) {
        if (this.state.next) {
            if (this.state.phoneValue != '') {
                this.sountdownFun(isVms);
            } else {
                $FW.Component.Toast("手机号不对");
            }
        } else {
            this.sountdownFun(isVms);
        }
    },
    codeChange(e) {
        this.setState({ codeValue: e.target.value });
    },
    phoneChange(e) {
        this.setState({ phoneValue: e.target.value });
    },
    handlerModificationPhone() {
        var _this = this;

        if (this.state.next) {

            if (!checkPhone(_this.state.phoneValue)) {
                $FW.Component.Toast("手机号不对");
            } else if (this.state.codeValue == '') {
                $FW.Component.Toast("验证码不对");
            } else {
                $FW.Ajax({
                    url: `${API_PATH}mpwap/api/v1/changBankPhone.shtml`,
                    data: {
                        updatePhoneNoTicket: this.state.updatePhoneNoTicket,
                        phoneNum: this.state.phoneValue,
                        validateCode: this.state.codeValue
                    }
                }).then(data => {
                    window.location.href = "/static/wap/recharge/index.html"
                })
            }

        } else {
            if (this.state.codeValue == '') {
                $FW.Component.Toast("验证码不对");
            } else {
                $FW.Ajax({
                    url: API_PATH + "mpwap/api/v1/validateOldPhone.shtml?validateCode=" + _this.state.codeValue,
                    method: "GET",
                }).then(data => {
                    _this.setState({
                        next: true,
                        codeValue: '',
                        countdown: 60,
                        showGetCode: true,
                        updatePhoneNoTicket: data.updatePhoneNoTicket
                    });
                    clearInterval(_this.timer);
                    _this.props.callbackNext(true)
                })
            }
        }
    },
    render() {
        let phoneText = this.state.bottomPhoneShow ?
            this.state.phoneValue.substring(0, 3) + "****" + this.state.phoneValue.substring(this.state.phoneValue.length - 4, this.state.phoneValue.length) : "";

        let bottomPhone = () => {
            return <div className="phone-info">已向手机{phoneText}
                发送短信验证码，若收不到请
                <span className="s" onClick={() => this.handlerGetCode("VMS")}>
                    点击这里</span>获取语音验证码
            </div>
        }

        let text = () => {
            return <div className="phone-info">
                若注册手机号无法进行验证，请
                <span className="s">联系客服</span>人工解决</div>
        }

        let next;
        if (this.state.next) {
            if (this.state.bottomPhoneShow) {
                next = bottomPhone()
            } else {
                next = <div style={{ height: "70px" }}></div>
            }
        } else {
            next = text()
        }

        return (
            <div className="phone-from">
                <div className="phone-num">
                    {
                        this.state.next ? <input className="phone-input" type="text" onChange={this.phoneChange} /> :
                            <span className="num-text">{this.state.phone}</span>
                    }

                </div>

                <div className="code-from">
                    <input className="code-input" type="text" onChange={this.codeChange} placeholder="请输入验证码"
                        value={this.state.codeValue} />
                    {
                        this.state.showGetCode ?
                            <span className="btn" onClick={() => this.handlerGetCode("SMS")}>获取验证码</span> :
                            <span className="btn c">{this.state.countdown}秒后重新获取</span>
                    }
                </div>

                {next}

                <div className="modification-phone-btn"
                    onClick={this.handlerModificationPhone}>
                    {this.state.next ? '完成' : '下一步'}
                </div>
            </div>
        )
    }
});

const ModificationPhone = React.createClass({
    getInitialState() {
        return { next: false }
    },
    getCallbackNext(v) {
        this.setState({ next: v });
    },
    render() {
        return (
            <div>
                <div className="modification-phone-nav">
                    <img src={"images/nav-" + (this.state.next ? 2 : 1) + ".jpg"} />
                </div>
                <ModificationPhoneFrom callbackNext={this.getCallbackNext} />
            </div>
        )
    }
})

const PHONE = $FW.Format.urlQuery().phone;

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"修改银行预留手机号"} sub_text={""} />, HEADER_NODE);
    ReactDOM.render(<ModificationPhone />, CONTENT_NODE)
})
