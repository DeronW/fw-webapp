// this plugin depend on FW.Store
(function () {

    if (typeof ($FW.Store) === 'undefined')
        throw new Error('$FW.Theme plugin depend on $FW.Store plugin')

    var KEY = '_THEME_LIST';
    var THEME_DICT = {
        default: {
            tabbar: true,
            header: true,
            weixin_download_page: '/static/loan/weixin-invite/index.html'
        },
        jrgc_app: {
            tabbar: false,
            weixin_download_page: '/static/loan/weixin-invite/index.html'
        },
        fxh_app: {
            weixin_download_page: '/static/loan/weixin-invite4app/index.html'
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

    $FW.Theme = {
        _initTheme: function () {
            // init method, DONOT call other methods here
            var th = 'wap';
            if ($FW.Browser.inJRGCApp()) th = 'jrgc_app';
            if ($FW.Browser.inFXHApp()) th = 'fxh_app';
            if ($FW.Browser.inWeixin()) th = 'weixin';
            $FW.Store.set(KEY, [th])
        },
        _getThemeList: function () {
            var v = $FW.Store.get(KEY)
            if (v === '') this._initTheme()
            v = $FW.Store.get(KEY)
            return v === '' ? [] : v.split(',');
        },
        setTheme: function (name) {
            var list = this._getThemeList();
            if (name in THEME_DICT) {
                var next_lsit = list.map(function (i) { i === name ? null : i })
                next_lsit.push(name)
            } else {
                throw new Error('wrong theme name:' + name + ', donot support this theme #sj384ja0')
            }
            $FW.Store.set(KEY, next_lsit)
        },
        hasTheme: function (name) {
            return this._getThemeList().indexOf(name) > -1
        },
        in: function (name) {
            return this.hasTheme(name)
        },
        get: function (k) {
            var v = THEME_DICT.default[k], theme_list = this._getThemeList()
            if (typeof (v) === 'undefined')
                throw new Error('THEME_DICT does not contain this field');

            for (var i = 0; i < theme_list.length; i++) {
                var t_v = THEME_DICT[theme_list[i]][k];
                if (typeof (t_v) !== 'undefined') v = t_v
            }
            return v
        }
    }
})();
