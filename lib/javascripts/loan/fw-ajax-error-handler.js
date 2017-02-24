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
            if (code == 100008) {
                $FW.Component.Toast("登录失效，请重新登录");
                setTimeout(login, 1700)
            } else {
                login()
            }
        } else {
            !slience && $FW.Component.Alert(msg);
        }
        return true;
    }
    $FW.setAjaxErrorHandler(handler);
})();
