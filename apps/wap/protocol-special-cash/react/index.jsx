$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'提现'}/>, HEADER_NODE);
});