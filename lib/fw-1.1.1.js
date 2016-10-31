"use strict";

(function (func) {
    if (typeof(window.FinancialWorkspace) !== "undefined") return;
    window.FinancialWorkspace = window.$FW = func();
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
        eventMap: {},
        loginRedirect: location.pathname + location.search
    };

    var fn = FinancialWorkspace.prototype = {
        DOMReady: function (callback) {
            document.readyState == 'complete' ? callback() : FinancialWorkspace._global.readyList.push(callback);
        }

        , setAjaxErrorHandler: function (fn) {
            FinancialWorkspace.AjaxErrorHandler = fn;
        }
        , AjaxErrorHandler: function (code, msg, responseText) {
            console.log(code, msg, responseText);
            throw 'this method should be override';
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

                        if (r.code == 10000) {
                            cfg.success && cfg.success(r.data);
                        } else {
                            if (cfg.fail && cfg.fail(r.code, r.message, xhr.responseText)) {
                                // 已经用自己的错误处理方法处理过了, 标记为不需要默认处理函数
                            } else {
                                FinancialWorkspace.AjaxErrorHandler(r.code, r.message)
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
                        //if (xhr.status == 0) $FW.Component.Alert('cross domain deny, check server config: Access-Control-Allow-Origin');
                        if (xhr.status >= 500) $FW.Component.Alert('服务器出现问题了，稍后再试');
                    }
                }
            };

            if (typeof(cfg.data) == 'object') {
                // rails 中的 POST 方法对应到 controller 时, 要伪装成 put 方法
                if (cfg.method.toUpperCase() == 'PUT') cfg.data['_method'] = 'put';
                if (cfg.method.toUpperCase() == 'DELETE') cfg.data['_method'] = 'delete';

                var formData = '';
                for (var i in cfg.data) {
                    if (!cfg.data.hasOwnProperty(i)) continue;
                    if (cfg.data[i] === null) continue;
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


        /**
         * JSONP handler
         *
         * Options:
         *
         * @param {String} url
         * @param {Object|Function} optional options / callback
         * @param {Function} optional callback
         */
        , getJSONP: function (url, params, fn) {
            if ('function' == typeof params) {
                fn = params;
                params = {};
            }

            var enc = encodeURIComponent;

            var formData = '';
            for (var i in params) {
                if (!params.hasOwnProperty(i)) continue;
                if (params[i] === null) continue;
                if (formData) formData += '&';
                formData += i + '=' + enc(params[i]);
            }

            // use the callback name that was passed if one was provided.
            // otherwise generate a unique name by incrementing our counter.
            var id = '__jp' + (+new Date());

            var target = document.getElementsByTagName('script')[0] || document.head;
            var script;

            var timer = setTimeout(function () {
                cleanup();
                if (fn) fn(new Error('Timeout'));
            }, 15000);

            function cleanup() {
                if (script.parentNode) script.parentNode.removeChild(script);
                delete window[id];
                clearTimeout(timer);
            }

            function cancel() {
                if (window[id]) cleanup();
            }

            window[id] = function (data) {
                cleanup();
                if (fn) fn(data);
            };

            // add qs component
            url += (~url.indexOf('?') ? '&' : '?') + 'callback=' + enc(id);
            if (formData) url += '&' + formData;
            script = document.createElement('script');
            script.src = url;
            target.parentNode.insertBefore(script, target);

            return cancel;
        }

        , setLoginRedirect: function (url) {
            // if (url.indexOf('http') < 0) url = location.protocol + '//' + location.host + url;
            this._global.loginRedirect = url;
        }
        , getLoginRedirect: function () {
            return this._global.loginRedirect;
        }

        , Format: {
            // 格式化数字， 123456789.01 => 123,456,789.01
            currency: function (price, precision) {
                var p = parseFloat(price), i = Math.abs(parseInt(p)),
                    j = parseInt(Math.round(Math.abs(p) * 100) - i * 100), s = [];
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
                    r[t[0]] = decodeURIComponent(t[1]);
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
                    //判断滚动条滚到了网页最底部
                    if (window.innerHeight + document.body.scrollTop + document.documentElement.scrollTop + 50 > document.body.scrollHeight) {
                        if (FinancialWorkspace._global.eventMap['touch_bottom'] == 'running') return;
                        FinancialWorkspace._global.eventMap['touch_bottom'] = 'running';
                        cb(function () {
                            FinancialWorkspace._global.eventMap['touch_bottom'] = 'ready';
                        })
                    }
                }, false);
            }
        }
        , Utils: {
            length: function (obj, filter) {
                var filter_func = filter || function () {
                        return true
                    };
                var len = 0;
                if (obj instanceof Array) {
                    for (var i = 0; i < obj.length; i++) {
                        if (filter_func(obj[i])) len++
                    }
                } else if (obj instanceof Object) {
                    for (var j in obj) {
                        if (obj.hasOwnProperty(j) && filter_func(j)) len++;
                    }
                } else {
                    throw 'can not compute length of: ' + obj.toString();
                }
                return len;
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
            },
            _login: function (param) {
                if (FinancialWorkspace.Browser.inApp() && NativeBridge) {
                    NativeBridge.login()
                } else {
                    // is_mall=1 用来判断, 登录请求来自商城, 返回地址需要添加商城域名
                    // is_mall=2 WAP
                    location.href = 'http://m.9888.cn/mpwap/orderuser/toLogin.shtml?' + param + '&redirect_url=' + FinancialWorkspace.getLoginRedirect();
                }
            }
            , loginMall: function () {
                FinancialWorkspace.Utils._login('is_mall=1')
            }
            , loginWap: function () {
                FinancialWorkspace.Utils._login('is_mall=2')
            }
            , shouldShowHeader: function () {
                return !$FW.Browser.inApp() || $FW.Browser.appVersion() >= $FW.AppVersion.show_header
            }
        }
        , Browser: {
            inApp: function () {
                return navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
            },
            appVersion: function () {
                var r = navigator.userAgent.match(/FinancialWorkshop\/(\d+.\d+.\d+)/);
                return r ? r[1] : '0';
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
        , AppVersion: {
            show_header: '2.2.20'
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
                }, 9900)
            }
            , hideAjaxLoading: function () {
                var id = '_id_react_component_global_loading';
                if (document.getElementById(id)) {
                    FinancialWorkspace.Component.getReactDOM().unmountComponentAtNode(
                        document.getElementById(id));
                }
            }
            , Alert: function (title, options) {
                var id = '_id_react_component_global_alert';
                options = options || {};
                var element = document.getElementById(id);
                if (!element) {
                    element = document.createElement('div');
                    element.id = id;
                    document.body.appendChild(element);
                }

                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalAlert, {
                    id: id,
                    title: title,
                    header: options.header,
                    confirm_text: '确认',
                    unMountHandler: function () {
                        element.parentNode.removeChild(element)
                    }
                }), element);
            }
            , Toast: function (data) {
                var id = '_id_react_component_global_toast';
                var element = document.getElementById(id);

                if (!element) {
                    element = document.createElement('div');
                    element.id = id;
                    document.body.appendChild(element);
                }

                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalToast, {
                    id: id,
                    text: data,
                    unMountToast: function () {
                        element.parentNode.removeChild(element);
                    }
                }), element);

            }
            , Confirm: function(cnt, btnTextArr, lBtnFun, rBtnFun) {
                var id = '_id_react_component_global_pop';
                var element = document.getElementById(id);

                if (!element) {
                    element = document.createElement('div');
                    element.id = id;
                    document.body.appendChild(element);
                }

                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalConfirm, {
                    id: id,
                    text: cnt,
                    btnTextArr: btnTextArr,
                    lBtnFun: function() {
                        if(lBtnFun == false) {
                            element.parentNode.removeChild(element);
                        } else {
                            lBtnFun();
                            element.parentNode.removeChild(element);
                        }
                    },
                    rBtnFun: function () {
                        if(rBtnFun == false) {
                            element.parentNode.removeChild(element);
                        } else {
                            rBtnFun();
                            element.parentNode.removeChild(element);
                        }
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

});
