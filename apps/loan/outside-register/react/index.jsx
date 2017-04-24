// components

class PhoneNumInput extends React.Component {
    constructor() {
        super();
        this.state = {
            enableClear: false
        };
    }

    render() {
        return (
            <div className="input-wrap phone">
                <div className="input-type-icon">
                    <img src="images/phone.png" />
                </div>
                <input type="tel" placeholder="请输入手机号" maxLength="11" value={this.props.value} onChange={(e) => {
                    if (!/[0-9]/.test(e.target.value[e.target.value.length - 1]) && e.target.value.length > 0) {
                        return;
                    }
                    this.setState({
                        enableClear: e.target.value
                            ? true
                            : false
                    });
                    this.props.handleChange(e, 'phoneNum');
                }} onFocus={(e) => {
                    this.setState({
                        enableClear: e.target.value
                            ? true
                            : false
                    });
                }} onBlur={() => {
                    setTimeout(() => {
                        this.setState({ enableClear: false });
                    }, 10);
                }} /> {/* reason for setTimeout:
            clicking on the clear button triggers `blur` event
            for input element first, if enableClear is set to
            false instantly, there would be no clear button,
            and no `click` event for it will be triggered! */}
                {this.state.enableClear && <div className="clear-btn" onClick={() => {
                    this.props.handleClear('phoneNum');
                }}>
                    <img src="images/clear.png" alt="clear button"></img>
                </div>
                }
            </div>
        )
    }
}

class VerificationCodeInput extends React.Component {
    constructor() {
        super();
        this.state = {
            enableClear: false
        };
    }

    render() {
        return (
            <div className="input-wrap veri-code">
                <div className="input-type-icon">
                    <img src="images/veri-code.png" />
                </div>
                <input type="tel" placeholder="请输入验证码" maxLength="8" value={this.props.value} onChange={(e) => {
                    if (!/[0-9]/.test(e.target.value[e.target.value.length - 1]) && e.target.value.length > 0) {
                        return;
                    }
                    this.setState({
                        enableClear: e.target.value
                            ? true
                            : false
                    });
                    this.props.handleChange(e, 'verificationCode');
                }} onFocus={(e) => {
                    this.setState({
                        enableClear: e.target.value
                            ? true
                            : false
                    });
                }} onBlur={() => {
                    setTimeout(() => {
                        this.setState({ enableClear: false });
                    }, 10);
                }} />
                <div className="veri-code-info">
                    {this.state.enableClear && <div className="clear-btn" onClick={() => {
                        this.props.handleClear('verificationCode');
                    }}>
                        <img src="images/clear.png" alt="clear button"></img>
                    </div>
                    }
                    <div onClick={this.props.handleClick}>
                        {this.props.verificationCodeInfo}
                    </div>
                </div>
            </div>
        )
    }
}

class PasswordInput extends React.Component {
    constructor() {
        super();
        this.state = {
            enableClear: false
        };
    }

    render() {
        return (
            <div className="input-wrap">
                <div className="input-type-icon">
                    <img src="images/password.png" />
                </div>
                <input type={this.props.type} placeholder="请输入密码，8-16位数字字母组合" maxLength="16" value={this.props.value} onChange={(e) => {
                    this.setState({
                        enableClear: e.target.value
                            ? true
                            : false
                    });
                    this.props.handleChange(e, 'password');
                }} onFocus={(e) => {
                    this.setState({
                        enableClear: e.target.value
                            ? true
                            : false
                    });
                }} onBlur={() => {
                    setTimeout(() => {
                        this.setState({ enableClear: false });
                    }, 10);
                }} />
                <div className="password-opts-wrap">
                    {this.state.enableClear && <div className="clear-btn" onClick={() => {
                        this.props.handleClear('password');
                    }}>
                        <img src="images/clear.png" alt="clear button"></img>
                    </div>
                    }
                    <div className="toggle-password-display" onClick={this.props.handleClick}>
                        <img src={this.props.togglePasswordDisplay
                            ? "images/show-password.png"
                            : "images/hide-password.png"} />
                    </div>
                </div>
            </div>
        )
    }
}

class InvitationCodeInput extends React.Component {
    constructor() {
        super();
        this.state = {
            enableClear: false
        };
    }

    render() {
        return (
            <div className="input-wrap veri-code">
                <div className="input-type-icon">
                    <img src="images/invite.png" />
                </div>
                <input
                    type="tel"
                    placeholder="请输入邀请码"
                    value={this.props.value}
                    disabled={this.props.disabled}
                    onChange={(e) => {
                    // if (!/[0-9]/.test(e.target.value[e.target.value.length - 1]) && e.target.value.length > 0) {
                    //     return;
                    // }
                        this.setState({enableClear: e.target.value ? true: false
                    });
                    this.props.handleChange(e, 'invitationCode');
                }} onFocus={(e) => {
                    this.setState({
                        enableClear: e.target.value
                            ? true
                            : false
                    });
                }} onBlur={() => {
                    setTimeout(() => {
                        this.setState({ enableClear: false });
                    }, 10);
                }} />
                <div className="veri-code-info">
                    {this.state.enableClear && <div className="clear-btn" onClick={() => {
                        this.props.handleClear('invitationCode');
                    }}>
                        <img src="images/clear.png" alt="clear button"></img>
                    </div>
                    }
                    <span style={{color: "#8bb7fe"}}>(选填)</span>
                </div>
            </div>
        )
    }
}

class InteractWrap extends React.Component {
    constructor() {
        super();
        this.state = {
            phoneNum: '',
            password: '',
            verificationCode: '',
            invitationCode: $FW.Format.urlQuery().invitationCode || '',
            timeRemainForNewCode: 60,
            codeToken: '',
            showPassword: false,
            showRegisteredMask: false
        }
    }

    handleInput = (e, inputType) => {
        this.setState({ [inputType]: e.target.value });
    }

    getVerificationCode = () => {
        if (this.state.timeRemainForNewCode === 60) { // time for test
            if (isPhoneNum(this.state.phoneNum)) {
                $FW.Post(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
                    mobile: this.state.phoneNum,
                    userOperationType: 3,
                    sourceType: SOURCE_TYPE
                }).then((data) => {
                    this.setState({ codeToken: data.codeToken });
                    var countdown = setInterval(() => {
                        this.setState({
                            timeRemainForNewCode: this.state.timeRemainForNewCode - 1
                        });
                        if (this.state.timeRemainForNewCode === 0) {
                            clearInterval(countdown);
                            this.setState({ timeRemainForNewCode: 60 }); // time for test
                        }
                    }, 1000);
                }, (e) => {
                    if (e.code === 201003) return this.setState({showRegisteredMask: true}) // 手机号已注册
                    let msg = e.message;
                    alert(msg || "验证码获取失败");
                    if (e.code === 201003) this.handleJump(false);
                });
            } else {
                alert("手机号格式不正确");
                this.setState({ phoneNum: '' });
            }
        }
    }

    togglePasswordDisplay = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    clearInput = (inputType) => {
        this.setState({ [inputType]: '' });
    }

    ifEssentialsExist = () => {
        var essentialTypeNames = {
            'phoneNum': '手机号',
            'verificationCode': '验证码',
            'password': '密码'
        };
        for (var typeName in essentialTypeNames) {
            if (essentialTypeNames.hasOwnProperty(typeName)) {
                if (!this.state[typeName]) {
                    if (typeName === 'password') {
                        alert('密码为空，输入8-16位的字母和数字组合密码');
                        return;
                    }
                    alert(essentialTypeNames[typeName] + "为空，请重新输入");
                    return;
                }
            }
        }
        return true;
    }

    handleJump = (data) => {
        let dict = data.userLogin;
        let jt = $FW.Format.urlQuery().jumpType;
        let app_url = '/static/loan/outside-register-success-app/index.html',
            wx_url = '/static/loan/outside-register-success-wx/index.html',
            other_apps_url = '/static/loan/outside-register-success-other-apps/index.html';
        switch (jt) {
            case 'app':
                window.location.href = app_url;
                break;
            case 'wx':
                window.location.href = wx_url;
                break;
            case 'other_apps':
                window.location.href = other_apps_url;
                break;
            case 'to_home':
                // 如果传入参数是 false , 则不跳转, 这可能是因为用户已经注册,
                // 但不能跳转到首页, 因为TA还没有登录
                if (data === false) return;
                $FW.Store.setUserDict({
                    token: dict.userToken,
                    id: dict.userId,
                    gid: dict.userGid,
                    status: dict.userStatus,
                    uid:dict.uid
                });
                window.location.href = '/static/loan/home/index.html';
                break;
            default:
                $FW.Store.setUserDict({
                    token: dict.userToken,
                    id: dict.userId,
                    gid: dict.userGid,
                    status: dict.userStatus,
                    uid:dict.uid
                });
                window.location.href = '/static/loan/home/index.html';
        }
    }

    handleSubmit = () => {
        if (this.ifEssentialsExist()) {
            if (!isPhoneNum(this.state.phoneNum)) {
                alert("手机号格式不正确");
                this.setState({ phoneNum: '', verificationCode: '', password: '' });
            } else {
                if (!isPasswordValid(this.state.password)) {
                    this.setState({ password: '' });
                } else {
                    $FW.Post(`${API_PATH}/api/userBase/v1/register.json`, {
                        channelCode: $FW.Format.urlQuery().channelCode,
                        extInvCode: $FW.Format.urlQuery().extInvCode || '',
                        codeToken: this.state.codeToken,
                        invitationCode: this.state.invitationCode,
                        mobile: this.state.phoneNum,
                        password: this.state.password,
                        verifyCode: this.state.verificationCode,
                        sourceType: SOURCE_TYPE
                    }).then((data) => {
                        $FW.Store.set('phone', this.state.phoneNum);
                        this.handleJump(data);
                    }, (e) => {
                        if (!this.state.codeToken) {
                            alert("请点击获取验证码！");
                            return;
                        }
                        alert(e.message);
                        if (e.code === 20010) {
                            alert("验证码错误，请重新输入");
                            this.setState({ verificationCode: '' });
                        }
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="interact-wrap">
                <PhoneNumInput handleChange={this.handleInput} value={this.state.phoneNum} handleClear={this.clearInput} />
                <VerificationCodeInput value={this.state.verificationCode} verificationCodeInfo={this.state.timeRemainForNewCode === 60
                    ? "获取验证码"
                    : this.state.timeRemainForNewCode + "s"} handleChange={this.handleInput} handleClick={this.getVerificationCode} handleClear={this.clearInput} />
                <PasswordInput type={this.state.showPassword
                    ? "text"
                    : "password"} togglePasswordDisplay={!this.state.showPassword} handleChange={this.handleInput} handleClick={this.togglePasswordDisplay} value={this.state.password} handleClear={this.clearInput} />
                <InvitationCodeInput handleChange={this.handleInput} value={this.state.invitationCode} disabled={$FW.Format.urlQuery().invitationCode ? true : false} handleClear={this.clearInput} />
                <button className="register-button" onClick={this.handleSubmit}>
                    立即领钱
                </button>
                <Nav className='jump-login' href='/static/loan/user-entry/index.html'>已有账号？立即登录 >></Nav>
                { this.state.showRegisteredMask &&
                    <div className="mask">
                        <div className="pop-wrap">
                            <p className="registered-tip">手机号已注册，请直接登录</p>
                            <img className="close-icon" src="images/close-icon.jpg" onClick={() => {this.setState({showRegisteredMask: false})}}></img>
                            <div className="mask-opts">
                                <div className="close-mask" onClick={() => {this.setState({showRegisteredMask: false})}}>关闭</div>
                                <Nav className="to-next" href="/static/loan/user-entry/index.html">立即登录</Nav>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

// functions

function isPhoneNum(phoneNum) {
    const phoneNumFormat = /^1[3|4|5|7|8]\d{9}$/;
    return phoneNumFormat.test(phoneNum);
}

function isPasswordValid(password) {
    const typePattern = /[^A-Za-z0-9]/;
    const includeNumPattern = /[0-9]+/;
    const includeAlphabetPattern = /[A-Za-z]+/;
    if (typePattern.test(password)) {
        alert("密码只能包含数字和字母");
        return;
    }
    if (password.length < 8) {
        alert("密码过短，请输入8-16位的字母和数字组合密码");
        return;
    }
    if (!includeNumPattern.test(password) || !includeAlphabetPattern.test(password)) {
        alert("密码过于简单，请输入8-16位的字母和数字组合密码");
        return;
    }
    return true;
}

// document.body.onoffline = function() {
//   alert("无网络连接");
// }

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(<InteractWrap />, CONTENT_NODE)
})
