(function () {
    if (typeof (window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';

    function login() {
        location.href = '/static/loan/user-entry/index.html?next_url=' + location.pathname + location.search;
    }

    function handler(code, msg, slience) {
        if (code == 0) {
            $FW.Component.Alert('Error, got result code 0');
        } else if (code == 11000 || code == 100008) {
            // 100008代表登录失效
            if (code == 100008) {
                // do NOT show toast in homepage
                if (location.pathname !== '/' && location.pathname !== '/static/loan/home/index.html')
                    $FW.Component.Toast("登录失效，请重新登录[" + code + "]");

                $FW.Browser.inApp() ? NativeBridge.login() : setTimeout(login, 1700)
            } else {
                $FW.Browser.inApp() ? NativeBridge.login() : login()
            }
        } else {
            //11000 代表参数不完整
            !slience && $FW.Component.Alert(msg);
        }
        return true;
    }
    $FW.setAjaxErrorHandler(handler);
})();
