(function () {

    if (typeof(window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';

    function handler(code, msg, responseText) {

        if (code == 10000 || code == 0) {
            $FW.Component.Alert('it seems OK');
        } else if (code == 40101) {
            if (FinancialWorkspace.Browser.inApp() && NativeBridge) {
                NativeBridge.login()
            } else {
                location.href = location.protocol + '//m.9888.cn/mpwap/orderuser/toLogin.shtml?is_mall=2&redirect_url=' + FinancialWorkspace.getLoginRedirect();
            }
        } else if (code == 60000) {
            $FW.Component.Alert(msg)
        } else if (code >= 50000 && code < 60000) {
            // 服务器内部错误
            $FW.Component.Alert('异常:' + msg)
        } else {
            $FW.Component.Alert(msg);
            console.log(responseText)
        }

        return true;
    }

    $FW.setAjaxErrorHandler(handler);
})();