'use strict';

const API_PATH = document.getElementById('api-path').value;

var numberFormat = {
    val: "",
    format: function (val) {
        if (!isNaN(val.replace(/[0-9]/g, ""))) {
            this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
        }

        return this.val;
    }
};

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}


function space(str) {
    return str.replace(/ /g, "");
}

var Nav = React.createClass({
    render: function () {
        return (
            <div className="nav-block">
                <img src={this.props.imgUrl}/>
            </div>
        );
    }
});

var Btn = React.createClass({
    render: function () {
        return (
            <div className="btn-area">
                <div className="ui-btn ui-red-btn" onClick={this.props.Fun}>{this.props.btnText}</div>
            </div>
        );
    }
});

var PhoneCodePrompt = React.createClass({
    getInitialState: function () {
        return {
            getUserInfo: this.props.getGetPorpsUserInfo
        };
    },
    handlerVoice: function () {
        var phoneNo = this.state.getUserInfo.userInfo.phoneNum;

        console.log(phoneNo);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo=" + phoneNo + "&isVms=VMS",
            method: "GET",
            success: function (data) {
                console.log(data);
            }
        });
    },
    render: function () {
        var phoneNo = this.state.getUserInfo.userInfo.phoneNum;
        var idCarNoNntercept = phoneNo.substring(0, 3) + "****" + phoneNo.substring((phoneNo.length - 4), phoneNo.length);

        return (
            <div className="old-user-prompt-text">
                已向手机{idCarNoNntercept}发送短信验证码，若收不到，请 <span className="c" onClick={this.handlerVoice}>点击这里</span>
                获取语音验证码。
            </div>
        );
    }
});

var Text = React.createClass({
    render: function () {
        return (
            <div className="text-area">
                马上升级徽商存管并且迁移资金，<br/>升级即视为我已阅读并同意
                <a href="/static/wap/protocol-trusteeship/index.html" className="text">
                    《资金存管三方协议》</a>
                &nbsp;
                <a href="/static/wap/protocol-counseling/index.html" className="text">
                    《信息咨询服务协议》</a>
            </div>
        );
    }
});


var TopNav = React.createClass({
    getInitialState: function () {
        return {
            backBtn: false
        }
    },
    backBtnClick: function () {

    },
    render: function () {
        return (
            <div className="top-nav">
                <div className="info">
                    {
                        this.props.backBtn ?
                            <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png"/>
                            </div> : null
                    }

                    <div className="title">{this.props.title}</div>
                    <span className="r-text">{this.props.btnText}</span>
                </div>
            </div>
        );
    }
});


var From = React.createClass({
    getInitialState: function () {
        return {
            showInput: 0,
            account: "",
            code: 0,
            countdown: 60,
            userData: {},
            identifyingCode: null,
            blur: true,
            phoneCodePromptShow: false,
            showSelectBtn: this.props.ajaxData.userInfo.bankLogo,
            inputValFirst: this.props.ajaxData.userInfo.bankId,
            nameVal: false,
            userId: false,
            bankCard: false,
            userOpenStatus: this.props.ajaxData.openStatus
        };
    },
    componentDidMount: function () {
        var _this = this;

    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    componentDidUpdate: function (a, params) {
        if (this.state.blur) {
            if (ReactDOM.findDOMNode(this.refs.number) !== null) {
                ReactDOM.findDOMNode(this.refs.number).focus();
            }
        }
    },
    amendId: function () {
        this.setState({
            showInput: 1
        });
    },
    onInputChangeHandler: function (event) {
        //　....　data
        this.props.callbackParent(event.target.value);

        this.setState({
            account: numberFormat.format(event.target.value)
        });
    },
    inputBlur: function () {
        this.setState({
            blur: false
        });
    },
    inputFocus: function () {
        this.setState({
            blur: true
        });

        this.props.callbackParent("");
    },
    //选择开户行
    handlerBank: function () {
        this.props.callbackBank(true);

        this.setState({
            showSelectBtn: true
        });
    },
    headlerCode: function () {
        var _this = this
        var phoneNo = this.props.ajaxData.userInfo.phoneNum;

        console.log(this.userInfoAllVal());

        if (this.userInfoAllVal()) {
            return false;
        }

        _this.setState({
            code: 1
        });

        this.setState({
            phoneCodePromptShow: true
        });

        this.interval = setInterval(function () {
            _this.setState({
                countdown: --_this.state.countdown
            });

            if (_this.state.countdown == 0) {
                clearInterval(_this.interval);

                _this.setState({
                    code: 0,
                    countdown: 60
                });
            }
        }, 1000);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo=" + phoneNo + "&isVms=SMS",
            method: "GET"
        });
    },
    validateCodeChangeHandler: function (event) {
        this.props.validateCode(event.target.value);

    },
    changeUserName: function (event) {
        this.props.callbackUserName(event.target.value);


        this.setState({
            inputValFirst: ""
        });

        if (event.target.value === "") {
            this.setState({
                nameVal: false
            });
        } else {
            this.setState({
                nameVal: true
            });
        }
    },
    changeId: function (event) {
        this.props.callbackUserId(event.target.value);

        this.setState({
            inputValFirst: ""
        });

        if (event.target.value === "") {
            this.setState({
                userId: false
            });
        } else {
            this.setState({
                userId: true
            });
        }
    },
    changeBankCard: function (event) {
        this.props.callbackBankCardNo(event.target.value);

        this.setState({
            inputValFirst: ""
        });

        if (event.target.value === "") {
            this.setState({
                bankCard: false
            });
        } else {
            this.setState({
                bankCard: true
            });
        }
    },
    inputIfImport: function (obj, val) {
        console.log(obj);
        this.setState({
            inputValFirst: ""
        });

        if (val === "") {
            this.setState({
                obj: false
            });
        } else {
            this.setState({
                obj: true
            });
        }
    },

    userInfoAllVal: function () {
        var _this = this;

        var val = _this.props.transmittalInputAllVal;

        if (val.realName !== "" && val.idCardNo !== "" && val.bankCardNo !== "" && val.bankNo !== null) {
            console.log("1");
            return false;
        } else {
            console.log("2");
            return true;
        }

    },
    render: function () {
        var _this = this;

        var userAjaxData = this.props.ajaxData;
        var idCardNo = userAjaxData.userInfo.idCardNo;
        var idCarNoNntercept = idCardNo.substring(0, 4) + "****" + idCardNo.substring((idCardNo.length - 4), idCardNo.length);
        var accountInput = function () {
            return _this.state.showInput == 1 ?
                <input type="text"
                       value={_this.state.account}
                       placeholder="输入账号"
                       ref="number"
                       onFocus={_this.inputFocus}
                       onBlur={_this.inputBlur}
                       onChange={_this.onInputChangeHandler}/> :
                <span className="text id-text" onClick={_this.amendId}>{userAjaxData.userInfo.bankCard}</span>
        };

        var selectEml = function () {

            return <div className="">
                        <span className="bank-text">
                            {
                                _this.props.alreadyBankData === null ? userAjaxData.userInfo.bankName : _this.props.alreadyBankData.bankName
                            }
                        </span>
                <span className="img">
                            <img
                                src={_this.props.alreadyBankData === null ? userAjaxData.userInfo.bankLogo : _this.props.alreadyBankData.logoUrl}
                                className="r-icon"/>
                        </span>
            </div>
        };

        return (
            <div className="">
                <div className="from-block">
                    <div className="input-block">
                        <span className="icon name-icon"></span>
                        <div className="text-block">
                            {
                                userAjaxData.userInfo.realName === "" ?
                                    <input type="text" placeholder="真实姓名" onChange={this.changeUserName}/> :
                                    <span className="text name-text">{userAjaxData.userInfo.realName}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon id-icon"></span>
                        <div className="text-block">
                            {
                                idCardNo === "" ? <input type="text" placeholder="身份证号" onChange={this.changeId}/> :
                                    <span className="text number-text">{idCarNoNntercept}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon number-icon"></span>
                        <div className="text-block">
                            {
                                userAjaxData.userInfo.bankCard === "" ? <input type="text" placeholder="银行卡号"
                                                                               onChange={this.changeBankCard}/> : accountInput()
                            }
                        </div>
                    </div>

                    <div className="input-block" onClick={this.handlerBank}>
                        <span className="bank-name">开户银行</span>

                        <span className="bank-logo">
                            {
                                _this.props.transmittalInputAllVal.bankNo == null ? null : selectEml()
                            }
                        </span>
                    </div>

                    <div className="input-block code-block">
                        <span className="input">
                            <input type="text" placeholder="请输入验证码" onChange={this.validateCodeChangeHandler}/>
                        </span>

                        <span className="btn-code">
                            <span className="line"></span>

                            {
                                this.state.code ?
                                    <span className="timing-text">{this.state.countdown}倒计时</span> :
                                    <span className={this.userInfoAllVal() ? "timing-text" : "btn"}
                                          onClick={this.headlerCode}>获取短信验证码</span>
                            }

                        </span>
                    </div>
                </div>

                <div className="phone-code-prompt">
                    {
                        this.state.phoneCodePromptShow ? <PhoneCodePrompt getGetPorpsUserInfo={userAjaxData}/> : null
                    }
                </div>

            </div>

        );
    }
});


var SelectBank = React.createClass({
    getInitialState: function () {
        return {
            bankListData: null
        };
    },
    componentDidMount: function () {
        var _this = this;

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/getBankListInfo.shtml",
            enable_loading: true,
            success: function (data) {
                _this.setState({
                    bankListData: data
                });
            }
        });
    },
    backBtnClick: function () {
        //this.props.callbackBtn(false);
        this.props.callbackBtnVal();
    },
    supportQuickPayClick: function (index) {
        this.props.callbackAlreadyBank(this.state.bankListData.bankList[index]);
        this.props.callbackBtn(false);
        //this.props.callbackSelectBankNullOderIs(false);
    },
    notSupportQuickPayClick: function (index) {
        this.props.callbackAlreadyBank(this.state.bankListData.quickBankList[index])
        this.props.callbackBtn(false);
        //this.props.callbackSelectBankNullOderIs(false);
    },
    render: function () {
        var _this = this;

        var style = {
            zIndex: "100000"
        };

        var quickPayli = function (comment, index) {

            return <li key={index} onClick={_this.supportQuickPayClick.bind(this, index)} ref={"item" + index}>
                <img src={comment.logoUrl} className="logo-img"/>
                <div className="info-block">
                    <span className="text">{comment.bankName}</span>
                </div>
            </li>
        };

        var notQuickPayli = function (comment, index) {
            return <li key={index} onClick={_this.notSupportQuickPayClick.bind(this, index)} ref={"item" + index}>
                <img src={comment.logoUrl} className="logo-img"/>
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
    getInitialState: function () {
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
            },
            getCallbackBtnVal: false
        };
    },
    fromData: function (dataText) {
        this.dataText = dataText;

        var newUserInfo = this.state.userInfo;

        newUserInfo.bankCardNo = space(dataText);

        this.setState({
            userInfo: newUserInfo
        });
    },
    clickFun: function () {
        console.log(this.dataText)


        this.fromData;
        var _this = this;

        var getAjaxUserInfo = this.props.activity;


        if (this.state.userInfo.realName === "") {
            $FW.Component.Toast("用户名不能为空");
            return false;
        }

        if (this.state.userInfo.idCardNo === "") {
            $FW.Component.Toast("身份证不能为空");
            return false;
        }

        if (this.state.userInfo.bankCardNo === "") {
            $FW.Component.Toast("银行账号不能为空");
            return false;
        }

        if (this.state.userInfo.bankId === null) {
            $FW.Component.Toast("请选择银行");
            return false;
        }

        if (this.dataText !== undefined) {
            if ((this.dataText.length == 0) || (this.dataText == undefined)) {
                $FW.Component.Toast("不能为空");

                return false;
            }
        }

        if (this.state.validateCode == null) {
            $FW.Component.Toast("验证码不能为空");

            return false;
        }


        if (!isCardNo(this.state.userInfo.idCardNo)) {
            $FW.Component.Toast("身份证不格式不正确");
            return false;
        }


        console.log(_this.state.userInfo);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/bind/card.shtml",
            method: "POST",
            enable_loading: true,
            data: _this.state.userInfo,
            success: function (data) {
                console.log(data);
                location.href = "/static/wap/set-deal-password/index.html";
            }
        });

    },
    selectBank: function (show) {
        this.setState({
            backSelect: show
        });
    },
    getCallbackBtn: function () {
        this.setState({
            backSelect: false
        });
    },
    alreadySelectBank: function (data) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.bankNo = data.bankId;

        this.setState({
            userInfo: newUserInfo,
            alreadyBank: data
        });
    },
    getValidateCode: function (code) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.validateCode = code;

        this.setState({
            userInfo: newUserInfo,
            validateCode: code
        });

    },
    pleaseValidateCode: function (data) {

        this.setState({
            pleaseCode: data
        });
    },
    getUserName: function (val) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.realName = val;

        this.setState({
            userInfo: newUserInfo
        });

    },
    getUserId: function (val) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.idCardNo = val;

        this.setState({
            userInfo: newUserInfo
        });

    },
    getBankCardNo: function (val) {
        var newUserInfo = this.state.userInfo;

        newUserInfo.bankCardNo = val;

        this.setState({
            userInfo: newUserInfo
        });

    },
    backBtnClick: function () {
        window.history.back();
    },
    render: function () {
        var _this = this;


        return (
            <div className="cnt">
                <TopNav title={this.props.activity.userInfo.bankId === null ? "升级存管账户" : "开通存管账户" } backBtn={true}
                        btnFun={this.backBtnClick}/>

                <Nav imgUrl={"images/nav-2.png"}/>

                <From
                    callbackParent={this.fromData}
                    callbackBank={this.selectBank}
                    alreadyBankData={this.state.alreadyBank}
                    transmittalInputAllVal={this.state.userInfo}
                    validateCode={this.getValidateCode}
                    callbackPleaseCode={this.pleaseValidateCode}
                    ajaxData={this.props.activity}
                    callbackUserName={this.getUserName}
                    callbackUserId={this.getUserId}
                    callbackBankCardNo={this.getBankCardNo}
                    transmittalCallbackBtnVal={this.state.getCallbackBtnVal}
                />

                <Btn btnText={"同意"} Fun={this.clickFun}/>

                <Text />

                {
                    _this.state.backSelect ? <SelectBank
                        callbackBtn={this.selectBank}
                        callbackBtnVal={this.getCallbackBtn}
                        callbackAlreadyBank={this.alreadySelectBank}

                    /> : null
                }


                {this.state.loading}
            </div>

        );
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(
                <Body activity={data}/>,
                document.getElementById("cnt")
            );
        }
    });

});



