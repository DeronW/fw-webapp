const Mask = React.createClass({
    render: function () {
        return (
            <div className="cang">
                <div className="masker"></div>
                <div className="boun">
                    <div className="resp">尊敬的{this.props.username}，您好！</div>
                    <div className="beca">
                        由于您的身份信息无法通过系统验证，为了保证您的账户资金安全，您当前无法进行线上充值、投资、更换银行卡等交易。您当前的账户资金安全无虞，若有可用余额，可自行发起提现申请。
                    </div>
                    <div className="ever">有任何问题，请联系客服：<span>400-0322-988</span></div>
                    <div className="close">关闭</div>
                </div>
            </div>
        )
    }
});


const Form = React.createClass({
    getDefaultProps: function () {
        return {
            countingSeconds: 60,
            money: null
        }
    },
    getInitialState: function () {
        return {
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
        }, 1000)
    },
    moneyChangeHandler: function (e) {
        var money = e.target.value;
        this.setState({money: money});
    },
    submitHandler: function () {
        console.log(this.state.money)
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
                    <input className="recha" type="text" placeholder="输入银行预留手机号"/></div>
                <div className="form clearfix">
                    <div className="srcode">
                        <input type="text" className="code" placeholder="请输入验证码"/></div>
                    <div className="gqm" onClick={this.clickHandler}>
                        {this.state.counting ? this.state.counting + 's' : '获取验证码'}
                    </div>
                </div>
                <div className="credit" onClick={this.submitHandler}>充值</div>
            </div>
        )
    }
});


const Recharge = React.createClass({
    getInitialState: function () {
        return {
            special_user: false
        }
    },
    render: function () {

        let data = this.props.data;

        return (
            <div>
                {this.state.special_user ? <Mask username={data.username}/> : null}

                <div className="bank">
                    <div className="ash clearfix">
                        <div className="img"><img src={data.bankLogo}/></div>
                        <div className="bankname">{data.bankName}</div>
                    </div>
                    <div className="belon">
                        <div className="name">{data.username}</div>
                        <div className="num">{data.cardNumber}</div>
                    </div>
                </div>

                <div className="port">如果您绑定的银行卡暂不支持手机一键支付请联系客服<span className="blue">400-6766-988</span></div>


                <Form countingSeconds={30}/>


                <div className="rmd">
                    <div className="remin">温馨提醒</div>
                    <div className="atpr">
                        <img className="card-d" src="images/card-d.png"/>
                        <span className="online">使用快捷支付充值最低金额应大于等于1元；</span>
                    </div>
                    <div className="atpr">
                        <img className="card-d" src="images/card-d.png"/>
                        <span className="online">对充值后无投资的提现，由第三方平台收取0.4%的手续费；</span>
                    </div>
                    <div className="atpr">
                        <img className="card-d" src="images/card-d.png"/>
                        <span className="online">充值/提现必须为银行借记卡，不支持存折、信用卡充值；</span>
                    </div>
                    <div className="atpr">
                        <img className="card-d" src="images/card-d.png"/>
                        <span className="online">充值需开通银行卡网上支付功 能，如有疑问请咨询开户行客服；</span>
                    </div>
                    <div className="atpr">
                        <img className="card-d" src="images/card-d.png"/>
                        <span className="online">单笔充值不可超过该银行充值限额，<span
                            className="colr">查看各银行充值限额；</span></span>
                    </div>
                    <div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">如果充值金额没有及时到账，请<span
                        className="colr">拨打客服</span>查询。</span></div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {

    ReactDOM.render(<Header title={"充值"}/>, document.getElementById('header'));

    $FW.Ajax({
        url: "http://10.10.100.112/mockjs/12/api/v1/bind/card.json?",
        success: function (data) {
            ReactDOM.render(<Recharge data={data}/>, document.getElementById("cnt"))
        }
    })
});