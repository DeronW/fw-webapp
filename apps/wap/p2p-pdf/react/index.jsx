$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'相关法律'} />, HEADER_NODE);
    }
});
