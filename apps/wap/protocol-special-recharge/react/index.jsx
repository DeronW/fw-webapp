$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'充值'}/>, HEADER_NODE);
});