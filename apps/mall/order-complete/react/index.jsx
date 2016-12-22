const Success = React.createClass({
    backToMallHandler: function () {
        $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
    },
    render: function () {
        let {cardUuid, order_id, bizNo} = this.props;
        let href = `/static/mall/order-detail/index.html?order_id=${order_id}`;
        if(cardUuid) href += `&cardUuid=${cardUuid}&bizNo=${bizNo}`;

        let {receiver, phone, address, price, score, voucher_count} = this.props;

        return (
            <div>
                <div className="success-banner"
                     style={{background:"url(images/success-banner.jpg) no-repeat center center"}}>
                    <div className="success-text"
                         style={{background:"url(images/circle-white-right.png) no-repeat 80px 80px"}}>
                        订单状态:已付款
                    </div>
                </div>
                <div className="success-addr" style={{backgroundImage:"url(images/ico-blue-location.png)"}}>
                    <div className="addr-box">
                        <div className="addr">
                            <div className="receiver">收货人：{receiver}</div>
                            <div className="phone">{phone}</div>
                        </div>
                        <div className="detail">收货地址：{address}</div>
                    </div>
                    <div className="pay">
                        支付：
                        {price > 0 ? <span>&yen;{price}</span> : null}
                        {price > 0 && score ? ' + ' : null}
                        {score ? <span className="score">{score}工分</span> : null}
                        {(price > 0 || score) && voucher_count ? ' + ' : null}
                        {voucher_count ? <span className="coupons">兑换券 &times; {voucher_count}</span> : null}
                    </div>
                </div>
                <div className="success-btn">
                    <a href={href} className="success-btn1">查看订单</a>
                    <a onClick={this.backToMallHandler} className="success-btn2">返回商城</a>
                </div>
            </div>
        )
    }
});

window.ProductBizNo = null;

$FW.DOMReady(function () {
    let order_id = $FW.Format.urlQuery().id;

    $FW.Ajax({
        url: `${API_PATH}mall/api/member/v1/order_detail.json?orderId=${order_id}`,
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<Success
                order_id={order_id}
                cardUuid={data.cardUuid}
                bizNo={data.order.bizNo}
                receiver={data.shipping_info.username}
                phone={data.shipping_info.phone}
                address={data.shipping_info.address}
                price={data.order.price}
                score={data.payment.score}
                voucher_count={data.order.ticket_num}
            />, document.getElementById('cnt'));

            window.ProductBizNo = data.products[0].bizNo;
        }
    });

    ReactDOM.render(<Header title={"交易成功"} show_back_btn={false}/>, document.getElementById('header'));
});
