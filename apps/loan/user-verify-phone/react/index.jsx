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
            popText: '',
            popBtnText: '',
            popStatus: null,
            popShow:false,
            remain:0,
            result:null,
            transCode:null,
            failReason:null,
            show:false
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
            this.setState({ countdown: this.state.countdown - 1 });
            if (this.state.countdown == 0) {
                clearInterval(this.time);
                this.setState({ countdownShow: false });
            }
        }, 1000)
    },
    changeCode(e) {
        if (verificationNum(e.target.value)) {
            if (space(e.target.value).length < 5) {
                this.setState({ codeVal: space(e.target.value) });
            }
        }
    },
    handleGetCode() {
        this.getCode();

        $FW.Post(`${API_PATH}api/bankcard/v1/resendverifycode.json`, {
            operatorBankcardGid: BANK_GID,
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE
        }).then(null, e => $FW.Component.Toast(e.message));
    },
    definiteBtn() {
        if (this.state.codeVal.length < 4) return $FW.Component.Toast("验证码不能小于4位");

        // $FW.Post(`${API_PATH}api/bankcard/v1/commitverifycode.json`, {
        //     operatorBankcardGid: BANK_GID,
        //     token: USER.token,
        //     userGid: USER.gid,
        //     userId: USER.id,
        //     verifyCode: this.state.codeVal,
        //     sourceType: SOURCE_TYPE
        // }).then(() => {
        //     return new Promise(resolve => setTimeout(resolve, 5000))
        // }).then(() => {
        //     return $FW.Post(`${API_PATH}api/bankcard/v1/status.json`, {
        //         operatorBankcardGid: BANK_GID,
        //         token: USER.token,
        //         userGid: USER.gid,
        //         userId: USER.id,
        //         sourceType: SOURCE_TYPE
        //     })
        // }, e => $FW.Component.Toast(e.message)).then((data) => {
        //     let bs = data.bindStatus;
        //     if (bs.status == 0) {
        //         if (bs.transCode == 1001) {
        //             $FW.Component.Toast("验证码不正确");
        //         } else {
        //             $FW.Component.Toast("处理中");
        //             setTimeout(() => {
        //                 //window.location.href = '/static/loan/home/index.html'
        //                 window.history.go(-2);
        //             }, 1000)
        //         }
        //     } else if (bs.status == 1) {
        //         window.location.href = '/static/loan/user-card-management/index.html';
        //     } else if (bs.status == 2) {
        //         setTimeout(() => {
        //             $FW.Component.Toast(bs.failReason);
        //         }, 1000)
        //         window.location.href = '/static/loan/user-card-set/index.html';
        //     }
        // });

        $FW.Post(`${API_PATH}api/bankcard/v1/commitverifycode.json`, {
            operatorBankcardGid: BANK_GID,
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            verifyCode: this.state.codeVal,
            sourceType: SOURCE_TYPE
        }).then(() => {
            let {remain} = this.state;
            this.setState({remain:12});
            this.checkAjax();
            this.timer = setInterval(() => {
                if(remain % 3 === 0) this.checkAjax();
                this.setState({ remain: remain - 1 });
                if (remain <= 0) {
                    clearInterval(this.timer);
                }
            }, 1000);

            // let check = () => {
            //     if(this.state.result) return;
            //     if(this.state.remain <=0) return;
            //     this.checkAjax().then(check);
            // }

            if(this.state.result == 0){
                this.setState({show:true});
                clearInterval(this.timer);
                if(this.state.transCode == 1001){
                    this.setState({show:false});
                    clearInterval(this.timer);
                    $FW.Component.Toast("验证码不正确");
                }
            }else if(this.state.result ==1){
                 clearInterval(this.timer);
                 window.location.href = '/static/loan/user-card-management/index.html';
            }else if(this.state.result ==2){
                this.setState({show:true});
                clearInterval(this.timer);
            }
        } , e=>$FW.Component.Toast(e.message));

    },
    checkAjax(){
        $FW.Post(`${API_PATH}api/bankcard/v1/status.json`, {
            operatorBankcardGid: BANK_GID,
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE
        }).then((data)=>{
            this.setState({result:data.status, transCode:data.transCode,failReason:data.failReason});
        }, e =>$FW.Component.Toast(e.message));
    },
    confirmHandler(){
        if(this.state.result == 0){
            window.history.go(-2);
        }else if(this.state.result == 2){
            window.location.href = '/static/loan/user-card-set/index.html';
        }
    },
    componentWillUnmount(){
        clearInterval(this.timer);
    },
    // handlerBtn() {
    //     this.setState({ popShow: false });
    //     if (this.state.popStatus === 2) window.history.back();
    // },
    render() {
        // let pop = () => {
        //     return <div className="pop" style={{ zIndex: 10000 }}>
        //         <div className="pop-cnt">
        //             <div className="pop-info">
        //                 <div className="pop-text">{this.state.popText}</div>
        //                 <div className="btn" onClick={this.handlerBtn}>
        //                     {this.state.popBtnText}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // }

        let btnSMSCode = this.state.countdownShow ?
            <div className="get-code-btn c">{this.state.countdown}s</div> :
            <div className="get-code-btn" onClick={this.handleGetCode}>重新获取</div>;

        return (
            <div>
                <div className="verify-phone-cnt">
                    {this.state.popShow && pop()}
                    <div className="prompt-text">
                        验证码已发送到尾号<span>{PHONE.substr(7)}</span> 的手机上
                    </div>

                    <div className="ui-froms">
                        <div className="list code-list">
                            <span className="text">验证码</span>
                            <div className="input">
                                <input type="number" onChange={this.changeCode}
                                       value={this.state.codeVal} placeholder="请输入验证码" />
                            </div>
                            {btnSMSCode}
                        </div>
                    </div>

                    <div className="determine-btn">
                        <div className="ui-btn" onClick={this.definiteBtn}>确定</div>
                    </div>
                </div>
                {this.state.show && <div className="mask" style={{zIndex:100}}>
                    <div className="popup">
                        {this.state.result == 2 &&  <div className="popup-title">设置提现卡失败</div>}
                        {this.state.result == 2 && <div className="popup-reason">{this.state.failReason}</div>}
                        {this.state.result == 0 &&  <div className="popup-title">请求正在处理中，请稍等</div>}
                         <div className="popup-btn" onClick={this.confirmHandler}>确定</div>
                    </div>
                </div>}
            </div>

        )
    }
});


const USER = $FW.Store.getUserDict();
const BANK_GID = $FW.Format.urlQuery().operatorBankcardGid;
const PHONE = $FW.Format.urlQuery().phone;

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"验证手机号"} />, HEADER_NODE);
    ReactDOM.render(<VerifyPhone />, CONTENT_NODE);
})
