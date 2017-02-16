(function () {
    if (typeof(window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';
    function handler(code, msg) {
        if (code == 10000 || code == 0) {
            $FW.Component.Alert('it seems OK');
        } else if (code == 40101) {
            console.log('您需要登录后才能正常访问');
            if ($FW.Browser.inApp() && NativeBridge) {
                NativeBridge.login()
            } else {
                // is_mall=1 用来判断, 登录请求来自商城, 返回地址需要添加商城域名
                location.href = location.protocol + '//m.9888.cn/mpwap/orderuser/toLogin.shtml?is_mall=1&redirect_url=' + FinancialWorkspace.getLoginRedirect();
            }
        }  else {
            $FW.Component.Alert(msg);
        }
        return true;
    }
    $FW.setAjaxErrorHandler(handler);
})();
