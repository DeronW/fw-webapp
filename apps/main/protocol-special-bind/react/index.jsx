$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'绑定银行卡'}/>, document.getElementById('header'));
});