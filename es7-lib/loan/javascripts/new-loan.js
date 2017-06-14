import { Request, BrowserFactory as Browser } from 'fw-javascripts'
import { showToast } from 'fw-components'


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
        return Request(options).catch((e) => { showToast(e.message) })
    }

    static get LocalAccount() {
        let storage = window.localStorage;
        let _get = (k, defaultVal) => storage.getItem(k) || defaultVal || '',
            _set = (k, v) => { storage.setItem(k, v) },
            _clear = () => { storage.clear() },
            _setDict = (dict) => {
                if (typeof (dict) === 'string') dict = JSON.parse(dict);
                dict.token && _set('token', dict.token);
                dict.uid && _set('uid', dict.uid);
            },
            _getDict = () => ({ token: _get('token'), uid: _get('uid') }),
            _exportDict = () => JSON.stringify(this.getUserDict());
        return {
            setDict: _setDict,
            getDict: _getDict,
            clear: _clear,
            exportDict: _exportDict
        }
    }

}

export default $LOAN
