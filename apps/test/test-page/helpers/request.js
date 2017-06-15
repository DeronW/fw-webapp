import { Request } from 'fw-javascripts'

let API_PATH = document.getElementById('api-path').value;

const Get = (url, params) => {
    return Request({
        url: API_PATH + url,
        data: params
    })
}

export {
    Get
}