$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'出借人承诺书'} />, HEADER_NODE);
});
