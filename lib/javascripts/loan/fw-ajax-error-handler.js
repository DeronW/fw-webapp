(function () {

    if (typeof(window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';

    function handler(code, msg, responseText) {

        if (code == 10000 || code == 0) {
            $FW.Component.Alert('it seems OK');
        }else if(code == 11000 || code == 7){
            location.href = location.protocol + '//cashloan.9888.cn/static/loan/user-register-login-entry/index.html';
        }else {
            $FW.Component.Alert(msg);
        }

        return true;
    }

    $FW.setAjaxErrorHandler(handler);
})();
