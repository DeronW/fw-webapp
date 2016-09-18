'use strict';

const API_PATH = document.getElementById('api-path').value;


var Nav = React.createClass({
    render: function () {
        return (
            <div className="nav-block">
                <img src={this.props.imgUrl}/>
            </div>
        );
    }
});

var TopNav = React.createClass({
    skipHandler: function () {
        location.href = '/'
    },
    render: function () {
        return (
            <div className="top-nav">
                <div className="info">
                    <div className="back-btn" onClick={this.props.btnFun}>
                        <img src="images/back.png"/>
                    </div>
                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.skipHandler}>{this.props.btnText}</span>
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
    componentWillReceiveProps: function(nextProps) {
        if(this.state.countdown == 0 && (+new Date())　-　nextProps.callVoicePhone  < 10) {
            this.setState({
                codeType: 3,
                isVmsType: "VMS"
            }, this.handerIdentifyingCode);
        } else {
            if(this.state.countdown > 0 && this.state.countdown !== 60) {
                $FW.Component.Toast(this.state.countdown + "s后才能获取");
            }
        }

    },
    handerIdentifyingCode: function (url) {
        this.props.callbackPromptShow(true);

        var _this = this;

        this.setState({
            code: true,
            countdown: 60
        });


        this.interval = setInterval(function () {
            this.setState({
                countdown: this.state.countdown - 1
            });

            if (this.state.countdown == 0) {
                clearInterval(this.interval);

                this.setState({
                    code: false
                });
            }

        }.bind(this), 1000);

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type="+ this.state.codeType +"&destPhoneNo=" + this.state.phoneNumber + "&isVms=" + this.state.isVmsType,
            method: "GET",
            success: function (data) {
            }
        })

    },
    handerChangeInput: function (event) {
        this.props.callbackInputVal(event.target.value)
    },
    render: function () {

        return (
            <div className="from-block setting-trading-from">
                <div className="input-block">
                    <span className="icon phone-n-icon"></span>
                    <div className="text-block">
                        <span className="text phone-n-text">
                            {
                                this.state.phoneNumber.substring(0, 3) + "****" + this.state.phoneNumber.substring((this.state.phoneNumber.length - 4), this.state.phoneNumber.length)
                            }
                        </span>
                    </div>
                </div>

                <div className="input-block code-block">
                    <span className="input">
                        <input type="text" placeholder="请输入验证码" onChange={this.handerChangeInput}/>
                    </span>

                    <span className="btn-code">
                        {
                            this.state.code ?
                                <span className="timing-text">{this.state.countdown}s倒计时</span> :
                                <span className="btn" onClick={this.handerIdentifyingCode}>获取验证码</span>
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
            callbackCountdownInfo: null,
            countdown: 10,
            countdownVal: false
        };
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    handlerSettingsPassword: function () {
        var idCardNo = this.state.getAjaxUserInfo.userInfo.idCardNo;
        location.href = API_PATH + "/mpwap/api/v1/setHsPwd.shtml?idCardNo=" +
            idCardNo + "&validateCode=" + this.state.code;
    },
    getCallbackInputVal: function (val) {
        this.setState({
            code: val
        });
    },
    getPromptShow: function (booleanVal) {
        this.setState({
            promptShow: booleanVal
        });
    },
    handlerVoice: function() {
        this.setState({voice: +new Date()})

        var _this = this;

    /*    $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo=" + this.state.phoneNumber + "&isVms=VMS",
            method: "GET",
            success: function(data) {
                console.log(data);
            }
        });*/
    },
    getCountdownVal: function(val) {
        this.setState({
            callbackCountdownInfo: val
        });
    },
    render: function () {

        return (
            <div>
                <Nav imgUrl={"images/process-2.png"}/>
                <PswFrom
                    propsUserInfo={this.state.getAjaxUserInfo}
                    callbackInputVal={this.getCallbackInputVal}
                    callbackPromptShow={this.getPromptShow}
                    callVoicePhone={this.state.voice}
                    propsAjaxUrl={"mpwap/api/v1/sendCode.shtml?type=3&destPhoneNo=" + this.state.phoneNumber + "&isVms=VMS"}
                />

                <div className="phone-code-prompt">
                    {
                        this.state.promptShow ?
                            <div className="old-user-prompt-text">
                                已向手机
                                {
                                    this.state.phoneNumber.substring(0, 3) + "****" + this.state.phoneNumber.substring((this.state.phoneNumber.length - 4), this.state.phoneNumber.length)
                                }
                                发送短信验证码，若收不到，请 <span className="c" onClick={this.handlerVoice}>点击这里</span> 获取语音验证码。
                            </div> : null
                    }
                </div>

                <Btn btnText={"设置交易密码"} Fun={this.handlerSettingsPassword}/>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"设置交易密码"} sub_text={'跳过'} sub_url={'/'}/>,
        document.getElementById('header'));

    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
        success: function (data) {
            ReactDOM.render(
                <Body activity={data}/>,
                document.getElementById("cnt")
            );
        }
    });
});

