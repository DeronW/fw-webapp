'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const OrderDetail = React.createClass({
    render: function () {
        return (
            <div>
                <NavTitle/>
                <OrderStatusList
                    shippingInfo={this.props.shipping_info}
                    distributionName={this.props.distribution}
                    statusText={this.props.status}
                    distributionCode={this.props.distribution_code}
                />
                <OrderStatusBlock products={this.props.products}/>
                <OrderPayInfo payment={this.props.payment}/>
                <OrderNumberList orderList={this.props.order}/>
            </div>
        );
    }
});

const NavTitle = React.createClass({
    render: function () {
        return (
            <div className="nav-title">
                <span className="back-btn">
                    <img src="../images/back-btn.png"/>
                </span>
                <h1 className="title">订单详情</h1>
            </div>
        );
    }
});

const OrderStatusList = React.createClass({
    render: function () {
        return (
            <div className="l-r-text">
                <div className="info-block">
                    <span className="text">订单状态</span>
                    <span className="data-text stake-text">{this.props.statusText}</span>
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
                        <img src="../images/ico-blue-location.png"/>
                    </div>

                    <div className="address-info">
                        <div className="my-info-text">
                            <span className="receipt-name">收货人:{this.props.shippingInfo.username}</span>
                            <span className="phone-number">{this.props.shippingInfo.phone}</span>
                        </div>
                        <div className="address-text">
                            <p>收货地址: {this.props.shippingInfo.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const OrderStatusBlock = React.createClass({
    render: function () {
        return (
            <div className="order-block">
                <div className="info-block">
                    <div className="order-block-info">
                        <div className="commodity-img">
                            <img src={this.props.products[0].img}/>
                        </div>

                        <div className="commodity-info">
                            <div className="commodity-name">
                                <h2>{this.props.products[0].title}</h2>
                            </div>

                            <div className="tag-block">
                                <span className="text">{this.props.products[0].tags}</span>
                            </div>

                            <div className="commodity-number">
                                <span
                                    className="money-text">￥{severStr(this.props.products[0].price.toString(), 3, ",")}
                                    + {this.props.products[0].score}分</span>
                                <span className="number-text">X{this.props.products[0].count}</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-commodity-total">
                        <span className="commodity-text">共{this.props.products[0].count}件商品</span>
                        <span className="total-text">合计: ￥{severStr(this.props.products[0].price.toString(), 3, ",")}
                            + {this.props.products[0].score}工分 + 兑换券*</span>
                    </div>
                </div>
            </div>

        );
    }
});

const OrderPayInfo = React.createClass({
    render: function () {
        return (
            <div className="order-pay-info">
                <div className="ui-block-title">
                    <h3 className="text">支付信息</h3>
                </div>
                <div className="l-r-text">
                    <div className="info-block">
                        <span className="text">兑换券支付</span>
                        <span className="data-text">{this.props.payment.voucher_name}</span>
                    </div>
                    <div className="info-block">
                        <span className="text">余额支付</span>
                        <span className="data-text">￥{this.props.payment.money}</span>
                    </div>
                    <div className="info-block">
                        <span className="text">工豆支付</span>
                        <span className="data-text">￥{this.props.payment.bean}</span>
                    </div>
                    <div className="info-block">
                        <span className="text">工分消耗</span>
                        <span className="data-text">{this.props.payment.score}</span>
                    </div>
                </div>

            </div>

        );
    }
});

const OrderNumberList = React.createClass({
    render: function () {
        return (
            <div className="order-number">
                <div className="title">
                    订单号: {this.props.orderList.id}
                </div>

                <div className="sequence">
                    <div className="sequence-text">
                        <span className="text">付款时间:</span>
                        <span className="time-text">{this.props.orderList.pay_at}</span>
                    </div>
                    <div className="sequence-text">
                        <span className="text">发货时间:</span>
                        <span className="time-text">{this.props.orderList.receive_at}</span>
                    </div>
                    <div className="sequence-text">
                        <span className="text">收货时间:</span>
                        <span className="time-text">{this.props.orderList.deliver_at}</span>
                    </div>
                </div>
            </div>
        );
    }
});


$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + "mall/api/v1/order_detail.json",
        success: function (data) {
            ReactDOM.render(<OrderDetail {...data}/>, document.getElementById("cnt"));
        }
    })
});

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