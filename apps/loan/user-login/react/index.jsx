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
        this.setState({
            password: e.target.value
        });
    },
    handlePlainCode() {
        this.setState({
            plainCode: !this.state.plainCode
        });
    },
    loadingBtn() {
        let _this = this;
        if (this.state.password == '') {
            $FW.Component.Toast("请输入登录密码");
        } else if (this.state.password.length < 8) {
            $FW.Component.Toast("密码不能少于8位");
        } else if (this.state.password.length > 16) {
            $FW.Component.Toast("密码不能多于16位");
        } else if (!istrue(this.state.password)) {
            $FW.Component.Toast("必须是字母及数字组合密码");
        }else {
            $FW.Ajax({
                url: API_PATH + "/api/userBase/v1/login.json",
                method: "POST",

                data: {
                    mobile: location.search.split("=")[1],
                    password: _this.state.password,
                    sourceType: 3
                },
                success: function (data) {
                    localStorage.userGid = data.userLogin.userGid;
                    localStorage.userId = data.userLogin.userId;
                    localStorage.userToken = data.userLogin.userToken;
                    localStorage.userStatus = data.userLogin.userStatus;

                    location.href = `/static/loan/home/index.html`;
                },
                fail: function (error) {
                    $FW.Component.Toast(error)
                }
            })
        }

    },
    render() {
        return (
            <div className="login-cnt">
                <div className="top">
                    <a className="icon" href="static/loan/user-entry/index.html"></a>
                    <span className="title">登录</span>
                </div>

                <div className="logo">
                    <img src="images/logo.png" />
                </div>

                <div className="get-name-phone">
                    <span className="phone-text">{location.search.split("=")[1]}</span>欢迎登录放心花!
				</div>

                <div className="from-cnt">
                    <div className="from">
                        <div className="icon"></div>

                        <div className="input">
                            <input
                                type={this.state.plainCode ? "text" : "password"}
                                placeholder="请输入登录密码"
                                onChange={this.changePwd}
                            />
                        </div>

                        <div className="pwd-icon" onClick={() => this.handlePlainCode()}>
                        </div>
                    </div>
                </div>


                <div className="register-login-btn">
                    <div className="ui-btn" onClick={this.loadingBtn}>下一步</div>
                </div>

                <div className="forget-pwd-link">
                    <a href={"/static/loan/user-reset-password/index.html?=phone" + location.search.split("=")[1]}>忘记密码?</a>
                </div>

            </div>
        )
    }
});


$FW.DOMReady(() => {
    ReactDOM.render(<Register />, CONTENT_NODE);
})
