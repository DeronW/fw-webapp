$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'出借人委托划款授权书'} />, HEADER_NODE);
});
