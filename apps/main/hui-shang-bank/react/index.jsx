var numberFormat = {
    val: "",
    format: function(val) {
        if(!isNaN(val.replace(/[0-9]/g,""))){
            this.val = val.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");//四位数字一组，以空格分割
        }

        return this.val;
    }
};

function space(str) {
  return str.replace(/ /g, "");
}

var Nav = React.createClass({
    render: function() {
        return (
            <div className="nav-block">
                <img src={this.props.imgUrl} />
            </div>
        );
    }
});

var Btn = React.createClass({
    render: function() {
        return (
            <div className="btn-area">
                <div className="ui-btn ui-red-btn" onClick={this.props.Fun}>{this.props.btnText}</div>
            </div>
        );
    }
});

var PhoneCodePrompt = React.createClass({
    render: function() {
        return (
            <div className="old-user-prompt-text">
                已向手机177****0331发送短信验证码，若收不到，请 <a href="" className="c">点击这里</a> 获取语音验证码。
            </div>
        );
    }
});

var From = React.createClass({
    getInitialState: function() {
        return {
            showInput: 0,
            account: "",
            code: 0,
            countdown: 20,
            userData: {},
            identifyingCode: null,
            blur: true
        };
    },
    componentDidMount: function() {
        var _this = this;

        $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/json-use.json",
            success: function(data) {
                _this.props.callbackGetUserInfo(data);
                
                _this.setState({
                    userData: data
                });                                                                     
            }
        });

        
    },
    amendId: function() {
        this.setState({
            showInput: 1
        });     
    },
    componentDidUpdate: function(a, params) {
        if(this.state.blur) {
            if(ReactDOM.findDOMNode(this.refs.number) !== null) {
                ReactDOM.findDOMNode(this.refs.number).focus();
            }   
        }    
    },
    onInputChangeHandler: function(event){
        //　....　data
        this.props.callbackParent(event.target.value);

        this.setState({
            account: numberFormat.format(event.target.value)
        });
    },
    inputBlur: function() {
        this.setState({
            blur: false  
        });
    },
    inputFocus: function() {
        this.setState({
            blur: true
        });
    },
    //选择开户行
    handlerBank: function() {
        this.props.callbackBank(true);
    },
    headlerCode: function() {
        var _this = this;

        this.setState({
            code: 1
        });

       this.props.callbackPleaseCode(false);     

        this.interval = setInterval(function() {
            _this.setState({
                countdown: --_this.state.countdown
            });

            if(_this.state.countdown == 0) {
                clearInterval(_this.interval);

                _this.setState({
                    code: 0,
                    countdown: 20
                });                
            }
        }, 1000);

        //在5分钟后 才能获取
        this.againCode = setTimeout(function() {
            
            _this.props.callbackPleaseCode(true);

        }, 20000);

        $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/identifying-code.json",
            success: function(data) {
                console.log(data);
                _this.setState({
                    identifyingCode: data.identifyingCode
                });
            }
        });
    },
    validateCodeChangeHandler: function(event) {
        this.props.validateCode(event.target.value);
    },
    render: function() {
        var _this = this;

        return (
            <div className="">
                <div className="from-block">
                    <div className="input-block">
                        <span className="icon name-icon"></span>
                        <div className="text-block">
                            <span className="text name-text">{this.state.userData.name}</span>
                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon number-icon"></span>
                        <div className="text-block">
                            <span className="text number-text">{this.state.userData.bankCardNum}</span>
                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon id-icon"></span>
                        <div className="text-block" >
                            {
                                this.state.showInput == 1 ?
                                    <input type="text" 
                                        value={this.state.account} 
                                        placeholder="输入账号" 
                                        ref="number" 
                                        onFocus={this.inputFocus}
                                        onBlur={this.inputBlur}
                                        onChange={this.onInputChangeHandler} /> :
                                    <span className="text id-text" onClick={this.amendId}>{this.state.userData.id}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block" onClick={this.handlerBank}>
                        <span className="bank-name">开户银行</span>                

                        <span className="bank-logo">
                            <span className="bank-text">
                                {
                                    this.props.alreadyBankData == null ? this.state.userData.pretermissionBankName : this.props.alreadyBankData.bankName                                   
                                }
                            </span>
                            <span className="img">
                                <img src={
                                    this.props.alreadyBankData == null ? this.state.userData.pretermissionBankLogo : this.props.alreadyBankData.bankLogo
                                } className="r-icon" />
                            </span>
                        </span>
                    </div>

                    <div className="input-block code-block">
                        <span className="input">
                            <input type="text" placeholder="请输入验证码" onChange={this.validateCodeChangeHandler} />
                        </span>

                        <span className="btn-code">
                            <span className="line"></span>

                            {
                                this.state.code ?
                                    <span className="timing-text">{this.state.countdown}倒计时</span> :
                                    <span className="btn" onClick={this.headlerCode}>获取短信验证码</span>
                            }

                        </span>
                    </div>
                </div>

                <PhoneCodePrompt />
            </div>
            

        );
    }
});


var Text = React.createClass({
    render: function() {
        return (
            <div className="text-area">
                马上升级徽商存管并且迁移资金，<br/>升级即视为我已阅读并同意<span className="text">《资金存管三方协议》</span>
            </div>
        );
    }
});

var SelectBank = React.createClass({
    getInitialState: function() {
        return {
            bankListData: null
        };    
    },
    componentDidMount: function() {
        var _this = this;

        $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/json1.json",
            success: function(data) {
                _this.setState({
                    bankListData: data
                });                                 
                                                             
            }
        });
    },
    backBtnClick: function() {        
        this.props.callbackBtn(false);
    },
    supportQuickPayClick: function(index) {        
        this.props.callbackAlreadyBank(this.state.bankListData.supportQuickPay[index])
        this.props.callbackBtn(false);
    },
    notSupportQuickPayClick: function(index) {
        this.props.callbackAlreadyBank(this.state.bankListData.notSupportQuickPay[index])
        this.props.callbackBtn(false);
    },
    render: function() {
        var _this = this;

        var style = {
            zIndex: "100000"
        };

        var quickPayli = function(comment, index) {
            return <li key={index} onClick={_this.supportQuickPayClick.bind(this, index)} ref={"item" + index}>
                        <img src={comment.bankLogo} className="logo-img" />
                        <div className="info-block">
                            <span className="text">{comment.bankName}</span>
                        </div>
                    </li>
        }; 

        var notQuickPayli = function(comment, index) {
            return <li key={index} onClick={_this.notSupportQuickPayClick.bind(this, index)} ref={"item" + index}>
                        <img src={comment.bankLogo} className="logo-img" />
                        <div className="info-block">
                            <span className="text">{comment.bankName}</span>
                        </div>
                    </li>
        }; 

        return (
            <div className="select-bank-area" style={style}>
                <TopNav title={"选择开户行"} backBtn={true} btnFun={this.backBtnClick}/>

                <div className="select-bank-content-block">
                    <div className="select-list">
                        <div className="title-text">
                            支持快捷支付
                        </div>
                        <ul className="list">
                           {
                                this.state.bankListData != null ? this.state.bankListData.supportQuickPay.map(quickPayli, this) : null                                                                                             
                            }
                            
                        </ul>
                    </div>

                    <div className="select-list">
                        <div className="title-text">
                            不支持快捷支付
                        </div>
                        <ul className="list">
                            {
                                this.state.bankListData != null ? this.state.bankListData.notSupportQuickPay.map(notQuickPayli, this) : null                                                                                             
                            }                        
                        </ul>
                    </div>
                </div>

                <div className="prompt-block">
                    <div className="text">
                        <span className="circular"></span>
                        <div className="prompt-text">添加支持快捷支付的银行卡，可在金融工场对您的资金实现充值、提现操作；</div>
                    </div>
                    <div className="text">
                        <span className="circular"></span>
                        <div className="prompt-text">不支持的快捷支付的银行卡仅能提现，不能充值；</div>
                    </div>
                </div>
            </div>
        );
    }
});

var Body = React.createClass({
    getInitialState: function() {
        return {
            errorWindow: true,
            selectBankWindow: null,
            loading: null,
            backSelect: false,
            alreadyBank: null,
            validateCode: null,
            pleaseCode: true,
            userInfo: {
                name: null,
                account: null,
                id: null,
                pretermissionBankName: null,
                pretermissionBankLogo: null 
            }
        };
    },
    fromData: function(dataText) {
        this.dataText　=　dataText;

        var newUserInfo = this.state.userInfo;

        newUserInfo.id = space(dataText); 

        this.setState({
            userInfo: 
                 newUserInfo
        });
    },
    clickFun: function() {
        this.fromData;
        var _this = this;

        this.setState({
            userInfo: {
                name: this.state.userInfo.name,
                account: this.state.userInfo.account,
                id: this.state.userInfo.id,
                pretermissionBankName: this.state.userInfo.bankName,
                pretermissionBankLogo: this.state.userInfo.bankLogo 
            }
        });

        if(this.dataText !== undefined) {
            if(this.dataText.length <= 0) {
                this.setState({
                    errorWindow: <ErrorTip text={"不能为空"}/>
                });

                return false;
            } 
        }

        if(this.state.pleaseCode) {
            this.setState({
                errorWindow: false
            });

            return false;
        }
        

        if(this.state.validateCode == null) {
            this.setState({
                errorWindow: <ErrorTip text={"验证码不能为空"}/>
            });

            return false;     
        }   

        this.props.callbackBodyPage(1);    
    },
    selectBank: function(show) {
        this.setState({
            backSelect: show
        });
    },
    alreadySelectBank: function(data) {
        console.log(data);
        this.setState({
            alreadyBank: data
        });
    },
    getValidateCode: function(code) {
        //console.log(code);
        this.setState({
            validateCode: code
        });
    },
    getUserInfo: function(data) {        
        this.setState({
            userInfo: {
                name: data.name,
                account: data.bankCardNum,
                id: data.id,
                pretermissionBankName: data.pretermissionBankName,
                pretermissionBankLogo: data.pretermissionBankLogo 
            }
        });
    },
    pleaseValidateCode: function(data) {
        //console.log(data);
        this.setState({
            pleaseCode: data
        });
    },
    render: function() {
        var _this = this;

        return (
            <div className="cnt">
                <TopNav title={"升级存管账户"} backBtn={true} />    

                <Nav imgUrl={"images/nav-2.png"}/>

                <From callbackGetUserInfo={this.getUserInfo} 
                      callbackParent={this.fromData} 
                      callbackBank={this.selectBank} 
                      alreadyBankData={this.state.alreadyBank} 
                      validateCode={this.getValidateCode}
                      callbackPleaseCode={this.pleaseValidateCode}
                      />

                <Btn btnText={"同意"} Fun={this.clickFun} />

                <Text />

                {
                    this.state.backSelect ? <SelectBank callbackBtn={this.selectBank} callbackAlreadyBank={this.alreadySelectBank}/> : null  
                }
                

                {this.state.loading}
            </div>

        );
    }
});


var TopNav = React.createClass({
    getInitialState: function() {
        return {
            backBtn: false
        }
    },
    backBtnClick: function() {
        
    },
    render: function() {
        return (
            <div className="top-nav">
                <div className="info">
                    {
                        this.props.backBtn ? <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png"/></div> : null 
                    }
                    
                    <div className="title">{this.props.title}</div>
                    <span className="r-text">{this.props.btnText}</span>
                </div>
            </div>
        );
    }
});

var PromptBlock = React.createClass({
    render: function() {
        return (
            <div className="ui-prompt">
                <div className="img">
                    <img src={this.props.imgUrl} />
                </div>

                <div className="title">
                    {this.props.title}
                </div>

                <div className="ui-prompt-text">
                    {this.props.text}
                </div>
            </div>
        );
    }
});

var SucceedBody = React.createClass({
    render: function() {
        return (
            <div className="succeed-area">
                <TopNav title={"开户成功"}/>

                <Nav />

                <PromptBlock />

                <Btn btnText={"设置交易密码"}/>
            </div>
        );
    }
});


//
var PswFrom = React.createClass({
    render: function() {
        return (
            <div className="from-block">
                <div className="input-block">
                    <span className="icon phone-n-icon"></span>
                    <div className="text-block">
                        <span className="text phone-n-text">111XXX999</span>
                    </div>
                </div>

                <div className="input-block code-block">
                    <span className="input">
                        <input type="text" placeholder="请输入验证码" />
                    </span>

                    <span className="btn-code">
                        <span className="line"></span>
                        <span className="btn">获取短信验证码</span>
                    </span>
                </div>
            </div>

        );
    }
});

var MerchandisePsw = React.createClass({
    getInitialState: function() {
        return {
            
        };
    },
    btnHandler: function() {
        this.props.callbackBodyPage(2);
    },
    render: function() {
        return (
            <div className="">
                <TopNav title={"设置交易密码"} backBtn={true} />

                <Nav imgUrl={this.props.imgUrl}/>

                <PswFrom />

                <Btn btnText={"设置交易密码"} Fun={this.btnHandler} />
            </div>
        );
    }
});


//注册成功
var RegisterSucceed = React.createClass({
    render: function() {
        return (
            <div className="">
                <TopNav title={"注册成功"} btnText={"关闭"}/>

                <Nav imgUrl={"images/process.png"}/>
                <PromptBlock title={"注册成功"} imgUrl={"images/succeed-1.png"} text={"建议您立即开通徽商银行存管账户为金融工场资金保驾护航"} />

                <Btn btnText={"马上开通"} />
            </div>
        );
    }
});


//老用户开通存管账户
var OldUserFrom = React.createClass({
    render: function() {
        return (
            <div className="from-block old-user-from">
                <div className="input-block">
                    <span className="icon name-icon"></span>
                    <div className="text-block">
                        <span className="text name-text">孟博</span>
                    </div>
                </div>

                <div className="input-block">
                    <span className="icon number-icon"></span>
                    <div className="text-block">
                        <span className="text number-text">1111******11111</span>
                    </div>
                </div>

                <div className="input-block">
                    <span className="icon id-icon"></span>
                    <div className="text-block">
                        <input type="text" placeholder="输入身份证" />
                    </div>
                </div>

                <div className="input-block">
                    <span className="bank-name">开户银行</span>
                    <img src="images/right-icon.png" className="r-icon" />

                    <span className="bank-logo">
                        <span className="bank-text">招商银行</span>
                        <span className="img">
                            <img src="images/logl.png" />
                        </span>
                    </span>
                </div>

                <div className="input-block code-block">
                    <span className="input">
                        <input type="text" placeholder="请输入验证码" />
                    </span>

                    <span className="btn-code">
                        <span className="line"></span>
                        <span className="btn">获取短信验证码</span>
                        {/*<span className="timing-text">60秒后重新获取</span>*/}
                    </span>
                </div>
            </div>

        );
    }
});

var OldUserBody = React.createClass({
    render: function() {
        return (
            <div className="">
                <Nav imgUrl={"images/process-1.png"}/>

                <OldUserFrom />

                <div className="old-user-prompt-text">
                    已向手机177****0331发送短信验证码，若收不到，请 <a href="" className="c">点击这里</a> 获取语音验证码。
                </div>

                <Btn btnText={"同意"}/>

                <div className="old-user-prompt-text agree-text">
                    马上升级徽商存管并且迁移资金，<br/>
                    升级即视为我已阅读并同意<span className="c">《资金存管三方协议》</span>
                </div>
            </div>

        );
    }
});


//开户成功
var AccountSucceedBody = React.createClass({
    btnHandler: function() {
        this.props.callbackBodyPage(2);
    },
    render: function() {
        return (
            <div className="">
                <TopNav title={"开户成功"} btnText={"跳过"} />

                <Nav imgUrl={this.props.imgUrl} />

                <PromptBlock imgUrl={"images/account-succeed.png"} title={"成功开通徽商银行存管账户"} text={"交易密码用于投标、提现等操作，为了您的 账户安全，资金操作前请先设置交易密码。"} />

                <Btn btnText={"设置交易密码"} Fun={this.btnHandler} />
            </div>
        );
    }
});


//设置交易密码 from
var SettingTradingFrom = React.createClass({
    render: function() {
        return (
            <div className="from-block setting-trading-from">
                <div className="input-block">
                    <span className="icon phone-n-icon"></span>
                    <div className="text-block">
                        <span className="text phone-n-text">111XXX999</span>
                    </div>
                </div>

                <div className="input-block code-block">
                    <span className="input">
                        <input type="text" placeholder="请输入验证码" />
                    </span>

                    <span className="btn-code">
                        <span className="line"></span>
                        <span className="btn">获取短信验证码</span>
                    </span>
                </div>
            </div>
        );
    }
});

//新用户设置交易密码
var SettingTradingBody = React.createClass({
    render: function() {
        return (
            <div className="">
                <TopNav title={"设置交易密码"} backBtn={true} />
                <Nav imgUrl={this.props.imgUrl} />

                <SettingTradingFrom />

                <div className="old-user-prompt-text">
                    已向手机177****0331发送短信验证码，若收不到，请 <a href="" className="c">点击这里</a> 获取语音验证码。
                </div>
            </div>
        );
    }
});


//开通成功
var SucceedOpenBody = React.createClass({
    render: function() {
        return (
            <div className="succeed-open">
                <TopNav title={"成功开通存管账户"} btnText={"关闭"} />

                <PromptBlock imgUrl={"images/succeed-open.png"} title={"成功开通"} text={"徽商银行存管账户"} />

                <Btn btnText={"去充值"} />
            </div>
        );
    }
});

/*
ReactDOM.render(
    <Header title={"升级存管账户"} />,
    document.getElementById("header")
);
*/


var AllPage = React.createClass({
    getInitialState: function() {
        return {
            ui: [
                <Body callbackBodyPage={this.bodyPage} />,
                <AccountSucceedBody callbackBodyPage={this.bodyPage} imgUrl={"images/nav.png"}/>,
                <MerchandisePsw callbackBodyPage={this.bodyPage} imgUrl={"images/nav-1.png"} />
            ],
            index: 0
        };
    },
    bodyPage: function(data) {
        this.setState({
            index: data
        });
        
    },
    render: function() {        
        return (
            <div>
                {
                    this.state.ui[this.state.index]
                }
            </div>
                
        );
    }
});

ReactDOM.render(
    <AllPage />,
    document.getElementById("cnt")
);

