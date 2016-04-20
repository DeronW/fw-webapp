'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const OrderDetail = React.createClass({
    render: function () {

        return (
            <div>
                <div className="nav-title">
                <span className="back-btn">
                    <img src={STATIC_PATH+"images/back-btn.png"}/>
                </span>
                    <h1 className="title">订单详情</h1>
                </div>
                <OrderStatusList
                    shippingInfo={this.props.shipping_info}
                    distributionName={this.props.distribution}
                    status={this.props.status}
                    distributionCode={this.props.distribution_code}
                />
                <OrderStatusBlock order={this.props.order} products={this.props.products}/>
                <OrderPayInfo payment={this.props.payment}/>
                <OrderNumberList order={this.props.order}/>
            </div>
        );
    }
});

const OrderStatusList = React.createClass({
    render: function () {

        let status_name;
        switch (this.props.status) {
            case 'prepare':
                status_name = '待发货';
                break;
            case 'shipping':
                status_name = '待收货';
                break;
            case 'complete':
                status_name = '已完成';
                break;
        }

        return (
            <div className="l-r-text">
                <div className="info-block">
                    <span className="text">订单状态</span>
                    <span className="data-text stake-text">
                        {status_name}
                    </span>
                </div>
                <div className="info-block">
                    <span className="text">物流名称</span>
                    <span className="data-text">{this.props.distributionName}</span>
                </div>
                <div className="info-block">
                    <span className="text">物流编号</span>
                    <span className="data-text">{this.props.distributionCode}</span>
                </div>
                <div className="address-list">
                    <div className="address-icon">
                        <img src={STATIC_PATH+"images/ico-blue-location.png"}/>
                    </div>

                    <div className="address-info">
                        <div className="my-info-text">
                            <span className="receipt-name">收货人:{this.props.shippingInfo.address}</span>
                            <span className="phone-number">{this.props.shippingInfo.phone}</span>
                        </div>
                        <div className="address-text">
                            <p>收货地址: {this.props.shippingInfo.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const OrderStatusBlock = React.createClass({
    render: function () {
        var self = this;
        let products = this.props.products;

        let orderBlock = function (d, index) {

            let score_cost = d.score ? '+ ' + d.score + '分' : null;
            let ticket_num = d.ticket_num ? '+ 兑换券*' + d.ticket_num : null;

            return (
                <div className="order-block" key={index}>
                    <div className="info-block">
                        <div className="order-block-info">
                            <div className="commodity-img">
                                <img src={d.img}/>
                            </div>

                            <div className="commodity-info">
                                <div className="commodity-name">
                                    <h2>{d.title}</h2>
                                </div>
                                <div className="tag-block">
                                    { d.tags.length != 0 ? products.tags.map((s, index) =>
                                        <span key={index} className="text">{s}</span>) : null }
                                </div>
                                <div className="commodity-number">
                                    <span className="money-text">
                                        ￥{$FW.Format.currency(d.price)}
                                        {score_cost}</span>
                                    <span className="number-text">&times;{d.count}</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-commodity-total">
                            <span className="commodity-text">共{self.props.order.count}件商品</span>
                            <span className="total-text">
                                合计: ￥{$FW.Format.currency(self.props.order.price)}
                                {score_cost} {ticket_num}</span>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className="order-all">
                { this.props.products.map((d, index) => orderBlock(d, index)) }
            </div>
        );
    }
});

const OrderPayInfo = React.createClass({
    render: function () {
        let payment = this.props.payment;

        let score, bean, ticket;
        if (payment.score) {
            score = (
                <div className="info-block">
                    <span className="text">工分消耗</span>
                    <span className="data-text">{payment.score}</span>
                </div>
            )
        }
        if (payment.bean) {
            bean = (
                <div className="info-block">
                    <span className="text">工豆支付</span>
                    <span className="data-text">￥{payment.bean}</span>
                </div>
            )
        }
        if (payment.ticket_price) {
            ticket = (
                <div className="info-block">
                    <span className="text">兑换券支付</span>
                    <span className="data-text">{payment.ticket_price}</span>
                </div>
            )
        }

        return (
            <div className="order-pay-info">
                <div className="ui-block-title">
                    <h3 className="text">支付信息</h3>
                </div>
                <div className="l-r-text">
                    {ticket}
                    <div className="info-block">
                        <span className="text">余额支付</span>
                        <span className="data-text">￥{payment.money}</span>
                    </div>
                    {bean}
                    {score}
                </div>
            </div>
        );
    }
});

const OrderNumberList = React.createClass({
    render: function () {
        let order = this.props.order;

        return (
            <div className="order-number">
                <div className="title">
                    订单号: {order.bizNo}
                </div>

                <div className="sequence">
                    <div className="sequence-text">
                        <span className="text">付款时间:</span>
                        <span className="time-text">{order.pay_at}</span>
                    </div>
                    <div className="sequence-text">
                        <span className="text">发货时间:</span>
                        <span className="time-text">{order.deliver_at}</span>
                    </div>
                    <div className="sequence-text">
                        <span className="text">收货时间:</span>
                        <span className="time-text">{order.receive_at}</span>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    NativeBridge.ajaxStart();
    NativeBridge.setTitle('订单详情');

    let order_id = $FW.Format.urlQuery().order_id;
    if (!order_id) {
        alert('url query order_id is missing');
        return;
    }
    $FW.Ajax({
        url: API_PATH + "mall/api/member/v1/order_detail.json?orderId=" + order_id,
        success: function (data) {
            ReactDOM.render(<OrderDetail {...data}/>, document.getElementById("cnt"));
            NativeBridge.ajaxComplete();
        }
    });
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/order/list';
};

function severStr(str, n, symbol) {
    var returnStr = "";
    var c = 0;
    var newFloorStr = "";
    if (str[0] == "-") {
        c = 1;
        newFloorStr = Math.floor(str.substring(1, str.length)).toString();
    } else {
        newFloorStr = Math.floor(str).toString();
    }
    var a = newFloorStr.length % n;
    var b = 0;
    var poin = str.substr(newFloorStr.length, str.length);
    returnStr = (a != 0) ? (newFloorStr.substring(0, a) + symbol) : "";
    var newStr = newFloorStr.substring(a, newFloorStr.length);
    for (var i = 1; i < newStr.length + 1; i++) {
        if (i == b + n) {
            if (i == newStr.length) {
                returnStr = returnStr + newStr.substring(b, i - c) + poin;
            } else {
                returnStr = returnStr + newStr.substring(b, i) + symbol;
            }
            b = i;
        }
    }

    if (c == 1) {
        return "-" + returnStr;
    } else {
        return returnStr;
    }
}
