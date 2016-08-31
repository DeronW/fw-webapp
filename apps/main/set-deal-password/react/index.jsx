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
            countdown: 10,
            code: false,
            phoneNumber: userInfoData.userInfo.phoneNum
        };
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    handerIdentifyingCode: function () {
        var _this = this;


        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/sendCode.shtml?type=5&destPhoneNo=" + this.state.phoneNumber + "&isVms=SMS",
            method: "GET",
            success: function (data) {

                _this.setState({
                    code: true
                })

                _this.interval = setInterval(function () {
                    _this.setState({
                        countdown: --_this.state.countdown
                    });

                    if (_this.state.countdown == 0) {
                        clearInterval(_this.interval);

                        _this.setState({
                            countdown: 10,
                            code: false
                        });
                    }

                }, 1000);
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
                                <span className="timing-text">{this.state.countdown}倒计时</span> :
                                <span className="btn" onClick={this.handerIdentifyingCode}>获取短信验证码</span>
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
            getAjaxUserInfo: userInfoData,
            phoneNumber: userInfoData.userInfo.phoneNum,
            code: null
        };
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
    render: function () {

        return (
            <div>
                <TopNav title={"设置交易密码"} backBtn={true} btnText={"跳过"}/>
                <Nav imgUrl={"images/process-2.png"}/>
                <PswFrom
                    propsUserInfo={this.state.getAjaxUserInfo}
                    callbackInputVal={this.getCallbackInputVal}
                />
                <div className="old-user-prompt-text">
                    已向手机
                    {
                        this.state.phoneNumber.substring(0, 3) + "****" + this.state.phoneNumber.substring((this.state.phoneNumber.length - 4), this.state.phoneNumber.length)
                    }
                    发送短信验证码，若收不到，请 <a href="" className="c">点击这里</a> 获取语音验证码。
                </div>
                <Btn btnText={"设置交易密码"} Fun={this.handlerSettingsPassword}/>
            </div>
        );
    }
});


$FW.Ajax({
    url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
    success: function (data) {
        ReactDOM.render(
            <Body activity={data}/>,
            document.getElementById("cnt")
        );
    }
});