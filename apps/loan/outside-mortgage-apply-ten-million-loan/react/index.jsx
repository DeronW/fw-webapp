//校验手机号
function isMobilePhone(phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}

//校验数字
function verificationNum(val) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(val)
}

class ApplyTenMillionLoan extends React.Component {
    constructor() {
        super()
        this.state = {
            phoneVal: '',
            codeVal: '',
            countdown: 0,
            countdownShow: false,
            codeToken: '',
            codeType: '',
            bothFilled: false,
            captchaVal:'',
            url:'',
            verifyToken:''
        }
    }

    componentDidUpdate() {
        if (this.state.phoneVal != '' && this.state.codeVal != '') {
            if (this.state.bothFilled != true) {
                this.setState({ bothFilled: true })
            }
        } else {
            if (this.state.bothFilled != false) {
                this.setState({ bothFilled: false })
            }
        }
    }

    componentDidMount(){
       this.reGetCaptchaHandler();
    }

    reGetCaptchaHandler = () => {
        $FW.Post(`${API_PATH}/api/userBase/v1/verifyNum.json`, {
            mobile: this.state.phoneVal,
            sourceType: 5
        }).then((data)=>{
            this.setState({
                url:data.url,
                verifyToken:data.verifyToken
            })
        });
    }

    phoneChange = (e) => {
        if (verificationNum(e.target.value) && e.target.value.length <= 11) {
            this.setState({
                phoneVal: e.target.value
            })
        }
    }

    codeChange = (e) => {
        if (!isNaN(e.target.value) && e.target.value.length <= 8) {
            this.setState({
                codeVal: e.target.value
            })
        }
    }

    captchaChange = e => {
        if(e.target.value.length <=4){
            this.setState({captchaVal:e.target.value})
        }
    }

    handlerCountdown = () => {
        if (this.state.phoneVal == '') {
            $FW.Component.Toast("手机号不能为空");
        } else if (!isMobilePhone(this.state.phoneVal)) {
            $FW.Component.Toast("手机号格式不正确");
        } else if(this.state.captchaVal == ''){
            $FW.Component.Toast("请输入图片验证码");
        }else {
            $FW.Post(`${API_PATH}/api/userBase/v1/userExistIndex.json`, {
                mobile: this.state.phoneVal,
                sourceType: 5
            }).then((data) => {
                if(data.userCode == 10000){
                    $FW.Component.Toast("手机号已注册");
                    setTimeout(function () {
                        window.location.href = '/static/loan/outside-mortgage-id-download/index.html'
                    }, 2000)
                }else if(data.userCode == 20014){
                    $FW.Post(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
                        mobile: this.state.phoneVal,
                        userOperationType: 3,
                        sourceType: 5,
                        verifyToken: this.state.verifyToken,
                        verifyCode: this.state.captchaVal
                    }).then(data => {
                        this.startCountingDown()
                        this.setState({
                            codeToken: data.codeToken,
                            codeType: data.codeType
                        })
                    }, e => {
                        if(e.code == 20020){
                            clearInterval(this.timer)
                            $FW.Component.Toast(e.message);
                        }
                    })
                }
            }, (e)=> {
                $FW.Component.Toast(e.message)
            })
        }
    }

    applyBtn = () => {
        if(this.state.bothFilled){
            if (!isMobilePhone(this.state.phoneVal)) {
                $FW.Component.Toast("手机号格式不正确");
            } else if(this.state.codeVal == '') {
                $FW.Component.Toast("验证码错误，请重新输入");
            } else if(this.state.codeToken == ''){
                $FW.Component.Toast("验证码错误，请重新输入");
            }else {
                $FW.Post(`${API_PATH}/api/userBase/v1/register.json`, {
                    mobile: this.state.phoneVal,
                    codeToken: this.state.codeToken,
                    verifyCode: this.state.codeVal,
                    channelCode:$FW.Format.urlQuery().channelCode || 'OFFICIAL',
                    sourceType: 5
                }).then(data => {
                    window.location.href = `/static/loan/outside-mortgage-ten-million-loan-info/index.html?uid=${data.userLogin.uid}&token=${data.userLogin.userToken}&phone=${this.state.phoneVal}`
                }, e => {
                    $FW.Component.Toast(e.message);
                });
            }
        }

    }

    startCountingDown() {

        this.setState({
            countdown: 60,
            countdownShow: true
        })

        this.timer = setInterval(() => {
            this.setState({ countdown: this.state.countdown - 1 })
            if (this.state.countdown == 0) {
                clearInterval(this.timer)
                this.setState({ countdownShow: false })
            }
        }, 1000)
    }

    stopCountingDown() {
        clearInterval(this.timer)
        this.setState({
            countdown: 60,
            countdownShow: false
        })
    }

    render() {
        return (
            <div className="content">
                <div className="from">
                    <div className="li phone-li">
                        <div className="input">
                            <div className="i">
                                <input type="number" className="input"
                                    value={this.state.phoneVal}
                                    placeholder="输入手机号"
                                    onChange={this.phoneChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="li verification-code-li">
                        <div className="input">
                            <div className="i">
                                <input type="text" className="input"
                                       placeholder="请输入图片验证码"
                                       value={this.state.captchaVal}
                                       onChange={this.captchaChange}
                                />
                            </div>
                            <div className="btn">
                                 <img className="captchaImg" src={this.state.url} onClick={this.reGetCaptchaHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className="li verification-code-li">
                        <div className="input">
                            <div className="i">
                                <input type="number" className="input"
                                    placeholder="验证码"
                                    value={this.state.codeVal}
                                    onChange={this.codeChange}
                                />
                            </div>

                            <div className="btn">
                                {
                                    this.state.countdownShow ?
                                        <div className="countdown-text">{this.state.countdown}s</div> : <div className="text" onClick={this.handlerCountdown}>获取验证码</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={this.state.bothFilled ? "apply-btn" : "apply-btn-forbid"} onClick={this.applyBtn}>申请千万贷款</div>
                </div>
            </div>
        )
    }
}

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"放心花"} show_back={false} />, HEADER_NODE);
    ReactDOM.render(<ApplyTenMillionLoan />, CONTENT_NODE)
});
