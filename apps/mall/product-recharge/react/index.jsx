const Recharge = React.createClass({
    getInitialState: function () {
        this.tabs = ['fee', 'net'];
        return {
            tab: 'no_default_tab',
            product_fee: [],
            user_score: this.props.is_login ? this.props.user_score : '--',
            fee_pay_score: null,
            net_pay_score: null,
            bizNo: null,
            login: this.props.is_login,
            phone: '',
            price: '',
            operator: ''
        }
    },
    componentDidMount: function () {
        var query = $FW.Format.urlQuery();
        var tab = query.tab;
        if (tab == 1) {
            this.switchTabHandler('fee');
        }
        else {
            this.switchTabHandler('net');
        }
    },

    switchTabHandler: function (tab) {
        if (tab == this.state.tab) return;

        this.setState({
            tab: tab,
            phone: '',
            operator: ''
        });

        if (tab == 'fee') {
            this.reloadFeeHandler();
        } else if (tab == 'net') {
            this.reloadNetHandler();
        }

    },

    reloadFeeHandler: function () {
        $FW.Ajax({
            url: API_PATH + 'mall/api/v1/phone/fee/recharge.json',
            enable_loading: 'mini',
            success: function (data) {
                let pay_score;
                data.fee.forEach((i)=> {
                    if (i.bizNo == data.defaultBizNo)
                        pay_score = i.score;
                });

                if (!pay_score) console.log('no match default bizNo', data);

                this.setState({
                    fee_pay_score: pay_score,
                    bizNo: data.defaultBizNo,
                    product_fee: data.fee
                })
            }.bind(this)
        });
    },

    reloadNetHandler: function () {
        var opt = this.state.operator;
        var code = opt == 'union' ? 1032 : (opt == 'tele' ? 1033 : 1034);

        console.log('load net', code)

        $FW.Ajax({
            url: API_PATH + 'api/v1/phone/net/recharge.json',
            enable_loading: 'mini',
            data: {operator: code},
            success: function (data) {
                let pay_score = 0;
                data.fee.forEach((i)=> {
                    if (i.bizNo == data.defaultBizNo)
                        pay_score = i.score;
                });
                this.setState({
                    net_pay_score: pay_score,
                    bizNo: data.defaultBizNo,
                    product_fee: data.fee
                })
            }.bind(this)
        });
    },

    getOperator: function (phone) {
        var mobile_reg = /^1(3[4-9]|4[7]|5[012789]|7[8]|8[23478])\d{8}$/;
        var union_reg = /^1(3[0-2]|4[5]|5[56]|7[156]|8[56])\d{8}$/;
        var tele_reg = /^1(3[3]|4[9]|5[3]|7[37]|8[019])\d{8}$/;
        var virtual_reg = /^170\d{8}$/;
        var r;

        if (mobile_reg.test(phone)) {
            r = 'mobile'
        } else if (union_reg.test(phone)) {
            r = 'union'
        } else if (tele_reg.test(phone)) {
            r = 'tele'
        } else if (virtual_reg.test(phone)) {
            r = 'virtual'
        } else if (phone.length == 11) {
            r = 'unknown'
        } else {
            r = 'invalid'
        }
        return r
    },

    switchNetData: function () {
        var operator = this.state.operator;
        if (operator == 'unknown') {
            $FW.Component.Alert("该号码不能识别！");
        } else if (operator == 'virtual') {
            $FW.Component.Alert("暂不支持虚拟运营商号段！");
        } else {
            this.reloadNetHandler();
        }
    },

    phoneChangeHandler: function (e) {
        var phone = e.target.value.toString().substring(0, 11);
        this.setState({phone: phone});
        this.setOperator(phone);
    },

    setOperator: function (phone) {
        var opt = this.getOperator(phone);

        var cb = () => null;

        if (this.state.tab == 'net' && this.state.operator != opt && opt != 'invalid')
            cb = () => this.switchNetData();

        this.setState({operator: opt}, cb);
    },

    getSMSCodeHandler: function () {
        let v = this.state.phone;
        if (!this.state.login)
            return $FW.Utils.loginMall();
        if (v == '')
            return $FW.Component.Alert("请输入手机号！");
        if (!/^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/.test(v))
            return $FW.Component.Alert("手机号格式不正确！");
        if (this.state.tab == 'fee' && this.state.user_score < this.state.fee_pay_score)
            return $FW.Component.Alert("充值失败，工分不足！");
        if (this.state.tab == 'net' && this.state.user_score < this.state.net_pay_score)
            return $FW.Component.Alert("充值失败，工分不足！");
        window.confirmPanel.show();
    },

    getFormData: function () {
        return {
            bizNo: this.state.bizNo,
            phone: this.state.phone,
            sms_code: '',
            price: this.state.price
        }
    },

    costPayScore: function () {
        if (this.state.tab == 'fee') {
            this.setState({
                user_score: this.state.user_score - this.state.fee_pay_score
            })
        }
        if (this.state.tab == 'net') {
            this.setState({
                user_score: this.state.user_score - this.state.net_pay_score
            })
        }
    },
    getOperatorName: function () {
        var opt = this.state.operator;
        if (opt == 'union') return '中国联通';
        if (opt == 'mobile') return '中国移动';
        if (opt == 'tele') return '中国电信';
        if (opt == 'virtual') return '虚拟运营商';
        if (opt == 'unknown') return '未知运营商';
        if (opt == 'invalid') return '';
    },

    emptyHandler: function () {
        this.setState({phone: ''});
        this.setOperator('');
    },
    setCheckedBizNo: function (bizNo, price, score) {
        this.setState({
            bizNo: bizNo,
            price: price,
            fee_pay_score: score,
            net_pay_score: score
        })
    },
    render: function () {

        let pay_score;
        if (this.state.tab == 'fee') {
            pay_score = this.state.fee_pay_score;
        } else if (this.state.tab == 'net') {
            pay_score = this.state.net_pay_score;
        }

        let tab = (i, index)=> {
            return <div key={index} className={i == this.state.tab ? 'active' : null}
                        onClick={()=> this.switchTabHandler(i)}>
                {i == 'fee' ? '话费' : '流量'}充值
            </div>
        };

        let RechargeTip = this.state.operator == 'union' ? '全国可用，即时生效，当月有效，同档位限充3次' : (this.state.operator == 'tele' ? '全国可用，即时生效，当月有效' : '全国可用，24小时内生效，当月有效');

        return (
            <div>
                <div className="recharge-panel-tab"> {this.tabs.map(tab)} </div>

                <div className="phonenumber-wrap">
                    <span className="phone-icon"> </span>
                    <input type="number" className="phone-input"
                           placeholder="请输入手机号" number="true"
                           value={this.state.phone}
                           onChange={this.phoneChangeHandler}/>
                    <span className="phone-operator">{this.getOperatorName()}</span>
                    <span className="phone-empty" onClick={this.emptyHandler}> </span>
                </div>
                {this.state.tab == 'net' ? <div className="recharge-tip">{RechargeTip}</div> : null}
                <Recharge.ProductPanel products={this.state.product_fee} bizNo={this.state.bizNo}
                                       setCheckedBizNo={this.setCheckedBizNo}/>

                <div className="payment-wrap">
                    <div className="payment-way">支付方式<span>工分支付</span></div>
                    <div className="avail-gongfeng-wrap">
                        <div className="avail-gonfeng">
                            可用工分：<span> {this.state.user_score}</span>
                        </div>
                        <div className="total-gonfeng">
                            总计： <span>{pay_score}工分</span>
                        </div>
                    </div>
                </div>

                <div className="telconfirm-btn" onClick={this.getSMSCodeHandler}>立即充值</div>
            </div>
        );
    }
});


Recharge.ProductPanel = React.createClass({
    render: function () {

        var _this = this;
        var bizNo = this.props.bizNo;

        function fee_card(data, index) {
            function check() {
                _this.props.setCheckedBizNo(data.bizNo, data.price, data.score)
            }

            let checked = <span className="default-selected"></span>;

            let sub_title = <span className="limited-sale">
                        <span className="limited-sale-icon"></span>
                        <span className="limited-sale-title">
                            {data.sub_title}</span>
                    </span>;

            let class_name = bizNo == data.bizNo ? "value-box selected" : "value-box";

            return <div className={class_name} key={index} onClick={check}>
                <span className="value-num">
                    {data.title}
                    <span className="value-unit">{data.unit}</span>
                </span>
                {data.sub_title ? sub_title : null }

                {bizNo == data.bizNo ? checked : null}
            </div>
        }

        return (
            <div className="value-wrap">
                {this.props.products.map(fee_card)}
            </div>
        )
    }
});


$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"充值中心"}/>, HEADER_NODE)

    $FW.Ajax({
        url: API_PATH + 'mall/api/v1/user-state.json',
        enable_loading: 'mini',
        success: function (data) {
            window.rechargePanel = ReactDOM.render(<Recharge is_login={data.is_login} user_score={data.score}/>,
                CONTENT_NODE);
        }
    });
    window.confirmPanel = ReactDOM.render(<ConfirmPop />, document.getElementById('dialog'));
});

