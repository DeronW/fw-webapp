'use strict';
const API_PATH = document.getElementById('api-path').value;

const Payment = React.createClass({
    getInitialState:function(){
        return {
            index:1
        }
    },
    componentDidMount:function(){

    },
    payCheck:function(arg){
        this.setState({index: arg});
    },
    render : function(){
        return (
            <div className="order-payment">
                <div className="order-status">
                    <div className="pay-tip">请在23小时59分59秒内完成支付</div>
                    <div className="pay-price">金额:<span>￥299元</span></div>
                </div>
                <div className="order-products">
                    <div className="order-item">
                        <span className="order-item-name">爱奇艺VIP周卡兑换码</span>
                        <span className="order-item-amount">×1</span>
                    </div>
                    <div className="order-item">
                        <span className="order-item-name">爱奇艺VIP周卡兑换码</span>
                        <span className="order-item-amount">×1</span>
                    </div>
                </div>
                <div className="pay-way">
                    <div className="pay-item" onClick={this.payCheck.bind(this,1)}>
                        <div className="pay-icon"><img src="images/bankpay.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">招商银行储蓄卡  尾号8412</div>
                            <div className="pay-subtitle">已绑定银行卡（支付服务由先锋金融提供）</div>
                        </div>
                        <div className={this.state.index==1 ? "pay-check active" : "pay-check"} ></div>
                    </div>
                    <div className="pay-item" onClick={this.payCheck.bind(this,2)}>
                        <div className="pay-icon"><img src="images/wechat.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">微信支付</div>
                            <div className="pay-subtitle">推荐安装微信5.0及以上版本的用户使用</div>
                        </div>
                        <div className={this.state.index==2 ? "pay-check active" : "pay-check"}></div>
                    </div>
                    <div className="pay-item" onClick={this.payCheck.bind(this,3)}>
                        <div className="pay-icon"><img src="images/alipay.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">支付宝</div>
                            <div className="pay-subtitle">推荐安装支付宝5.0及以上版本的用户使用</div>
                        </div>
                        <div className={this.state.index==3 ? "pay-check active" : "pay-check"}></div>
                    </div>
                    <div className="pay-item" onClick={this.payCheck.bind(this,4)}>
                        <div className="pay-icon"><img src="images/quickpay.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">快捷支付</div>
                            <div className="pay-subtitle">支付服务由先锋金融提供，无需开通网银</div>
                        </div>
                        <div className={this.state.index==4 ? "pay-check active" : "pay-check"}></div>
                    </div>
                </div>
                <div className="pay-bar">
                    <a className="pay-btn">确认支付</a>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('订单结算');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"订单结算"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<Payment/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}