$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('信息披露');
    } else {
        ReactDOM.render(<Header title={'信息披露'}/>, document.getElementById('header'));
    }
});