const OrderDetail = React.createClass({
    render : function(){
        var data = this.props.data;
        let status_img;

        switch (data.status) {
            case '0':
                status_img="images/order-cancel.png";
                break;
            case '1':
                status_img="images/order-notpaid.png";
                break;
            case '2':
                status_img="images/order-paid.png";
                break;
            case '3':
                status_img="images/order-sent.png";
                break;
            case '4':
                status_img="images/order-complete.png";
                break;
        }

        let product_item = function (product, index) {
            return (
                <div className="list" key={index}>
                    <img src={product.img}  className="list-img"/>
                    <div className="title">{product.title}</div>
                    <div className="price-box"><span>{product.score}工分</span><span className="num-modifyBox"><span className="num-quantity">×</span>{product.count}</span></div>
                </div>
            )
        };

        let count=0,score=0;
        let count_f = function (product, index) { return (count += product.count)}
        let score_f = function (product, index) { return (score += product.score)}
        count=data.products.map((p, index) => count_f(p, index));
        score=data.products.map((p, index) => score_f(p, index));

        return (
           <div>
               <div className="order-status">
                   <img src={status_img}/>
               </div>
               <div className="logistic-info">
                   <div className="pay-item"><span className="pay-item-title">物流名称</span><span className="pay-item-amount">{data.sendChannel}</span></div>
                   <div className="pay-item"><span className="pay-item-title">物流编号</span><span className="pay-item-amount">{data.sendOrderNo}</span></div>
               </div>
               <div className="order-address">
                   <div className="goods-address-cnt">
                       <div className="address-wrap">
                           <div className="inf">
                               <div className="receiver">
                                   <span>收货人：{data.shipping_info.username}</span>
                                   <span></span>
                               </div>
                               <div className="phone">{data.shipping_info.phone}</div>
                           </div>
                           <div className="detail">收货地址：{data.shipping_info.address}</div>
                       </div>
                   </div>
               </div>
               <div className="order-products">
                   <div className="pro-order">
                       { data.products.map((p, index) => product_item(p, index)) }
                       <div className="total-box">
                           <div className="total-money"><span>合计：</span><span> {score} 工分</span></div>
                           <div className="total-text">共 {count} 件商品</div>
                       </div>
                   </div>
               </div>
               <div className="pay-info">
                   <div className="pay-info-title"><span>支付信息</span></div>
                   <div className="pay-item"><span className="pay-item-title">兑换券支付</span><span className="pay-item-amount">{data.order.ticket_num}</span></div>
                   <div className="pay-item"><span className="pay-item-title">{data.payment.money_source}</span><span className="pay-item-amount">¥{data.payment.money}</span></div>
                   <div className="pay-item"><span className="pay-item-title">工分支付</span><span className="pay-item-amount">{data.payment.score}</span></div>
               </div>

               <div className="order-details">
                   <div className="order-number">
                       <div className="title">订单号：{data.order.id}</div>
                       <div className="sequence">
                           <div className="sequence-text">
                               <span className="text">下单时间：</span>
                               <span className="time-text">{data.order.pay_at}</span></div>
                       </div>
                   </div>
               </div>
           </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('订单详情');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"订单详情"} back_handler={backward}/>, document.getElementById('header'));

    $FW.Ajax({
        url: `${API_PATH}/mall/api/member/v1/order_detail.json`,
        enable_loading: true
    }).then(data => ReactDOM.render(<OrderDetail data={data}/>, CONTENT_NODE));

});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}
