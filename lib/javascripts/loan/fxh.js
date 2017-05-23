(function (scope, undefined) {

    function getCookie() {
        var c = cookie;
        var r = {};
        console.log(c);
        if (c === '') return r
        c.split(';').forEach(function(kv) {
            var t = kv.trim().split('=');
            r[t[0]] = t[1];
        });
        console.log(r);
        return r;
    }

    var FXH = {
        Post: function (url, params, slience) {
            var token, uid;
            if ($FW.Browser.inApp() || $FW.Browser.inFXHApp()) {
                token = getCookie().token;
                uid = getCookie().uid;
            } else {
                var USER = $FW.Store.getUserDict();
                token = USER.token;
                uid = USER.uid;
            }
            var common_params = {
                sourceType: SOURCE_TYPE,
                token: token || 'not-exist',
                uid: uid || 'not-exist'
            }
            var merged_params = Object.assign({}, params, common_params)
            return $FW.Post(url, merged_params, 'mini', slience)
        }

    };

    scope.$FXH = FXH;

})(window, undefined)
