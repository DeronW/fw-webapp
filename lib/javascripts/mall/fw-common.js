// // 添加全局样式, 添加到 html上
$FW.DOMReady(function () {
    var html = document.getElementsByTagName('html')[0], cn = [];
    if ($FW.Browser.inApp()) cn.push('html-in-app');
    if ($FW.Browser.inIOS()) cn.push('html-in-ios');
    if ($FW.Browser.inAndroid()) cn.push('html-in-android');
    if (cn.length) html.className = (html.className ? html.className + ' ' : '') + cn.join(' ');
});