function gotoHandler(link) {
    location.href = encodeURI(link);
}
function istrue(str) {
    var reg = /^([a-z]+(?=[0-9])|[0-9]+(?=[a-z]))[a-z0-9]+$/ig;

    return reg.test(str);
}

const Register = React.createClass({
    getInitialState() {
        return {
            password: '',
            plainCode: false
        }
    },
    changePwd(e) {
        this.setState({ password: e.target.value });
    },
    handlePlainCode() {
        this.setState({ plainCode: !this.state.plainCode });
    },
    loadingBtn() {
        let err, {password} = this.state;
        if (password == '') err = "请输入登录密码";
        if (password.length < 8) err = "密码不能少于8位";
        if (password.length > 16) err = "密码不能多于16位";
        if (!istrue(password)) err = "必须是字母及数字组合密码";

        err ?
            $FW.Component.Toast(err) :
            $FW.Post(`${API_PATH}/api/userBase/v1/login.json`, {
                mobile: PHONE,
                password: password,
                sourceType: 3
            }).then(data => {
                localStorage.userGid = data.userLogin.userGid;
                localStorage.userId = data.userLogin.userId;
                localStorage.userToken = data.userLogin.userToken;
                localStorage.userStatus = data.userLogin.userStatus;

                location.href = `/static/loan/home/index.html`;
            }, e => $FW.Component.Toast(e.message));
    },
    render() {

        let {plainCode} = this.state;

        return (
            <div className="login-cnt">
                <div className="top">
                    <a className="icon" href={`/static/loan/user-entry/index.html`}></a>
                    <span className="title">登录</span>
                </div>
                <div className="logo"> <img src="images/logo.png" /> </div>
                <div className="get-name-phone">
                    <span className="phone-text">{PHONE}</span>欢迎登录放心花!
				</div>

                <div className="from-cnt">
                    <div className="from">
                        <div className="icon"></div>
                        <div className="input">
                            <input type={plainCode ? "text" : "password"}
                                placeholder="请输入登录密码" onChange={this.changePwd} />
                        </div>

                        <div className="pwd-icon" onClick={this.handlePlainCode}>
                        </div>
                    </div>
                </div>
                <div className="register-login-btn">
                    <div className="ui-btn" onClick={this.loadingBtn}>下一步</div>
                </div>
                <div className="forget-pwd-link">
                    <a href={`/static/loan/user-reset-password/index.html?phone=${PHONE}`}>
                        忘记密码?</a>
                </div>
            </div>
        )
    }
});

const PHONE = $FW.Format.urlQuery().phone;

$FW.DOMReady(() => {
    ReactDOM.render(<Register />, CONTENT_NODE);
})
