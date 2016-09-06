const API_PATH = document.getElementById("api-path").value;

const Mask = React.createClass({
    clickHandler: function () {
        window.history.back();
    },
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
                    <div className="close" onClick={this.clickHandler}>关闭</div>
                </div>
            </div>
        )
    }
});

const Recharge = React.createClass({
    getInitialState: function () {
        return {
            special_user: false,
            order_state: null  // 有3种,  处理中, 成功, 失败
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: API_PATH + 'mpwap/api/v1/getOpenAccountInfo.shtml',
            success: (data) => {
                // 当前开户用户是特殊用户, 不能充值
                if (data.openStatus == 5) {
                    this.setState({special_user: true})
                }
            }
        })
    },
    orderConfirm: function () {
        // this.setState({order_state: 'processing'});
        // setTimeout(this.checkRechargeResult, 2000)
        this.checkRechargeResult();
    },
    checkRechargeResult: function () {
        this.setState({order_state: 'success'})
    },
    inspectResult: function () {
        this.setState({order_state: 'fail'})
    },
    render: function () {

        var deny = <Mask username={this.props.data.bankInfo.realName}/>;

        return (
            <div>
                {this.state.special_user ? deny : null}
                {this.state.order_state == 'processing' ?
                    <Recharge.OrderProcessing remain={6} checkRechargeResult={this.checkRechargeResult}
                                              inspectResult={this.inspectResult}/> : null}
                {this.state.order_state == 'success' ? <Recharge.OrderSuccess /> : null}
                {this.state.order_state == 'fail' ? <Recharge.OrderFail /> : null}

                <div className="bank">
                    <div className="ash clearfix">
                        <div className="img"><img src={this.props.data.bankInfo.bankLogo}/></div>
                        <div className="bankname">{this.props.data.bankInfo.bankName}</div>
                    </div>
                    <div className="belon">
                        <div className="name">{this.props.data.bankInfo.realName}</div>
                        <div className="num">{this.props.data.bankInfo.bankCardNo}</div>
                    </div>
                </div>

                <div className="port">如果您绑定的银行卡暂不支持手机一键支付请联系客服
                    <span className="blue">400-6766-988</span></div>

                <Form countingSeconds={60} orderConfirm={this.orderConfirm}/>

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
                        <span className="online">单笔充值不可超过该银行充值限额，
                            <span className="colr">查看各银行充值限额；</span></span>
                    </div>
                    <div className="atpr"><img className="card-d" src="images/card-d.png"/>
                        <span className="online">如果充值金额没有及时到账，请<span
                            className="colr">拨打客服</span>查询。</span></div>
                </div>
            </div>
        )
    }
});

Recharge.OrderSuccess = React.createClass({
    clickHandler: function () {
        location.reload()
    },
    render: function () {
        return (
            <div className="order-success">
                <img src="images/order-success.png"/>
                <div className="success-btn">
                    <a className="continue-charge" onClick={this.clickHandler}>继续充值</a>
                    <a className="continue-invest" href="/">去投资</a>
                </div>
            </div>
        )
    }
});

Recharge.OrderFail = React.createClass({
    render: function () {
        return (
            <div className="order-fail">
                <img src="images/order-fail.png"/>
                <div className="fail-tip">银行预留手机号错误</div>
                <a className="fail-continue-charge">继续充值</a>
            </div>
        )
    }
});

Recharge.OrderProcessing = React.createClass({
    getDefaultProps: function () {
        return {
            remain: 5
        }
    },
    getInitialState: function () {
        return {
            remain: this.props.remain
        }
    },
    componentDidMount: function () {
        this.tick()
    },
    tick: function () {
        if (this.state.remain < 1) {
            this.props.checkRechargeResult()
        } else {
            this.countdown();
            setTimeout(this.tick, 1000);
        }
    },
    countdown: function () {
        this.setState({remain: this.state.remain - 1})
    },
    render: function () {
        return (
            <div className="order-processing">
                <img src="images/order-processing.png"/>
                <div className="text">
                    {this.state.remain}s 后为您呈现投标结果
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"充值"} sub_text={"充值记录"}
                            sub_url={"/mpwap/orderuser/viewRechargeRecord.shtml"}/>,
        document.getElementById('header'));

    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getRechargeInfo.shtml",
        success: function (data) {
            window._Recharge = ReactDOM.render(<Recharge data={data}/>,
                document.getElementById("cnt"))
        }
    })
});