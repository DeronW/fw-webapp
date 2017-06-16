import { Utils } from 'fw-javascripts'

class StorageFactory {
    constructor() {
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

    logout = () => {
        this.remove(['userToken', 'userStatus', 'invitationCode', 'uid'])
    }

    clear = () => {
        this.storage.clear()
    }

    getUserDict = () => {
        return {
            token: this.get('userToken'),
            status: this.get('userStatus'),
            invitCode: this.get('invitationCode'),
            uid: this.get('uid')
        }
    }

    getUserID = () => {
        return this.get('uid') || Utils.Cookie.get('uid')
    }
}

const Storage = {
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
    },

    getUserDict: function () {
        return {
            token: this.get('userToken'),
            status: this.get('userStatus'),
            invitCode: this.get('invitationCode'),
            uid: this.get('uid')
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