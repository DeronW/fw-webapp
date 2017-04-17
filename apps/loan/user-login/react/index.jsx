function gotoHandler(link) {
    location.href = encodeURI(link);
}
function istrue(str) {
    var reg = /^([a-z]+(?=[0-9])|[0-9]+(?=[a-z]))[a-z0-9]+$/ig;

    return reg.test(str);
}
function phoneMosaic(val) {
    let frontNum = val.slice(0, 3);
    let lastNum = val.slice(val.length - 4, val.length);

    if (val == undefined) {
        return '';
    } else {
        return `${frontNum}****${lastNum}`
    }

}

var ConcertUtilBrowser = {
    versions: (function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return {
            weixin: ua.match(/MicroMessenger/i) == 'micromessenger'
        };
    })()
};

const Register = React.createClass({
    getInitialState() {
        return {
            password: '',
            plainCode: false
        }
    },
    changePasswordHandler(e) {
        let v = e.target.value;
        v.length < 17 && this.setState({ password: v });
    },
    handlePlainCode() {
        this.setState({ plainCode: !this.state.plainCode });
    },
    loadingBtn() {
        let err, {password} = this.state;
        if (password == '') err = "请输入登录密码";
        if (password.length < 8) err = "密码不能少于8位";
        if (password.length > 16) err = "密码不能多于16位";
        //if (!istrue(password)) err = "必须是字母及数字组合密码";

        err ?
            $FW.Component.Toast(err) :
            $FW.Post(`${API_PATH}/api/userBase/v1/login.json`, {
                mobile: PHONE,
                password: password,
                sourceType: SOURCE_TYPE
            }).then(data => {
                let dict = data.userLogin;

                $FW.Store.setUserDict({
                    token: dict.userToken,
                    id: dict.userId,
                    gid: dict.userGid,
                    status: dict.userStatus,
                    invitCode:dict.invitCode,
                    uid:dict.uid
                })
                //location.href = `/static/loan/home/index.html`;
            }, e => $FW.Component.Toast(e.message));
    },
    forgotPasswordHandler() {
        $FW.Post(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
            mobile: PHONE,
            userOperationType: 2,
            sourceType: SOURCE_TYPE
        }).then(data => {
            location.href = `/static/loan/user-reset-password/index.html?phone=${PHONE}&codeToken=${data.codeToken}`;
        }, err => $FW.Component.Toast(err.message));
    },
    keyUpHandler(e) {
        if (e.keyCode === 13) this.loadingBtn()
    },
    render() {

        let {plainCode} = this.state;

        return (
            <div className="login-cnt">
                {
                    ConcertUtilBrowser.versions.weixin ? <div className="top"></div> :
                        <div className="top">
                            <a className="icon" href={`/static/loan/user-entry/index.html`}></a>
                            <span className="title">登录</span>
                        </div>
                }
                <div className="logo"> <img src="images/logo.png" /> </div>
                <div className="get-name-phone">
                    亲爱的<span className="phone-text">  {phoneMosaic(PHONE)}  </span>欢迎登录
				</div>

                <div className="from-cnt">
                    <div className="from">
                        <div className="icon"></div>
                        <div className="input">
                            <input type={plainCode ? "text" : "password"} value={this.state.password}
                                placeholder="请输入登录密码" onKeyUp={this.keyUpHandler} onChange={this.changePasswordHandler} />
                        </div>

                        <div className={this.state.plainCode ? "pwd-icon1" : "pwd-icon"} onClick={this.handlePlainCode}>
                        </div>
                    </div>
                    <div className="form-border"></div>
                </div>
                <div className="register-login-btn">
                    <div className="ui-btn" onClick={this.loadingBtn}>确定</div>
                </div>
                <div className="forget-pwd-link">
                    <a onClick={this.forgotPasswordHandler}> 忘记密码?</a>
                </div>
            </div>
        )
    }
});

const PHONE = $FW.Format.urlQuery().phone || '';

$FW.DOMReady(() => {
    ReactDOM.render(<Register />, CONTENT_NODE);
})
