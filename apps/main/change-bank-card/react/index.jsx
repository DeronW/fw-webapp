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
    getInitialState: function() {
        return {
            getUserInfo: this.props.getGetPorpsUserInfo
        };
    },
    handlerVoice: function() {
        var phoneNo = this.state.getUserInfo.userInfo.phoneNum;

        console.log(phoneNo);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo=" + phoneNo + "&isVms=VMS",
            method: "GET",
            success: function(data) {
                console.log(data);
            }
        });
    },
    render: function() {
        var phoneNo = this.state.getUserInfo.userInfo.phoneNum;
        var idCarNoNntercept = phoneNo.substring(0, 3) + "****" + phoneNo.substring((phoneNo.length - 4), phoneNo.length);

        return (
            <div className="old-user-prompt-text">
                已向手机{idCarNoNntercept}发送短信验证码，若收不到，请 <span className="c" onClick={this.handlerVoice}>点击这里</span> 获取语音验证码。
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
            countdown: 60,
            userData: {},
            identifyingCode: null,
            blur: true,
            format_bankCard: "",
            showPhoneCodePrompt: false,
            bankCardNumber: false
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

        if(this.state.format_bankCard === "") {
            return false;
        }

        var phoneNo = this.props.ajaxData.userInfo.phoneNum;
        this.setState({showPhoneCodePrompt:true});
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
                    countdown: 60
                });
            }
        }, 1000);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo="+ phoneNo +"&isVms=SMS",
            method: "GET",
            success: function(data) {


            }
        });
    },
    validateCodeChangeHandler: function(event) {
        this.props.validateCode(event.target.value);
    },
    changeUserName: function(event) {
        this.props.callbackUserName(event.target.value);
    },
    changeId: function(event) {
        this.props.callbackUserId(event.target.value);
    },
    changeBankCard: function(event) {
        this.props.callbackBankCardNo(event.target.value);

        this.setState({
            format_bankCard: numberFormat.format(event.target.value)
        });

    },
    render: function() {
        var _this = this;

        var userAjaxData = this.props.ajaxData;
        var idCardNo = userAjaxData.userInfo.idCardNo;
        var idCarNoNntercept = idCardNo.substring(0, 4) + "**********" + idCardNo.substring((idCardNo.length - 4), idCardNo.length);
        var accountInput = function() {
            return _this.state.showInput == 1 ?
                <input type="text"
                       value={_this.state.account}
                       placeholder="输入账号"
                       ref="number"
                       onFocus={_this.inputFocus}
                       onBlur={_this.inputBlur}
                       onChange={_this.onInputChangeHandler} /> :
                <span className="text id-text" onClick={_this.amendId}>{userAjaxData.userInfo.bankCard}</span>
        };

        var selectEml = function() {
            return <div className="">
                        <span className="bank-text">
                            {
                                _this.props.alreadyBankData == null ? userAjaxData.userInfo.bankName : _this.props.alreadyBankData.bankName
                            }
                        </span>
                        <span className="img">
                            <img src={_this.props.alreadyBankData == null ? userAjaxData.userInfo.bankLogo : _this.props.alreadyBankData.logoUrl} className="r-icon" />
                        </span>
            </div>
        };

        var showSelectBtn = function() {
            if(userAjaxData.userInfo.bankName === "") {
                return "请选择银行";
            } else if (userAjaxData.userInfo.bankName !== "") {
                return selectEml();
            }
        };

        console.log(this.state.format_bankCard);

        return (
            <div className="">
                <div className="from-block">
                    <div className="input-block">
                        <span className="icon name-icon"></span>
                        <div className="text-block">
                            {
                                userAjaxData.userInfo.realName === "" ? <input type="text" placeholder="输入用户名" onChange={this.changeUserName}/> : <span className="text name-text">{userAjaxData.userInfo.realName}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon id-icon"></span>
                        <div className="text-block">
                            {
                                idCardNo === "" ? <input type="text" placeholder="输入身份证" onChange={this.changeId}/> : <span className="text number-text">{idCarNoNntercept}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon number-icon"></span>
                        <div className="text-block" >
                            <input type="text" placeholder="请输入银行卡号" onChange={this.changeBankCard} value={this.state.format_bankCard}/>
                        </div>
                    </div>

                    <div className="input-block" onClick={this.handlerBank}>
                        <span className="bank-logo">
                            {selectEml()}
                        </span>
                        <span className="bank-name">选择开户银行></span>
                    </div>

                    <div className="input-block code-block">
                        <span className="input">
                            <input type="text" placeholder="请输入验证码" onChange={this.validateCodeChangeHandler} />
                        </span>

                        <span className="btn-code">
                            <span className="line"></span>

                            {
                                this.state.code ?
                                    <span className="btn">{this.state.countdown}s后重新获取</span> :
                                    <span className={this.state.format_bankCard === "" ? "btn" : "timing-text"} onClick={this.headlerCode}>获取短信验证码</span>
                            }

                        </span>
                    </div>
                </div>

                {this.state.showPhoneCodePrompt ? <PhoneCodePrompt getGetPorpsUserInfo={userAjaxData}/> : null}
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
            enable_loading: true,
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
        this.props.callbackAlreadyBank(this.state.bankListData.bankList[index]);
        this.props.callbackBtn(false);
        //this.props.callbackSelectBankNullOderIs(false);
    },
    notSupportQuickPayClick: function(index) {
        this.props.callbackAlreadyBank(this.state.bankListData.quickBankList[index])
        this.props.callbackBtn(false);
        //this.props.callbackSelectBankNullOderIs(false);
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
            nueOldUser: true,
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

        var getAjaxUserInfo = this.props.activity

        if(this.state.userInfo.realName === "") {
            $FW.Component.Toast("用户名不能为空");
            return false;
        }

        if(this.state.userInfo.idCardNo === "") {
            $FW.Component.Toast("身份证不能为空");
            return false;
        }

        if(this.state.userInfo.bankCardNo === "") {
            $FW.Component.Toast("银行账号不能为空");
            return false;
        }

        if(this.state.userInfo.bankId === null) {
            $FW.Component.Toast("请选择银行");
            return false;
        }

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

        let bankCard = this.state.userInfo.bankCardNo;
        let bankNo = this.state.userInfo.bankId;
        let validateCode = this.state.userInfo.validateCode;

       $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/changeBankCard.shtml?bankCard=" + space(bankCard) + "&bankId=" + bankNo + "&validateCode=" + validateCode,
            success: function(data) {
                console.log(data);
                location.href = "/static/wap/bind-bank-card/index.html";
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

        newUserInfo.bankNo = data.bankId;

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
    getUserName: function(val) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.realName = val;

        this.setState({
            userInfo: newUserInfo
        });

    },
    getUserId: function(val) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.idCardNo = val;

        this.setState({
            userInfo: newUserInfo
        });

    },
    getBankCardNo: function(val) {
        var newUserInfo = this.state.userInfo;
        newUserInfo.bankCardNo = val;
        this.setState({
            userInfo: newUserInfo
        });

    },
    render: function() {
        var _this = this;

        return (
            <div className="cnt">
                <From
                    callbackParent={this.fromData}
                    callbackBank={this.selectBank}

                    alreadyBankData={this.state.alreadyBank}
                    validateCode={this.getValidateCode}
                    callbackPleaseCode={this.pleaseValidateCode}
                    ajaxData={this.props.activity}
                    callbackUserName={this.getUserName}
                    callbackUserId={this.getUserId}
                    callbackBankCardNo={this.getBankCardNo}
                />

                <Btn btnText={"提交"} Fun={this.clickFun} />


                {
                    this.state.backSelect ? <SelectBank callbackBtn={this.selectBank} callbackAlreadyBank={this.alreadySelectBank}/> : null
                }


                {this.state.loading}
            </div>

        );
    }
});


$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"修改绑定银行卡"}/>, document.getElementById('header'));
    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
        enable_loading: true,
        success: function(data) {
            ReactDOM.render(
                <Body activity={data}/>,
                document.getElementById("cnt")
            );
        }
    });
});



