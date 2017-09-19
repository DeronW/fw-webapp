(function(scope, undefined) {

    function getCookie() {
        var c = document.cookie;
        var r = {};
        if (c === '') return r
        c.split(';').forEach(function(kv) {
            var t = kv.trim().split('=');
            r[t[0]] = t[1];
        });
        return r;
    }

    function inHome() {
        var p = location.pathname;
        return p === '/' || p === '/static/loan/products/index.html#/'
    }

    function usedLogined() {
        return $FW.Store && $FW.Store.getUserDict() && $FW.Store.getUserDict().token || getCookie().token && getCookie().uid
    }

    // function inMarketPage(){
    //     var p = location.pathname;
    //     return p === '/' || p === '/static/loan/market/index.html';
    // }
    //
    // function inMarketDetailPage(){
    //     var p = location.pathname;
    //     return p === '/' || p === '/static/loan/market-detail/index.html';
    // }

    function loginInApp() {
        location.href = '/static/loan/3rd/index.html#/jrgc-login'
    }

    function login() {
        location.href = '/static/loan/account/index.html#/entry'
    }

    var FXH = {
        Post: function(url, params, silence, options) {

            if ($FW.Browser.inFXHApp()) {
                token = getCookie().token;
                uid = getCookie().uid;
                $FW.Store.setUserDict({ token: token, uid: uid });
            }

            if (!inHome() && !usedLogined()) {
                //$FW.Component.Toast("您未登录，请先登录");
                if ($FW.Browser.inJRGCApp()) {
                    inHome() ? loginInApp() : NativeBridge.close()
                } else if ($FW.Browser.inFXHApp()) {
                    NativeBridge.login();
                } else {
                    setTimeout(login, 1700)
                }
            }

            var USER = $FW.Store.getUserDict(),
                token = USER.token,
                uid = USER.uid;

            var common_params = {
                sourceType: SOURCE_TYPE,
                token: token,
                uid: uid
            }
            var merged_params = Object.assign({}, params, common_params)

            options = options || {}
            var loading_effect = options.with_out_loading ? null : 'mini'
            return $FW.Post(url, merged_params, loading_effect, silence)
        }

    };

    scope.$FXH = FXH;

})(window, undefined)