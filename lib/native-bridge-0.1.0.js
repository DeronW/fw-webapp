if (typeof($FW) == 'undefined') {
    alert('should load financial-workspace-xxx.js first');
    throw('should load financial-workspace-xxx.js first');
}

window.__fw_hidden_native_methods = {
    bridge: null,
    login: function (token) {
        $FW.Ajax({
            url: '',
            method: 'post',
            data: {
                token: token
            },
            complete: function (d) {
                console.log(d)
            }
        })
    }
};

(function (callback) {
    if (window.__fw_hidden_native_methods.bridge) return;

    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false)
    }
})(function (bridge) {
    bridge.init(function (message, responseCallback) {
        responseCallback(null)
    });
    bridge.registerHandler('jsHandler', function (data, responseCallback) {
        var resp = window.onNativeMessageReceive(data);
        if (resp) responseCallback(resp);
    });
    window.__fw_hidden_native_methods.bridge = bridge;

    setTitleButton.onclick = function (e) {
        e.preventDefault();

        bridge.callHandler('nativeCallback', {
            'action': 'set_title',
            'value': 'here is the title'
        }, function (response) {

        })
    }
});

window.sendMessageToNative = function (data, cb) {
    var bridge = window.__fw_hidden_native_methods.bridge;
    if (!bridge) throw('javascript bridge not initial');
    bridge.callHandler('nativeCallback', data, cb);
};