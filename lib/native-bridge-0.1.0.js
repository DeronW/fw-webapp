if (typeof($FW) == 'undefined') {
    alert('should load financial-workspace-xxx.js first');
    throw('should load financial-workspace-xxx.js first');
}

window.NativeBridge = {
    // 设置APP标题
	login:
    setTitle: function () {
    },
    ajaxStart: function () {
    },
    ajaxComplete: function () {
    }
};

window.onNativeMessageReceive = function (msg) {
    console.log('not define onNativeMessageReceive yet, receive msg: ', msg)
};

(function (callback) {
    if (window.NativeBridge.bridge) return;

    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
		// Android初始化方法
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false);
		
		// iOS初始化方法
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
})(function (bridge) {
    bridge.init(function (message, responseCallback) {
        responseCallback(null)
    });
    bridge.registerHandler('jsHandler', function (data, responseCallback) {
        var resp = window.onNativeMessageReceive(data);
        if (resp) responseCallback(resp);
    });

    var Bridge = function (bridge) {
        this.bridge = bridge;
    };
    Bridge.prototype = {
        setTitle: function (title, cb) {
            this.bridge.callHandler('nativeCallback', {
                action: 'set_title',
                value: title
            }, cb);
        },
        login: function () {
            this.bridge.callHandler('nativeCallback', {
                action: 'login'
            });
        },
        ajaxStart: function () {
            this.bridge.callHandler('nativeCallback', {
                action: 'ajax_start'
            });
        },
        ajaxComplete: function () {
            this.bridge.callHandler('nativeCallback', {
                action: 'ajax_complete'
            });
        }
    };

    window.NativeBridge = new Bridge(bridge);
});
