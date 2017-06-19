import { Request, Components } from 'fw-javascripts'

import Browser from './browser.js'
import NativeBridge from './native-bridge.js'

let API_PATH = document.getElementById('api-path').value;

const Get = (url, params) => {
    return Request({
        url: `${API_PATH}/mpwap${url}`,
        data: params,
        slience: true
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
            // Browser.inApp ?
            // NativeBridge.login() :
            // location.href = 'https://m.9888.cn/mpwap/orderuser/toLogin.shtml'
        } else {
            Components.showToast(error.message)

            return new Promise((resolve, reject) => {
                setTimeout(() => reject(error), 1700)
            })
        }
    })
}

export {
    Get
}
