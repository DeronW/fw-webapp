import { Utils } from 'fw-javascripts'

class StorageFactory {
    constructor(Browser) {
        this.Browser = Browser
        this.storage = window.localStorage
    }

    'get' = k => {
        return this.storage.getItem(k) || ''
    }

    'set' = (k, v) => {
        this.storage.setItem(k, v)
    }

    remove = k => {
        let key_list = k instanceof Array ? k : [k]
        key_list.forEach(i => this.storage.removeItem(i))
    }

    login = dict => {
        if (typeof (dict) === 'string') dict = JSON.parse(dict);

        ['token', 'status', 'invite_code', 'uid', 'phone'].forEach(k => {
            dict[k] && this.set(`_$user_${k}`, dict[k])
        })

        // compatiable old way
        dict.token && this.set('userToken', dict.token)
        dict.status && this.set('userStatus', dict.status)
        dict.phone && this.set('phone', dict.phone)
        dict.invitCode && this.set('invitationCode', dict.invitCode)
        dict.invite_code && this.set('invitationCode', dict.invite_code)
        dict.uid && this.set('uid', dict.uid)
    }

    logout = () => {
        ['token', 'status', 'invite_code', 'uid', 'phone'].forEach(k => {
            this.remove(`user_${k}`)
        })

        // compatiable old way
        this.remove(['userToken', 'userStatus', 'invitationCode', 'uid', 'phone'])
    }

    clear = () => {
        this.storage.clear()
    }

    getUserDict = () => {
        let r = {};

        ['token', 'status', 'invite_code', 'uid', 'phone'].forEach(k => {
            r[k] = this.get(`_$user_${k}`)
        })

        // app 会把 登陆用的 token 和 uid 写入cookie中
        if (this.Browser.inFXHApp) {
            if (Utils.Cookie.get('uid')) r.uid = Utils.Cookie.get('uid')
            if (Utils.Cookie.get('token')) r.token = Utils.Cookie.get('token')
            if (Utils.Cookie.get('phone')) r.phone = Utils.Cookie.get('phone')
        }

        return r
    }

    // getUserID = () => {
    //     return this.get('uid') || Utils.Cookie.get('uid')
    // }
}

const Storage_this_is_only_for_sample = {
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
        dict.status && this.set('userStatus', dict.status);
        dict.invitCode && this.set('invitationCode', dict.invitCode);
        dict.uid && this.set('uid', dict.uid);
        dict.phone && this.set('phone', dict.phone);
    },

    getUserDict: function () {
        return {
            token: this.get('userToken'),
            status: this.get('userStatus'),
            invitCode: this.get('invitationCode'),
            uid: this.get('uid'),
            phone: this.get('phone')
        }
    },

    getUserID: function () {
        return this.get('uid') || $FW.Cookie.get('uid')
    },

    // set bulletin content binding with a certain token
    setBulletin: function (token, cnt) {
        this.set('bulletinToken', token);
        this.set('bulletinCnt', cnt);
    },

    // if a bulletin is read for provided token
    isBulletinRead: function (token, cnt) {
        return (this.get('bulletinToken') === token) && (this.get('bulletinCnt') === cnt)
    }
}



export default StorageFactory