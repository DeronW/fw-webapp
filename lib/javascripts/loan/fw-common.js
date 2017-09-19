// 添加全局样式, 添加到 html上
$FW.DOMReady(function() {
    var html = document.getElementsByTagName('html')[0],
        cn = [];
    if ($FW.Browser.inApp()) cn.push('html-in-app');
    if ($FW.Browser.inIOS()) cn.push('html-in-ios');
    if ($FW.Browser.inAndroid()) cn.push('html-in-android');
    if ($FW.Browser.inWeixin()) cn.push('html-in-weixin');
    if (cn.length) html.className = (html.className ? html.className + ' ' : '') + cn.join(' ');
    if ($FW.Browser.inGrowingIO()) document.body.classList.add('body-in-growingIO');

    // 如果页面被嵌入到 App 中, 统一设置当前页面的Native导航条显示名称
    // if ($FW.Browser.inApp()) {
    //     var title = document.getElementsByTagName('title')[0];
    //     title && NativeBridge.setTitle(title.innerText);
    // }
});

// 接口前缀, 根据当前页面的协议, 动态决定使用 http 还是 https
(function() {
    window.API_PATH = document.getElementById('api-path').value;
})();

// define global content NODE, mount react component on this node.
window.CONTENT_NODE = document.getElementById('cnt');

// define global header NODE, mount react header component on this node.
window.HEADER_NODE = document.getElementById('header');

// define global bottom nav buttoms NODE, mount react bottom_nav component on this node.
window.BOTTOM_NAV_NODE = document.getElementById('bottom-nav-bar');

// define global sourceType for backend usage
(function() {
    var ua = window.navigator.userAgent,
        inWX = ua.indexOf('MicroMessenger') > -1,
        inApp = ua.indexOf('FinancialWorkshop') > -1;
    window.SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;
})();