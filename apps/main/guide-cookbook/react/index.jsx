const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('升级攻略');
    } else {
        ReactDOM.render(<Header title={'升级攻略'}/>, document.getElementById('header'));
    }
});

function register(){
    if ($FW.Browser.inApp()) {
        NativeBridge.toNative('app_register');
    } else {
        location.href = 'https://passport.9888.cn/pp-web2/register/phone.do?sourceSite=jrgc'
    }
}