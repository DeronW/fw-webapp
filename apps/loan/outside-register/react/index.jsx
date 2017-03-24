// components

class PhoneNumInput extends React.Component {
  render() {
    return (
      <div className="input-wrap phone">
        <div className="input-type-icon">
          <img src="images/phone.png"/>
        </div>
        <input
          type="number"
          placeholder="请输入手机号"
          onChange={this.props.handleChange}
          value={this.props.value} />
      </div>
    )
  }
}

class VerificationCodeInput extends React.Component {
  render() {
    return (
      <div className="input-wrap verification-code">
        <div className="input-type-icon">
          <img src="images/veri-code.png"/>
        </div>
        <input
          type="number"
          placeholder="请输入验证码"
          value={this.props.value}
          onChange={this.props.handleChange} />
        <div
          className="veri-code-info"
          onClick={this.props.handleClick}>
          {this.props.verificationCodeInfo}
        </div>
      </div>
    )
  }
}

class PasswordInput extends React.Component {
  render() {
    return (
      <div className="input-wrap verification-code">
        <div className="input-type-icon">
          <img src="images/password.png"/>
        </div>
        <input
          type={this.props.type}
          value={this.props.value}
          placeholder="请输入密码，8-16位数字字母组合"
          onChange={this.props.handleChange} />
        <div
          className="toggle-password-display"
          onClick={this.props.handleClick}>
          <img
            src={this.props.togglePasswordDisplay ?
                    "images/show-password.png" :
                    "images/hide-password.png"} />
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
      timeRemainForNewCode: 6,
      codeToken: '',
      showPassword: false
    }
    this.handlePhoneNumInput = this.handlePhoneNumInput.bind(this);
    this.handleVeriCodeInput = this.handleVeriCodeInput.bind(this);
    this.getVerificationCode = this.getVerificationCode.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.togglePasswordDisplay = this.togglePasswordDisplay.bind(this);
    this.ifEssentialsExist = this.ifEssentialsExist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePhoneNumInput(e) {
    if (e.target.value.length > 11) {
      return;
    }
    this.setState({phoneNum: e.target.value});
  }

  getVerificationCode() {
    if (this.state.timeRemainForNewCode === 6) {
      if (isPhoneNum(this.state.phoneNum)) {
        var countdown = setInterval(() => {
          this.setState({timeRemainForNewCode: this.state.timeRemainForNewCode - 1});
          if (this.state.timeRemainForNewCode === 0) {
            clearInterval(countdown);
            this.setState({timeRemainForNewCode: 6});
          }
        }, 1000);
        //
        $FW.Post(`${API_PATH}api/userBase/v1/sendVerifyCode.json`, {
          mobile: this.state.phoneNum,
          userOperationType: 3,
          sourceType: SOURCE_TYPE
        }).then((data) => {
          this.setState({codeToken: data.codeToken});
        }, e => $FW.Component.Toast(e.message));
      } else {
        $FW.Component.Toast("手机号格式不正确");
        this.setState({phoneNum: ''});
      }
    }
  }

  handleVeriCodeInput(e) {
    this.setState({verificationCode: e.target.value});
  }

  handlePasswordInput(e) {
    this.setState({password: e.target.value});
  }

  togglePasswordDisplay() {
    this.setState({showPassword: !this.state.showPassword});
  }

  ifEssentialsExist() {
    var essentialTypeNames = {phoneNum: "手机号", verificationCode: "验证码", password: "密码"};
    for (var typeName in essentialTypeNames) {
      if (essentialTypeNames.hasOwnProperty(typeName)) {
        if (!this.state[typeName]) {
          $FW.Component.Toast(essentialTypeNames[typeName] + "为空，请重新输入");
          return false;
        }
      }
    }
    return true;
  }

  handleSubmit() {
    if (this.ifEssentialsExist()) {
      if (isPhoneNum(this.state.phoneNum)) {
        if (isPasswordValid(this.state.password)) {
          //
          $FW.Post(`${API_PATH}api/userBase/v1/register.json`, {
            channelCode: $FW.Format.urlQuery().channelCode,
            codeToken: this.state.codeToken,
            invitationCode: $FW.Format.urlQuery().code,
            mobile: this.state.phoneNum,
            password: this.state.password,
            verifyCode: this.state.verificationCode,
            sourceType: SOURCE_TYPE
          }).then((data) => {
            var jumpType = $FW.Format.urlQuery().jumpType;
            window.location.href = `/static/loan/outside-register-success-${jumpType}/index.html`;
          }, (e) => {
            if (!this.state.codeToken) {
              $FW.Component.Toast("请点击获取验证码！");
              return;
            }
            $FW.Component.Toast(e.message);
            if (/验证码不正确/.test(e.message)) {
              this.setState({verificationCode: ''});
            };
          })
        } else {
          this.setState({password: ''});
        }
      } else {
        $FW.Component.Toast("手机号格式不正确");
        this.setState({phoneNum: '', verificationCode: '', password: ''});
      }
    }
  }

  render() {
    return (
      <div className="interact-wrap">
        <PhoneNumInput
          handleChange={this.handlePhoneNumInput}
          value={this.state.phoneNum} />
        <VerificationCodeInput
          value={this.state.verificationCode}
          verificationCodeInfo={this.state.timeRemainForNewCode === 6 ?
                                    "获取验证码" : (this.state.timeRemainForNewCode + "s")}
          handleChange={this.handleVeriCodeInput}
          handleClick={this.getVerificationCode} />
        <PasswordInput
          type={this.state.showPassword ? "text" : "password"}
          togglePasswordDisplay={!this.state.showPassword}
          handleChange={this.handlePasswordInput}
          handleClick={this.togglePasswordDisplay}
          value={this.state.password} />
        <button
          className="register-button"
          onClick={this.handleSubmit}>
          立即领钱
        </button>
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
  if (!typePattern.test(password)) {
    if (password.length >= 8 && password.length <= 16) {
      if (includeNumPattern.test(password) && includeAlphabetPattern.test(password)) {
        return true;
      } else {
        $FW.Component.Toast("密码过于简单，请输入8-16位的字母和数字组合密码");
        return false;
      }
    } else {
      $FW.Component.Toast("密码长度需在8-16位");
      return false;
    }
  } else {
    $FW.Component.Toast("密码只能包含数字和字母");
    return false;
  }
}


// render ReactDom

$FW.DOMReady(() => {
    ReactDOM.render(<InteractWrap />, CONTENT_NODE)
})
