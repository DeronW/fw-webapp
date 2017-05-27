import { Request, BrowserFactory as Browser } from 'fw-javascripts'


class $LOAN {

    static Post(url, data, userAuth) {
        let API_PATH = document.getElementById('api-path').value,
            SOURCE_TYPE = Browser.inWeixin ? 4 : 3;
        let options = {
            url: `${API_PATH}${url}`,
            method: 'post',
            data: Object.assign({ sourceType: SOURCE_TYPE }, data, userAuth),
            slience: true
        }
        return Request(options)
    }

}

export default $LOAN
