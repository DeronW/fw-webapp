'use strict';

const API_PATH = document.getElementById('api-path').value;

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
        let prepare_color = {
            color:"#fd4d4c",
            float:"right"
        };
        let shipping_color = {
            color:"#4aaef9",
            float:"right"
        };
        let complete_color = {
            color:"#999999",
            float:"right"
        };

        let order = this.props.order;
        let status_name;
        let status_color;
        switch (order.status) {
            case 'prepare':
                status_name = '待发货';
                status_color = prepare_color;
                break;
            case 'shipping':
                status_name = '待收货';
                status_color = shipping_color;
                break;
            case 'complete':
                status_name = '已完成';
                status_color = complete_color;
                break;
        }

        let href = order.cardUuid ? '/static/mall/coupon/index.html?cardUuid=' + order.cardUuid + '&bizNo=' + order.bizNo : '/static/mall/order-detail/index.html?order_id=' + order.orderId;

        let product_item = function (product, index) {

            return (
                <a href={href} key={index}>
                    <div className="t-info">
                        <div className="commodity-img">
                            <img src={product.img || 'images/default-product.jpg'}/>
                        </div>
                        <div className="commodity-info">
                            <div className="commodity-name">
                                <h2>{product.title}</h2>
                            </div>
                            {/*<div className="tag-block">
                                { product.tags.length != 0 ? product.tags.map(
                                    (i, index) => <span key={index} className="text">{i}</span>) : null }
                            </div>*/}
                            <div className="commodity-number">
                                <span className="money-text">
                                    {product.price > 0 || product.score == 0 ?
                                        <span>&yen;{$FW.Format.currency(product.price)}</span> : null}
                                    {product.price > 0 && product.score ? ' + ' : null}
                                    {product.score ? product.score + '工分' : null}
                                </span>
                                <span className="number-text">&times; {product.count}</span>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };

        let sendOrderNo = order.sendOrderNo;
        let sendChannel = order.sendChannel;
        let sendChannelEnum = order.sendChannelEnum;
        let check_link = order.sendOrderNo ? <a className="link-btn" href={'/static/mall/logistics/index.html?sendOrderNo=' + sendOrderNo + '&sendChannel=' + encodeURIComponent(sendChannel)+ '&sendChannelEnum=' + sendChannelEnum }>查看物流</a> : (order.cardUuid ? <a className="link-btn" href={'/static/mall/coupon/index.html?cardUuid=' + order.cardUuid + '&bizNo=' + order.bizNo}>查看券码</a> : null);

        return (
            <div className="order-block">
                <div className="title-block">
                    <span className="time-text">{order.pay_at}</span>
                    <span style={status_color}>
                        {status_name}
                    </span>
                </div>
                <div className="info-block">
                    { order.products.map((p, index) => product_item(p, index)) }
                    <div className="commodity-wrap">
                        <div className="commodity-total">
                            <span className="commodity-text">共件{order.orderCount}商品</span>
                            <span className="total-text">
                                实付款:
                                {(order.price > 0 || order.score == 0) ?
                                    <span>&yen;{$FW.Format.currency(order.price)}</span> : null}
                                {order.price > 0 && order.score ? ' + ' : null}
                                {order.score ? order.score + '工分' : null}
                            </span>
                        </div>
                        {check_link}
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
        //url: "http://localhost/nginx-1.9.12/html/order_list.json",
        enable_loading: true,
        success: function (data) {
            console.log(data);
            ReactDOM.render(<OrderMain orders={data.orders}/>, document.getElementById("cnt"));
        }
    });

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"我的订单"} back_handler={back_handler}/>, document.getElementById('header'));
    }
});
function back_handler() {
    location.href = '/static/mall/user/index.html';
}

//window.onNativeMessageReceive = function (msg) {
//    if (msg == 'history:back') back_handler()
//};
