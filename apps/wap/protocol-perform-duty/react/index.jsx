$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'履行反洗钱义务的承诺书'} />, HEADER_NODE);
});
