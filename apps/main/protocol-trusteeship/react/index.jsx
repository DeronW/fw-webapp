$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'资金存管三方协议'}/>, document.getElementById('header'));
});