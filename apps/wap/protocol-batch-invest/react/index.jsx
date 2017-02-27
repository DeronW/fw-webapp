$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'批量投资协议'} />, HEADER_NODE);
});
