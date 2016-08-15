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
    componentWillUnmount: function() {
        clearInterval(this.interval);
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

        this.props.callbackParent("");
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

        $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/identifying-code.json",
            success: function(data) {
                _this.setState({
                    identifyingCode: data.identifyingCode
                });

                _this.props.callbackPleaseCode(data.identifyingCode); 
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


var Body = React.createClass({
    getInitialState: function() {
        return {            
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
            if((this.dataText.length == 0) || (this.dataText == undefined) ) {
                $FW.Component.Toast("不能为空");
            }
        }

        if(this.state.validateCode == null) {
            $FW.Component.Toast("验证码不能为空");
        }

        if(parseInt(this.state.validateCode) !== this.state.pleaseCode) {
            $FW.Component.Toast("验证码不对");
        } else {
            this.props.callbackBodyPage(1);
        }

        //this.props.callbackBodyPage(1);    
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


//设置交易密码 from
var PswFrom = React.createClass({
    getInitialState: function() {
        return {
            countdown: 10,
            code: false
        };
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    handerIdentifyingCode: function() {
        var _this = this;

        this.setState({
            code: true
        })

        this.interval = setInterval(function() {
            _this.setState({
                countdown: --_this.state.countdown
            });

            if(_this.state.countdown == 0) {
                clearInterval(_this.interval);
                
                _this.setState({
                    countdown: 10,
                    code: false
                });
            }

        }, 1000);

        $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/identifying-code.json",
            success: function(data) {
                console.log(data.identifyingCode); 
               _this.props.callbackIdentifyingCode(data.identifyingCode);
            }
        });

    },
    handerChangeInput: function(event) {
        this.props.callbackInputCode(event.target.value);
    },
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
                        <input type="text" placeholder="请输入验证码" onChange={this.handerChangeInput} />
                    </span>

                    <span className="btn-code">
                        {
                            this.state.code ?
                                    <span className="timing-text">{this.state.countdown}倒计时</span> :
                                    <span className="btn" onClick={this.handerIdentifyingCode}>获取短信验证码</span>
                        }
                    </span>
                </div>
            </div>
        );
    }
});



var MerchandisePsw = React.createClass({
    getInitialState: function() {
        return {
            identifyingCode: null,
            inputCode: null
        };
    },
    btnHandler: function() {

        console.log(this.state.identifyingCode);
        console.log(this.state.inputCode);

        if(parseInt(this.state.inputCode) !== this.state.identifyingCode) {
    	    $FW.Component.Toast("验证码不能为空");
        } else {
            
        }

        //this.props.callbackBodyPage(2);
    },
    getIdentifyingCode: function(code) {
        this.setState({
            identifyingCode: code
        });
    },
    getInputCode: function(code) {
        this.setState({
            inputCode: code
        });    
    },
    render: function() {
        return (
            <div className="">
                <TopNav title={"设置交易密码"} backBtn={true} />

                <Nav imgUrl={"images/process-2.png"}/>

                <PswFrom  
                    callbackIdentifyingCode={this.getIdentifyingCode}
                    callbackInputCode={this.getInputCode}
                />

                <Btn btnText={"设置交易密码"} Fun={this.btnHandler} />
            </div>
        );
    }
});


