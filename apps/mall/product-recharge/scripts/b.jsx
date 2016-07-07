'use strict';

const API_PATH = document.getElementById('api-path').value;

const Recharge = React.createClass({
    //getInitialState: function(){
    //    return {
    //        fee: null
    //    }
    //},
    //componentDidMount: function(){
    //    $FW.Ajax({
    //        success: {
    //            _this.setState({fee: fee})
    //        }
    //    })
    //},
    window.a =  <Feecharge />;
    render: function () {
        return (
            <div id="recharge">
                <Chargetab/>
                {window.a}
                <Telpayment />
                <div className="telconfirm-btn">
                    <a href="javascript:void(0)">立即充值</a>
                </div>
                <Confirmpop/>
            </div>
        );
    }
});

const Chargetab = React.createClass({
    render: function () {
        return (
            <div className="tab-wrap">
                <div className="recharge-wrap">
                    <span className="recharge-tab">话费充值</span>
                    <span className="recharge-tab2">流量充值</span>
                </div>
            </div>
        );
    }
});

const Feecharge = React.createClass({
    getInitialState: function(){
        return {
            commodity_data: []
        }
    },
    componentDidMount: function(){
        $FW.Ajax({
            url: 'http://localhost/recharge.json',
            method: 'get',
            success: function (data) {
                this.setState({commodity_data: data.charge})
            }.bind(this)
        });
    },
    render: function () {
        let card = (data, index) => {
            if (index == 0) {
                return <div className="value-box" onclick={this.clickHandler}>
                    <span className="value-num">{data + "元"}</span>
                    <span className="limited-sale">限时抢购</span>
                </div>
            } else {
                return <div className="value-box" onclick={this.clickHandler}>
                    <span className="value-num">{data + "元"}</span>
                </div>
            }
        };
        return (
            <div>
                <div className="phonenumber-wrap">
                    <input className="phone-input" type="text" placeholder="请输入手机号" number="true"/>
                    <span className="phone-icon"></span>
                </div>
                <div className="value-wrap">
                    {(this.state.commodity_data||[]).charge.map(card)}
                </div>
            </div>
        )
    }
});

const Telpayment = React.createClass({
    //changeScore: function(x){
    //    this.setState({needPay: x})
    //},
    getInitialState: function(){
        return {
            user_score: '--'
        }
    },
    componentDidMount: function(){
        $FW.Ajax({
            url: 'http://localhost/user-state.json',
            method: 'get',
            success: function (data) {
                this.setState({user_score: data.user_score})
            }
        });
    },
    render: function () {
        return (
            <div className="payment-wrap">
                <div className="payment-way">支付方式<span>工分支付</span></div>
                <div className="avail-gongfeng-wrap">
                    <div className="avail-gonfeng">
                        可用工分：<span>{this.state.user_score}</span></div>
                    <div className="total-gonfeng">总计：<span>100工分</span></div>
                </div>
            </div>
        );
    }
})

const Confirmpop = React.createClass({
    getInitialState: function () {
        return {show: false}
    },
    hideHandler: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById("pop-wrap"));
    },
    render: function () {
        return (
            <div className="pop-wrap" id="pop-wrap">
                <div className="confirm-pop">
                    <div className="pop-header">输入验证码<span className="pop-close" onclick={this.hideHandler}></span>
                    </div>
                    <div className="pop-content">
                        <div className="confirm-sms-code"><input type="text" placeholder="请输入验证码"
                                                                 className="sms-input"/><span
                            className="sms-btn">获取验证码</span></div>
                        <a href="javascript:void(0)" className="pop-confirm-btn">确认</a>
                        <div className="pop-tip">充值后1~10分钟到账</div>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('充值专区');

    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={"充值专区"}/>, document.getElementById('header'));
    }


    ReactDOM.render(<Recharge />, document.getElementById('cnt'));
});

