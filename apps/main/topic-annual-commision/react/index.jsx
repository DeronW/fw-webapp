$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('正在建设中')
    } else {
        ReactDOM.render(<Header title={'正在建设中'}/>, document.getElementById('header'))
    }

    if ($FW.Browser.inIOS()) {
        document.querySelector('apple-limit')[0].style.display = 'block';
    }
});

function gotoMall() {
    if ($FW.Browser.inApp()) {
        NativeBridge.gotoMall();
    } else {
        location.href = 'http://mmall.9888.cn'
    }
}