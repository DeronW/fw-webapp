// components

class PhoneNumInput extends React.Component {
  render() {
    return (
      <div className="input-wrap phone">
        <div className="input-type-icon">
          <img src="images/phone.png"/>
        </div>
        <input
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
          placeholder="请输入验证码" />
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
      phoneNum: null,
      timeRemainForNewCode: 6,
      password: '',
      showPassword: false
    }
    this.handlePhoneNumInput = this.handlePhoneNumInput.bind(this);
    this.getVerificationCode = this.getVerificationCode.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.togglePasswordDisplay = this.togglePasswordDisplay.bind(this);
  }

  handlePhoneNumInput(e) {
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
        // $FW.Post(`${API_PATH}`, {
        //
        // }).then(
        //
        // );
      } else {
        $FW.Component.Toast("手机号格式不正确");
      }
    }
  }

  handlePasswordInput(e) {
    this.setState({password: e.target.value});
  }

  togglePasswordDisplay() {
    this.setState({showPassword: !this.state.showPassword});
  }

  handleSubmit() {

  }

  render() {
    return (
      <div className="interact-wrap">
        <PhoneNumInput
          handleChange={this.handlePhoneNumInput}
          value={this.state.phoneNum} />
        <VerificationCodeInput
          verificationCodeInfo={this.state.timeRemainForNewCode === 6 ?
                                    "获取验证码" : (this.state.timeRemainForNewCode + "s")}
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


// render ReactDom

$FW.DOMReady(() => {
    ReactDOM.render(<InteractWrap />, CONTENT_NODE)
})
