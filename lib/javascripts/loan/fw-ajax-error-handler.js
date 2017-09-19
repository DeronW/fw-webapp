(function() {
    if (typeof(window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';

    function login() {
        location.href = '/static/loan/account/index.html#/entry';
    }

    function loginInApp() {
        location.href = '/static/loan/3rd/index.html#/jrgc-login'
    }

    function inHome() {
        var p = location.pathname;
        return p === '/' || p === '/static/loan/products/index.html#/'
    }

    function usedLogined() {
        return $FW.Store && $FW.Store.getUserDict() && $FW.Store.getUserDict().token
    }

    function handler(code, msg, silence) {

        if (code == 0) {
            $FW.Component.Alert('Error, got result code 0');
        } else if (code == 100008) {
            // do NOT show toast in homepage
            if (!inHome() && usedLogined())
                $FW.Component.Toast("登录失效，请重新登录[" + code + "]");
            if ($FW.Browser.inJRGCApp()) {
                inHome() ? loginInApp() : NativeBridge.close()
            } else if ($FW.Browser.inFXHApp()) {
                NativeBridge.login();
            } else {
                setTimeout(login, 1700)
            }
        } else if (code == 11000) {
            //11000 代表参数不完整
            !silence && $FW.Component.Alert(msg);
        }
        return true;
    }

    $FW.setAjaxErrorHandler(handler);
})();