'use strict';

const API_PATH = document.getElementById('api-path').value;

const Recharge = React.createClass({
    render : function(){
        return (
            <div>
                <Chargetab/>
                <Telchargecon/>
            </div>
        );
    }
});

const Chargetab = React.createClass({
    render : function(){
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

const Phonenumber = React.createClass({
    propTypes : {
        number: React.PropTypes.number
    },
    render : function(){
        return (
            <div className="phonenumber-wrap">
                <input className="phone-input" type="text" placeholder="请输入手机号" number="true"/>
                <span className="phone-icon"></span>
            </div>
        )
    }
});

const Telpayment = React.createClass({
    render : function(){
        return (
            <div className="payment-wrap">
                <div className="payment-way">支付方式<span>工分支付</span></div>
                <div className="avail-gongfeng-wrap">
                    <div className="avail-gonfeng">可用工分：<span>100</span></div>
                    <div className="total-gonfeng">总计：<span>100工分</span></div>
                </div>
            </div>
        );
    }
})

const Telchargecon = React.createClass({
    getInitialState : function(){
        return {
            isDefault : true,
            selected : true,
            marked : 5
        }
    },
    clickHandler: function(){

    },
    render : function(){
        let card = (data, index) => {
            if(index==0){
                return <div className="value-box" onclick={this.clickHandler}>
                    <span>{data+"元"}</span>
                    <span className="limited-sale"></span>
                </div>
            }else{
            return <div className="value-box" onclick={this.clickHandler}>
                <span>{data+"元"}</span>
            </div>
            }
        };
        return (
            <div>
                <Phonenumber/>
                <div className="value-wrap">
                    {[10, 20, 30, 50, 100, 200, 300, 500].map(card)}
                </div>
                <Telpayment/>
                <div className="telconfirm-btn">
                    <a>立即充值</a>
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
    ReactDOM.render(<Recharge/>,document.getElementById('cnt'));
});

