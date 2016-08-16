'use strict';

const API_PATH = document.getElementById('api-path').value;

const Recharge = React.createClass({
    getInitialState: function () {
        this.tabs = ['fee', 'net'];
        return {
            tab: 'fee',
            product_fee: [],
            user_score: this.props.is_login ? this.props.user_score : '--',
            fee_pay_score: null,
            net_pay_score: null,
            bizNo: null,
            login: this.props.is_login,
            phone: '',
            format_phone: '',
            price: '',
            operator: ''
        }
    },
    componentDidMount: function () {
       this.switchState('fee');
    },

    switchState: function(tab){
        if (tab == 'fee') {
            this.reloadFeeHandler();
        } else if (tab == 'net') {
            var opt = this.getOperator(this.state.phone);
            if(opt == 'unknown' || opt == 'invalid') opt = 'mobile';
            this.reloadNetHandler(opt);
        }

        if(tab != this.state.tab) {
            this.setState({
                tab: tab,
                phone: '',
                operator:''
            })
        }
    },

    reloadFeeHandler: function(){
        $FW.Ajax({
            url: API_PATH + 'api/v1/phone/fee/recharge.json',
            //url:"http://localhost/recharge.json",
            enable_loading: true,
            success: function (data) {
                let pay_score;
                data.fee.forEach((i)=> {
                    if (i.bizNo == data.defaultBizNo)
                        pay_score = i.score;
                })

                if (!pay_score) console.log('no match default bizNo', data);

                this.setState({
                    fee_pay_score: pay_score,
                    bizNo: data.defaultBizNo,
                    product_fee: data.fee
                })
            }.bind(this)
        });
    },

    reloadNetHandler: function(operator){
        var code = operator == 'mobile' ? 1034 : (operator == "union" ? 1032 : 1033);
        $FW.Ajax({
            url: API_PATH + 'api/v1/phone/net/recharge.json',
            enable_loading: true,
            data:{ operator: code},
            success: function (data) {
                let pay_score;
                data.fee.forEach((i)=> {
                    if (i.bizNo == data.defaultBizNo)
                        pay_score = i.score;
                })

                if (!pay_score) console.log('no match default bizNo', data);

                this.setState({
                    net_pay_score: pay_score,
                    bizNo: data.defaultBizNo,
                    product_fee: data.fee
                })
            }.bind(this)
        });
    },

    getOperator: function(phone){
        var mobile_reg = /^1(3[4-9]|4[7]|5[012789]|7[8]|8[23478])\d{8}$/;
        var union_reg = /^1(3[0-2]|4[5]|5[56]|7[156]|8[56])\d{8}$/;
        var tele_reg = /^1(3[3]|4[9]|5[3]|7[37]|8[019])\d{8}$/;
        var virtual_reg = /^170\d{8}$/;
        var r;

        if(mobile_reg.test(phone)){
            r = 'mobile'
        } else if(union_reg.test(phone)){
            r = 'union'
        } else if(tele_reg.test(phone)){
            r = 'tele'
        } else if(virtual_reg.test(phone)){
            r = 'virtual'
        } else if(phone.length == 11){
            r = 'unknown'
        } else {
            r = 'invalid'
        }
        return r
    },

    switchNetData: function(phone){
        var operator = this.getOperator(phone);
        if(operator == 'unknown') {
            $FW.Component.Alert("该号码不能识别！");
        } else if (operator == 'virtual') {
            $FW.Component.Alert("暂不支持虚拟运营商号段！");
        } else {
            if(operator != this.state.operator && operator != 'unknow' && operator != 'invalid' )
            this.reloadNetHandler(operator);
        }
    },

    changeValueHandler: function (e) {
        var v = e.target.value + '';
        v = v.replace(/ /g, '');
        if(isNaN(v)) return;
        if(v.length > 3) v = v.substr(0, 3) + ' ' + v.substr(3);
        if(v.length > 8) v = v.substr(0, 8) + ' ' + v.substring(8, 12);

        let phone = v.replace(/ /g, '');
        this.setState({
            phone: phone,
            format_phone: v
        });

        var opt = this.getOperator(phone);
        if(opt != 'invalid') this.setState({operator: opt});

        if(this.state.tab == 'net')
        this.switchNetData(phone);
    },

    getSMSCodeHandler: function () {
        let v = this.state.phone;
        let myreg = /^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/;
        if (this.state.login) {
            if (this.state.user_score < this.state.fee_pay_score || this.state.user_score < this.state.net_pay_score) {
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

    costPayScore: function(){
        if(this.state.tab == 'fee'){
            this.setState({
                user_score: this.state.user_score - this.state.fee_pay_score
            })
        }
        if(this.state.tab == 'net'){
            this.setState({
                user_score: this.state.user_score - this.state.net_pay_score
            })
        }
    },
    getOperatorName: function(){
        var name;
        if(!this.state.phone) return;

        switch(this.state.operator) {
            case 'union':
                name = '中国联通';
                break;
            case 'mobile':
                name = '中国移动';
                break;
            case 'tele':
                name = '中国电信';
                break;
            default:
                name = '';
        }
        return name
    },

    emptyHandler: function() {
        this.setState({phone: ''});
    },

    render: function () {

        let _this = this;


        let phoneInput = (
            <div className="phonenumber-wrap">
                <span className="phone-icon"></span>
                <input type="number" className="phone-input" placeholder="请输入手机号" number="true"
                       value={this.state.phone}
                       onChange={this.changeValueHandler}/>
                <span className="phone-operator">{this.getOperatorName()}</span>
                <span className="phone-empty" onClick={this.emptyHandler}></span>
            </div>
        );


        function fee_card(data, index) {
            function check() {
                _this.setState({
                    bizNo: data.bizNo,
                    price: data.price,
                    fee_pay_score: data.score
                })
            }

            return <div className={_this.state.bizNo == data.bizNo ? "value-box selected" : "value-box"} key={index}
                        onClick={check}>
                <span className="value-num">{data.title}<span className="price-unit">元</span></span>
                {data.sub_title ?
                    <span className="limited-sale"><span className="limited-sale-icon"></span><span className="limited-sale-title">{data.sub_title}</span></span> :
                    null
                }
                {_this.state.bizNo == data.bizNo ?
                    <span className="default-selected"></span> :
                    null
                }
            </div>
        }

        function net_card(data, index) {
            function check() {
                _this.setState({
                    bizNo: data.bizNo,
                    price: data.price,
                    net_pay_score: data.score
                })
            }

            return <div className={_this.state.bizNo == data.bizNo ? "value-box selected" : "value-box"} key={index}
                        onClick={check}>
                <span className="value-num">{data.title}</span>
                {data.sub_title ?
                    <span className="limited-sale"><span className="limited-sale-icon"></span><span className="limited-sale-title">{data.sub_title}</span></span> :
                    null
                }
                {_this.state.bizNo == data.bizNo ?
                    <span className="default-selected"></span> :
                    null
                }
            </div>
        }


        let fee_panel = this.state.tab == 'fee' ?
            ( <div className="value-wrap">{this.state.product_fee.map(fee_card)}</div> ) : null;

        let net_panel = this.state.tab == 'net' ?
            ( <div className="value-wrap"> {this.state.product_fee.map(net_card)} </div> ) : null;

        let fee_pay_score = this.state.tab == 'fee' ? this.state.fee_pay_score : null;
        let net_pay_score = this.state.tab == 'net' ? this.state.net_pay_score : null;


        let tab = function (i) {
            let name = {
                fee: '话费充值',
                net: '流量充值'
            };

            return (
                <div className="tab-innerwrap">
                    <span key={i} className={i==_this.state.tab ? "recharge-tab active" : "recharge-tab"}
                         onClick={function(){_this.switchState(i)}}>
                        <span>{name[i]}</span>
                    </span>
               </div>
            )
        };

        return (
            <div>
                <div className="tab-wrap">
                    <div className="recharge-wrap">
                        {this.tabs.map(tab)}
                    </div>
                </div>

                {phoneInput}
                {fee_panel}
                {net_panel}

                <div className="payment-wrap">
                    <div className="payment-way">支付方式<span>工分支付</span></div>
                    <div className="avail-gongfeng-wrap">
                        <div className="avail-gonfeng">
                            可用工分：<span> {this.state.user_score}</span>
                        </div>
                        <div className="total-gonfeng">
                            总计： <span>{fee_pay_score}{net_pay_score}工分</span>
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
            show_text:'',
            loading: false
        }
    },
    show: function () {
        this.setState({show: true});
        //this.tick();
    },
    hide: function () {
        this.setState({
            show: false,
            value: '',
            remain: 0,
            show_warn:false,
            show_text:''
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
                url: API_PATH + "mall/api/order/v1/SendPhoneVerifyPay.json",
                method: 'get',
                success: function(data){
                    $FW.Component.Alert("这是用于测试的验证"+data.validateCode);
                },
                fail: function (code,message,response){
                    _this.setState({
                        show_warn:true,
                        show_text:message,
                        remain: 0
                    });
                    if(code == 40101){
                        $FW.Utils.loginMall();
                    }
                    return true;
                }
            })
        }
    },
    submitHandler: function () {
        var _this = this;
        var form_data = rechargePanel.getFormData();
        if(this.state.loading)
            return;
        this.setState({loading: true})
        $FW.Ajax({
            url: API_PATH + 'mall/api/v1/getToken.json',
            method: "get",
            success: function (data) {
                var token = data.token;
                $FW.Ajax({
                    url: API_PATH + 'api/v1/phone/recharge-order.json',
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
                    complete:function(){
                        _this.setState({loading: true});
                    },
                    success: function () {
                        _this.setState({
                            show: false,
                            show_warn:false,
                            remain:0,
                            value:'',
                            loading:false
                        });
                        window.rechargePanel.costPayScore();
                        $FW.Component.Alert("充值成功！");
                        //_this.reloadFeeHandler();
                    },
                    fail: function (code,message,response) {
                        _this.setState({
                            show_warn:true,
                            show_text:message,
                            loading: false
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
                        <div className={this.state.loading ? "pop-confirm-btn gray" : "pop-confirm-btn"} onClick={this.submitHandler}>确认</div>
                        <div className="pop-tip">充值后1~10分钟到账</div>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('充值专区');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"充值专区"} back_handler={backward}/>, document.getElementById('header'));
    $FW.Ajax({
        url: API_PATH + 'api/v1/user-state.json',
        //url: "http://localhost/user-state.json",
        enable_loading: true,
        success: function (data) {
            window.rechargePanel = ReactDOM.render(<Recharge is_login={data.is_login} user_score={data.score}/>,
                document.getElementById('cnt'));
        }
    });
    window.confirmPanel = ReactDOM.render(<ConfirmPop />, document.getElementById('dialog'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}
