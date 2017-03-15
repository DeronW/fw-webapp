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

                /*var query = $FW.Format.urlQuery();
                 var bizNo = query.bizNo;
                 */
            }.bind(this)
        })
    },

    render: function () {
        return (
            <div>
                <div className="input-wrap">
                    <input type="text" defaultValue="" placeholder="" onChange={this.changeVal}/>
                    <input type="button" className="msg-tip"
                           value={"兑换"}
                           onClick={this.reSend}/>
                    <span className="vertical-line"></span>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {

    ReactDOM.render(<Header title={"优惠券"}/>, HEADER_NODE);

    ReactDOM.render(<SendCode/>, CONTENT_NODE);
});

