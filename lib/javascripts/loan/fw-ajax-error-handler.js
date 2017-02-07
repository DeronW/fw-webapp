(function () {
    if (typeof (window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';
    function handler(code, msg, responseText) {
        if (code == 0) {
            $FW.Component.Alert('Error, got HTTP code 0');
        } else if (code == 11000 || code == 7) {
            location.href = '/static/loan/user-entry/index.html';
        } else {
            $FW.Component.Alert(msg);
        }
        return true;
    }
    $FW.setAjaxErrorHandler(handler);
})();
