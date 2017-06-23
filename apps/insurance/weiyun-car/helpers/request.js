import { Request, Components } from 'fw-javascripts'

import Browser from './browser.js'
import NativeBridge from './native-bridge.js'

let API_PATH = document.getElementById('api-path').value;

const Get = (url, params, silence = false, method = 'GET') => {
    return Request({
        url: `${API_PATH}/mpwap${url}`,
        method: method,
        data: params,
        silence: true
    }).catch(error => {
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

const Post = (url, params, silence) => {
    return Get(url, params, silence, 'POST')
}

export {
    Get,
    Post
}
