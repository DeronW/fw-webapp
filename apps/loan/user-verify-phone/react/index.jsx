function verificationNum(val) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(val)
}

function space(str) {
    return str.replace(/ /g, "");
}

const VerifyPhone = React.createClass({
    getInitialState() {
        return {
            countdown: 0,
            countdownShow: false,
            codeVal: '',
            popShow: false,
            popText: '',
            popBtnText: '',
            popStatus: null
        }
    },
    componentDidMount() {
        this.getCode();
    },
    getCode() {
        this.setState({
            countdown: 60,
            countdownShow: true
        });

        this.time = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1
            });

            if (this.state.countdown == 0) {
                clearInterval(this.time);

                this.setState({
                    countdownShow: false
                });

            }
        }, 1000)
    },
    changeCode(e) {
        if (verificationNum(e.target.value)) {
            if (space(e.target.value).length < 5) {
                this.setState({
                    codeVal: space(e.target.value)
                });
            }
        }
    },
    handleGetCode() {
        let user = $FW.Store.getUserDict();
        this.getCode();

        $FW.Ajax({
            url: `${API_PATH}api/bankcard/v1/resendverifycode.json`,
            method: "POST",

            data: {
                operatorBankcardGid: location.search.split("operatorBankcardGid=")[1],
                token: user.token,
                userGid: user.gid,
                userId: user.id,
                sourceType: 3
            }
        }).then((data) => {

        }, (error) => {

        });

    },
    definiteBtn() {
        if (this.state.codeVal.length < 4) {
            $FW.Component.Toast("验证码不能小于4位");
        } else {
            $FW.Ajax({
                url: `${API_PATH}api/bankcard/v1/commitverifycode.json`,
                method: "POST",
                enable_loading: "mini",
                data: {
                    operatorBankcardGid: location.search.split("operatorBankcardGid=")[1],
                    token: user.token,
                    userGid: user.gid,
                    userId: user.id,
                    verifyCode: this.state.codeVal,
                    sourceType: 3
                }
            }).then((data) => {
                let operatorBankcardGid = location.search.split("operatorBankcardGid=")[1];
                //window.location.href = `/static/loan/user-bank-management/index.html?operatorBankcardGid=${operatorBankcardGid}`;

                $FW.Ajax({
                    url: `${API_PATH}api/bankcard/v1/status.json`,
                    method: "POST",
                    enable_loading: "mini",
                    data: {
                        operatorBankcardGid: operatorBankcardGid,
                        token: user.token,
                        userGid: user.gid,
                        userId: user.id,
                        sourceType: 3
                    }
                }).then((data) => {
                    if (data.bindStatus.status == 0) {
                        $FW.Component.Toast("处理中");
                    } else if (data.bindStatus.status == 1) {
                        window.location.href = `/static/loan/user-bank-management/index.html`;
                    } else if (data.bindStatus.status == 2) {
                        //失败
                        this.setState({
                            popShow: true,
                            popText: data.bindStatus.failReason,
                            popBtnText: "确定",
                            popStatus: 2
                        });
                        $FW.Component.Toast(data.bindStatus.failReason);
                        //window.history.back();
                    }


                }, (error) => {

                });

            }, (error) => {

            });
        }
    },
    handlerBtn() {
        this.setState({
            popShow: false
        });

        if (this.state.popStatus == 2) {
            window.history.back();
        }
    },
    render() {
        let pop = () => {
            return <div className="pop" style={{ zIndex: 10000 }}>
                <div className="pop-cnt">
                    <div className="pop-info">
                        <div className="pop-text">{this.state.popText}</div>
                        <div className="btn" onClick={this.handlerBtn}>
                            {this.state.popBtnText}
                        </div>
                    </div>
                </div>
            </div>
        }

        return (
            <div className="verify-phone-cnt">
                {
                    this.state.popShow ? pop() : null
                }

                <div className="prompt-text">
                    验证码已发送到尾号<span>{$FW.Store.get('phone')}</span> 的手机上
				</div>

                <div className="ui-froms">
                    <div className="list code-list">
                        <span className="text">验证码</span>
                        <div className="input">
                            <input type="text" onChange={(e) => this.changeCode(e)} value={this.state.codeVal} placeholder="请输入验证码" />
                        </div>

                        {
                            this.state.countdownShow ?
                                <div className="get-code-btn c">{this.state.countdown}倒计时</div> :
                                <div className="get-code-btn" onClick={() => this.handleGetCode()}>重新获取</div>
                        }

                    </div>
                </div>

                <div className="determine-btn">
                    <div className="ui-btn" onClick={() => this.definiteBtn()}>确定</div>
                </div>
            </div>
        )
    }
});


ReactDOM.render(<Header title={"验证手机号"} />, HEADER_NODE);
ReactDOM.render(
    <VerifyPhone />,
    CONTENT_NODE
);
