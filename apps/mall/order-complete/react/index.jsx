const QUERY = $FW.Format.urlQuery();

const Success = React.createClass({
    render: function () {
        let query = $FW.Format.urlQuery();
        let status = query.status;
        let statusTex;
        let seeOrder;
        let failTex = query.failTex || "";
        if (status == "F") {
            statusTex = "支付失败";
            seeOrder = "重新支付"
        }
        if (status == "S") {
            statusTex = "订单状态:已付款";
            seeOrder = "查看订单"
        }
        if (status == "I") {
            statusTex = query.Tex;
            seeOrder = "重新支付"
        }
        let href = `/static/mall/order-list/index.html`;

        return (
            <div>
                <div className="success-banner"
                     style={{background:"url(images/success-banner.jpg) no-repeat center center"}}>
                    <div className="success-text"
                         style={{background:"url(images/circle-white-right.png) no-repeat 80px 11px"}}>
                        {statusTex}
                    </div>
                    <div className="fail-text">{failTex}</div>
                </div>
                <div className="success-btn">
                    <a href={href} className="success-btn1">{seeOrder}</a>
                    <a href="/" className="success-btn2">返回商城</a>
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function () {
    let query = $FW.Format.urlQuery();
    let status = query.status;
    let title;
    if (status == "F") {
        title = "支付失败"
    }
    if (status == "S") {
        title = "交易成功"
    }
    if (status == "I") {
        title = "支付结果"
    }
    ReactDOM.render(<Success />, CONTENT_NODE);
    ReactDOM.render(<Header title={title} show_back_btn={false}/>, HEADER_NODE);
});
