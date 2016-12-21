(function (func) {
    if (typeof (window.FinancialWorkspace) !== "undefined") return;
    window.FinancialWorkspace = window.$FW = func();
})(function () {

    var FinancialWorkspace = function (selector) {};

    FinancialWorkspace.extend = function (collection) {
        for (var i in collection) {
            if (collection.hasOwnProperty(i) && typeof (FinancialWorkspace[i]) === 'undefined')
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
        },
        setAjaxErrorHandler: function (fn) {
            FinancialWorkspace.AjaxErrorHandler = fn;
        },
        AjaxErrorHandler: function (code, msg, responseText) {
            console.log(code, msg, responseText);
            throw 'this method should be override';
        },
        Ajax: function (options) {
            var cfg = {
                url: '',
                method: 'GET',
                data: {},
                success: null,
                complete: null,
                fail: null,
                withCredentials: false,

                enable_loading: false
            };
            // 快捷写法, 如果传入参数只有一个字符串, 那么就默认使用 GET 请求这个字符串表示的地址
            if (typeof (options) == 'string') options = {
                url: options
            };

            for (var i in cfg) {
                if (cfg.hasOwnProperty(i) && typeof (options[i]) !== 'undefined')
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

            if (typeof (cfg.data) == 'object') {
                // 伪装成 PUT or DELETE 方法
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
            xhr.withCredentials = !!cfg.withCredentials;
            if (cfg.enable_loading) FinancialWorkspace.Component.showAjaxLoading();

            var p = new Promise(function (resolve, reject) {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (cfg.enable_loading) FinancialWorkspace.Component.hideAjaxLoading();

                        if (xhr.status == 200 || xhr.status == 201) {
                            var r = JSON.parse(xhr.responseText);
                            cfg.complete && cfg.complete(r);

                            if (r.code == 10000) {
                                cfg.success && cfg.success(r.data);
                                resolve(r.data);
                            } else {
                                if (cfg.fail && cfg.fail(r.code, r.message, xhr.responseText)) {
                                    // 已经用自己的错误处理方法处理过了, 标记为不需要默认处理函数
                                } else {
                                    FinancialWorkspace.AjaxErrorHandler(r.code, r.message)
                                }
                                reject(r.code, r.message);
                            }
                        } else if (xhr.status == 404) {
                            $FW.Component.Alert('API不存在，请确认接口地址正确')
                        } else if (xhr.status >= 500) {
                            //if (xhr.status == 0) $FW.Component.Alert('cross domain deny, check server config: Access-Control-Allow-Origin');
                            $FW.Component.Alert('服务器出现问题了，稍后再试');
                        } else {
                            $FW.Component.Alert(JSON.parse(xhr.responseText).error);
                        }
                    }
                };
            });
            xhr.send(formData);

            return p;
        },
        /**
         * JSONP handler
         *
         * Options:
         *
         * @param {String} url
         * @param {Object|Function} optional options / callback
         * @param {Function} optional callback
         */
        getJSONP: function (url, params, fn) {
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
            var id = '__jp' + (+new Date()) + Math.random().toString().substr(3, 5);

            var target = document.getElementsByTagName('script')[0] || document.head;
            var script;

            // add qs component
            url += (~url.indexOf('?') ? '&' : '?') + 'callback=' + enc(id);
            if (formData) url += '&' + formData;
            script = document.createElement('script');
            script.async = true;
            script.src = url;

            return new Promise(function (resolve, reject) {
                var timer = setTimeout(function () {
                    var err = new Error('JSONP request timeout');
                    cleanup();
                    // fn && fn(err);
                    reject(err);
                }, 3500);

                function cleanup() {
                    if (script.parentNode) script.parentNode.removeChild(script);
                    clearTimeout(timer);
                    window[id] = function () {
                        delete window[id];
                    }
                }

                window[id] = function (data) {
                    cleanup();
                    fn && fn(data);
                    resolve(data);
                };

                target.parentNode.insertBefore(script, target);
            });
        },
        setLoginRedirect: function (url) {
            // if (url.indexOf('http') < 0) url = location.protocol + '//' + location.host + url;
            this._global.loginRedirect = url;
        },
        getLoginRedirect: function () {
            return this._global.loginRedirect;
        },
        Format: {
            // 格式化数字， 123456789.01 => 123,456,789.01
            currency: function (price, precision) {
                var p = parseFloat(price),
                    i = Math.abs(parseInt(p)),
                    j = parseInt(Math.round(Math.abs(p) * 100) - i * 100),
                    s = [];
                while (i > 1000) {
                    i = i / 1000;
                    s.push(((i.toString().split('.')[1] || '') + '000').substr(0, 3));
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
        },
        Event: {
            slideDownRefresh: function () {
                if (FinancialWorkspace._global.eventMap['slide_down_refresh'])
                    throw ('duplicated event listener on slide down');
                FinancialWorkspace._global.eventMap['slide_down_refresh'] = 'ready';

                var upper = document.createElement('div'),
                    body = document.body;
                upper.innerText = '下拉刷新';
                upper.setAttribute('style', 'height: 0; overflow: hidden; position: absolute; top: 0; width: 100%;line-height: 50px; text-align: center; font-size: 26px; color: #555;')
                body.insertBefore(upper, body.childNodes[0]);

                var _start_y, _end_y, threshold = 200;

                document.body.addEventListener('touchmove', function (event) {

                    if (_start_y == null && document.body.scrollTop < 1)
                        _start_y = event.targetTouches[0].clientY;

                    if (_start_y) {

                        var y = event.targetTouches[0].clientY,
                            delta;
                        if (_end_y == null || y > _end_y) {
                            _end_y = y;
                            delta = Math.min(_end_y - _start_y, threshold);
                        }

                        if (delta) {
                            upper.style.height = delta / threshold * 80 + 'px';
                            upper.style.paddingTop = delta - 50 + 'px';
                            document.body.style.paddingTop = delta + 'px';
                            if (delta >= threshold) {
                                upper.innerText = '松开刷新'
                            }
                        }
                    }
                })

                document.body.addEventListener('touchend', function (event) {
                    if (_end_y - _start_y > threshold) {
                        location.reload();
                        // } else if (document.body.scrollTop >= threshold) {
                    } else {
                        upper.style.height = '0px';
                        upper.style.paddingTop = '0px';
                        document.body.style.paddingTop = '0px';
                    }
                    _start_y = null, _end_y = null;
                })
            },
            touchBottom: function (cb) {
                if (FinancialWorkspace._global.eventMap['touch_bottom'])
                    throw ('duplicated event listener on slide up');
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
        },
        Utils: {
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
            },
            jsonFilter: function (obj, filter) {
                if (typeof (obj) != 'object') throw obj + ' is not a JSON object';
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
            },
            loginMall: function () {
                FinancialWorkspace.Utils._login('is_mall=1')
            },
            loginWap: function () {
                FinancialWorkspace.Utils._login('is_mall=2')
            },
            shouldShowHeader: function () {
                // return !$FW.Browser.inApp()
                return true
            }
        },
        Browser: {
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
        },
        AppVersion: {
            // 因为App会定期强制更新, 很多依赖于App的方法也会跟App强制关联, 这种关联关系
            // 会一直存在, App与内嵌网页采用口头约定的方式, 因此存在很多不在文档的默认约定
            // 这种约定很难通过代码直接表现出来, 但是会影响到最终呈现结果 ... add by Delong. 2016-12-19
        },
        AppBridge: {
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
                var bridge = FinancialWorkspace.AppBridge._getBridge();
                var words = FinancialWorkspace.AppBridge._words;
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
        },
        Component: {
            getReactDOM: function () {
                if (!ReactDOM) throw 'ReactDOM is not define. maybe you have not include react-dom.js';
                if (ReactDOM.version < '15') throw 'React version is:' + ReactDOM.version + ', we need at least 15';
                return ReactDOM;
            },
            _createTemporaryDOMNode: function (id) {
                var element = document.getElementById(id);

                if (!element) {
                    element = document.createElement('div');
                    element.id = id;
                    document.body.appendChild(element);
                }
                return element;
            },
            showAjaxLoading: function () {
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
            },
            hideAjaxLoading: function () {
                var id = '_id_react_component_global_loading';
                if (document.getElementById(id)) {
                    FinancialWorkspace.Component.getReactDOM().unmountComponentAtNode(
                        document.getElementById(id));
                }
            },
            Alert: function (title, options) {
                options = options || {};
                var id = '_id_react_component_global_alert',
                    node = $FW.Component._createTemporaryDOMNode(id);

                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalAlert, {
                    id: id,
                    title: title,
                    header: options.header,
                    confirm_text: '确认',
                    unMountAlert: function () {
                        node.parentNode.removeChild(node)
                    }
                }), node);
            },
            Toast: function (data) {
                var id = '_id_react_component_global_toast',
                    node = $FW.Component._createTemporaryDOMNode(id);

                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalToast, {
                    id: id,
                    text: data,
                    unMountToast: function () {
                        node.parentNode.removeChild(node)
                    }
                }), node);

            },
            Confirm: function (title, confirmCallback) {
                title = title || '确定?';
                var id = '_id_react_component_global_confirm',
                    node = $FW.Component._createTemporaryDOMNode(id);

                FinancialWorkspace.Component.getReactDOM().render(React.createElement(GlobalConfirm, {
                    id: id,
                    title: title,
                    confirmCallback: confirmCallback,
                    unMountConfirm: function () {
                        node.parentNode.removeChild(node)
                    }
                }), node);
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
