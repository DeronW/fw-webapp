$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'工场尊享用户服务协议'} />, HEADER_NODE);
});
