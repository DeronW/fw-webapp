(function () {

    var storage = window.localStorage;

    $FW.Store = {
        get: function (k, defaultVal) {
            return storage.getItem(k) || defaultVal || k + ':not-exist'
        },
        set: function (k, v) {
            storage.setItem(k, v)
        },
        clear: function(){
            storage.clear()
        },

        /*
            setUserDict accept one parameter,
            param = {
                token: 'xxx',
                id: 'xxx',
                gid: 'xxx',
                status: 'xxx'
            }
        */
        setUserDict: function (dict) {
            dict.token && this.set('userToken', dict.token);
            dict.id && this.set('userId', dict.id);
            dict.gid && this.set('userGid', dict.gid);
            dict.status && this.set('userStatus', dict.status);
            dict.code && this.set('invitationCode', dict.code);
        },

        getUserDict: function () {
            return {
                token: this.get('userToken'),
                id: this.get('userId'),
                gid: this.get('userGid'),
                status: this.get('userStatus'),
                code:this.get('invitationCode')
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
        },
        getInvitationCode:function(){
            return this.get('invitationCode')
        }
    }
})();
