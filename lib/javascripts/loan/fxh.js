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
        return p === '/' || p === '/static/loan/home/index.html'
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
        location.href = '/static/loan/user-jrgc-login/index.html';
    }

    function login() {
        location.href = '/static/loan/account/#/entry'
    }

    var FXH = {
        Post: function(url, params, silence) {

            if ($FW.Browser.inFXHApp()) {
                token = getCookie().token;
                uid = getCookie().uid;
                $FW.Store.setUserDict({ token: token, uid: uid });
            }

            // if (!usedLogined()) {
            //     //$FW.Component.Toast("您未登录，请先登录");
            //     if ($FW.Browser.inJRGCApp()) {
            //         inHome() ? loginInApp() : NativeBridge.close()
            //     } else if($FW.Browser.inFXHApp()){
            //         NativeBridge.login();
            //     } else {
            //         setTimeout(login, 1700)
            //     }
            // }

            var USER = $FW.Store.getUserDict(),
                token = USER.token,
                uid = USER.uid;

            var common_params = {
                sourceType: SOURCE_TYPE,
                token: token,
                uid: uid
            }
            var merged_params = Object.assign({}, params, common_params)
            return $FW.Post(url, merged_params, 'mini', silence)
        }

    };

    scope.$FXH = FXH;

})(window, undefined)