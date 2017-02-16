$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('新手福利');
    } else {
        ReactDOM.render(<Header title={'玩赚攻略'}/>, HEADER_NODE);
    }

    if (!$FW.Browser.inIOS()) {
        document.getElementById('apple-limit').style.display = 'none';
    }
});

function register() {
    if ($FW.Browser.inApp()) {
        NativeBridge.toNative('app_register');
    } else {
        location.href = 'https://passport.9888.cn/pp-web2/register/phone.do?sourceSite=jrgc'
    }
}