class Ajax {
    constructor(options) {
        let default_options = {
            url: '',
            method: 'GET',
            data: {},
            withCredentials: false,
            timeout: 10,
            onStart: n => null,
            onTimeout: n => null,
            onComplete: n => null
        }

        this.options = Object.assign(default_options, options)
        this.xhr = new XMLHttpRequest()
        this.prepare()
    }
    get request_url() {
        let url = this.options.url, form_data = this.form_data;
        if (this.options.method.toUpperCase() == 'GET' && form_data) {
            let chr = url.indexOf('?') > 0 ? '&' : '?'
            url += `${chr}${form_data}`
        }
        return url
    }
    get form_data() {
        let form_data = '', opt = this.options;
        // 伪装成 PUT or DELETE 方法
        if (opt.method.toUpperCase() === 'PUT')
            opt.data['_method'] = 'put';
        if (opt.method.toUpperCase() == 'DELETE')
            opt.data['_method'] = 'delete';
        if (typeof (opt.data) == 'object') {
            for (let k in opt.data) {
                let v = opt.data[k]
                if (v !== undefined && v !== null)
                    form_data += `${form_data.length ? '' : '&'}${k}=${v}`
            }
        } else {
            form_data = opt.data;
        }
        return form_data
    }

    prepare() {
        let opt = this.options,
            method = opt.method.toUpperCase() == 'GET' ? 'GET' : 'POST';
        this.xhr.open(method, this.request_url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.xhr.setRequestHeader('Accept', 'application/json');
        this.xhr.withCredentials = !!opt.withCredentials;
    }

    counting_down = () => {
        // cancel callback if timeout
        setTimeout(() => {
            this.options.onComplete = n => null;
            this.options.onTimeout()
        }, this.options.timeout * 1000)
    }

    emit = () => {
        this.options.onStart()
        let promise = new Promise((resolve, reject) => {
            this.xhr.onreadystatechange = state => {
                if (this.xhr.readyState == 4) {
                    this.options.onComplete(
                        this.xhr.status, this.xhr.responseText, resolve, reject)
                }
            }
        })
        this.counting_down();
        this.xhr.send(this.form_data);
        return promise
    }
}

class RequestFactory {

    constructor(handler) {
        this.default_options = {
            url: '',
            data: {},
            loading: 'mini',
            slience: false,
            timeout: 10, // seconds before timeout, 0 means do nothing
            withCredentials: false
        }

        let nil = n => null;

        this.handler = Object.assign({
            error_handler: nil,
            timeout_handler: nil,
            alert: nil,
            capture: nil,
            show_loading: nil,
            hide_loading: nil
        }, handler)
    }

    ajax = options => {
        // 快捷写法, 如果传入参数只有一个字符串,
        // 那么就默认使用 GET 请求这个字符串表示的地址
        if (typeof (options) == 'string')
            options = { url: options };

        options = Object.assign({}, this.default_options, options)
        options['onStart'] = () => {
            if (options.loading && options.show_loading)
                this.handler.show_loading(options['loading'])
        }
        options['onTimeout'] = () => {
            if (options.timeout)
                this.handler.timeout_handler(options['timeout'])
        }
        options['onComplete'] = (status, responseText, resolve, reject) => {
            if (status == 200 || status == 201) {
                var r = JSON.parse(responseText);
                if (r.code == 10000) {
                    resolve(r.data);
                } else {
                    if (!options.slience)
                        this.handler.error_handler(r.code, r.message, responseText);
                    reject(r)
                }
            } else if (status == 404) {
                this.handler.alert('API不存在，请确认接口地址正确')
            } else if (status >= 500) {
                //if (status == 0) FW.Component.Alert('cross domain deny, check server config: Access-Control-Allow-Origin');
                this.handler.alert(`服务器开小差了~ 请稍后再试${status}`);
            } else {
                if (status !== 0)
                    this.handler.alert(`ERROR, HTTP status code: ${status} ${options.url}`);
            }

            if (status > 201) {
                // Ajax返回状态码不是200或201即认定为异常, 需要上报
                let e = `Ajax Error status: ${status}` +
                    `\n url: ${options.url}` +
                    `\n method: ${options.method}` +
                    `\n data: ${JSON.stringify(options.data)}`;
                this.handler.capture(e);
            }
        }

        return (new Ajax(options)).emit()
    }
}


export {
    RequestFactory as default
}
