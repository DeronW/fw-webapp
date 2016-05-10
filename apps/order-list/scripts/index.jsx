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

const OrderMain = React.createClass({
    getInitialState: function () {
        var index = 0;
        if (location.hash == '#prepare') {
            index = 1
        } else if (location.hash == '#shipping') {
            index = 2
        } else if (location.hash == '#complete') {
            index = 3
        }
        return {
            index: index,
            voucherName: ["全部", "待发货", "待收货", "已完成"]
        };
    },
    clickHandler: function (index) {
        this.setState({index: index});
    },

    render: function () {
        var self = this;

        // style={{backgroundImage: "url("+STATIC_PATH+"images/line-icon.png)"}}
        var btnVoucher = (v, index) => (
            <div key={index} className={index == this.state.index ? "btn-tab select-li" : "btn-tab"}
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
                    { self.state[s].map((order) => <OrderBlock key={order.orderId} order={order} dataJson={order}/>) }
                </div>
            );
        };

        let blockText = <div className="no-commodity-block">暂无记录</div>;

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

        let product_item = function (product, index) {
            let pay_score = null;
            if (product.score) pay_score = ' + ' + product.score + '工分';
            return (
                <a href={'/order/detail?order_id=' + order.orderId} key={index}>
                    <div className="t-info">
                        <div className="commodity-img">
                            <img src={product.img}/>
                        </div>
                        <div className="commodity-info">
                            <div className="commodity-name">
                                <h2>{product.title}</h2>
                            </div>
                            <div className="tag-block">
                                { product.tags.length != 0 ? product.tags.map(
                                    (i, index) => <span key={index} className="text">{i}</span>) : null }
                            </div>
                            <div className="commodity-number">
                                <span className="money-text">&yen;{product.price}{pay_score}</span>
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
                    { order.products.map((p, index) => product_item(p, index)) }
                    <div className="commodity-total">
                        <span className="commodity-text">共件{order.orderCount}商品</span>
                        <span className="total-text">
                            实付款: &yen;
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
    NativeBridge.setTitle('订单列表');

    $FW.Ajax({
        url: API_PATH + "mall/api/member/v1/order_list.json",
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<OrderMain orders={data.orders}/>, document.getElementById("cnt"));
        }
    });


    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={"我的订单"}/>, document.getElementById('header'));
    }
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/user';
};