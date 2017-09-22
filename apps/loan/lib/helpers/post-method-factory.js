import { Request, Components } from 'fw-javascripts'

const API_PATH = document.getElementById('api-path').value;

function inHome() {
    let p = location.pathname, h = location.hash
    return p === '/' || p === '/static/loan/products/index.html#/'
        || (p === '/static/loan/products/index.html' && h == '#/')
}

function loginInJRGC() {
    location.href = '/static/loan/3rd/index.html#jrgc-login';
}

function loginInBrowser() {
    location.href = '/static/loan/account/index.html#/entry'
}


const PostMethodFactory = function (Storage, Browser, NativeBridge) {

    let USER = Storage.getUserDict(),
        token = USER.token,
        uid = USER.uid;

    let ua = window.navigator.userAgent,
        inWX = ua.indexOf('MicroMessenger') > -1,
        inApp = ua.indexOf('FinancialWorkshop') > -1,
        SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;

    return (url, data = {}, options = {}) => {

        let merged_data = Object.assign(
            {}, { sourceType: SOURCE_TYPE },
            data, { token: token, uid: uid })

        let merged_options = Object.assign({}, {
            url: API_PATH + url,
            method: 'POST',
            data: merged_data,
            timeout: 30,
            silence: true
        }, options)

        return Request(merged_options).catch(error => {

            const LOGIN_CODE = 100008

            return new Promise((_, reject) => {

                let msg = error.message
                if (error.code == 11000) msg = '参数不完整，请重新登录！[11000]'
                if (error.code == LOGIN_CODE) msg = `登录失效，请重新登录! [${LOGIN_CODE}]`
                if (!silence || error.code == LOGIN_CODE) Components.showToast(msg)

                if (error.code == LOGIN_CODE) {
                    // 处理用户登录功能
                    if (Browser.inJRGCApp) {
                        inHome() ? loginInJRGC() : NativeBridge.close()
                    } else if (Browser.inFXHApp) {
                        NativeBridge.login()
                    } else {
                        setTimeout(loginInBrowser, 1800)
                    }
                } else {
                    silence ? reject(error) : setTimeout(() => reject(error), 1700)
                }
            })
        })
    }
}

export default PostMethodFactory
