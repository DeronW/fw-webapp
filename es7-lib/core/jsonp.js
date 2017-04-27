/**
 * JSONP handler
 *
 * Options:
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */
const getJSONP = function(url, params, fn) {
    if ('function' == typeof params) {
        fn = params;
        params = {};
    }

    var enc = encodeURIComponent;

    var formData = '';
    for (var i in params) {
        if (!params.hasOwnProperty(i)) continue;
        if (params[i] === null) continue;
        if (formData) formData += '&';
        formData += i + '=' + enc(params[i]);
    }

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    var id = '__jp' + (+new Date()) + Math.random().toString().substr(3, 5);

    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + 'callback=' + enc(id);
    if (formData) url += '&' + formData;
    script = document.createElement('script');
    script.async = true;
    script.src = url;

    return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
            var err = new Error('JSONP request timeout');
            cleanup();
            // fn && fn(err);
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
            fn && fn(data);
            resolve(data);
        };

        target.parentNode.insertBefore(script, target);
    });
}

module.exports = getJSONP