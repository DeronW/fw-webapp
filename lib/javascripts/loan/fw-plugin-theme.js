// this plugin depend on FW.Store
(function () {

    if (typeof ($FW.Store) === 'undefined')
        throw new Error('$FW.Theme plugin depend on $FW.Store plugin')

    var KEY = '_theme_list';
    var THEME_DICT = {
        default: {
            tabbar: true,
            header: true
        },
        jrgc_app: {
            tabbar: false
        },
        wechat: {
            header: false
        },
        wap: {
            // this is default settings
        }
    }

    $FW.Theme = {
        _initTheme: function () {
            var th = 'wap';
            if ($FW.Browser.inApp()) th = 'jrgc_app';
            if ($FW.Browser.inWeixin()) th = 'wechat';
            $FW.Store.set(KEY, [th])
        },
        _getThemeList: function () {
            var v = $FW.Store.get(KEY);
            return v === '' ? [] : v.split(',');
        },
        setTheme: function (name) {
            var list = this._getThemeList();
            if (name in THEME_DICT) {
                var next_lsit = list.map(function(i){
                    i === name ? null : i
                })
                next_lsit.push(name)
            } else {
                throw new Error('wrong theme name:' + name + ', donot support this theme #sj384ja0')
            }
            $FW.Store.set(KEY, next_lsit)
        },
        get: function (k) {
            var v = THEME_DICT.default[k], theme_list = this._getThemeList();
            // 间接初始化 theme
            if (theme_list.length === 0) {
                this._initTheme();
                theme_list = this._getThemeList()
            }
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
