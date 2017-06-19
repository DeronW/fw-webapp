import { Request } from 'fw-javascripts'

const PostMethodFactory = storage => (url, params, slience) => {

    const API_PATH = document.getElementById('api-path').value;

    let USER = storage.getUserDict(),
        token = USER.token,
        uid = USER.uid;

    let ua = window.navigator.userAgent,
        inWX = ua.indexOf('MicroMessenger') > -1,
        inApp = ua.indexOf('FinancialWorkshop') > -1,
        SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;

    let merged_params = Object.assign({},
        { sourceType: SOURCE_TYPE },
        params, {
            token: token,
            uid: uid
        })

    return Request({
        url: API_PATH + url,
        method: 'POST',
        data: merged_params,
        slience: true
    })
}


export default PostMethodFactory