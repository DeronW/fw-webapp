$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'网络借贷出借风险提示'} />, HEADER_NODE);
});
