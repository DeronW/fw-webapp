const OrderDetail = React.createClass({
    render: function () {
        var card = $FW.Format.urlQuery().cardUuid;
        return (
            <div>
                <OrderStatusList
                    shippingInfo={this.props.shipping_info}
                    distributionName={this.props.distribution}
                    status={this.props.status}
                    send_order_no={this.props.sendOrderNo}
                    send_channel={this.props.sendChannel}
                />
                <OrderStatusBlock order={this.props.order} products={this.props.products}/>
                {card == 'null' ? null : <Coupon coupon={this.props.coupon}/>}
                <OrderPayInfo payment={this.props.payment} order={this.props.order}/>
                <OrderNumberList order={this.props.order}/>
            </div>
        );
    }
});

const Coupon = React.createClass({
    render: function () {
        let ls = this.props.coupon;
        let coupon = (l, index) => {
            return (
                <div className="coupon">
                    <div className="l-r-text">
                        <div className="info-block">
                            <span className="text">券码</span>
                            <span className="data-text">{ls[index].cardNum}</span>
                        </div>
                        <div className="info-block">
                            <span className="text">密码</span>
                            <span className="data-text">{ls[index].cardPwd}</span>
                        </div>
                        <div className="info-block">
                            <span className="text">有效期</span>
                            <span className="data-text">{ls[index].tillDate}</span>
                        </div>
                    </div>
                </div>
            )
        };
        return (
            <div className="coupon-list" id="coupon-list">
                {ls.map((l, index) => coupon(l, index)) }
            </div>
        )
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
            case 'unPay':
                status_name = '待付款';
                break;
            case 'cancel':
                status_name = '已取消';
                break;
            default:
                status_name = '';
        }

        let shipping = this.props.send_channel ? <div>
            <div className="info-block">
                <span className="text">物流名称</span>
                <span className="data-text">{this.props.send_channel}</span>
            </div>
            <div className="info-block">
                <span className="text">物流编号</span>
                <span className="data-text">{this.props.send_order_no}</span>
            </div>
            <div className="address-list">
                <div className="address-icon">
                    <img src="images/ico-blue-location.png"/>
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
        </div> : null;

        return (
            <div className="l-r-text">
                <div className="info-block">
                    <span className="text">订单状态</span>
                    <span className="data-text stake-text">
                        {status_name}
                    </span>
                </div>
                {shipping}
            </div>
        );
    }
});

const OrderStatusBlock = React.createClass({
    render: function () {
        let products = this.props.products;
        let order = this.props.order;

        let orderBlock = function (d, index) {

            let pay_price = d.price > 0 || d.score == 0 ? <span> &yen;{$FW.Format.currency(d.price)}</span> : null;
            let score_cost = d.score ? d.score + '工分' : null;

            return (
                <div className="order-block" key={index}>
                    <div className="info-block">
                        <div className="order-block-info">
                            <div className="commodity-img">
                                <img src={d.img || 'images/default-product.jpg'}/>
                            </div>

                            <div className="commodity-info">
                                <div className="commodity-name">
                                    <h2>{d.title}</h2>
                                </div>
                                <div className="tag-block">
                                    { d.tags.length != 0 ? products[0].tags.map((s, index) =>
                                        <span key={index} className="text">{s}</span>) : null }
                                </div>
                                <div className="commodity-number">
                                    <span className="money-text">
                                        {pay_price}
                                        {d.price > 0 && d.score ? ' + ' : null}
                                        {score_cost}
                                    </span>
                                    <span className="number-text">&times;{d.count}</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-commodity-total">
                            <span className="commodity-text">共{order.count}件商品</span>
                            <span className="total-text">
                                实付款:
                                {order.price > 0 || order.score == 0 ?
                                    <span>&yen; {$FW.Format.currency(order.price)} </span> : null}
                                {order.price > 0 && order.score ? '+' : null}
                                {order.score ? order.score + '工分' : null}
                            </span>
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
        let order = this.props.order;

        let score, bean, ticket, money;
        if (payment.score) {
            score =
                <div className="info-block">
                    <span className="text">工分消耗</span>
                    <span className="data-text">{payment.score}工分</span>
                </div>
        }
        if (payment.bean) {
            var format_bean = parseInt(payment.bean / 100);
            var sub = '00' + payment.bean % 100;
            format_bean += '.' + sub.substr(sub.length - 2);
            bean =
                <div className="info-block">
                    <span className="text">工豆支付</span>
                    <span className="data-text">&yen;{format_bean}</span>
                </div>
        }
        if (order.ticket_num) {
            ticket =
                <div className="info-block">
                    <span className="text">兑换券支付</span>
                    <span className="data-text"> 兑换券 &times; {order.ticket_num}</span>
                </div>
        }
        if (payment.money > 0) {
            money =
                <div className="info-block">
                    <span className="text">余额支付</span>
                    <span className="data-text">&yen;{payment.money}</span>
                </div>
        }

        return (
            <div className="order-pay-info">
                <div className="ui-block-title">
                    <h3 className="text">支付信息</h3>
                </div>
                <div className="l-r-text">
                    {ticket}
                    {money}
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

        let pay_at = null;
        if (order.pay_at) {
            pay_at =
                <div className="sequence-text">
                    <span className="text">付款时间：</span>
                    <span className="time-text">{order.pay_at}</span>
                </div>
        }

        let deliver_at = null;
        if (order.deliver_at) {
            deliver_at =
                <div className="sequence-text">
                    <span className="text">发货时间：</span>
                    <span className="time-text">{order.deliver_at}</span>
                </div>;
        }

        let receive_at = null;
        if (order.receive_at) {
            receive_at =
                <div className="sequence-text">
                    <span className="text">完成时间：</span>
                    <span className="time-text">{order.receive_at}</span>
                </div>
        }

        return (
            <div className="order-number">
                <div className="title">
                    订单号：{order.bizNo}
                </div>

                <div className="sequence">
                    {pay_at}
                    {deliver_at}
                    {receive_at}
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    let query = $FW.Format.urlQuery();
    let order_id = $FW.Format.urlQuery().orderId;
    if (!order_id) {
        $FW.Component.Alert('url query order_id is missing');
        return;
    }
    $FW.Ajax({
        url: API_PATH + "mall/api/member/v1/order_detail.json?orderId=" + order_id,
        data: {
            bizNo: query.bizNo,
            cardUuid: query.cardUuid
        },
        enable_loading: 'mini',
        success: function (data) {
            ReactDOM.render(<OrderDetail {...data}/>, CONTENT_NODE);
        }
    });
    ReactDOM.render(<Header title={"订单详情"}/>, HEADER_NODE);
});

