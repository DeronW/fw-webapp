$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'信息咨询服务协议'}/>, document.getElementById('header'));
});