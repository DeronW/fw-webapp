// this plugin depend on FW.Store
(function (scope, document) {

    $FW.Cookie = {
        _read_dict: function () {
            var r = {};

            document.cookie.split(';').forEach(function (kv) {
                var t = kv.trim().split('=')
                r[t[0]] = t[1]
            })

            return r
        },
        get: function (k) {
            return this._read_dict()[k]
        },
        set: function (k, v, max_age) {
            document.cookie = k + '=' + v + ';'
        }
    }

})(window, document);
