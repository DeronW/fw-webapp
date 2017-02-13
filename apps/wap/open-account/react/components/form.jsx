
var Form = React.createClass({
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
            userOpenStatus: this.props.ajaxData.openStatus,
            failShow: false
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
        this.props.callbackParent(event.target.value);

        if (numberFormat.format(event.target.value).length < this.state.account.length) {
            this.setState({
                account: event.target.value
            });
        } else {
            this.setState({
                account: numberFormat.format(event.target.value)
            });
        }
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
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=6&destPhoneNo=" + phoneNo + "&isVms=SMS",
            method: "GET",
            success: function (data) {
            },
            fail: function (code, msg) {
                _this.setState({
                    code: 0
                });

                clearInterval(_this.interval);
                _this.interval = null;
            }
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
        this.setState({
            account: numberFormat.format(event.target.value)
        });

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

            return false;
        } else {

            return true;
        }

    },
    getCode: function (booleanVal) {
        this.setState({
            code: booleanVal
        });
    },
    getCountdownVal: function (timerVal) {
        this.setState({
            countdown: timerVal
        });
    },
    render: function () {
        var _this = this;

        var userAjaxData = this.props.ajaxData;
        var idCardNo = userAjaxData.userInfo.idCardNo;
        var idCarNoNntercept = idCardNo.substring(0, 3) + "****" + idCardNo.substring(idCardNo.length - 4, idCardNo.length);
        var bankCardNum = userAjaxData.userInfo.bankCard;
        var realNameVal = userAjaxData.userInfo.realName;
        var genderVal = userAjaxData.userInfo.gender;


        var accountInput = function () {
            return _this.state.showInput == 1 ?
                <input type="text"
                    value={_this.state.account}
                    placeholder="输入账号"
                    ref="number"
                    onFocus={_this.inputFocus}
                    onBlur={_this.inputBlur}
                    onChange={_this.onInputChangeHandler} /> :
                <span className="text id-text" onClick={_this.amendId}>{
                    numberFormat.format(bankCardNum)
                }</span>
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
                        style={
                            _this.props.alreadyBankData === null && userAjaxData.userInfo.bankLogo == "" ?
                                { "display": "none" } : { "display": "block" }
                        }
                        className="r-icon"
                    />


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
                                    <input type="text" placeholder="真实姓名" onChange={this.changeUserName} /> :
                                    <span className="text name-text">{realNameVal}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon id-icon"></span>

                        <div className="text-block">
                            {
                                idCardNo === "" ? <input type="text" placeholder="身份证号" onChange={this.changeId} /> :
                                    <span className="text number-text">{idCarNoNntercept}</span>
                            }

                        </div>
                    </div>

                    <div className="input-block">
                        <span className="icon number-icon"></span>

                        <div className="text-block">
                            {
                                userAjaxData.userInfo.bankCard === "" ? <input type="text" placeholder="银行卡号"
                                    value={this.state.account}
                                    onChange={this.changeBankCard} /> : accountInput()
                            }
                        </div>
                    </div>

                    <div className="input-block" onClick={this.handlerBank}>
                        <span className="bank-name">开户银行</span>

                        <span className="bank-logo">
                            {
                                _this.props.transmittalInputAllVal.bankNo === null ? null : selectEml()
                            }
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
                                    <span className="timing-text">{this.state.countdown}秒后重新获取</span> :
                                    <span className={this.userInfoAllVal() ? "timing-text" : "btn"}
                                        onClick={this.headlerCode}>获取验证码</span>
                            }

                        </span>
                    </div>
                </div>

                <div className="phone-code-prompt">
                    {
                        this.state.phoneCodePromptShow ? <PhoneCodePrompt
                            getGetPorpsUserInfo={userAjaxData}
                            callbackCountdown={this.state.countdown}
                            callbackCode={this.getCode}
                            callbackCountdownVal={this.getCountdownVal}
                        /> : null
                    }
                </div>

            </div>

        );
    }
});

