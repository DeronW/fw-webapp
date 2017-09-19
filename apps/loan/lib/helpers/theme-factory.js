
let KEY = '_THEME_LIST';
let THEME_DICT = {
    default: {
        tabbar: true,
        header: true,
        weixin_download_page: '/static/loan/weixin-download/index.html?name=OFFICIAL'
    },
    jrgc_app: {
        tabbar: false,
        weixin_download_page: '/static/loan/user-weixin-jrgcapp/index.html'
    },
    fxh_app: {
        header: true,
        weixin_download_page: '/static/loan/user-weixin-fxhapp/index.html'
    },
    partner: {

    },
    weixin: {
        header: false
    },
    wap: {
        // this is same as default settings
    }
}

class ThemeFactory {

    constructor(store, browser) {
        this.store = store

        // init method, DONOT call other methods here
        let th = 'wap';
        if (browser.inJRGCApp) th = 'jrgc_app';
        if (browser.inFXHApp) th = 'fxh_app';
        if (browser.inWeixin) th = 'weixin';

        this.store.set(KEY, [th])
    }

    _get_theme_list = () => {
        let v = this.store.get(KEY)
        v = this.store.get(KEY)
        return v === '' ? [] : v.split(',');
    }

    setTheme = name => {
        let list = this._get_theme_list()
        if (name in THEME_DICT) {
            let next_lsit = list.map(function (i) { i === name ? null : i })
            next_lsit.push(name)
        } else {
            throw new Error('wrong theme name:' + name + ', donot support this theme')
        }
        this.store.set(KEY, next_lsit)
    }

    'in' = name => {
        return this._get_theme_list().indexOf(name) > -1
    }

    get = k => {
        let v = THEME_DICT.default[k], theme_list = this._get_theme_list()

        if (typeof (v) === 'undefined')
            throw new Error('THEME_DICT does not contain this field');

        for (let i = 0; i < theme_list.length; i++) {
            let t_v = THEME_DICT[theme_list[i]][k];
            if (typeof (t_v) !== 'undefined') v = t_v
        }
        return v
    }
}

export default ThemeFactory