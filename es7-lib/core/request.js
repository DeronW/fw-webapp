let Ajax = function (options) {
    var cfg = {
        url: '',
        method: 'GET',
        data: {},
        success: null,
        complete: null,
        fail: null,
        slience: false, // 当返回结果 code 非 10000 时, 只 reject 不做其它操作
        withCredentials: false,
        timeout: 10,
        enable_loading: false
    };
    // 快捷写法, 如果传入参数只有一个字符串, 那么就默认使用 GET 请求这个字符串表示的地址
    if (typeof (options) == 'string') options = {
        url: options,
        enable_loading: 'mini'
    };

    for (var i in cfg) {
        if (cfg.hasOwnProperty(i) && typeof (options[i]) !== 'undefined')
            cfg[i] = options[i]
    }
    // 添加ajax加载样式的默认主题, 目前有 default(豆哥转呼啦圈) 和 mini(转动小圆圈) 两种
    if (cfg.enable_loading === true) cfg.enable_loading = 'default';

    var xhr = new XMLHttpRequest();

    if (typeof (cfg.data) == 'object') {
        // 伪装成 PUT or DELETE 方法
        if (cfg.method.toUpperCase() === 'PUT') cfg.data['_method'] = 'put';
        if (cfg.method.toUpperCase() == 'DELETE') cfg.data['_method'] = 'delete';

        var formData = '';
        for (var i in cfg.data) {
            if (!cfg.data.hasOwnProperty(i)) continue;
            if (cfg.data[i] === null || cfg.data[i] === undefined) continue;
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
    if (cfg.enable_loading) FW.Component.showAjaxLoading(cfg.enable_loading);

    var p = new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (cfg.enable_loading) FW.Component.hideAjaxLoading();

                if (xhr.status == 200 || xhr.status == 201) {
                    var r = JSON.parse(xhr.responseText);
                    cfg.complete && cfg.complete(r);

                    if (r.code == 10000) {
                        cfg.success && cfg.success(r.data);
                        resolve(r.data);
                    } else {
                        if (cfg.fail && cfg.fail(r.code, r.message, xhr.responseText) === true) {
                            // 已经用自己的错误处理方法处理过了,
                            // if return value is true, no more handle functions
                            // 标记为不需要默认处理函数
                        } else {
                            // slience 参数, 表示即使出现错误也采取静默处理的方式
                            // 采用哪种静默处理方式, 由个项目自己的异常处理函数处理
                            FW.AjaxErrorHandler(r.code, r.message, cfg.slience);
                            reject(r);
                        }
                    }
                } else if (xhr.status == 404) {
                    FW.Component.Alert('API不存在，请确认接口地址正确')
                } else if (xhr.status >= 500) {
                    //if (xhr.status == 0) FW.Component.Alert('cross domain deny, check server config: Access-Control-Allow-Origin');
                    FW.Component.Alert('服务器开小差了~ 请稍后再试(' + xhr.status + ')');
                } else {
                    if (xhr.status !== 0)
                        FW.Component.Alert('ERROR, HTTP status code: ' + xhr.status + ' ' + cfg.url);
                }

                if (xhr.status > 201) {
                    // Ajax返回状态码不是200或201即认定为异常, 需要上报
                    var e = 'Ajax Error ' +
                        '\n status code: ' + xhr.status +
                        '\n url: ' + cfg.url +
                        '\n method: ' + cfg.method +
                        '\n data: ' + JSON.stringify(cfg.data);
                    FW.Capture(e);
                }
            }
        };
    });
    xhr.send(formData);

    setTimeout(function () {
        if (xhr.readyState != 4) $FW.Component.Toast('请求超时[' + cfg.timeout + 's]')
    }.bind(this), cfg.timeout * 1000)

    return p;
}

let Ajax = require('./ajax.js')

/*
* Ajax 的简化版, 仅用于Post请求
* 接受3个必要参数
* url: 请求地址
* data: 请求参数
* success: 成功后的执行函数
* Post方法 use "slience" option,
*/
const Post = function(url, data, loading, slience) {
    return Ajax({
        url: url,
        method: 'POST',
        data: data,
        enable_loading: loading || 'mini',
        slience: slience === undefined ? true : !!slience
    })
}

class Request {
    constructor(error_handler) {
        this.error_handler = error_handler
    }

    ajax(options) {
        console.log('call ajax')
    }
}

export default Request
