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
        // 一次新的登录, 表示一个新的用户周期的开始
        this.clear()

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
            ['uid', 'token', 'phone'].forEach(i => {
                if (Utils.Cookie.get(i)) r[i] = Utils.Cookie.get(i)
            })
        }

        return r
    }

    setUserDict = (dict) => {
        if (typeof (dict) === 'string') dict = JSON.parse(dict);
        dict.token && this.set('userToken', dict.token);
        dict.status && this.set('userStatus', dict.status);
        dict.invitCode && this.set('invitationCode', dict.invitCode);
        dict.uid && this.set('uid', dict.uid);
        dict.phone && this.set('phone', dict.phone);
    }

    isContentNotRead = (key, cnt = 'placeholder') => {
        let k = `_$_cnt_${key}`, read_over = this.get(k)
        this.set(k, cnt)
        return !read_over
    }

    setStoreData = (k, data) => {
        this.set(`_$store_${k}`, JSON.stringify(data))
    }

    getStoreData = k => {
        let r
        try {
            r = JSON.parse(this.get(`_$store_${k}`))
        } catch (err){ }
        return r
    }
}

export default StorageFactory