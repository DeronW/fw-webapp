"use strict";

(function (func) {
    if (typeof(window.FinancialWorkspace) !== "undefined") return;
    window.FinancialWorkspace = window.$FW = window.FW = func();
})(function () {

    var FinancialWorkspace = function (selector) {
    };

    FinancialWorkspace.extend = function (collection) {
        for (var i in collection) {
            if (collection.hasOwnProperty(i) && typeof(FinancialWorkspace[i]) === 'undefined')
                FinancialWorkspace[i] = collection[i];
        }
    };

    FinancialWorkspace._global = {
        readyList: [],
        eventMap: {}
    };

    var fn = FinancialWorkspace.prototype = {
        DOMReady: function (callback) {
            document.readyState == 'complete' ? callback() : FinancialWorkspace._global.readyList.push(callback);
        }
        , Ajax: function (options) {
            var cfg = {
                url: '',
                method: 'GET',
                data: {},
                success: null,
                complete: null,
                fail: null,

                enable_loading: false
            };
            for (var i in cfg) {
                if (cfg.hasOwnProperty(i) && typeof(options[i]) !== 'undefined')
                    cfg[i] = options[i]
            }

            var xhr;
            try {
                xhr = new XMLHttpRequest();
            } catch (E) {
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (E) {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (cfg.enable_loading) FinancialWorkspace.Component.hideAjaxLoading();

                    if (xhr.status == 200 || xhr.status == 201) {
                        var r = JSON.parse(xhr.responseText);
                        cfg.complete && cfg.complete(r);
                        r.ret && cfg.success && cfg.success(r.data);
                        if (!r.ret) {
                            if (cfg.fail) {
                                if (!cfg.fail(xhr.responseText)) handleErrorCode(r.code, r.message)
                            } else {
                                handleErrorCode(r.code, r.message)
                            }
                        }
                    } else if (xhr.status == 400) {
                        $FW.Component.Alert(JSON.parse(xhr.responseText).error);
                    } else if (xhr.status == 401) {
                        $FW.Component.Alert('请您先登录');
                    } else if (xhr.status == 404) {
                        $FW.Component.Alert('API不存在，请确认接口地址正确')
                    } else if (xhr.status == 422) {
                        $FW.Component.Alert('请求中没有包含CSRF TOKEN')
                    } else {
                        if (xhr.status == 0) $FW.Component.Alert('cross domain deny, check server config: Access-Control-Allow-Origin');
                        if (xhr.status >= 500) $FW.Component.Alert('服务器出现问题了，稍后再试');
                    }
                }
            };

            if (typeof(cfg.data) == 'object') {
                //data['authenticity_token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content');

                // rails 中的 POST 方法对应到 controller 时, 要伪装成 put 方法
                if (cfg.method.toUpperCase() == 'PUT') cfg.data['_method'] = 'put';
                if (cfg.method.toUpperCase() == 'DELETE') cfg.data['_method'] = 'delete';

                var formData = '';
                for (var i in cfg.data) {
                    if (!cfg.data.hasOwnProperty(i)) continue;
                    if (cfg.data[i] == null) continue;
                    if (formData) formData += '&';
                    formData += i + '=' + cfg.data[i];
                }
            } else {
                formData = cfg.data;
            }

            var url = cfg.url;
            if (cfg.method.toUpperCase() == 'GET' && formData) {
                url.indexOf('?') > 0 ? url += '&' + formData : url += '?' + formData
            }
            xhr.open(cfg.method.toUpperCase() == 'GET' ? 'GET' : 'POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.setRequestHeader('Accept', 'application/json');

            if (cfg.enable_loading) FinancialWorkspace.Component.showAjaxLoading();

            xhr.send(formData);
        }
        /*
         url_arr: 批量获取接口的地址数组
         callback: 全部数据返回时的回调函数, 被传入一个数组参数, 依次是 url_arr 的返回接口
         enable_loading: 加载时是否显示动画
         */
        , BatchGet: function (url_arr, callback, enable_loading) {
            var resp_data = {}, done_count = 0;

            var ajax_cb = function (url, data) {
                resp_data[url] = data;
                done_count++;
                if (done_count == url_arr.length) {
                    if (enable_loading) FinancialWorkspace.Component.hideAjaxLoading();
                    var d = [];
                    for (var j = 0; j < url_arr.length; j++) {
                        d.push(resp_data[url_arr[j]])
                    }
                    callback(d)
                }
            };

            if (enable_loading) FinancialWorkspace.Component.showAjaxLoading();
            url_arr.forEach(function (url) {
                FinancialWorkspace.Ajax({
                    url: url,
                    success: function (d) {
                        ajax_cb(url, d)
                    },
                    fail: function () {
                        $FW.Component.Alert('数据加载失败: ' + url)
                    }
                })
            });
        }
        , Format: {
            // 格式化数字， 123456789.01 => 123,456,789.01
            currency: function (price) {
                var p = parseFloat(price), i = Math.abs(parseInt(p)), j = parseInt(Math.abs(p) * 100 - i * 100), s = [];
                while (i > 1000) {
                    i = i / 1000;
                    s.push(((i.toString().split('.')[1] || '' ) + '000').substr(0, 3));
                    i = parseInt(i);
                }
                s = (i == 1000 ? ['1', '000'] : [i.toString()]).concat(s.reverse());
                return (p >= 0 ? '' : '-') + s.join(',') + (j ? '.' + (j < 10 ? '0' + j : j) : '')
            },
            urlQuery: function () {
                var s = window.location.search;
                if (s.indexOf('?') == 0) s = s.substr(1);
                if (s.indexOf('#') >= 0) s = s.substr(0, s.indexOf('#'));

                var r = {};
                s.split('&').forEach(function (kv) {
                    var t = kv.split('=');
                    r[t[0]] = t[1];
                });
                return r;
            },
            trim: function (s) {
                return s.replace(/(^\s*)|(\s*$)/g, '')
            }
        }
        , Event: {
            slideDown: function (cb) {

            },
            touchBottom: function (cb) {
                if (FinancialWorkspace._global.eventMap['touch_bottom'])
                    throw('duplicated event listener on slide up');
                FinancialWorkspace._global.eventMap['touch_bottom'] = 'ready';

                window.addEventListener("scroll", function () {
                    console.log(window.innerHeight, document.body.scrollTop, document.body.scrollHeight, ' delta:',
                        document.body.scrollHeight - (window.innerHeight + document.body.scrollTop));
                    //判断滚动条滚到了网页最底部
                    if (window.innerHeight + document.body.scrollTop + 50 > document.body.scrollHeight) {
                        if (FinancialWorkspace._global.eventMap['touch_bottom'] == 'running') return;
                        FinancialWorkspace._global.eventMap['touch_bottom'] = 'running';
                        cb(function () {
                            FinancialWorkspace._global.eventMap['touch_bottom'] = 'ready';
                            console.log('ajax ready')
                        })
                    }
                }, false);
            }
        }
        , Utils: {
            jsonLength: function (obj, filter) {
                var filter_func = filter || function () {
                        return true
                    };
                if (typeof(obj) == 'object') {
                    var s = 0;
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i) && filter_func(i)) s++;
                    }
                    return s
                } else {
                    throw 'can not compute length of: ' + json + ', it is not JSON object';
                }
            }
            , jsonFilter: function (obj, filter) {
                if (typeof(obj) != 'object') throw obj + ' is not a JSON object';
                var filter_func = filter || function () {
                        return true
                    };
                var result = {};
                for (var i in obj) {
                    if (filter_func(obj[i])) {
                        result[i] = obj[i]
                    }
                }
                return result;
            }
        }
        , Browser: {
            inApp: function () {
                return navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
            },
            inMobile: function () {
                var fb = ReactDOM.Browser;
                return fb.inAndroid() || fb.inIOS();
            },
            inAndroid: function () {
                return navigator.userAgent.match(/Android/i) ? true : false;
            },
            inIOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
            }
        }
        , Component: {
            getReactDOM: function () {
                if (!ReactDOM) throw 'ReactDOM is not define. maybe you have not include react-dom.js';
                if (ReactDOM.version < '15') throw 'React version is:' + ReactDOM.version + ', we need at least 15';
                return ReactDOM;
            }
            , showAjaxLoading: function () {
                if (!window.GlobalLoading) throw 'GlobalLoading is not define';
                var id = '_id_react_component_global_loading';
                var element = document.getElementById(id);
                if (!element) {
                    element = document.createElement('div');
                    element.id = id;
                    document.body.appendChild(element);
                }
                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalLoading, {
                    unMountHandler: function () {
                        element.parentNode.removeChild(element)
                    }
                }), element);
                setTimeout(function () {
                    FinancialWorkspace.Component.hideAjaxLoading();
                }, 8000)
            }
            , hideAjaxLoading: function () {
                var id = '_id_react_component_global_loading';
                if (document.getElementById(id)) {
                    FinancialWorkspace.Component.getReactDOM().unmountComponentAtNode(
                        document.getElementById(id));
                }
            }
            , Alert: function (title) {
                var id = '_id_react_component_global_alert';
                var element = document.getElementById(id);
                if (!element) {
                    element = document.createElement('div');
                    element.id = id;
                    document.body.appendChild(element);
                }

                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalAlert, {
                    id: id,
                    title: title,
                    confirm_text: '确认',
                    unMountHandler: function () {
                        element.parentNode.removeChild(element)
                    }
                }), element);
            }
        }
    };

    FinancialWorkspace.extend(fn);

    (function () {
        if (document.readyState === "complete") {
            setTimeout(popDOMReadyArr());
        } else {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", ready, false);
            // A fallback to window.onload, that will always work
            window.addEventListener("load", ready, false);
        }
    })();

    /**
     * The ready event handler and self cleanup method
     */
    function ready() {
        document.removeEventListener("DOMContentLoaded", ready, false);
        window.removeEventListener("load", ready, false);
        popDOMReadyArr();
    }

    function popDOMReadyArr() {
        FinancialWorkspace._global.readyList.forEach(function (cb) {
            cb()
        });
        FinancialWorkspace._global.readyList = [];
    }

    return FinancialWorkspace;

    /* independence methods */
    function handleErrorCode(code, msg) {
        if (code == 10000 || code == 0) {
            $FW.Component.Alert('it seems OK');
        } else if (code == 40101) {
            console.log('您需要登录后才能正常访问');
            if (FinancialWorkspace.Browser.inApp() && NativeBridge) {
                NativeBridge.login()
            } else {
                // is_mall=1 用来判断, 登录请求来自商城, 返回地址需要添加商城域名
                location.href = 'http://m.9888.cn/mpwap/orderuser/toLogin.shtml?is_mall=1&redirect_url=' + location.pathname + location.search;
            }
        } else if(code == 40103) {
            $FW.Component.Alert('无效的收货地址')
        } else if (code == 60101) {
            $FW.Component.Alert('短信验证码不存在')
        } else if (code == 60102) {
            $FW.Component.Alert('短信验证码不正确')
        } else if (code == 60103) {
            $FW.Component.Alert('短信验证码已过期')
        } else {
            $FW.Component.Alert(msg)
        }
    }
});