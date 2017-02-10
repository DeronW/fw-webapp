function verificationNum(val) {
    var reg = /^[A-Za-z0-9]*$/;
    return reg.test(val)
}

//字母和数字
function istrue(str) {
    var reg = /^([a-z]+(?=[0-9])|[0-9]+(?=[a-z]))[a-z0-9]+$/ig;

    return reg.test(str);
}

const Register = React.createClass({
    getInitialState() {
        return {
            code: '',
            codeBoolean: false,
            pswVal: '',
            countdown: 0,
            plainCode: false,
            codeToken: ''
        }
    },
    changeCode(e) {
        this.setState({
            code: e.target.value
        });
    },
    changePsw(e) {
        if (e.target.value.length <= 16) {
            if (verificationNum(e.target.value)) {
                this.setState({
                    pswVal: e.target.value
                });
            }
        }
    },
    blurPsw() {

    },
    handleGetCode() {
        let _this = this;

        this.setState({
            codeBoolean: true,
            countdown: 60
        });

        $FW.Ajax({
            url: API_PATH + "api/userBase/v1/sendVerifyCode.json",
            method: "POST",
            data: {
                mobile: localStorage.phone,
                userOperationType: 2,
                sourceType: 3
            },
            success: function (data) {
                _this.setState({
                    codeToken: data.codeToken
                });
            }
        })

        this.timer = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1
            });


            if (this.state.countdown == 0) {
                clearInterval(this.timer);
                this.setState({
                    codeBoolean: false
                });
            }
        }, 1000);
    },
    handlePlainCode() {
        this.setState({
            plainCode: !this.state.plainCode
        });
    },
    handleRegisterBtn() {
        let _this = this;

        if (this.state.code == '') {
            $FW.Component.Toast("验证码不能为空");
        } else if (this.state.pswVal == '') {
            $FW.Component.Toast("密码不能为空");
        } else if (this.state.pswVal.length < 8) {
            $FW.Component.Toast("密码不能少于8位");
        } else if (this.state.pswVal.length > 16) {
            $FW.Component.Toast("密码不能多于16位");
        } else if (!istrue(this.state.pswVal)) {
            $FW.Component.Toast("必须是字母及数字组合密码");
        } else {
            $FW.Ajax({
                url: API_PATH + "api/userBase/v1/resetPass.json",
                method: "POST",

                data: {
                    codeToken: _this.state.codeToken,
                    mobile: localStorage.phone,
                    password: _this.state.pswVal,
                    verifyCode: _this.state.code,
                    sourceType: 3
                },
                success: function (data) {
                    localStorage.userGid = data.userPasswordOption.userGid;
                    localStorage.userId = data.userPasswordOption.userId;
                    localStorage.userToken = data.userPasswordOption.userToken;

                    window.location.href = "/static/loan/apply-loan/index.html"
                }
            })
        }

    },
    render() {
        return (
            <div className="register-cnt">
                <div className="prompt-text">
                    已发送短信验证码到号码<span>{location.search.split('phone=')[1]}</span>
                </div>

                <div className="ui-froms">
                    <div className="list code-list">
                        <span className="icon"></span>
                        <div className="input">
                            <input type="text" onChange={this.changeCode} placeholder="输入手机验证码" />
                        </div>

                        {
                            this.state.codeBoolean ?
                                <div className="get-code-btn c">{this.state.countdown}倒计时</div> :
                                <div className="get-code-btn" onClick={() => this.handleGetCode()}>获取验证码</div>
                        }

                    </div>
                    <div className="list pwd-list">
                        <span className="icon"></span>
                        <div className="input">
                            <input
                                type={this.state.plainCode ? "text" : "password"}
                                value={this.state.pswVal}
                                onChange={this.changePsw}
                                onBlur={this.blurPsw}
                                placeholder="设置8-16位的字母及数字组合密码"
                            />
                        </div>

                        <span className="icon-pwd" onClick={this.handlePlainCode}></span>
                    </div>
                </div>

                <div className="determine-btn">
                    <div className="ui-btn" onClick={this.handleRegisterBtn}>确定</div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"设置新密码"} />, HEADER_NODE);
    ReactDOM.render(<Register />, CONTENT_NODE)
})
