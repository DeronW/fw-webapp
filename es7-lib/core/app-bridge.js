const AppBridge = {
    _getBridge: function () {
        if (typeof (NativeBridge) === 'undefined') throw 'NativeBridge is not define';
        return NativeBridge;
    },
    _words: {
        toNative: {
            '徽商银行开户': 'app_open_hs_account'
        }
    },
    send: function (keyword, value) {
        var bridge = FW.AppBridge._getBridge();
        var words = FW.AppBridge._words;
        if (keyword == '标题') {
            bridge.setTitle(value)
        } else if (keyword == '登录') {
            bridge.login(value)
        } else {
            if (words.toNative[keyword]) {
                bridge.toNative(words.toNative[keyword])
            } else {
                throw 'can not handle this keyword in NativeBridge: ' + keyword + ' ' + value;
            }
        }
    }
}

module.exports = AppBridge