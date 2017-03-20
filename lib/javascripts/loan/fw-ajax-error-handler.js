(function () {
    if (typeof (window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';

    function login() {
        location.href = '/static/loan/user-entry/index.html?next_url=' + location.pathname + location.search;
    }

    function loginInApp() {
        location.href = '/static/loan/user-jrgc-login/index.html';
    }

    function inHome() {
        var p = location.pathname;
        return p === '/' || p === '/static/loan/home/index.html'
    }

    function handler(code, msg, slience) {
        if (code == 0) {
            $FW.Component.Alert('Error, got result code 0');
        } else if (code == 11000 || code == 100008) {
            // 100008代表登录失效
            if (code == 100008) {
                // do NOT show toast in homepage
                if (!inHome()) $FW.Component.Toast("登录失效，请重新登录[" + code + "]");

                if ($FW.Browser.inApp()) {
                    inHome() ? loginInApp() : NativeBridge.close()
                } else {
                    setTimeout(login, 1700)
                }
            } else {
                $FW.Browser.inApp() ? NativeBridge.close() : login()
            }
        } else {
            //11000 代表参数不完整
            !slience && $FW.Component.Alert(msg);
        }
        return true;
    }
    $FW.setAjaxErrorHandler(handler);
})();
