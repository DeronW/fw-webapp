(function () {

    var g = function (k) {
        window.localStorage.getItem(k);
    }

    var storage = window.localStorage;

    $FW.Store = {
        get: function (k, v) {
            return storage.getItem(k) || v
        },
        set: function (k, v) {
            storage.setItem(k, v)
        },
        getUserToken: function () {
            return g('userToken') || 'token-not-exist';
        },
        getUserId: function () {
            if (!window.localStorage.userId) {
                window.localStorage.setItem("userId", "not-exist-userId");
            }
            return window.localStorage.getItem("userId") || window.localStorage.userId;
        },
        getUserGid: function () {
            if (!window.localStorage.userGid) {
                window.localStorage.setItem("userGid", "not-exist-userGid");
            }
            return window.localStorage.getItem("userGid") || window.localStorage.userGid;
        }
    }
})();
