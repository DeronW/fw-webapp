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
        }
    }

    $FW.Theme = {
        setTheme: function (name) {
            let list = $FW.Store.get(KEY) || [];
            if (name in THEME_DICT) {
                let next_lsit = list.map(i => i === name ? null : i)
                next_lsit.push(name)
            } else {
                throw new Error('wrong theme name:' + name + ', donot support this theme #sj384ja0')
            }
            $FW.Store.set(KEY, next_lsit)
        },
        getThemeList: function () {
            $FW.Store.get(KEY)
        },
        get: function (k) {
            var v = THEME_DICT.default[k], theme_list = this.getThemeList();
            if (typeof (v) === 'undefined')
                throw new Error('THEME_DICT does not contain this field');

            for (var i = 0; i < theme_list.length; i++) {
                var t_v = THEME_DICT[i][k];
                if (typeof (t_v) !== 'undefined') v = t_v
            }
            return v
        }
    }
})();
