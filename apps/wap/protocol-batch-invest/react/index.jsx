$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'批量出借协议'} />, HEADER_NODE);
});
