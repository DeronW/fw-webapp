/**
 * JSONP handler
 *
 * Options:
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */
const getJSONP = function (url, params) {

    let enc = encodeURIComponent;
    params = params || {};

    let formData = '';
    for (let i in params) {
        if (!params.hasOwnProperty(i)) continue;
        if (params[i] === null) continue;
        if (formData) formData += '&';
        formData += i + '=' + enc(params[i]);
    }

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    let id = '__jp' + (+new Date()) + Math.random().toString().substr(3, 5);

    let target = document.getElementsByTagName('script')[0] || document.head;
    let script;

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + 'callback=' + enc(id);
    if (formData) url += '&' + formData;
    script = document.createElement('script');
    script.async = true;
    script.src = url;

    return new Promise(function (resolve, reject) {
        let timer = setTimeout(function () {
            let err = new Error('JSONP request timeout');
            cleanup();
            reject(err);
        }, 3500);

        function cleanup() {
            if (script.parentNode) script.parentNode.removeChild(script);
            clearTimeout(timer);
            window[id] = function () {
                delete window[id];
            }
        }

        window[id] = function (data) {
            cleanup();
            resolve(data);
        };

        target.parentNode.insertBefore(script, target);
    });
}

export default getJSONP
