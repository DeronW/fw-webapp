function verificationNum(val) {
    var reg = /^[A-Za-z0-9]*$/;
    return reg.test(val)
}

//字母和数字
function istrue(str) {
    var reg = /^([a-z]+(?=[0-9])|[0-9]+(?=[a-z]))[a-z0-9]+$/ig;
    return reg.test(str);
}

function space(val) {
    return val.replace(/ /g, '');
}

const Register = React.createClass({
    getInitialState() {
        let query = $FW.Format.urlQuery();
        let codeToken = query.codeToken;
        return {
            code: '',
            codeBoolean: false,
            password: '',
            countdown: 0,
            plainCode: false,
            codeToken: codeToken
        }
    },
    componentDidMount() {
        this.countingDown();
    },
    changeCode(e) {
        let v = e.target.value;
        v.length <= 6 && this.setState({ code: v });
    },
    changePsw(e) {
        let v = e.target.value;
        v.length <= 16 && verificationNum(v) && this.setState({ password: v });
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
    handleGetCode() {
        $FW.Post(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
            mobile: PHONE,
            userOperationType: 2,
            sourceType: SOURCE_TYPE
        }).then(
            data => this.setState({ codeToken: data.codeToken }),
            e => $FW.Component.Toast(e.message));
        this.countingDown();
    },
    handlePlainCode() {
        this.setState({ plainCode: !this.state.plainCode });
    },
    handleRegisterBtn() {
        let err, {code, password, codeToken} = this.state;

        if (code == '') err = "验证码不能为空";
        if (password == '') err = "密码不能为空";
        if (password.length < 8) err = "密码不能少于8位";
        if (password.length > 16) err = "密码不能多于16位";
        if (!istrue(password)) err = "请输入8-16位字母和数字组合";

        err ?
            $FW.Component.Toast(err) :
            $FW.Post(`${API_PATH}/api/userBase/v1/resetPass.json`, {
                codeToken: codeToken,
                mobile: PHONE,
                password: password,
                verifyCode: code,
                sourceType: SOURCE_TYPE
            }).then(data => {
                let dict = data.userPasswordOption;
                $FW.Store.setUserDict({
                    token: dict.userToken,
                    id: dict.userId,
                    gid: dict.userGid,
                    status: dict.userStatus
                })
                window.location.href = "/"
            }, e => $FW.Component.Toast(e.message))
    },
    render() {

        let btnSMSCode = this.state.codeBoolean ?
            <div className="get-code-btn c">{this.state.countdown}s</div> :
            <div className="get-code-btn" onClick={this.handleGetCode}>获取验证码</div>;

        return (
            <div className="register-cnt">
                <div className="prompt-text">
                    已发送短信验证码到尾号<span>  {PHONE.substr(7)}  </span>手机上
                </div>

                <div className="ui-froms">
                    <div className="list code-list">
                        <span className="icon"></span>
                        <div className="input">
                            <input type="number" onChange={this.changeCode}
                                value={this.state.code} placeholder="输入手机验证码" />
                        </div>
                        {btnSMSCode}
                    </div>
                    <div className="list pwd-list">
                        <span className="icon"></span>
                        <div className="input">
                            <input
                                type={this.state.plainCode ? "text" : "password"}
                                value={this.state.password}
                                onChange={this.changePsw}
                                onBlur={this.blurPsw}
                                placeholder="设置8-16位的字母及数字组合密码"
                            />
                        </div>

                        <span className="icon-pwd" onClick={this.handlePlainCode}></span>
                    </div>
                </div>
                <div className="login-tip">初次使用时需设置登录密码</div>
                <div className="determine-btn">
                    <div className="ui-btn" onClick={this.handleRegisterBtn}>确定</div>
                </div>
            </div>
        )
    }
});

const PHONE = $FW.Format.urlQuery().phone || '';

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"设置新密码"} />, HEADER_NODE);
    ReactDOM.render(<Register />, CONTENT_NODE)
})
