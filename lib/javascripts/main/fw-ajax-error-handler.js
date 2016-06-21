(function () {

    if (typeof(window.FinancialWorkspace) === "undefined")
        throw 'window.FinancialWorkspace has not been defined';

    function handler(code, msg, responseText) {
    }

    $FW.setAjaxErrorHandler(handler);
})();