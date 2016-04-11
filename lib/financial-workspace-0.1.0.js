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
        readyList: []
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
                fail: null
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
                    if (xhr.status == 200 || xhr.status == 201) {
                        var r = JSON.parse(xhr.responseText);
                        cfg.complete && cfg.complete(r);
                        r.ret && cfg.success && cfg.success(r.data);
                        if (!ret) {
                            if (cfg.fail) {
                                cfg.fail(xhr.responseText)
                            } else {
                                switch (r.code) {
                                    case 10000:
                                        alert('it is OK')
                                }
                            }
                        }
                    } else if (xhr.status == 400) {
                        alert(JSON.parse(xhr.responseText).error);
                    } else if (xhr.status == 401) {
                        alert('请您先登录');
                        window.location.href = '/users/sign_in';
                    } else if (xhr.status == 422) {
                        alert('请求中没有包含CSRF TOKEN')
                    } else {
                        if (xhr.status >= 500) alert('服务器出现问题了，稍后再试');
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
            xhr.send(formData);
        }
        , BatchGet: function (url_arr, callback) {
            var resp_data = {}, done_count = 0;

            var ajax_cb = function (url, data) {
                resp_data[url] = data;
                done_count++;
                if (done_count == url_arr.length) {
                    var d = [];
                    for (var j = 0; j < url_arr.length; j++) {
                        d.push(resp_data[url_arr[j]])
                    }
                    callback(d)
                }
            };
            url_arr.forEach(function (url) {
                FinancialWorkspace.Ajax({
                    url: url,
                    success: function (d) {
                        ajax_cb(url, d)
                    },
                    fail: function () {
                        alert('数据加载失败: ' + url)
                    }
                })
            });
        }
        , Format: {
            currency: function (price) {
                var p = parseFloat(price), i = Math.abs(parseInt(p)), j = parseInt(Math.abs(p) * 100 - i * 100), s = [];
                while (i > 1000) {
                    i = i / 1000;
                    s.push(((i.toString().split('.')[1] || '' ) + '000').substr(0, 3));
                    i = parseInt(i);
                }
                s = (i == 1000 ? ['1', '000'] : [i.toString()]).concat(s.reverse());
                return (p > 0 ? '' : '-') + s.join(',') + (j ? '.' + j : '')
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