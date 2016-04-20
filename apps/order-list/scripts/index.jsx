'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const NavTitle = React.createClass({
    render: function () {
        return (
            <div className="nav-title">
                <span className="back-btn">
                    <img src={STATIC_PATH + "images/back-btn.png"}/>
                </span>
                <h1 className="title">我的订单</h1>
            </div>
        );
    }
});

const MyOrderMain = React.createClass({
    getInitialState: function () {
        return {
            index: 0,
            voucherName: ["全部", "待发货", "待收货", "已完成"]
        };
    },
    clickHandler: function (index) {
        this.setState({
            index: index
        });
    },

    render: function () {
        var self = this;

        var btnVoucher = (v, index) => (
            <div key={index} className={index == this.state.index ? "btn-tab select-li" : "btn-tab"}
                 style={{backgroundImage: "url("+STATIC_PATH+"images/line-icon.png)"}}
                 onClick={ function() { self.clickHandler(index) } }>
                <span className="tab-text">{self.state.voucherName[index]}</span>
            </div>
        );

        return (
            <div>
                <div className="ui-tab">
                    <div> {this.state.voucherName.map(btnVoucher)} </div>
                </div>
                <OrderList index={this.state.index} orders={this.props.orders}/>
            </div>
        );
    }
});

const OrderList = React.createClass({
    getInitialState: function () {
        var state = {
            all: [],
            prepare: [],
            shipping: [],
            complete: []
        };
        this.props.orders.forEach(function (i) {
            state.all.push(i);
            state[i.status].push(i);
        });
        return state
    },
    render: function () {
        var self = this;
        let allBlock = function (s) {
            return (
                <div className="order-all">
                    { self.state[s].map((order) => <OrderBlock key={order.id} order={order} dataJson={order}/>) }
                </div>
            );
        };

        let blockText = <div className="no-commodity-block"> 对不起没有商品 </div>;

        return (
            <div className="order-area">
                {this.props.index == 0 ? (this.state.all.length != 0 ? allBlock("all") : blockText) : null}
                {this.props.index == 1 ? (this.state.prepare.length != 0 ? allBlock("prepare") : blockText) : null}
                {this.props.index == 2 ? (this.state.shipping.length != 0 ? allBlock("shipping") : blockText) : null}
                {this.props.index == 3 ? (this.state.complete.length != 0 ? allBlock("complete") : blockText) : null}
            </div>
        );
    }
});

const OrderBlock = React.createClass({
    render: function () {

        let order = this.props.order;
        let status_name;
        switch (order.status) {
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

        let tags = function (s) {
            return ( <span className="text">{s}</span> );
        };

        let product_item = function (product, index) {
            return (
                <a href={'/order/detail?order_id=' + order.id} key={index}>
                    <div className="t-info">
                        <div className="commodity-img">
                            <img src={product.img}/>
                        </div>
                        <div className="commodity-info">
                            <div className="commodity-name">
                                <h2>{product.title}</h2>
                            </div>
                            <div className="tag-block">
                                { product.tags.length != 0 ? tags(product.tags) : null }
                            </div>
                            <div className="commodity-number">
                                <span className="money-text">￥{product.price} + {product.score}分</span>
                                <span className="number-text">X{product.count}</span>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };

        let cost_score = order.score ? '+ ' + order.score + ' 工分' : null;

        return (
            <div className="order-block">
                <div className="title-block">
                    <span className="time-text">{order.pay_at}</span>
                    <span className="ship-text">
                        {status_name}
                    </span>
                </div>
                <div className="info-block">
                    { order.products.map((p) => product_item(p)) }
                    <div className="commodity-total">
                        <span className="commodity-text">共件{order.orderCount}商品</span>
                        <span className="total-text">
                            合计:￥
                            {order.price}
                            {cost_score}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + "mall/api/member/v1/order_list.json",
        success: function (data) {
            ReactDOM.render(<MyOrderMain orders={data.orders}/>, document.getElementById("cnt"));
        }
    });
    NativeBridge.setTitle('订单列表');
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
