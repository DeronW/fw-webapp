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
        var merchantNo = query.merchantNo || [];
        return {
            mobileNo: mobileNo,
            merchantNo: merchantNo,
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
        if (!this.state.reSend) return;
        var FormData = {
            service: 'REQ_PAY_QUICK_RESEND',
            merchantNo: this.state.merchantNo
        }
        console.log(FormData);
        $FW.Ajax({
            url: `${API_PATH}/mall/api/payment/v1/ucf_pay.json`,
            //url:  `./ucf_pay.json`,
            enable_loading: true,
            data: FormData,
            success: function (data) {
                console.log(data);
                this.setState({value: 60, reSend: false});
                this.tick()
                this.setState({reSend: false});
            }.bind(this)
        })
    },

    //加载完成之后立刻倒计时
    componentDidMount: function () {
        this.setState({value: 60, reSend: false});
        this.tick()
        this.setState({reSend: false});
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

    //查询订单状态
    queryState: function () {
        var FormData = {
            service: 'REQ_QUICK_QUERY_BY_ID',
            merchantNo: this.state.merchantNo
        }
        $FW.Ajax({
            url: `${API_PATH}/mall/api/payment/v1/ucf_pay.json`,
            //url:  `./ucf_pay.json`,
            enable_loading: true,
            data: FormData,
            success: (data) => {
                if(data.status=="F"){
                    window.location.href = location.protocol + '//' + location.hostname +
                        "/static/mall/order-complete/index.html?status=F"
                }
                if(data.status=="S"){
                    window.location.href = location.protocol + '//' + location.hostname +
                        "/static/mall/order-complete/index.html?status=S"
                }
            },
            fail: (data) => {
                   $FW.Component.Alert(data.msg);
            }
        })
        },

    //完成支付确认
    nextStep: function () {
        if (!this.state.active) return;
        var FormData = {
            service: 'REQ_PAY_QUICK_CONFIRM',
            merchantNo: this.state.merchantNo,
            checkCode: this.state.code
        }
        $FW.Ajax({
            url: `${API_PATH}/mall/api/payment/v1/ucf_pay.json`,
            //url:  `./ucf_pay.json`,
            enable_loading: true,
            data: FormData,
            success: (data) => {
                if(data.status=="I"){
                    $FW.Component.showAjaxLoading();
                    setTimeout(() => {
                        this.queryState();
                    }, 1500);
                }
                else if(data.status=="F"){
                    window.location.href = location.protocol + '//' + location.hostname +
                        "/static/mall/order-complete/index.html?status=F"
                }
                else{
                    window.location.href = location.protocol + '//' + location.hostname +
                        "/static/mall/order-complete/index.html?status=S"
                }

                //window.location.href = location.protocol + '//' + location.hostname +
                //    "/static/mall/order-complete/index.html?id="+data.tradeNo
            }
        })

    },


    render: function () {
        return (
            <div>
               <div className="phone-tip">验证码已发送至手机<span>{this.state.mobileNo}</span></div>
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

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}
