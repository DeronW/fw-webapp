import { Request, Components, Browser, NativeBridge } from 'fw-javascripts'

let API_PATH = document.getElementById('api-path').value;

const Ajax = options => {
    // add default url prefix
    options.url = `${API_PATH}${options.url}`

    return Request(options).catch(error => {
        /*
        result : {
            code: xxxx,
            data: ...
            message: ...
        }
        */
        if (error.code == 40101) {
            console.log('here ! should go to login')

            Browser.inApp ?
                NativeBridge.login() :
                location.href = 'https://m.9888.cn/mpwap/orderuser/toLogin.shtml'
        } else {
            // 如果不弹出错误, 就直接reject
            if (silence)
                return new Promise((reslove, reject) => reject(error))

            Components.showToast(error.message)

            return new Promise((resolve, reject) => {
                setTimeout(() => reject(error), 1700)
            })
        }
    })
}

const Get = (url, params, silence = false) => {
    return Ajax({
        url: url,
        method: 'GET',
        data: params,
        silence: silence
    })
}

const Post = (url, params, options) => {
    return Ajax(Object.assign({
        url: url,
        method: 'POST',
        data: params
    }, options))
}

export {
    Ajax as default,
    Get,
    Post
}
