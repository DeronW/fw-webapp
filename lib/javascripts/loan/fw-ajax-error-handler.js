(function () {
    if (typeof (window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';

    function login() {
        location.href = '/static/loan/user-entry/index.html?next_url=' + location.pathname + location.search;
    }

    function app_login(){
        location.href = '/static/loan/user-jrgcLogin/index.html?next_url=' + location.pathname + location.search;
    }

    function handler(code, msg, slience) {
        if (code == 0) {
            $FW.Component.Alert('Error, got result code 0');
        } else if (code == 11000 || code == 100008) {
            if (code == 100008) {
                $FW.Component.Toast("登录失效，请重新登录, code="+code);
                $FW.Browser.inApp() ? setTimeout(app_login,1700): setTimeout(login, 1700)
            } else {
                $FW.Browser.inApp() ? app_login() : login()
            }
        } else {
            !slience && $FW.Component.Alert(msg);
        }
        return true;
    }
    $FW.setAjaxErrorHandler(handler);
})();
