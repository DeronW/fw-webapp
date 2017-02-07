(function () {

    var storage = window.localStorage;

    $FW.Store = {
        get: function (k, defaultVal) {
            return storage.getItem(k) || defaultVal || k + ':not-exist'
        },
        set: function (k, v) {
            storage.setItem(k, v)
        },
        getUserDict: function () {
            return {
                token: this.get('userToken'),
                id: this.get('userId'),
                gid: this.get('userGid')
            }
        },
        getUserToken: function () {
            return this.get('userToken')
        },
        getUserId: function () {
            return this.get('userId')
        },
        getUserGid: function () {
            return this.get('userGid')
        }
    }
})();
