'use strict';

const API_PATH = document.getElementById('api-path').value;

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



var Text = React.createClass({
    render: function() {
        return (
            <div className="text-area">
                马上升级徽商存管并且迁移资金，<br/>升级即视为我已阅读并同意<span className="text">《资金存管三方协议》</span>
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

    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    componentDidUpdate: function(a, params) {
        if(this.state.blur) {
            if(ReactDOM.findDOMNode(this.refs.number) !== null) {
                ReactDOM.findDOMNode(this.refs.number).focus();
            }
        }
    },
    amendId: function() {
        this.setState({
            showInput: 1
        });
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

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo=13683507870&isVms=SMS",
            method: "GET",
            success: function(data) {
                console.log(data)
                _this.setState({
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

                /*_this.setState({
                    identifyingCode: data.identifyingCode
                });

                _this.props.callbackPleaseCode(data.identifyingCode);
                */
            }
        });
    },
    validateCodeChangeHandler: function(event) {
        this.props.validateCode(event.target.value);
    },
    render: function() {
        var _this = this;

        var userAjaxData = this.props.ajaxData;
        var idCardNo = userAjaxData.userInfo.idCardNo;

        return (
            <div className="">
                <div className="from-block">
                    <div className="input-block">
                        <span className="icon name-icon"></span>
                        <div className="text-block">
                            <span className="text name-text">{userAjaxData.userInfo.realName}</span>
                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon id-icon"></span>
                        <div className="text-block">
                            <span className="text  number-text">
                                {
                                    idCardNo.substring(0, 4) + "****" + idCardNo.substring((idCardNo.length - 4), idCardNo.length)
                                }
                            </span>
                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon number-icon"></span>
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
                                    <span className="text id-text" onClick={this.amendId}>{userAjaxData.userInfo.bankCard}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block" onClick={this.handlerBank}>
                        <span className="bank-name">开户银行</span>

                        <span className="bank-logo">
                            <span className="bank-text">
                                {
                                    this.props.alreadyBankData == null ? userAjaxData.userInfo.bankName : this.props.alreadyBankData.logoUrl
                                }
                            </span>
                            <span className="img">
                                <img src={
                                    this.props.alreadyBankData == null ? userAjaxData.userInfo.bankLogo : this.props.alreadyBankData.logoUrl
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


var SelectBank = React.createClass({
    getInitialState: function() {
        return {
            bankListData: null
        };
    },
    componentDidMount: function() {
        var _this = this;

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/getBankListInfo.shtml",
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
        this.props.callbackAlreadyBank(this.state.bankListData.bankList[index])
        this.props.callbackBtn(false);
    },
    notSupportQuickPayClick: function(index) {
        this.props.callbackAlreadyBank(this.state.bankListData.quickBankList[index])
        this.props.callbackBtn(false);
    },
    render: function() {
        var _this = this;

        var style = {
            zIndex: "100000"
        };

        var quickPayli = function(comment, index) {

            return <li key={index} onClick={_this.supportQuickPayClick.bind(this, index)} ref={"item" + index}>
                <img src={comment.logoUrl} className="logo-img" />
                <div className="info-block">
                    <span className="text">{comment.bankName}</span>
                </div>
            </li>
        };

        var notQuickPayli = function(comment, index) {
            return <li key={index} onClick={_this.notSupportQuickPayClick.bind(this, index)} ref={"item" + index}>
                <img src={comment.logoUrl} className="logo-img" />
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
                                this.state.bankListData != null ? this.state.bankListData.bankList.map(quickPayli, this) : null
                            }

                        </ul>
                    </div>

                    <div className="select-list">
                        <div className="title-text">
                            不支持快捷支付
                        </div>
                        <ul className="list">
                            {
                                this.state.bankListData != null ? this.state.bankListData.quickBankList.map(notQuickPayli, this) : null
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
        var getAjaxUserInfo = this.props.activity;

        return {
            selectBankWindow: null,
            loading: null,
            backSelect: false,
            alreadyBank: null,
            validateCode: null,
            pleaseCode: true,
            userInfo: {
                bankCardNo: getAjaxUserInfo.userInfo.bankCard,
                bankNo: getAjaxUserInfo.userInfo.bankId,
                idCardNo: getAjaxUserInfo.userInfo.idCardNo,
                openStatus: getAjaxUserInfo.openStatus,
                realName: getAjaxUserInfo.userInfo.realName,
                validateCode: null
            }
        };
    },
    fromData: function(dataText) {
        this.dataText　=　dataText;

        var newUserInfo = this.state.userInfo;

        newUserInfo.bankCardNo = space(dataText);

        this.setState({
            userInfo: newUserInfo
        });
    },
    clickFun: function() {
        this.fromData;
        var _this = this;

        var getAjaxUserInfo = this.props.activity;

        if(this.dataText !== undefined) {
            if((this.dataText.length == 0) || (this.dataText == undefined) ) {
                $FW.Component.Toast("不能为空");
            }

            return false;
        }

        if(this.state.validateCode == null) {
            $FW.Component.Toast("验证码不能为空");

            return false;
        }

        console.log(this.state.userInfo);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/bind/card.shtml",
            method: "POST",
            data: _this.state.userInfo,
            success: function(data) {
                console.log(data);
            }
        });

    },
    selectBank: function(show) {
        this.setState({
            backSelect: show
        });
    },
    alreadySelectBank: function(data) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.bankId = data.bankId;

        this.setState({
            userInfo: newUserInfo,
            alreadyBank: data
        });
    },
    getValidateCode: function(code) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.validateCode = code;

        this.setState({
            userInfo: newUserInfo,
            validateCode: code
        });

    },
    pleaseValidateCode: function(data) {

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

                <From
                      callbackParent={this.fromData}
                      callbackBank={this.selectBank}
                      alreadyBankData={this.state.alreadyBank}
                      validateCode={this.getValidateCode}
                      callbackPleaseCode={this.pleaseValidateCode}
                      ajaxData={this.props.activity}
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


$FW.DOMReady(function() {
    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
        success: function(data) {
            ReactDOM.render(
                <Body activity={data}/>,
                document.getElementById("cnt")
            );
        }
    });

});



