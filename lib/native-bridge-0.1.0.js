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
            this.bridge.callHandler('nativeCallback', {
                action: 'goto',
                value: link
            })
        },
        setTitle: function (title) {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', {
                    action: 'set_title',
                    value: title
                })
            } else {
                this._ready_list.push(function () {
                    NativeBridge.setTitle(title)
                });
            }
        },
        login: function () {
            if (!this.isReady) return;
            this.bridge.callHandler('nativeCallback', {
                action: 'login'
            });
        },
        ajaxStart: function () {
            if (!this.isReady) return;
            this.bridge.callHandler('nativeCallback', {
                action: 'ajax_start'
            });
        },
        ajaxComplete: function () {
            if (!this.isReady) return;
            this.bridge.callHandler('nativeCallback', {
                action: 'ajax_complete'
            });
        }
    };

    window.NativeBridge = new Bridge();
})();

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
    var handler = function (data, responseCallback) {
        alert('got: ' + data);
        var resp = window.onNativeMessageReceive(data);
        if (resp) responseCallback(resp);
    };
    bridge.registerHandler('jsHandler', handler);
    NativeBridge.init(bridge);
});

/*
 function setupWebViewJavascriptBridge(callback) {
 if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
 if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
 window.WVJBCallbacks = [callback];
 var WVJBIframe = document.createElement('iframe');
 WVJBIframe.style.display = 'none';
 WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
 document.documentElement.appendChild(WVJBIframe);
 setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
 }

 setupWebViewJavascriptBridge(function(bridge) {

 bridge.registerHandler('jsHandler', function(data, responseCallback) {
 alert('got: ' + data);
 var responseData = { 'Javascript Says':'Right back atcha!' }
 responseCallback(responseData)
 });

 setTimeout(function(){
 bridge.callHandler('nativeCallback', {'foo': 'bar'}, function(response) {
 console.log('JS got response', response)
 })
 }, 2000)
 });
 */
