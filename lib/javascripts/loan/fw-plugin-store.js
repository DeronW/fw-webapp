(function () {

    var storage = window.localStorage;

    $FW.Store = {
        get: function (k, defaultVal) {
            return storage.getItem(k) || defaultVal || ''
        },
        set: function (k, v) {
            storage.setItem(k, v)
        },
        clear: function () {
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
            if (typeof (dict) === 'string') dict = JSON.parse(dict);
            dict.token && this.set('userToken', dict.token);
            dict.id && this.set('userId', dict.id);
            dict.gid && this.set('userGid', dict.gid);
            dict.status && this.set('userStatus', dict.status);
            dict.invitCode && this.set('invitationCode', dict.invitCode);
            dict.uid && this.set('uid', dict.uid);
        },

        getUserDict: function () {
            return {
                token: this.get('userToken'),
                id: this.get('userId'),
                gid: this.get('userGid'),
                status: this.get('userStatus'),
                invitCode: this.get('invitationCode'),
                uid: this.get('uid')
            }
        },

        exportUserDict: function () {
            return JSON.stringify(this.getUserDict())
        }
    }
})();
