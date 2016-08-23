$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('升级攻略');
    } else {
        ReactDOM.render(<Header title={'升级攻略'}/>, document.getElementById('header'));
    }
});