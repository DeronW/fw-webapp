$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('玩转工分')
    } else {
        ReactDOM.render(<Header title={'玩转工分'}/>, HEADER_NODE)
    }

    if ($FW.Browser.inIOS()) {
        var es = document.querySelector('apple-limit');
        es && (es[0].style.display = 'block');
    }
});

function gotoMall() {
    if ($FW.Browser.inApp()) {
        NativeBridge.gotoMall();
    } else {
        location.href = 'https://mmall.9888.cn'
    }
}
