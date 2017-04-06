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
        set: function (name) {
            let list = $FW.Store.get(KEY) || [];
            if (name in THEME_DICT) {
                let next_lsit = list.map(i => i === name ? null : i)
                next_lsit.push(name)
            } else {
                throw new Error('wrong theme name:' + name + ', donot support this theme #sj384ja0')
            }
            $FW.Store.set(KEY, next_lsit)
        }
    }

})();
