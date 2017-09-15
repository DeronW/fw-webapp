import { Request, Components } from 'fw-javascripts'

import { NativeBridge } from './native-bridge.js'
import Browser from './browser.js'


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
        if (error.code == 40101 || error.code == 63001) {
            // 'here ! should go to login'
            if (Browser.inApp) {
                NativeBridge.login()
            } else {
                // Mac电脑上不能自动跳回来, Safari不支持非法字符回跳地址
                if (navigator.userAgent.match(/Macintosh/i)) {
                    location.href = 'https://passport.9888keji.com/passport/login'
                } else {
                    location.href = 'https://passport.9888keji.com/passport/login?sourceSite=jrgc&service=' + location.href
                }
            }

        } else {
            // 如果不弹出错误, 就直接reject
            if (silence)
                return new Promise((resolve, reject) => reject(error))

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