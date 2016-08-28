const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('升级攻略');
    } else {
        ReactDOM.render(<Header title={'升级攻略'}/>, document.getElementById('header'));
    }
});