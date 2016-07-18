'use strict';

const API_PATH = document.getElementById('api-path').value;

const Recharge = React.createClass({
    getInitialState: function () {
        return {
            tab: 'fee',
            product_fee: [],
            user_score: this.props.is_login ? this.props.user_score : '--',
            pay_score: null,
            bizNo: null,
            login: this.props.is_login,
            phone: '',
            price: ''
        }
    },
    componentDidMount: function () {
        if (this.state.tab == 'fee') {
            $FW.Ajax({
                url: API_PATH + '/api/v1/phone/fee/recharge.json',
                //url: "http://10.10.100.112/mockjs/4/api/v1/phone/fee/recharge.json",
                enable_loading: true,
                success: function (data) {
                    let pay_score;
                    data.fee.forEach((i)=> {
                        if (i.bizNo == data.defaultBizNo)
                            pay_score = i.score;
                    })

                    if (!pay_score) console.log('no match default bizNo', data);

                    this.setState({
                        pay_score: pay_score,
                        bizNo: data.defaultBizNo,
                        product_fee: data.fee
                    })
                }.bind(this)
            });
        }
    },

    changeValueHandler: function (e) {
        this.setState({phone: e.target.value});
    },

    getSMSCodeHandler: function () {
        let v = this.state.phone;
        let myreg = /^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/;
        if (this.state.login) {
            if (this.state.user_score < this.state.pay_score) {
                $FW.Component.Alert("充值失败，工分不足！");
            } else if (v == '') {
                $FW.Component.Alert("请输入手机号！");
            }else if(!myreg.test(v)){
                $FW.Component.Alert("手机号格式不正确！");
            }else{
                   confirmPanel.show();
            }
        }else{
            $FW.Utils.loginMall();
        }
    },

    getFormData: function () {
        return {
            bizNo: this.state.bizNo,
            phone: this.state.phone,
            sms_code: '',
            price: this.state.price
        }
    },

    tab2handler: function () {
        $FW.Component.Alert("正在建设中，敬请期待！");
    },
    render: function () {

        let _this = this;

        let phoneInput = (
            <div className="phonenumber-wrap">
                <input className="phone-input" placeholder="请输入手机号" number="true" onChange={this.changeValueHandler}/>
                <span className="phone-icon"></span>
            </div>
        );

        function fee_card(data, index) {
            function check() {
                _this.setState({
                    bizNo: data.bizNo,
                    price: data.price,
                    pay_score: data.score
                })
            }

            return <div className={_this.state.bizNo == data.bizNo ? "value-box selected" : "value-box"} key={index}
                        onClick={check}>
                <span className="value-num">{data.title}</span>
                {data.sub_title ?
                    <span className="limited-sale">{data.sub_title}</span> :
                    null
                }
                {_this.state.bizNo == data.bizNo ?
                    <span className="default-selected"></span> :
                    null
                }
            </div>
        }


        let fee_panel = this.state.tab == 'fee' ?
            ( <div className="value-wrap"> {this.state.product_fee.map(fee_card)} </div> ) : null;

        return (
            <div>
                <div className="tab-wrap">
                    <div className="recharge-wrap">
                        <span className={this.state.tab == 'fee' ? "recharge-tab active" : 'recharge-tab'}>话费充值</span>
                        <span className={this.state.tab == 'net' ? "recharge-tab2 active" : 'recharge-tab2'}
                              onClick={this.tab2handler}>流量充值</span>
                    </div>
                </div>

                {phoneInput}
                {fee_panel}

                <div className="payment-wrap">
                    <div className="payment-way">支付方式<span>工分支付</span></div>
                    <div className="avail-gongfeng-wrap">
                        <div className="avail-gonfeng">
                            可用工分：<span> {this.state.user_score}</span>
                        </div>
                        <div className="total-gonfeng">
                            总计： <span>{this.state.pay_score}工分</span>
                        </div>
                    </div>
                </div>

                <div className="telconfirm-btn">
                    <div onClick={this.getSMSCodeHandler}>立即充值</div>
                </div>

            </div>
        );
    }
});

const ConfirmPop = React.createClass({
    getInitialState: function () {
        return {
            show: false,
            value: '',
            remain: 0,
            show_warn:false,
            show_text:''
        }
    },
    show: function () {
        this.setState({show: true});
        //this.tick();
    },
    hide: function () {
        this.setState({
            show: false
        })
    },
    changeValueHandler: function (e) {
        this.setState({value: e.target.value});
    },
    countingDown: function () {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({remain: this.state.remain - 1});
    },
    tick: function () {
        this.setState({remain: 60});
        this._timer = setInterval(this.countingDown, 1000);
    },
    getSmsCodeHandler: function () {
        var _this = this;
        if (this.state.remain <= 0) {
            this.tick();
            $FW.Ajax({
                url: API_PATH + "/mall/api/order/v1/SendPhoneVerifyPay.json",
                //url: "http://10.10.100.112/mockjs/4/mall/api/order/v1/SendPhoneVerifyPay.json",
                method: 'get',
                success: function(data){
                    $FW.Component.Alert(data.validateCode);
                },
                fail: function (code,message,response){
                    _this.setState({
                        show_warn:true,
                        show_text:message,
                        remain: 0
                    });
                    return true;
                }
            })
        }
    },
    submitHandler: function () {
        var _this = this;
        var form_data = rechargePanel.getFormData();
        $FW.Ajax({
            url: API_PATH + '/mall/api/v1/getToken.json',
            //url : "http://10.10.100.112/mockjs/4/mall/api/v1/getToken.json",
            method: "get",
            success: function (data) {
                var token = data.token;
                $FW.Ajax({
                    url: API_PATH + '/api/v1/phone/recharge-order.json',
                    //url: "http://10.10.100.112/mockjs/4/api/v1/phone/recharge-order.json",
                    enable_loading: true,
                    method: 'get',
                    data: {
                        phone: form_data.phone,
                        //price: form_data.price,
                        sms_code: _this.state.value,
                        bizNo: form_data.bizNo,
                        sourceType: $FW.Browser.inApp() ? ($FW.Browser.inAndroid() ? 4 : 3) : 2,
                        tokenStr: token
                    },
                    success: function () {
                        _this.setState({
                            show: false,
                            user_score: _this.state.user_score - _this.state.pay_score
                        });
                        $FW.Component.Alert("充值成功！");
                    },
                    fail: function (code,message,response) {
                        _this.setState({
                            show_warn:true,
                            show_text:message
                        });
                        return true;
                        //$FW.Component.Alert("充值失败！");
                    }
                })
            }
        });
    },

    render: function () {
        if (!this.state.show) return null;
        let frequent_tip = this.state.show_warn ? (<div className="wrong-tip">{this.state.show_text}</div>) : null;
        return (
            <div className="pop-wrap">
                <div className="confirm-pop">
                    <div className="pop-header">输入验证码<span className="pop-close" onClick={this.hide}></span>
                    </div>
                    <div className="pop-content">
                        <div className="confirm-sms-code">
                            <input type="text" placeholder="请输入验证码" className="sms-input" value={this.state.value}
                                   onChange={this.changeValueHandler}/>
                            <span className={this.state.remain>0 ? "btn-countdown" : "sms-btn"}
                                  onClick={this.getSmsCodeHandler}>{this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                        </div>
                        {frequent_tip}
                        <div className="pop-confirm-btn" onClick={this.submitHandler}>确认</div>
                        <div className="pop-tip">充值后1~10分钟到账</div>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('充值专区');

    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={"充值专区"} back_handler={backward}/>, document.getElementById('header'));

    $FW.Ajax({
        url: API_PATH + '/api/v1/user-state.json',
        //url: "http://10.10.100.112/mockjs/4/api/v1/user-state.json",
        enable_loading: true,
        success: function (data) {
            window.rechargePanel = ReactDOM.render(<Recharge is_login={data.is_login} user_score={data.score}/>,
                document.getElementById('cnt'));
        }
    });
    window.confirmPanel = ReactDOM.render(<ConfirmPop />, document.getElementById('dialog'));
});

function backward(){
    location.href = '/';
}

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') backward()
};