function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
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
        let href = `/static/mall/order-list/index.html`;

        return (
            <div>
                <div className="success-banner"
                     style={{background:"url(images/success-banner.jpg) no-repeat center center"}}>
                    <div className="success-text"
                         style={{background:"url(images/circle-white-right.png) no-repeat 80px 80px"}}>
                        订单状态:已付款
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
    ReactDOM.render(<Success />, document.getElementById('cnt'));
    ReactDOM.render(<Header title={"交易成功"} show_back_btn={false}/>, document.getElementById('header'));
});
