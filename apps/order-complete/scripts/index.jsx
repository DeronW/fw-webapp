'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const Success = React.createClass({
    render: function () {
        return (
            <div>
                <div className="success-banner"
                     style={{background:"url("+STATIC_PATH+"images/success-banner.jpg) no-repeat center center"}}>
                    <div className="success-text"
                         style={{background:"url("+STATIC_PATH+"images/circle-white-right.png) no-repeat 80px 80px"}}>
                        订单状态:已付款
                    </div>
                </div>
                <div className="success-addr">
                    <div className="addr-box"
                         style={{background:"url("+STATIC_PATH+"images/ico-blue-location.png) no-repeat 10px 27px"}}>
                        <div className="addr">
                            <div className="receiver">收货人:{this.props.receiver}</div>
                            <div className="phone">{this.props.phone}</div>
                        </div>
                        <div className="detail">收货地址：{this.props.address}</div>
                    </div>
                    <div className="pay">
                        支付：<span>&yen;{this.props.price}</span>
                        {this.props.score ? <span className="score"> + {this.props.score}工分</span> : null}
                        {this.props.voucher_count ?
                            <span className="coupons"> + 兑换券 &times; {this.props.voucher_count}</span> : null}
                    </div>
                </div>
                <div className="success-btn">
                    <a href={"/order/detail?order_id=" + this.props.order_id} className="success-btn1">查看订单</a>
                    <a href="/" className="success-btn2" style={{display: "none"}}>返回商城</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('交易成功');
    let order_id = $FW.Format.urlQuery().id;
    $FW.Component.showAjaxLoading();

    $FW.Ajax({
        url: API_PATH + 'mall/api/member/v1/order_detail.json?orderId=' + order_id,
        success: function (data) {
            $FW.Component.hideAjaxLoading();
            ReactDOM.render(<Success
                order_id={order_id}
                receiver={data.shipping_info.username}
                phone={data.shipping_info.phone}
                address={data.shipping_info.address}
                price={data.payment.money}
                score={data.payment.score}
                voucher_count={data.order.ticket_num}
            />, document.getElementById('cnt'));
        }
    });

    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={"交易成功"}/>, document.getElementById('header'));
    }
});