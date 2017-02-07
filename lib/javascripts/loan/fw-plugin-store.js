(function () {

    var g = function(k){
        window.localStorage.getItem(k);
    }

    $FW.Store = {
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
