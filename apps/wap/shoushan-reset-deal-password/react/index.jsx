var Nav = React.createClass({
    render: function () {
        return (
            <div className="nav-block">
                <img src={this.props.imgUrl} />
            </div>
        );
    }
});

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}


var PhoneCodePrompt = React.createClass({
    getInitialState: function () {
        return {
            getUserInfo: this.props.getGetPorpsUserInfo
        };
    },
    handlerVoice: function () {
        var phoneNo = this.state.getUserInfo.userInfo.phoneNum;

        this.props.callbackVoice(+new Date);

        /*        $FW.Ajax({
         url: 'http://apitest.9888.cn/' + "mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo=" + phoneNo + "&isVms=VMS",
         method: "GET",
         success: function(data) {
         console.log(data);
         }
         });*/
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
                            <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png" />
                            </div> : null
                    }

                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.props.skipFun}>{this.props.btnText}</span>
                </div>
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

var Pop = React.createClass({
    handlerCloseBtn: function () {
        this.props.callbackCloseInfo(false);

    },
    handlerConfirmBtn: function () {
        window.history.back();

    },
    render: function () {
        return (
            <div className="pop">
                <div className="pop-back"></div>
                <div className="pop-cnt">
                    <div className="pop-title">未设置交易密码不能投标、提现。</div>
                    <div className="pop-btn">
                        <span onClick={this.handlerCloseBtn} className="btn close-btn">取消</span>
                        <span className="btn ok-btn" onClick={this.handlerConfirmBtn}>确定</span>
                    </div>
                </div>

            </div>
        );
    }
});

//设置交易密码 from
var PswFrom = React.createClass({
    getInitialState: function () {
        var userInfoData = this.props.propsUserInfo;

        return {
            countdown: 0,
            code: false,
            phoneNumber: userInfoData.userInfo.phoneNum,
            userId: "",
            codeClickable: false,
            codeType: 5,
            isVmsType: "SMS",
            codeNoClick: false,
            noCode: false
        };
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.state.countdown == 0 && +new Date() - nextProps.propsVoice < 10) {
            this.setState(
                {
                    codeType: 5,
                    isVmsType: "VMS"
                }, this.handerIdentifyingCode
            );

        } else {
            if (+new Date() - nextProps.propsVoice < 10) {
                if (this.state.countdown > 0 && this.state.countdown !== 60) {
                    $FW.Component.Toast(this.state.countdown + "s后才能获取");
                }
            }
        }

    },
    handerIdentifyingCode: function (codeBoolean) {
        var _this = this;

        this.setState({
            codeNoClick: true
        });

        if (!this.state.codeClickable) {
            return false;
        }

        _this.setState({
            code: true,
            countdown: 60
        })

        if (codeBoolean == "VMSCode") {
            this.props.callbackPhoneCodePromptShow(true);
        }


        _this.interval = setInterval(function () {
            _this.setState({
                countdown: _this.state.countdown - 1
            });

            if (_this.state.countdown == 0) {
                clearInterval(_this.interval);

                _this.setState({
                    code: false
                });
            }

        }, 1000);


        $FW.Ajax({
            url: 'http://apitest.9888.cn/' + "api/sspay/withdraw/v1/sendCode.shtml?type=" + this.state.codeType + "&destPhoneNo=" + this.state.phoneNumber + "&isVms=" + this.state.isVmsType,
            method: "GET",
            success: function (data) {

            },
            fail: function () {

            }
        })

    },
    handerChangeInput: function (event) {
        this.props.callbackInputVal(event.target.value)
    },
    handlerOnChangeInputId: function (e) {
        /*        if(!isCardNo(e.target.value)) {
         $FW.Component.Toast("身份证不格式不正确");
         return false;
         }*/

        var reg = /^[\da-zA-Z]+$/;


        if (e.target.value !== "") {
            this.setState({
                codeClickable: true
            });
        } else {
            this.setState({
                codeClickable: false
            });
        }

        if (this.props.propsUserInfo.userInfo.isCompanyAgent) {
            if (e.target.value == '') {
                this.setState({
                    userId: ''
                });
            }

            if (!reg.test(e.target.value)) {
                $FW.Component.Toast("输入正确的企业信息");
                return false;
            } else if (e.target.value.length > 18) {
                $FW.Component.Toast("不能超过18位");
                return false;
            }

            this.props.callbackCardNo(e.target.value);
        } else {
            this.props.callbackCardNo(e.target.value);
        }

        this.setState({
            userId: e.target.value
        });

    },
    blurOnChangeInputId: function (e) {
        if (this.props.propsUserInfo.userInfo.isCompanyAgent) {
            if (e.target.value.length < 9) {
                $FW.Component.Toast("企业信息不能小于9位");
                return false;
            }
        }
    },
    render: function () {
        var userInfoData = this.props.propsUserInfo.userInfo;

        return (
            <div className="from-block setting-trading-from">
                <div className="input-block">
                    <span className="icon name-icon"></span>

                    <div className="text-block">
                        {userInfoData.realName}
                    </div>
                </div>

                <div className="input-block">
                    <span className="icon id-icon"></span>

                    <div className="text-block">
                        <input type="text" placeholder={userInfoData.isCompanyAgent ? "输入企业信息" : "请输入身份证"}
                            onChange={this.handlerOnChangeInputId}
                            onBlur={this.blurOnChangeInputId}
                            value={this.state.userId}
                        />
                    </div>
                </div>

                <div className="input-block">
                    <span className="icon phone-n-icon"></span>

                    <div className="text-block">
                        <span className="text phone-n-text">
                            {
                                this.state.phoneNumber.substring(0, 3) + "****" + this.state.phoneNumber.substring(this.state.phoneNumber.length - 4, this.state.phoneNumber.length)
                            }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

var Body = React.createClass({
    getInitialState: function () {
        var userInfoData = this.props.activity;

        return {
            getAjaxUserInfo: userInfoData,
            phoneNumber: userInfoData.userInfo.phoneNum,
            popShow: false,
            phoneCodePromptShow: false,
            cardId: "",
            voice: false
        };
    },
    handlerSettingsPassword: function () {
        var _this = this;

        if (this.state.cardId === "") {
            $FW.Component.Toast("身份证不能为空");
            return false;
        }


        location.href = 'http://apitest.9888.cn/' + "api/sspay/withdraw/v1/setHsPwd.shtml?idCardNo=" + this.state.cardId;

        /*$FW.Ajax({
         url: 'http://apitest.9888.cn/' + "/mpwap/api/v1/setHsPwd.shtml?idCardNo=" + idCardNo + "&validateCode=" + _this.state.code,
         method: "GET",
         success: function(data) {
         console.log(data);
         }
         })*/

    },
    getCallbackInputVal: function (val) {
        this.setState({
            code: val
        });
    },
    backBtnClick: function () {
        window.history.back();
    },
    handlerSkipBtn: function () {
        this.setState({
            popShow: true
        });
    },
    getCloseInfo: function (booleanVal) {
        this.setState({
            popShow: booleanVal
        });
    },
    getPhoneCodePromptShow: function (booleanVal) {
        this.setState({
            phoneCodePromptShow: booleanVal
        });
    },
    getCardNo: function (cardVal) {
        this.setState({
            cardId: cardVal
        });
    },
    getVoice: function (boolnaeVal) {
        this.setState({
            voice: boolnaeVal
        });
    },
    render: function () {

        return (
            <div>
                <TopNav title={this.props.activity.openStatus < 4 ? "设置交易密码" : "验证身份"}
                    backBtn={true}
                    btnFun={this.backBtnClick}
                    skipFun={this.handlerSkipBtn}
                    btnText={"关闭"}
                />

                {
                    this.props.activity.openStatus < 4 ? <Nav imgUrl={"images/process-2.png"} /> : null
                }
                <PswFrom
                    propsUserInfo={this.state.getAjaxUserInfo}
                    callbackInputVal={this.getCallbackInputVal}
                    callbackPhoneCodePromptShow={this.getPhoneCodePromptShow}
                    callbackCardNo={this.getCardNo}
                    propsVoice={this.state.voice}
                />

                <div className="phone-code-prompt">
                    {
                        this.state.phoneCodePromptShow ? <PhoneCodePrompt
                            getGetPorpsUserInfo={this.state.getAjaxUserInfo}
                            callbackVoice={this.getVoice}
                        /> : null
                    }

                </div>

                <Btn btnText={"设置交易密码"} Fun={this.handlerSettingsPassword} />

                {
                    this.state.popShow ? <Pop callbackCloseInfo={this.getCloseInfo} /> : null
                }

            </div>
        );
    }
});

$FW.DOMReady(() => {
    $FW.Ajax({
        url: 'http://apitest.9888.cn/' + "api/sspay/withdraw/v1/getOpenAccountInfo.shtml",
        success: function (data) {
            ReactDOM.render(<Body activity={data} />, CONTENT_NODE);
        }
    });
})
