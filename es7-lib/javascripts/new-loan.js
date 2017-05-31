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

    // static LocalAccount = () => {
    //     return {
    //         get: (k, defaultVal) => {
    //             return storage.getItem(k) || defaultVal || ''
    //         },
    //         set: (k, v) => {
    //             storage.setItem(k, v)
    //         },
    //         clear: () => {
    //             storage.clear()
    //         },
    //
    //         /*
    //             setUserDict accept one parameter,
    //             param = {
    //                 token: 'xxx',
    //                 id: 'xxx'
    //             }
    //         */
    //         setDict: (dict) => {
    //             if (typeof (dict) === 'string') dict = JSON.parse(dict);
    //             dict.token && this.set('userToken', dict.token);
    //             dict.uid && this.set('uid', dict.uid);
    //         },
    //
    //         getDict: () => {
    //             return {
    //                 token: this.get('userToken'),
    //                 uid: this.get('uid')
    //             }
    //         },
    //
    //         exportDict: () => {
    //             return JSON.stringify(this.getUserDict())
    //         }
    //     }
    // }

}

export default $LOAN
