$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'信息咨询服务协议'}/>, HEADER_NODE);
});