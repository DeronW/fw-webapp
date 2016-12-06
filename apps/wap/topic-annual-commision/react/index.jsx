$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('年化佣金小贴士')
    } else {
        ReactDOM.render(<Header title={'年化佣金小贴士'}/>, document.getElementById('header'))
    }
});

function gotoMall() {
    if ($FW.Browser.inApp()) {
        NativeBridge.gotoMall();
    } else {
        location.href = 'http://mmall.9888.cn'
    }
}