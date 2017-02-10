function gotoHandler(link) {
    location.href = encodeURI(link);
}

const Register = React.createClass({
    getInitialState() {
        return {
            pwdVal: '',
            plainCode: false
        }
    },
    changePwd(e) {
        this.setState({
            pwdVal: e.target.value
        });
    },
    handlePlainCode() {
        this.setState({
            plainCode: !this.state.plainCode
        });
    },
    loadingBtn() {
        let _this = this;
        if (this.state.pwdVal == '') {
            $FW.Component.Toast("请输入登录密码");
        } else {
            $FW.Ajax({
                url: API_PATH + "/api/userBase/v1/login.json",
                method: "POST",

                data: {
                    mobile: location.search.split("=")[1],
                    password: _this.state.pwdVal,
                    sourceType: 3
                },
                success: function (data) {
                    localStorage.userGid = data.userLogin.userGid;
                    localStorage.userId = data.userLogin.userId;
                    localStorage.userToken = data.userLogin.userToken;
                    localStorage.userStatus = data.userLogin.userStatus;

                    location.href = `${location.protocol}\/\/${location.host}/static/loan/home/index.html`;
                },
                fail: function (code, mes) {

                }
            })
        }

    },
    render() {
        return (
            <div className="login-cnt">
                <div className="top">
                    <span className="icon" onClick={() => gotoHandler(`/static/loan/user-entry/index.html`)}></span>
                    <span className="title">登录</span>
                </div>

                <div className="logo">
                    <img src="http://placehold.it/214x214" />
                </div>

                <div className="get-name-phone">
                    <span className="phone-text">{location.search.split("=")[1]}</span>欢迎登录现金贷!
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
