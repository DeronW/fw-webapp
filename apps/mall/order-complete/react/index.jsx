'use strict';

const API_PATH = document.getElementById('api-path').value;

const Success = React.createClass({
    backToMallHandler: function () {
        $FW.Browser.inApp() ? NativeBridge.gotoMall() : location.href = '/'
    },
    render: function () {

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
                            <div className="receiver">收货人：{this.props.receiver}</div>
                            <div className="phone">{this.props.phone}</div>
                        </div>
                        <div className="detail">收货地址：{this.props.address}</div>
                    </div>
                    <div className="pay">
                        支付：
                        {this.props.price > 0 ? <span>&yen;{this.props.price}</span> : null}
                        {this.props.price > 0 && this.props.score ? ' + ' : null}
                        {this.props.score ? <span className="score">{this.props.score}工分</span> : null}
                        {(this.props.price > 0 || this.props.score) && this.props.voucher_count ? ' + ' : null}
                        {this.props.voucher_count ?
                            <span className="coupons">兑换券 &times; {this.props.voucher_count}</span> : null}
                    </div>
                </div>
                <div className="success-btn">
                    <a href={"/static/mall/order-detail/index.html?order_id=" + this.props.order_id} className="success-btn1">查看订单</a>
                    <a onClick={this.backToMallHandler} className="success-btn2">返回商城</a>
                </div>
            </div>
        )
    }
});

window.ProductBizNo = null;

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
                price={data.order.price}
                score={data.payment.score}
                voucher_count={data.order.ticket_num}
            />, document.getElementById('cnt'));

            window.ProductBizNo = data.products[0].bizNo;
        }
    });

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"交易成功"} back_handler={back2pre_page} show_back_btn={false}/>, document.getElementById('header'));
    }
});

//window.onNativeMessageReceive = function (msg) {
//    if (msg == 'history:back') back2pre_page()
//};

function back2pre_page() {
    location.href = '/static/mall/product-detail/index.html?bizNo=' + window.ProductBizNo;
}
