(function (scope, undefined) {

    var FXH = {
        Post: function (url, params, slience) {
            var USER = $FW.Store.getUserDict();
            var common_params = {
                sourceType: SOURCE_TYPE,
                userGid: USER.gid || 'not-exist',
                userId: USER.id || 0,
                token: USER.token || 'not-exist',
                uid: USER.uid || 'not-exist'
            }
            var merged_params = Object.assign({}, params, common_params)
            return $FW.Post(url, merged_params, 'mini', slience)
        }

    };

    scope.$FXH = FXH;

})(window, undefined)
