(function () {
    if (typeof(window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';
    function handler(code, msg, responseText) {
        if (code == 10000 || code == 0) {
            $FW.Component.Alert('it seems OK');
        } else if (code == 40101) {
            console.log('您需要登录后才能正常访问');
            if (FinancialWorkspace.Browser.inApp() && NativeBridge) {
                NativeBridge.login()
            } else {
                // is_mall=1 用来判断, 登录请求来自商城, 返回地址需要添加商城域名
                location.href = location.protocol + '//m.9888.cn/mpwap/orderuser/toLogin.shtml?is_mall=1&redirect_url=' + FinancialWorkspace.getLoginRedirect();
            }
        } else if (code == 40103) {
            $FW.Component.Alert('无效的收货地址')
        } else if (code == 60101) {
            $FW.Component.Alert('短信验证码不存在')
        } else if (code == 60102) {
            $FW.Component.Alert('短信验证码不正确')
        } else if (code == 60103) {
            $FW.Component.Alert('短信验证码已过期')
        } else {
            $FW.Component.Alert(msg);
            console.log(responseText);
        }
        return true;
    }
    $FW.setAjaxErrorHandler(handler);
})();
