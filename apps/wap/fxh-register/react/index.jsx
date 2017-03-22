// components

class PhoneNumInput extends React.Component {
  render() {
    return (
      <div className="input-wrap phone">
        <div className="input-type-icon">
          <img src="images/phone.png"/>
        </div>
        <input
          placeholder="请输入手机号" />
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
        <div className="veri-code-info">
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
  render() {
    return (
      <div className="interact-wrap">
        <PhoneNumInput />
        <VerificationCodeInput
          verificationCodeInfo="获取验证码" />
        <PasswordInput
          tooglePasswordDisplay={false} />
        <button className="register-button">立即领钱</button>
      </div>
    )
  }
}


// functions

function verifyPhoneNumFormat(phoneNum) {
  const phoneNumFormat = /^1[3|4|5|7|8]\d{9}$/;
  return phoneNumFormat.test(phoneNum);
}


// render ReactDom

$FW.DOMReady(() => {
    ReactDOM.render(<InteractWrap />, CONTENT_NODE)
})
