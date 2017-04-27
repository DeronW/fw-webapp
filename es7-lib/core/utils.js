class Utils {
    static currency(price, precision) {
        // 格式化数字， 123456789.01 => 123,456,789.01
        // 这个方法写的我自己也看不懂了~ 尽量不要改
        var p = parseFloat(price),
            i = Math.abs(parseInt(p)),
            j = parseInt(Math.round(Math.abs(p) * 100) - i * 100),
            s = [];
        while (i > 1000) {
            i = i / 1000;
            s.push(((i.toString().split('.')[1] || '') + '000').substr(0, 3));
            i = parseInt(i);
        }
        s = (i == 1000 ? ['1', '000'] : [i.toString()]).concat(s.reverse());
        return (p >= 0 ? '' : '-') + s.join(',') + (j ? '.' + (j < 10 ? '0' + j : j) : (precision ? '.00' : ''))
    }
    static get urlQuery() {
        var s = window.location.search;
        if (s.indexOf('?') == 0) s = s.substr(1);
        if (s.indexOf('#') >= 0) s = s.substr(0, s.indexOf('#'));

        var r = {};
        s.split('&').forEach(function (kv) {
            var t = kv.split('=');
            if (t[0]) r[t[0]] = decodeURIComponent(t[1]);
        });
        return r;
    }
}

export default Utils
