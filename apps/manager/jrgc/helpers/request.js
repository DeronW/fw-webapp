import { Request, Components } from 'fw-javascripts'

let API_PATH = document.getElementById('api-path').value;

const Ajax = options => {
    // add default url prefix
    options.url = `${API_PATH}/mpwap${options.url}`

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

            // location.href = 'https://m.9888.cn/static/manager/jrgc/index.html#/login'
        } else {
            // 如果不弹出错误, 就直接reject
            if (options.silence)
                return new Promise((reslove, reject) => reject(error))

            Components.showToast(error.message)

            return new Promise((resolve, reject) => {
                setTimeout(() => reject(error), 1700)
            })
        }
    })
}

const Get = (url, params, silence = true) => {
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
    Get,
    Post
}