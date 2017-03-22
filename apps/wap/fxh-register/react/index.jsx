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
          placeholder="请输入验证码" />
        <div className="toggle-password-display">
          <img
            src={this.props.tooglePasswordDisplay ?
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
      timeRemainForNewCode: 60
    }
    this.handleInput = this.handleInput.bind(this);
    this.getVerificationCode = this.getVerificationCode.bind(this);
  }

  handleInput(e) {
    this.setState({phoneNum: e.target.value})
  }

  getVerificationCode() {
    if (this.state.timeRemainForNewCode === 60) {
      var dmk = setInterval(() => {
        this.setState({timeRemainForNewCode: this.state.timeRemainForNewCode - 1});
      }, 1000);
      //
      // $FW.Post(`${API_PATH}`, {
      //
      // }).then(
      //
      // );
    }
  }

  handleSubmit() {
  }

  render() {
    return (
      <div className="interact-wrap">
        <PhoneNumInput
          handleChange={this.handleInput}
          value={this.state.phoneNum} />
        <VerificationCodeInput
          verificationCodeInfo={this.state.timeRemainForNewCode === 60 ?
                                    "获取验证码" : (this.state.timeRemainForNewCode + "s")}
          handleClick={this.getVerificationCode} />
        <PasswordInput
          tooglePasswordDisplay={false} />
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
