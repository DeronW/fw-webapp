//手机号验证
function checkPhone(phoneValue){ 
    if(!(/^1[34578]\d{9}$/.test(phoneValue))){ 
        return false; 
    } else {
        return true;
    }
}

const ModificationPhoneFrom = React.createClass({
    getInitialState() {
        return {
            showGetCode: true,
            countdown: 0,
            codeValue: '',
            next: false,
            phone: location.search.substring(1).split("=")[1],
            phoneValue: '',
            updatePhoneNoTicket: ''
        }
    }, 
    componentWillUnmount() {
        clearInterval(this.timer);
    },
	sountdownFun() {
	    this.setState({
            showGetCode: false
        });

        this.setState({
            countdown: 60
        })

        this.timer = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1
            });                 

            if(this.state.countdown == 0) {
                clearInterval(this.timer);

                this.setState({
                    showGetCode: true
                });                                
            }  
        }, 1000)

        $FW.Ajax({
            url: API_PATH + "/mpwap/api/v1/sendCode.shtml?type=" + (this.state.next ? 10 : 9)  +"&isVms=" + isVms,
            method: "GET",
            success: function(data) {
                
            },
            fail: function() {

            }
        })

	},

    handlerGetCode(isVms) {
		if(this.state.next) {
			if(this.state.phoneValue != '') {
				this.sountdownFun();				
			} else {
               $FW.Component.Toast("手机号不对");
			}
		} else {
			this.sountdownFun();				
		}

    },
    codeChange(e) {        
        this.setState({
            codeValue: e.target.value
        });
    },
    phoneChange(e) {
        this.setState({
            phoneValue: e.target.value
        });
    },
    handlerModificationPhone () {
        var _this = this;                

        if(this.state.codeValue == '') {
            $FW.Component.Toast("验证码不能为空");
        }else {
            if(this.state.next) {                
                if (!checkPhone(_this.state.phoneValue)) {
                    $FW.Component.Toast("手机号不对");
                } else {
                    $FW.Ajax({
                        url: API_PATH + "/mpwap/api/v1/changBankPhone.shtml?updatePhoneNoTicket=" + _this.state.updatePhoneNoTicket + "&phoneNum=" + _this.state.phoneValue + '&validateCode=' + _this.state.codeValue,
                        method: "GET",
                        success: function(data) {
                            
                        },
                        fail: function() {
                            
                        }
                    })
                }

            } else {       
                $FW.Ajax({
                    url: API_PATH + "mpwap/api/v1/validateOldPhone.shtml?validateCode=" + _this.state.codeValue,
                    method: "GET",
                    success: function(data) {                                    
                        _this.setState({
                            next: true,
                            codeValue: '',
                            //updatePhoneNoTicket: data.updatePhoneNoTicket 
                        });

                        _this.props.callbackNext(true)
                    },
                    fail: function() {
                        
                    }
               })
            }    
        }
 
    },
    render() {  
        return (
            <div className="phone-from">
                <div className="phone-num">
                    {
                        this.state.next ?  <input className="phone-input" type="text" onChange={this.phoneChange}/> : <span className="num-text">{this.state.phone}</span>                     
                    }                
                    
                </div>

                <div className="code-from">
                    <input className="code-input" type="text" onChange={this.codeChange}  placeholder="请输入验证码" value={this.state.codeValue} />
                    {
                        this.state.showGetCode ? <span className="btn" onClick={() => this.handlerGetCode("SMS")}>获取验证码</span> :
                            <span className="btn c">{this.state.countdown}秒后重新获取</span> 
                    }
                </div>

                {
                    this.state.next ? <div className="phone-info">已向手机139****4123发送短信验证码，若收不到请<span className="s" onClick={() => this.codeChange("VMS")}>点击这里</span>获取语音验证码</div> :
                            <div className="phone-info">若注册手机号无法进行验证，请<span className="s">联系客服</span>人工解决</div>  
                         
                }

                <div className="modification-phone-btn" onClick={this.handlerModificationPhone}>{this.state.next ? '完成' : '下一步'}</div>
                
            </div>
        )
    }
});


const ModificationPhone = React.createClass({
    getInitialState() {
        return {
            next: false
        }  
    },
    getCallbackNext(v) {
        this.setState({
            next: v
        });
    },
    render() {
        return (            
            <div>
                <div className="modification-phone-nav">
                    <img src={"images/nav-" + (this.state.next ? 2 : 1) + ".jpg" }/>
                </div>

                <ModificationPhoneFrom callbackNext={this.getCallbackNext} />
            </div>   
        )        
    }
})

ReactDOM.render(
    <Header title={"修改银行预留手机号"} sub_text={""}/>,
    document.getElementById('header')
);

ReactDOM.render(<ModificationPhone />, document.getElementById("cnt"))
