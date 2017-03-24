// components

class PhoneNumInput extends React.Component {
  constructor() {
    super();
    this.state = { enableClear: false };
  }

  render() {
    return (
      <div className="input-wrap phone">
        <div className="input-type-icon">
          <img src="images/phone.png"/>
        </div>
        <input
          type="number"
          placeholder="请输入手机号"
          value={this.props.value}
          onChange={(e) => {
            if (e.target.value.length > 11) {
              return;
            }
            this.setState({ enableClear: e.target.value ? true : false});
            this.props.handleChange(e, 'phoneNum');
          }}
          onFocus={(e) => {this.setState({ enableClear: e.target.value ? true : false});}}
          onBlur={() => {setTimeout(() => {this.setState({ enableClear: false });}, 10);}} />
          {/* reason for setTimeout:
            clicking on the clear button triggers `blur` event
            for input element first, if enableClear is set to
            false instantly, there would be no clear button,
            and no `click` event for it will be triggered! */}
          { this.state.enableClear &&
            <div
              className="clear-btn"
              onClick={() => {this.props.handleClear('phoneNum');}}>
              <img src="images/clear-copy.png" alt="clear button"></img>
            </div>
          }
      </div>
    )
  }
}

class VerificationCodeInput extends React.Component {
  constructor() {
    super();
    this.state = { enableClear: false };
  }

  render() {
    return (
      <div className="input-wrap">
        <div className="input-type-icon">
          <img src="images/veri-code.png"/>
        </div>
        <input
          type="number"
          placeholder="请输入验证码"
          value={this.props.value}
          onChange={(e) => {
            this.setState({ enableClear: e.target.value ? true : false});
            this.props.handleChange(e, 'verificationCode');}}
          onFocus={(e) => {this.setState({ enableClear: e.target.value ? true : false});}}
          onBlur={() => {setTimeout(() => {this.setState({ enableClear: false });}, 10);}} />
        <div
          className="veri-code-info">
          { this.state.enableClear &&
            <div
              className="clear-btn"
              onClick={() => {this.props.handleClear('verificationCode');}}>
              <img src="images/clear-copy.png" alt="clear button"></img>
            </div>
          }
          <div
            onClick={this.props.handleClick}>
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
    this.state = { enableClear: false };
  }

  render() {
    return (
      <div className="input-wrap">
        <div className="input-type-icon">
          <img src="images/password.png"/>
        </div>
        <input
          type={this.props.type}
          placeholder="请输入密码，8-16位数字字母组合"
          value={this.props.value}
          onChange={(e) => {
            this.setState({ enableClear: e.target.value ? true : false});
            this.props.handleChange(e, 'password');}
          }
          onFocus={(e) => {this.setState({ enableClear: e.target.value ? true : false});}}
          onBlur={() => {setTimeout(() => {this.setState({ enableClear: false });}, 10);}} />
        <div className="password-opts-wrap">
          { this.state.enableClear &&
            <div
              className="clear-btn"
              onClick={() => {this.props.handleClear('password');}}>
              <img src="images/clear-copy.png" alt="clear button"></img>
            </div>
          }
          <div
            className="toggle-password-display"
            onClick={this.props.handleClick}>
            <img
              src={this.props.togglePasswordDisplay ?
                      "images/show-password.png" :
                      "images/hide-password.png"} />
          </div>
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
    this.handleInput = this.handleInput.bind(this);
    this.getVerificationCode = this.getVerificationCode.bind(this);
    this.togglePasswordDisplay = this.togglePasswordDisplay.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.ifEssentialsExist = this.ifEssentialsExist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e, inputType) {
    this.setState({[inputType]: e.target.value});
  }

  getVerificationCode() {
    if (this.state.timeRemainForNewCode === 6) {  // time for test
      if (isPhoneNum(this.state.phoneNum)) {
        var countdown = setInterval(() => {
          this.setState({timeRemainForNewCode: this.state.timeRemainForNewCode - 1});
          if (this.state.timeRemainForNewCode === 0) {
            clearInterval(countdown);
            this.setState({timeRemainForNewCode: 6});  // time for test
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

  togglePasswordDisplay() {
    this.setState({showPassword: !this.state.showPassword});
  }

  clearInput(inputType) {
    this.setState({[inputType]: ''});
  }

  ifEssentialsExist() {
    var essentialTypeNames = {'phoneNum': '手机号', 'verificationCode': '验证码', 'password': '密码'};
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
          handleChange={this.handleInput}
          value={this.state.phoneNum}
          handleClear={this.clearInput} />
        <VerificationCodeInput
          value={this.state.verificationCode}
          verificationCodeInfo={this.state.timeRemainForNewCode === 6 ?
                                    "获取验证码" : (this.state.timeRemainForNewCode + "s")}
          handleChange={this.handleInput}
          handleClick={this.getVerificationCode}
          handleClear={this.clearInput} />
        <PasswordInput
          type={this.state.showPassword ? "text" : "password"}
          togglePasswordDisplay={!this.state.showPassword}
          handleChange={this.handleInput}
          handleClick={this.togglePasswordDisplay}
          value={this.state.password}
          handleClear={this.clearInput} />
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
