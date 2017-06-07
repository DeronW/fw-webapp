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
    constructor () {
        super()
        this.state = {
            phoneVal: '',
            codeVal: '',
            countdown: 0,
            countdownShow: false,
            codeToken: '',
            codeType: ''
        }
    }

    phoneChange (e) {
        if(verificationNum(e.target.value)) {      
            this.setState({
                phoneVal: e.target.value
            })
        }
    }

    codeChange (e) {
        if (!isNaN(e.target.value) && e.target.value.length <= 8) {
            this.setState({
                codeVal: e.target.value
            })
        }
        
    }

    handlerCountdown () {
        if(this.state.phoneVal == '') {
            $FW.Component.Toast("手机号不能为空");  
        } else if(!isMobilePhone(this.state.phoneVal)) {
            $FW.Component.Toast("手机号格式不正确");
        } else {
            this.setState({
                countdown: 60,
                countdownShow: true
            })

            this.timer = setInterval(() => {
                this.setState({
                    countdown: this.state.countdown - 1 
                })

                if(this.state.countdown == 0) {
                    clearInterval(this.timer)
                    this.setState({
                        countdownShow: false
                    })
                }
            }, 1000)

            $FW.Post(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
                mobile: this.state.phoneVal,
                userOperationType: 3,
                sourceType: 5
            }).then(data => {
                    this.setState({
                        codeToken: data.codeToken,
                        codeType: data.codeType
                    })
                }, e => {
                    $FW.Component.Toast(e.message);                
                });
        } 


    }

    applyBtn () {
        if(!isMobilePhone(this.state.phoneVal)) {
            $FW.Component.Toast("手机号格式不正确");
        } else if (this.state.codeVal == '') {
            $FW.Component.Toast("验证码不能为空");
        } else {
            $FW.Post(`${API_PATH}/api/userBase/v1/register.json`, {
                mobile: this.state.phoneVal,
                codeToken: this.state.codeToken,
                verifyCode: this.state.codeVal,
                sourceType: 5
            }).then(data => {
                    console.log(data.userLogin.uid)
                    window.location.href = `/static/loan/ten-million-loan-info/index.html?uid=${data.userLogin.uid}&token=${data.userLogin.userToken}&phone=${this.state.phoneVal}`
                }, e => {
                    $FW.Component.Toast(e.message);
                    if(e.code == 201003) {
                        this.timerTimeout = setTimeout(() => {
                            window.location.href = '/static/loan/ld-download/index.html'
                        }, 2000)
                    }    
                });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        clearTimeout(timerTimeout)
    }

    render () {
        return (
            <div className="">
                <div className="from">
                    <div className="li phone-li">
                        <div className="input">
                            <div className="i">
                                <input type="text" 
                                    value={ this.state.phoneVal } 
                                    placeholder="输入手机号" 
                                    onChange={ this.phoneChange.bind(this) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="li verification-code-li">
                        <div className="input">
                            <div className="i">
                                <input type="text" 
                                    placeholder="验证码" 
                                    value= { this.state.codeVal }
                                    onChange={ this.codeChange.bind(this) }
                                />
                            </div>

                            <div className="btn">
                                {
                                    this.state.countdownShow ? 
                                        <div className="countdown-text">{ this.state.countdown }倒计时</div> : <div className="text" onClick={ this.handlerCountdown.bind(this) }>获取验证码</div>
                                }                                                                
                            </div>                            
                        </div>
                    </div>   

                    <div className="apply-btn" onClick={ this.applyBtn.bind(this) }>申请千万贷款</div>                 
                </div>
            </div>
        )
    }
} 

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"申请千万贷款"} show_back={true} />, HEADER_NODE);
    ReactDOM.render(<ApplyTenMillionLoan />, CONTENT_NODE)
});