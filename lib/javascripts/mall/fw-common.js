// 添加全局样式, 添加到 html上
$FW.DOMReady(function () {
    var html = document.getElementsByTagName('html')[0], cn = [];
    if ($FW.Browser.inApp()) cn.push('html-in-app');
    if ($FW.Browser.inIOS()) cn.push('html-in-ios');
    if ($FW.Browser.inAndroid()) cn.push('html-in-android');
    if (cn.length) html.className = (html.className ? html.className + ' ' : '') + cn.join(' ');
});

// 接口前缀, 根据当前页面的协议, 动态决定使用 http 还是 https
(function () {
    var p = document.getElementById('api-path').value;
    if (p.substr(0, 2) != '//') p = '//' + p;
    window.API_PATH = location.protocol + p;
})();

// 添加下拉刷新功能
$FW.DOMReady($FW.Event.slideDownRefresh);

// define global content NODE, mount react component on this node.
window.CONTENT_NODE = document.getElementById('cnt');

// define global header NOE, mount react header component on this node.
window.HEADER_NODE = document.getElementById('header');
