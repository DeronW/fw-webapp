function verificationNum(val) {
    var reg = /^[A-Za-z0-9]*$/;
    return reg.test(val)
}

//字母和数字
function istrue(str) {
    var reg = /^([a-z]+(?=[0-9])|[0-9]+(?=[a-z]))[a-z0-9]+$/ig;

    return reg.test(str);
}

const SetPassword = React.createClass({
    getInitialState() {
        let query = $FW.Format.urlQuery();
        let codeToken = query.codeToken;
        return {
            code: '',
            codeBoolean: false,
            password: '',
            countdown: 0,
            plainCode: false,
            codeToken: codeToken,
            checked: false
        }
    },
    changeCode(e) {
        this.setState({ code: e.target.value });
    },
    changePasswordHandler(e) {
        let v = e.target.value;
        v.length <= 16 && verificationNum(v) && this.setState({ password: v });
    },
    componentDidMount() {
        this.countingDown();
    },
    handleGetCode() {
        $FW.Post(`${API_PATH}api/userBase/v1/sendVerifyCode.json`, {
            mobile: PHONE,
            userOperationType: 3,
            sourceType: SOURCE_TYPE
        }).then(data => this.setState({ codeToken: data.codeToken }))

        this.countingDown();
    },
    countingDown() {
        this.setState({
            codeBoolean: true,
            countdown: 60
        });
        this.timer = setInterval(() => {
            this.setState({ countdown: this.state.countdown - 1 });
            if (this.state.countdown == 0) {
                clearInterval(this.timer);
                this.setState({ codeBoolean: false });
            }
        }, 1000);
    },
    handlePlainCode() {
        this.setState({ plainCode: !this.state.plainCode });
    },
    handleRegisterBtn() {
        let err, {password, code, checked, codeToken} = this.state;

        if (code == '') err = "验证码不能为空";
        if (password == '') err = "密码不能为空";
        if (password.length < 8) err = "密码不能少于8位";
        if (password.length > 16) err = "密码不能多于16位";
        if (!istrue(password)) err = "必须是字母及数字组合密码";
        if (!checked) err = "请同意放心花注册协议";
        if (codeToken == '') err = "Token值不完整，无法注册";

        err ? $FW.Component.Toast(err) :
            $FW.Post(`${API_PATH}api/userBase/v1/register.json`, {
                mobile: PHONE,
                codeToken: this.state.codeToken,
                password: password,
                verifyCode: code,
                sourceType: SOURCE_TYPE
            }).then(data => {
                let dict = data.userLogin;
                $FW.Store.setUserDict({
                    token: dict.userToken,
                    id: dict.userId,
                    gid: dict.userGid
                })

                location.href = `/static/loan/home/index.html`;
            }, e => $FW.Component.Toast(e.message))
    },
    checkHandler() {
        this.setState({ checked: !this.state.checked });
    },
    render() {
        let {code} = this.state;

        let btnSMSCode =
            this.state.codeBoolean ?
                <div className="get-code-btn c">{this.state.countdown}s</div> :
                <div className="get-code-btn" onClick={this.handleGetCode}>获取验证码</div>;

        return (
            <div className="register-cnt">
                <div className="prompt-text">
                    已发送短信验证码到尾号为<span>{PHONE.slice(7)}</span>的手机
                </div>

                <div className="ui-froms">
                    <div className="list code-list">
                        <span className="icon"></span>
                        <div className="input">
                            <input type="text" onChange={this.changeCode}
                                placeholder="输入手机验证码" />
                        </div>
                        {btnSMSCode}
                    </div>
                    <div className="list pwd-list">
                        <span className="icon"></span>
                        <div className="input">
                            <input
                                type={this.state.plainCode ? "text" : "password"}
                                value={this.state.password}
                                onChange={this.changePasswordHandler}
                                onBlur={this.blurPsw}
                                placeholder="设置8-16位的字母及数字组合密码"
                            />
                        </div>

                        <span className="icon-pwd" onClick={this.handlePlainCode}></span>
                    </div>
                </div>
                <div className="agreement-issue">
                    <div className={this.state.checked ? "checked-box" : "unchecked-box"}
                        onClick={this.checkHandler}></div>
                    <div className="check-item">同意
                        <a href="/static/loan/protocol-register/index.html">
                            《放心花注册协议》</a></div>
                </div>
                <div className="determine-btn">
                    <div className="ui-btn" onClick={this.handleRegisterBtn}>确定</div>
                </div>
            </div>
        )
    }
});

const PHONE = $FW.Format.urlQuery().phone;

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"设置密码"} />, HEADER_NODE);
    ReactDOM.render(<SetPassword />, CONTENT_NODE)
})
