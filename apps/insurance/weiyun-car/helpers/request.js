import { Request } from 'fw-javascripts'

let API_PATH = document.getElementById('api-path').value;

const Get = (url, params) => {
    return Request({
        url: API_PATH + '/mpwap' + url,
        data: params
    })
}

export {
    Get
}
