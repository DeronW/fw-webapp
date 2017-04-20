$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'徽商银行网络交易资金账户服务三方协议'}/>, HEADER_NODE);
});