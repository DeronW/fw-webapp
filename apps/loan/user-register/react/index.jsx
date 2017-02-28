//校验手机号
function isMobilePhone(phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}
//校验数字
function verificationNum(val) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(val)
}
//只能是数字和字母
function numLetter(val) {
    var reg = /^[A-Za-z0-9]*$/;
    return reg.test(val)
}
//密码字母开头和数字
function istrue(str) {
    var reg = /^([a-z]+(?=[0-9])|[0-9]+(?=[a-z]))[a-z0-9]+$/ig;
    return reg.test(str);
}
const Register = React.createClass({
    getInitialState() {
        return {
            phoneNum: '',
            code: '',
            password: '',
            countdown: 0,
            allowCode: true,
            codeToken: '',
            codeText: '获取验证码',
            seeCode: false
        }
    },
    phoneChange: function (e) {
        let value = e.target.value;
        if (!isNaN(value) && value.length <= 11) {
            this.setState({
                phoneNum: value
            })
        }
    },
    codeTime: function () {
        this.timer = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1,
                codeText: this.state.countdown + 's'
            });
            if (this.state.countdown == 0) {
                clearInterval(this.timer);
                this.setState({
                    allowCode: true,
                    codeText: '获取验证码'
                });
            }
        }, 1000);
    },
    codeChange: function (e) {
        let value = e.target.value;
        if (!isNaN(value) && value.length <= 8) {
            this.setState({
                code: value
            })
        }
    },
    seeCodeChange: function () {
        this.setState({
            seeCode: !this.state.seeCode
        });
    },
    getCodeHandler: function () {
        if (!isMobilePhone(this.state.phoneNum)) {
            $FW.Component.Toast("手机号格式不正确");
            return false
        }
        if (this.state.allowCode) {
            this.setState({
                allowCode: false,
                countdown: 60
            });
            this.codeTime();
            $FW.Post(`${API_PATH}api/userBase/v1/sendVerifyCode.json`, {
                mobile: this.state.phoneNum,
                userOperationType: 3,
                sourceType: SOURCE_TYPE
            }).then(data => {
                this.setState({ codeToken: data.codeToken })
            }, e => $FW.Component.Alert(e.message));
        }
    },
    passwordChange: function (e) {
        let v = e.target.value;
        v.length <= 16 && numLetter(v) && this.setState({ password: v });
    },
    nextStepHandler: function () {
        let err, {phoneNum, code, password, codeToken} = this.state;
        if (!isMobilePhone(phoneNum)) err = "手机号格式不正确";
        if (code == '') err = "验证码不能为空";
        if (password == '') err = "密码不能为空";
        if (password.length < 8) err = "密码不能少于8位";
        if (password.length > 16) err = "密码不能多于16位";
        if (!istrue(password)) err = "必须是字母及数字组合密码";
        err ?
            $FW.Component.Toast(err) :
            $FW.Post(`${API_PATH}api/userBase/v1/register.json`, {
                channelCode: '',
                codeToken: codeToken,
                invitationCode: $FW.Format.urlQuery().code,
                mobile: phoneNum,
                password: password,
                verifyCode: code,
                sourceType: SOURCE_TYPE
            }).then(data => {
                window.location.href = "/static/loan/weixin-attention/index.html"
            }, (e) => $FW.Component.Alert(e.message))
    },
    render() {
        return (
            <div className="register-box">
                <div className="logo"><img src="images/logo.png" /></div>
                <div className="logo-text"><img src="images/logo-text.png" /></div>
                <div className="register-box-input">
                    <div className="phone-box input-box">
                        <input type="number" placeholder="请输入手机号进行注册登录" value={this.state.phoneNum}
                            onChange={this.phoneChange} />
                    </div>
                    <div className="code-box input-box">
                        <input type="number" placeholder="输入短信验证码" value={this.state.code} onChange={this.codeChange} />
                        <div className="get-code" onClick={this.getCodeHandler}>{this.state.codeText}</div>
                    </div>
                    <div className="password-box input-box">
                        <input type={this.state.seeCode ? "text" : "password"} placeholder="密码要求8-16位字母与数字组合"
                            value={this.state.password}
                            onChange={this.passwordChange} />
                        <div className={this.state.seeCode ? "eye on" : "eye"} onClick={this.seeCodeChange}></div>
                    </div>
                    <div className="protocol">
                        <div className="protocol-btn"></div>
                        同意
                        <a href="../protocol-borrowing/index.html" className="protocol-text">《放心花借款服务协议》</a>
                    </div>
                    <div className="next-btn" onClick={this.nextStepHandler}>立即注册</div>
                </div>
            </div>
        )
    }
});
$FW.DOMReady(() => {
    ReactDOM.render(<Register />, CONTENT_NODE)
})
