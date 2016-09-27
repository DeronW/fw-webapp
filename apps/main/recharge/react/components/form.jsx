

const Form = React.createClass({
    getDefaultProps: function () {
        return {
            countingSeconds: 60,
            money: null,
            phone: null,
            verify_code: null,
            token: ""
        }
    },
    getInitialState: function () {
        return {
            phone:this.props.phone,
            money: "",
            counting: 0,
            phoneBlur: true,
            modifyPhoneShow: false
        }
    },
    componentDidUpdate: function() {
        if (this.state.phoneBlur) {
            if (ReactDOM.findDOMNode(this.refs.phoneRef) !== null) {
                ReactDOM.findDOMNode(this.refs.phoneRef).focus();
            }
        }
    },
    clickHandler: function () {
        if(this.state.money && this.state.phone) {
            if (this.state.counting != 0) return;
            this.setState({counting: this.props.countingSeconds});
            this.timer = setInterval(()=> {
                this.setState({counting: this.state.counting - 1});
                if (this.state.counting < 1) {
                    clearInterval(this.timer)
                }
            }, 1000);

            $FW.Ajax({
                url: API_PATH + 'mpwap/api/v1/getRechargeCode.shtml',
                method: 'POST',
                data: {
                    phoneNo: this.state.phone
                },
                success: function (data) {
                    this.setState({token: data.smsSerialNo})
                }.bind(this)
            })
        }
    },
    moneyChangeHandler: function (e) {
        var money = e.target.value;

        if(money[0] === "0" ) {
            this.setState({
                money: ""
            });
            return false;
        }

        this.setState({
            money: numberFormat.format(money)
        });
    },
    phoneChangeHandler: function (e) {
        let v = numberFormat.phoneFun(e.target.value);
        if(v.length > 11) return;

        this.setState({
            modifyPhoneShow: v.length == 11,
            phone: numberFormat.phoneFun(v)
        })
    },
    codeChangeHandler: function (e) {
        this.setState({verify_code: e.target.value});
    },
    submitHandler: function () {
        var phoneVal = this.props.phone;

        console.log(phoneVal);

        if(this.state.money < 1) {
            $FW.Component.Toast("充值金额不能低于1元");
        } else if (!this.state.money) {
            $FW.Component.Alert('请输入充值金额')
        } else if (!this.state.phone) {
            $FW.Component.Alert('请输入银行预留手机号')
        } else if (phoneVal.length == 11 ?  false : !isMobilePhone(this.state.phone)) {
            $FW.Component.Alert('手机号格式不对');
        } else if (!this.state.verify_code) {
            $FW.Component.Alert('请输入验证码')
        } else {
            $FW.Ajax({
                url: API_PATH + 'mpwap/api/v1/index.shtml',
                data: {
                    payAmount: this.state.money,
                    smsCode: this.state.verify_code,
                    phoneNo: this.state.phone,
                    validateNo: this.state.token
                },
                success: () => this.props.orderConfirm()
            })
        }
    },
    handlerModifyPhone: function() {
        this.props.callbackPopModifyPhone(true);
    },
    handlerSave: function() {
        $FW.Ajax({
            url: API_PATH + '/mpwap/api/v1/changBankPhone.shtml?phoneNum=' + this.state.phone,
            success: (data) => {
                this.setState({
                    modifyPhoneShow: false,
                })
            }
        })
    },
    handlerOnBlur: function() {
        this.setState({
            phoneBlur: false
        });
    },
    render: function () {
        var _this = this;

        let btn_class = this.state.money >= 1 && this.state.phone ? "gqm blued" : "gqm gray";

        var propsPhone = this.props.phone;
        var popModifyPhoneVal = this.props.addPopModifyPhone;

        var modifyPhone = function() {
            if(propsPhone == "") {
                return null
            } else {
                if(_this.state.modifyPhoneShow) {
                    return <span className="modify-phone-btn" onClick={_this.handlerSave}>保存</span>
                } else {
                    return <span className="modify-phone-btn" onClick={_this.handlerModifyPhone}>修改</span>
                }

            }
        };

        console.log(this.props.addPopModifyPhone);

        return (
            <div className="modify">
                <div className="money">
                    <input className="recha" value={this.state.money}
                           onChange={this.moneyChangeHandler}
                           placeholder="输入充值金额，最低1元"/>
                </div>
                <div className="money hao">
                    <div className="bank-phone-text">
                        {

                            popModifyPhoneVal == "" ?  propsPhone :  popModifyPhoneVal.substring(0, 3) + "****" + popModifyPhoneVal.substring((popModifyPhoneVal.length - 4), popModifyPhoneVal.length)

                        }
                    </div>

                    {
                        modifyPhone()
                    }

                </div>
                <div className="form clearfix">
                    <div className="srcode">
                        <input type="text" className="code" value={this.state.verify_code}
                               onChange={this.codeChangeHandler}
                               placeholder="请输入验证码"/>
                    </div>
                    <div className={btn_class} onClick={this.clickHandler}>
                        {this.state.counting ? this.state.counting + 's' : '获取验证码'}
                    </div>
                </div>

                <div className="credit" onClick={this.submitHandler}>充值</div>


            </div>
        )
    }
});
