function gotoHandler(link) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
        location.href = encodeURI(link);
}
const Success = React.createClass({
    backToMallHandler: function () {
        gotoHandler("https://mmall.9888.cn");
        /*function back2times() {
            NativeBridge.toNative('app_back_native')
        }
        $FW.Browser.inApp() ? back2times() : location.href = '/'
        */
    },
    render: function () {
        let query = $FW.Format.urlQuery();
        let status = query.status;
        let statusTex;let seeOrder;
        let failTex = query.failTex||"";
        if(status=="F"){ statusTex ="支付失败" ;         seeOrder="重新支付"  }
        if(status=="S"){ statusTex ="订单状态:已付款";  seeOrder="查看订单" }

        let href = `/static/mall/order-list/index.html`;

        return (
            <div>
                <div className="success-banner"
                     style={{background:"url(images/success-banner.jpg) no-repeat center center"}}>
                    <div className="success-text"
                         style={{background:"url(images/circle-white-right.png) no-repeat 80px 80px"}}>
                        {statusTex}
                    </div>
                    <div className="fail-text">{failTex}</div>
                </div>
                <div className="success-btn">
                    <a href={href} className="success-btn1">{seeOrder}</a>
                    <a onClick={this.backToMallHandler} className="success-btn2">返回商城</a>
                </div>
            </div>
        )
    }
});

window.ProductBizNo = null;

$FW.DOMReady(function () {
    let query = $FW.Format.urlQuery();
    let status = query.status;
    let title;
    if(status=="F"){ title ="支付失败" }  if(status=="S"){ title ="交易成功" }
    ReactDOM.render(<Success />, CONTENT_NODE);
    ReactDOM.render(<Header title={title} show_back_btn={false}/>, HEADER_NODE);
});
