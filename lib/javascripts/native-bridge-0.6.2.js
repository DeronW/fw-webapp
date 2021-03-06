(function () {
    var Bridge = function () {
        this.bridge = null;
        this.isReady = false;
        this._ready_list = [];
    };
    /*

    trigger action 的可用参数列表
    close 关闭页面
    hide_header 隐藏native头部导航条
    show_header 显示native头部导航条
    redirectMall 跳转到商城(deprecated)
    refresh_loan_token 获取/刷新放心花登录用的token

    */
    Bridge.prototype = {
        init: function (bridge) {
            this.bridge = bridge;
            this.isReady = true;
            for (var i = 0; i < this._ready_list.length; i++) {
                this._ready_list[i]();
            }
            // this._ready_list = [];
        },
        ready: function (cb) {
            this.isReady ? cb() : this._ready_list.push(cb);
        },
        goto: function (link, need_login, next_title) {
            nativeHandler.call(this, createPackage('goto', link, need_login, next_title))
        },
        setTitle: function (title) {
            if (this.isReady) {
                nativeHandler.call(this, createPackage('set_title', title))
            } else {
                this.ready(function () {
                    NativeBridge.setTitle(title)
                });
            }
        },
        hideHeader: function () {
            this.isReady ?
                this.bridge.callHandler('nativeCallback', createPackage('hide_header')) :
                this.ready(this.hideHeader.bind(this));
        },
        showHeader: function () {
            this.isReady ?
                this.bridge.callHandler('nativeCallback', createPackage('show_header')) :
                this.ready(this.showHeader.bind(this));
        },
        login: function (next_url) {
            this.isReady ?
                nativeHandler.call(this, { action: 'login', value: next_url }) :
                this.ready(this.login.bind(this));
        },
        share: function (opt) {
            nativeHandler.call(this, createPackage('share', JSON.stringify({
                title: opt.title, // 标题
                image: opt.image, // 图标
                link: opt.link, // 链接
                desc: opt.desc // 描述
            }), true))
        },
        gotoMall: function () {
            // deprecated method
            nativeHandler.call(this, { action: 'redirectMall' })
        },
        trigger: function (action_name) {
            this.isReady ?
                nativeHandler.call(this, { action: action_name }) :
                this.ready(function () { this.trigger(action_name) }.bind(this));
        },
        toNative: function (kw) {
            this.isReady ?
                nativeHandler.call(this, { action: 'toNative', value: kw }) :
                console.error('JS Bridge is not ready, can not call "toNative" with', kw)
        },
        clipboard: function (text) {
            nativeHandler.call(this, createPackage('clipboard', text))
        },
        close: function () {
            this.isReady ?
                nativeHandler.call(this, { action: 'close' }) :
                this.ready(this.close.bind(this));
        }
    };

    function nativeHandler(pack) {
        this.bridge.callHandler('nativeCallback', pack)
    }

    function createPackage(action, value, need_login, next_title) {
        var encode = !!navigator.userAgent.match(/Android/i);
        value = encode ? encodeURI(value) : value;
        return {
            action: action,
            need_login: need_login,
            value: value,
            encode: encode,
            next_title:next_title || ''
        }
    }

    window.NativeBridge = new Bridge();
})();

// 接收来自native的消息时, 需要定义这个方法
// window.onNativeMessageReceive

(function (callback) {

    // 如果不在app内打开, 不需要加载真实的 js bridge
    if (navigator.userAgent.indexOf('FinancialWorkshop') < 0 && navigator.userAgent.indexOf('EasyLoan888') < 0) return;
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
    // Android need this init function, or could not send message to webview
    // BUT!!!, iOS could not use this, or could not send message to webview

    if (navigator.userAgent.match(/Android/i)) {
        bridge.init(function (message, responseCallback) {
            responseCallback && responseCallback({ 'msg': 'init success' })
        })
    }
    bridge.registerHandler('jsHandler', function (data, responseCallback) {
        responseCallback && responseCallback({ 'receive msg from native': "gocha" });
        var resp = window.onNativeMessageReceive(data);
        if (resp) responseCallback(resp);
    });

    NativeBridge.init(bridge);
});
