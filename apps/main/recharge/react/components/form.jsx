const Form = React.createClass({
    getDefaultProps: function () {
        return {
            countingSeconds: 60,
            money: null,
            phone: null,
            verify_code: null,
            token: null
        }
    },
    getInitialState: function () {
        return {
            phone:this.props.phone,
            counting: 0
        }
    },
    clickHandler: function () {
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
    },
    moneyChangeHandler: function (e) {
        var money = e.target.value;
        this.setState({money: money});
    },
    phoneChangeHandler: function (e) {
        this.setState({phone: e.target.value});
    },

    codeChangeHandler: function (e) {
        this.setState({verify_code: e.target.value});
    },

    submitHandler: function () {
        if (!this.state.money) {
            $FW.Component.Alert('请输入充值金额')
        } else if (!this.state.phone) {
            $FW.Component.Alert('请输入银行预留手机号')
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
    render: function () {
        return (
            <div className="modify">
                <div className="money">
                    <input className="recha" value={this.state.money}
                           onChange={this.moneyChangeHandler}
                           placeholder="输入充值金额，最低1元"/>
                </div>
                <div className="money hao">
                    <input className="recha" type="text" placeholder="输入银行预留手机号"
                           value={this.state.phone} onChange={this.phoneChangeHandler}
                    /></div>
                <div className="form clearfix">
                    <div className="srcode">
                        <input type="text" className="code" value={this.state.verify_code}
                               onChange={this.codeChangeHandler}
                               placeholder="请输入验证码"/>
                    </div>
                    <div className="gqm" onClick={this.clickHandler}>
                        {this.state.counting ? this.state.counting + 's' : '获取验证码'}
                    </div>
                </div>
                <div className="credit" onClick={this.submitHandler}>充值</div>
            </div>
        )
    }
});
