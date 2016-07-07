'use strict';

const API_PATH = document.getElementById('api-path').value;

const Recharge = React.createClass({
    getInitialState: function () {
        return {
            tab: 'fee',
            product_fee: [],
            user_score: this.props.is_login ? this.props.user_score : '--',
            pay_score: 100,
            selected: ""
        }
    },
    componentDidMount: function () {
        if (this.state.tab == 'fee') {
            $FW.Ajax({
                url: 'http://localhost/recharge.json',
                success: function (data) {
                    this.setState({product_fee: data.fee, selected: data.default})
                }.bind(this)
            });
        }
    },
    getSMSCodeHandler: function () {
        $FW.Ajax({
            url: 'http://localhost/user-state.json',
            success: confirmPanel.show()
        })
    },
    getFormData: function () {
        return {
            bizNo: this.state.bizNo,
            phone: ''
        }
    },
    render: function () {

        let _this = this;

        let phoneInput = (
            <div className="phonenumber-wrap">
                <input className="phone-input" placeholder="请输入手机号" number="true"/>
                <span className="phone-icon"></span>
            </div>
        );

        function fee_card(data, index) {
            function check() {
                _this.setState({
                    bizNo: data.bizNo,
                    pay_score: data.score,
                    selected: ""
                })
            }

            return <div className={data.default ? "value-box selected" : "value-box"} key={index} onClick={check}>
                <span className="value-num">{data.title}</span>
                {data.sub_title ?
                    <span className="limited-sale">{data.sub_title}</span> :
                    null
                }
                {data.default ?
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
                        <span className={this.state.tab == 'net' ? "recharge-tab2 active" : 'recharge-tab2'}>流量充值</span>
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
        return {show: false}
    },
    hideHandler: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById("pop-wrap"));
    },
    show: function () {
        this.setState({show: true})
    },
    hide: function () {
        this.setState({show: false})
    },
    submitHandler: function () {
        var form_data = rechargePanel.getFormData();

        $FW.Ajax({
            url: '',
            method: 'post',
            data: {
                phone: form_data.phone,
                sms_code: this.state.sms_code,
                bizNo: form_data.bizNo
            }
        })
    },
    render: function () {
        if (!this.state.show) return null;

        return (
            <div className="pop-wrap">
                <div className="confirm-pop">
                    <div className="pop-header">输入验证码<span className="pop-close" onclick={this.hideHandler}></span>
                    </div>
                    <div className="pop-content">
                        <div className="confirm-sms-code"><input type="text" placeholder="请输入验证码"
                                                                 className="sms-input"/><span
                            className="sms-btn">获取验证码</span></div>
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
        ReactDOM.render(<Header title={"充值专区"}/>, document.getElementById('header'));

    $FW.Ajax({
        url: 'http://localhost/user-state.json',
        success: function (data) {
            window.rechargePanel = ReactDOM.render(<Recharge is_login={data.is_login} user_score={data.score}/>,
                document.getElementById('cnt'));
        }
    });

    window.confirmPanel = ReactDOM.render(<ConfirmPop />, document.getElementById('dialog'));
});