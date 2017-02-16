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
                <img src={this.props.imgUrl} />
            </div>
        );
    }
});

var Btn = React.createClass({
    render: function () {
        return <div className="btn-area">
            <div className="ui-btn ui-red-btn" onClick={this.props.Fun}>
                {this.props.btnText}
            </div>
        </div>
            ;
    }
});

var PhoneCodePrompt = React.createClass({
    getInitialState: function () {
        return {
            getUserInfo: this.props.getGetPorpsUserInfo,
            countdown: 60
        };
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    handlerVoice: function () {
        var phoneNo = this.state.getUserInfo.userInfo.phoneNum;
        var n = 60;
        var _this = this;

        if (this.props.callbackCountdown === n) {
            this.props.callbackCode(1);

            this.interval = setInterval(function () {
                _this.setState({
                    countdown: --_this.state.countdown
                });

                _this.props.callbackCountdownVal(_this.state.countdown);

                if (_this.state.countdown == 0) {
                    clearInterval(_this.interval);

                    _this.props.callbackCode(0);
                    _this.props.callbackCountdownVal(n);
                    _this.setState({

                        countdown: 60
                    });
                }
            }, 1000);

        } else if (this.props.callbackCountdown < n) {
            $FW.Component.Toast(this.props.callbackCountdown + "后才能获取");
            return false;
        }

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=6&destPhoneNo=" + phoneNo + "&isVms=VMS",
            method: "GET",
            success: function (data) {
            },
            fail: function (code, msg) {
                _this.props.callbackCode(0);

                clearInterval(_this.interval);
                _this.interval = null;
            }
        });
    },
    render: function () {
        var phoneNo = this.state.getUserInfo.userInfo.phoneNum;
        var idCarNoNntercept = phoneNo.substring(0, 3) + "****" + phoneNo.substring(phoneNo.length - 4, phoneNo.length);

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
                {
                    this.props.userOpenStatusCode === "1" ? "开通即视为我已阅读并同意: " : "马上开通徽商存管并且迁移资金,开通即视为我已阅读并同意:"
                }

                <br />
                <a href="/static/wap/protocol-trusteeship/index.html" className="text">《资金存管三方协议》</a>
                &nbsp;
                {
                    this.props.userOpenStatusCode === "1" ?
                        <a href="/static/wap/protocol-counseling/index.html" className="text">《信息咨询服务协议》</a> : null
                }

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
    handlerPop: function () {
        this.props.callbackLeapfrogBtn(1);
    },
    render: function () {
        return (
            <div className="top-nav">
                <div className="info">
                    {
                        this.props.backBtn ?
                            <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png" />
                            </div> : null
                    }

                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.handlerPop}>{this.props.btnText}</span>
                </div>
            </div>
        );
    }
});


var Pop = React.createClass({
    render: function () {
        return (
            <div className="pop-body" style={{ zIndex: 1000000 }}>
                <div className="pop-back"></div>
                <div className="pop-cnt">
                    <div className="pop-info">
                        <p>{this.props.propsPopInfo}</p>
                    </div>
                    <div className="pop-btn">
                        <div className="cancel-btn btn l-btn"
                            onClick={this.props.callbackCancelBtn}>{this.props.callbackBtnText[1]}</div>
                        <div className="confirm-btn btn r-btn"
                            onClick={this.props.callbackConfirmBtn}>{this.props.callbackBtnText[0]}</div>
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
            popShow: false,
            userInfo: {
                bankCardNo: getAjaxUserInfo.userInfo.bankCard,
                bankNo: getAjaxUserInfo.userInfo.bankId,
                idCardNo: getAjaxUserInfo.userInfo.idCardNo,
                openStatus: getAjaxUserInfo.openStatus,
                realName: getAjaxUserInfo.userInfo.realName,
                validateCode: null
            },
            getCallbackBtnVal: false,
            popCntText: "",
            btnText: [],
            popSelect: null,
            propsPopBtnBank: false

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

        if (this.state.userInfo.bankCardNo.length < 16 || this.state.userInfo.bankCardNo.length > 19) {
            $FW.Component.Alert("请输入16位到19位的银行卡号");
            return false;
        }

        if (this.state.userInfo.bankNo === "") {
            $FW.Component.Toast("请选择银行");
            return false;
        }

        if (this.dataText !== undefined) {
            if (this.dataText.length == 0 || this.dataText == undefined) {
                $FW.Component.Toast("不能为空");

                return false;
            }
        }

        if (this.state.validateCode === null) {
            $FW.Component.Toast("验证码不能为空");
            return false;
        }

        if (this.props.activity.openStatus === "4" || this.props.activity.openStatus === "2" || this.props.activity.openStatus === "3") {
            // nothing to do here
            typeof window
        } else {
            if (!isCardNo(this.state.userInfo.idCardNo)) {
                $FW.Component.Toast("身份证不格式不正确");
                return false;
            }
        }

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/bind/card.shtml",
            method: "POST",
            enable_loading: true,
            data: _this.state.userInfo,
            success: function (data) {
                location.href = "/static/wap/set-deal-password/index.html";
            },
            fail: function () {

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

        newUserInfo.bankCardNo = space(val);

        this.setState({
            userInfo: newUserInfo
        });

    },
    backBtnClick: function () {
        //location.href = document.referrer;
        //window.history.back();
        window.location.href = "/mpwap/orderuser/getUserInfo.shtml";
    },
    getLeapfrogBtn: function (val) {
        // 1 跳过按钮
        // 2 不支持快捷支付
        if (val === 1) {
            //跳过按钮
            this.setState({
                popCntText: "未开通徽商存管不能投标、提现、充值。",
                btnText: ["确定", "取消"],
                popSelect: val
            });
        } else if (val === 2) {
            this.setState({
                popCntText: "您填写的银行卡不支持快捷充值，只能用于提现，确认要提交吗",
                btnText: ["确定", "修改"],
                popSelect: val,
                propsPopBtnBank: false
            });
        }

        this.setState({ popShow: true });
    },
    getCancelBtn: function () {
        this.setState({ popShow: false });
    },
    getConfirmBtn: function () {
        if (this.state.popSelect === 1) {
            window.location.href = "/mpwap/orderuser/getUserInfo.shtml";
        } else if (this.state.popSelect === 2) {
            this.setState({
                propsPopBtnBank: true
            });
        }

        this.setState({
            popShow: false
        });
    },
    render: function () {
        var _this = this;

        return (
            <div className="cnt">

                {
                    <TopNav title={"开通存管账户"} backBtn={true} btnText="关闭"
                        btnFun={this.backBtnClick}
                        callbackLeapfrogBtn={this.getLeapfrogBtn}
                    />
                }

                {
                    this.props.activity.userInfo.notSupportDes != "" ?
                        <div className="modily-bank-info">请更改为指定开户银行范围的银行卡, 否则无法提现</div> : null
                }

                <Nav imgUrl={"images/nav-2.png"} />

                <Form
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

                <Btn btnText={"同意"} Fun={this.clickFun}

                />

                <Text userOpenStatusCode={this.props.activity.openStatus} />

                {
                    _this.state.backSelect ? <SelectBank
                        callbackBtn={this.selectBank}
                        callbackBtnVal={this.getCallbackBtn}
                        callbackAlreadyBank={this.alreadySelectBank}
                        callbackLeapfrogBtn={this.getLeapfrogBtn}
                        callbackPopBtnBank={this.state.propsPopBtnBank}

                    /> : null
                }


                {this.state.loading}

                {
                    this.state.popShow ? <Pop
                        propsPopInfo={this.state.popCntText}
                        callbackCancelBtn={this.getCancelBtn}
                        callbackConfirmBtn={this.getConfirmBtn}
                        callbackBtnText={this.state.btnText}
                    /> : null
                }
            </div>

        );
    }
});


$FW.DOMReady(function () {
    $FW.Ajax({
        url: `${API_PATH}mpwap/api/v1/getOpenAccountInfo.shtml`,
        enable_loading: 'mini'
    }).then(data => {
        // var title = data.userInfo.bankId ? "开通存管账户" : "升级存管账户";
        if (data.openStatus >= 3) {
            window.location.href = "/mpwap/top/index.do";
        } else {
            ReactDOM.render(<Body activity={data} />, CONTENT_NODE);
        }
    });

});
