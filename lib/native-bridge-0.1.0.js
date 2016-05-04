;if (typeof($FW) == 'undefined') {
    alert('should load financial-workspace-xxx.js first');
    throw('should load financial-workspace-xxx.js first');
}

(function () {
    var Bridge = function () {
        this.bridge = null;
        this.isReady = false;
        this._ready_list = [];
    };
    Bridge.prototype = {
        init: function (bridge) {
            this.bridge = bridge;
            this.isReady = true;
            for (var i = 0; i < this._ready_list.length; i++) {
                this._ready_list[i]();
            }
            this._ready_list = [];
        },
        ready: function (cb) {
            this._ready_list.push(cb);
        },
        goto: function (link) {
            this.bridge.callHandler('nativeCallback', createPackage('goto', link))
        },
        setTitle: function (title) {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', createPackage('set_title', title))
            } else {
                this._ready_list.push(function () {
                    NativeBridge.setTitle(title)
                });
            }
        },
        login: function () {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', {action: 'login'});
            } else {
                this._ready_list.push(function () {
                    NativeBridge.login()
                });
            }
        }
    };

    function createPackage(action, value) {
        var encode = navigator.userAgent.match(/Android/i);
        value = encode ? encodeURI(value) : value;
        return {
            action: action,
            value: value,
            encode: encode
        }
    }

    window.NativeBridge = new Bridge();
})();

window.onNativeMessageReceive = function (msg) {
    console.log('not define onNativeMessageReceive yet, receive msg: ', msg)
};

(function (callback) {

    // 如果不在app内打开, 不需要加载真实的 js bridge
    if (!$FW.Browser.inApp()) return;

    if (window.NativeBridge.bridge) return;

    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        // Android初始化方法
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false);
        // iOS初始化方法
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        } else {
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
    }
})(function (bridge) {
    // Android need this init function, or cound not send message to webview
    // BUT!!!, iOS could not use this, or cound not send message to webview

    if (navigator.userAgent.match(/Android/i)) {
        bridge.init(function (message, responseCallback) {
            responseCallback({'msg': 'init success'})
        })
    }
    bridge.registerHandler('jsHandler', function (data, responseCallback) {
        alert('receive msg from native: ' + data);
        responseCallback({'receive msg from native': "gocha"});
        var resp = window.onNativeMessageReceive(data);
        if (resp) responseCallback(resp);
    });

    NativeBridge.init(bridge);
});