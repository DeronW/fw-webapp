var numberFormat = {
    val: "",
    format: function (val) {
        if (!isNaN(val.replace(/[0-9]/g, ""))) {
            this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
        }
        return this.val;
    }
};

function space(str) {
    return str.replace(/ /g, "");
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

const SendCode = React.createClass({

    getInitialState: function () {
        var query = $FW.Format.urlQuery();
        var mobileNo = query.mobileNo;
        return {
            mobileNo: mobileNo,
            reSend: true,
            value: 60,
            active: false,
            code: ""
        }
    },

    //倒计时递减
    decline: function () {
        this.setState({value: this.state.value - 1});
    },

    //倒计时
    tick: function () {
        this.interval = setInterval(this.decline, 1000);
    },

    stopTick: function () {
        clearInterval(this.interval);
    },

    //重新发送验证码
    reSend: function () {
        $FW.Ajax({
            url: API_PATH + 'mall/api/payment/v1/SendPhoneVerifyPay.json',
            enable_loading: 'mini',
            success: function (data) {
                $FW.Component.Alert(data.validateCode);
                if (!this.state.reSend) return;
                this.setState({value: 60, reSend: false});
                this.tick()
            }.bind(this)
        })
    },

    //加载完成之后立刻倒计时
    componentDidMount: function () {
        this.reSend();
    },

    //倒计时完成终止
    componentDidUpdate: function () {
        if (this.state.value == 0) {
            this.stopTick();
            this.setState({value: "获取验证码", reSend: true});
        }
    },

    //激活下一步
    changeVal: function (e) {
        var val = e.target.value;
        if (val != "") {
            this.setState({active: true});
        }
        else {
            this.setState({active: false});
        }
        this.setState({"code": val});
    },

    //绑定银行卡
    bindCard: function () {
        var query = $FW.Format.urlQuery();

        let FormData = {
            certificateNo: query.certificateNo,
            accountNo: query.accountNo,
            bankCardName: query.bankCardName,
            bankCardType: 1,
            certificateType: 0,
            accountName: query.accountName,
            mobileNo: query.mobileNo,
            bankId: query.bankId,
            bankName: query.bankName
        };
        $FW.Ajax({
            url: API_PATH + '/mall/api/payment/v1/binding_bank_card.json',
            enable_loading: 'mini',
            data: FormData,
            success: function (data) {
                $FW.Component.Alert(data.msg);
                if(query.source=="pay"){
                    setTimeout(function () {
                        location.href = "/static/mall/order-list/index.html"
                    }, 1500)
                }
                else{
                    setTimeout(function () {
                        location.href = "/static/mall/pay-bank-card/index.html"
                    }, 1500)
                }

            }
        })
    },

    //短信验证码验证完成绑定
    nextStep: function () {
        if (!this.state.active) return;
        var FormData = {
            smsCode: this.state.code
        }
        $FW.Ajax({
            url: `${API_PATH}/mall/api/payment/v1/validatePaySmsCode.json`,
            enable_loading: 'mini',
            data: FormData,
            success: function (data) {
                this.bindCard();
                /*var query = $FW.Format.urlQuery();
                 var bizNo = query.bizNo;
                 */
            }.bind(this)
        })
    },

    render: function () {
        let veri_code_tip = null;

        //if (!this.state.reSend){
        veri_code_tip =
            <div className="phone-tip">
                验证码已发送至手机
                <span>{this.state.mobileNo}</span>
            </div>
        //}
        return (
            <div>
                {veri_code_tip}
                <div className="input-wrap">
                    <input type="text" defaultValue="" placeholder="请输入验证码" onChange={this.changeVal}/>
                    <input type="button" className="msg-tip"
                           value={!this.state.reSend ? "重新发送("+this.state.value+")":this.state.value}
                           onClick={this.reSend}/>
                    <span className="vertical-line"></span>
                </div>
                <a className={this.state.active?"next-step active":"next-step"} onClick={this.nextStep}>完成</a>
            </div>
        )
    }
});

$FW.DOMReady(function () {

    ReactDOM.render(<Header title={"手机验证码"}/>, HEADER_NODE);

    ReactDOM.render(<SendCode/>, CONTENT_NODE);
});

