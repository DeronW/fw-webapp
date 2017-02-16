var TopNav = React.createClass({
    render: function () {
        return (
            <div className="top-nav">
                <div className="info">
                    <div className="back-btn" onClick={this.props.btnFun}>
                        <img src="images/back.png" />
                    </div>
                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.props.btnFun}>{this.props.btnText}</span>
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
            codeType: 5,
            isVmsType: "SMS"
        };
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.state.countdown == 0 && +new Date() - nextProps.callVoicePhone < 10) {
            this.setState({
                codeType: 5,
                isVmsType: "VMS"
            }, this.handerIdentifyingCode);
        } else {
            if (+new Date() - nextProps.callVoicePhone < 10) {
                if (this.state.countdown > 0 && this.state.countdown !== 60) {
                    $FW.Component.Toast(this.state.countdown + "s后才能获取");
                }
            }
        }

    },
    handerIdentifyingCode: function (codeBoolean) {
        if (codeBoolean == "VMSCode") {
            this.props.callbackPromptShow(true);
        }

        this.setState({
            code: true,
            countdown: 60
        });

        this.interval = setInterval(function () {
            this.setState({ countdown: this.state.countdown - 1 });
            if (this.state.countdown == 0) {
                clearInterval(this.interval);
                this.setState({ code: false });
            }
        }.bind(this), 1000);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml",
            method: "GET",
            data: {
                type: this.state.codeType,
                destPhoneNo: this.state.phoneNumber,
                isVms: this.state.isVmsType
            },
            success: () => null
        })
    },
    handerChangeInput: function (event) {
        this.props.callbackInputVal(event.target.value)
    },
    render: function () {

        return (
            <div className="from-block setting-trading-from">
                <div className="input-block">
                    <span className="icon phone-n-icon"> </span>
                    <div className="text-block">
                        <span className="text phone-n-text">
                            {pocketPhoneNumber(this.state.phoneNumber)}
                        </span>
                    </div>
                </div>

                <div className="input-block code-block">
                    <span className="input">
                        <input type="text" placeholder="请输入验证码" onChange={this.handerChangeInput} />
                    </span>

                    <span className="btn-code">
                        {
                            this.state.code ?
                                <span className="timing-text">{this.state.countdown}秒后重新获取</span> :
                                <span className="btn"
                                    onClick={this.handerIdentifyingCode.bind(this, "VMSCode")}>获取验证码</span>
                        }
                    </span>
                </div>
            </div>
        );
    }
});

var Body = React.createClass({
    getInitialState: function () {
        var userInfoData = this.props.activity;

        return {
            voice: false,
            getAjaxUserInfo: userInfoData,
            phoneNumber: userInfoData.userInfo.phoneNum,
            code: null,
            promptShow: false,
            // callbackCountdownInfo: null,
            countdown: 10,
            countdownVal: false,
            popShow: false
        };
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    handlerSettingsPassword: function () {
        var idCardNo = this.state.getAjaxUserInfo.userInfo.idCardNo;
        location.href = API_PATH + "/mpwap/api/v1/setHsPwd.shtml?idCardNo=" +
            idCardNo + "&validateCode=" + this.state.code;
    },
    getCallbackInputVal: function (val) {
        this.setState({ code: val });
    },
    getPromptShow: function (booleanVal) {
        this.setState({ promptShow: booleanVal });
    },
    handlerVoice: function () {
        this.setState({ voice: +new Date() });
    },
    // getCountdownVal: function (val) {
    //     this.setState({callbackCountdownInfo: val});
    // },
    getCancelBtn: function () {
        this.setState({ popShow: false });
    },
    getConfirmBtn: function () {
        window.location.href = location.protocol + "//m.9888.cn/mpwap/orderuser/getUserInfo.shtml";
    },
    rightBtnFun: function () {
        this.setState({ popShow: true });
    },
    render: function () {

        return (
            <div>
                <TopNav title={"设置交易密码"} backBtn={true} btnText="关闭" btnFun={this.rightBtnFun} />

                <div className="nav-block">
                    <img src="images/process-2.png" />
                </div>
                <PswFrom
                    propsUserInfo={this.state.getAjaxUserInfo}
                    callbackInputVal={this.getCallbackInputVal}
                    callbackPromptShow={this.getPromptShow}
                    callVoicePhone={this.state.voice}
                    propsAjaxUrl={"mpwap/api/v1/sendCode.shtml?type=5&destPhoneNo=" + this.state.phoneNumber + "&isVms=VMS"}
                />

                <div className="phone-code-prompt">
                    {
                        this.state.promptShow ?
                            <div className="old-user-prompt-text">
                                已向手机
                                {pocketPhoneNumber(this.state.phoneNumber)}
                                发送短信验证码，若收不到，请
                                <span className="c" onClick={this.handlerVoice}>点击这里</span> 获取语音验证码。
                            </div> : null
                    }
                </div>

                <div className="btn-area">
                    <div className="ui-btn ui-red-btn" onClick={this.handlerSettingsPassword}>设置交易密码</div>
                </div>

                {
                    this.state.popShow ? <Pop
                        callbackCancelBtn={this.getCancelBtn}
                        callbackConfirmBtn={this.getConfirmBtn}
                    /> : null
                }
            </div>
        );
    }
});

var Pop = React.createClass({
    render: function () {
        return (
            <div className="pop-body">
                <div className="pop-back"></div>
                <div className="pop-cnt">
                    <div className="pop-info">
                        <p>未设置交易密码不能投标、提现。</p>
                    </div>
                    <div className="pop-btn">
                        <div className="cancel-btn btn l-btn" onClick={this.props.callbackCancelBtn}>取消</div>
                        <div className="confirm-btn btn r-btn" onClick={this.props.callbackConfirmBtn}>确认</div>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
        success: function (data) {
            if (data.openStatus != 3) {
                window.location.href = location.protocol + "//m.9888.cn/mpwap/top/index.do"
            } else {
                ReactDOM.render(<Body activity={data} />, CONTENT_NODE);
            }
        }
    });
});

function pocketPhoneNumber(phone) {
    phone += '';
    return `${phone.substr(0, 3)}****${phone.substr(phone.length - 4)}`;
}
