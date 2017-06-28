import { Request, Components } from 'fw-javascripts'

const API_PATH = document.getElementById('api-path').value;

const PostMethodFactory = function (Storage, Browser, NativeBridge) {

    let USER = Storage.getUserDict(),
        token = USER.token,
        uid = USER.uid;

    let ua = window.navigator.userAgent,
        inWX = ua.indexOf('MicroMessenger') > -1,
        inApp = ua.indexOf('FinancialWorkshop') > -1,
        SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;

    return (url, data = {}, silence = false) => {

        let merged_data = Object.assign({},
            { sourceType: SOURCE_TYPE },
            data,
            { token: token, uid: uid })

        return Request({
            url: API_PATH + url,
            method: 'POST',
            data: merged_data,
            silence: true
        }).catch(error => {

            if (error.code == 100008) {
                // 处理用户登录功能
                Components.showToast(`登录失效，请重新登录 [${error.code}]`)
                if (Browser.inJRGCApp) {
                    inHome() ? loginInApp() : NativeBridge.close()
                }

                if (Browser.inFXHApp) NativeBridge.login();

                if (!Browser.inJRGCApp && !Browser.inFXHApp)
                    setTimeout(login, 1800);

            } else if (error.code == 11000) {
                //11000 代表参数不完整
                !silence && Components.showToast(error.message)
            } else {
                if (silence)
                    return new Promise((reslove, reject) => reject(error))

                Components.showToast(error.message)

                return new Promise((resolve, reject) => {
                    setTimeout(() => reject(error), 1700)
                })
            }
        })
    }
}

export default PostMethodFactory