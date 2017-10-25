import { Request, Components } from 'fw-javascripts'

let API_PATH = document.getElementById('api-path').value;

const Ajax = options => {
    // add default url prefix
    options.url = `${API_PATH}/mpwap${options.url}`
    if (options.fullUrl) options.url = options.fullUrl

    return Request(options).catch(error => {
        /*
        result : {
            code: xxxx,
            data: ...
            message: ...
        }

        */
        return new Promise((_, reject) => {
            if (error.code == 40101) {
                console.log('here ! should go to login')

                location.href = '/static/jrgc/manager/index.html#/login'

            } else {
                // 如果不弹出错误, 就直接reject
                if (options.silence) reject(error)

                Components.showToast(error.message)
                setTimeout(() => reject(error), 1700)
            }
        })
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
    Ajax,
    Get,
    Post
}