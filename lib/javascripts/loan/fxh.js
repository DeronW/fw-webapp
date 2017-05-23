(function (scope, undefined) {

    function getCookie() {
        var c = document.cookie;
        if (c === '') return {}
        c.split('; ').forEach(function(kv) {
            var t = kv.split('=');
            r[t[0]] = t[1];
        });
        return r;
    }

    var FXH = {
        Post: function (url, params, slience) {
            var token, uid;
            if ($FW.Browser.inApp()) {
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
            console.log(merged_params);
            var merged_params = Object.assign({}, params, common_params)
            return $FW.Post(url, merged_params, 'mini', slience)
        }

    };

    scope.$FXH = FXH;

})(window, undefined)
