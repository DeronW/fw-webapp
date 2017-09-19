$FW.DOMReady(function () {
    NativeBridge.setTitle('关注下载');
    NativeBridge.showHeader();
    ReactDOM.render(<Header title={'关注下载'} />, HEADER_NODE)
    var channel = $FW.Format.urlQuery().name;
    var ConcertUtilBrowser = {
        versions: (function () {
            var u = navigator.userAgent;
            var ua = window.navigator.userAgent.toLowerCase();
            return {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                weixin: ua.match(/MicroMessenger/i) == 'micromessenger'
            };
        })()
    };

    function $(id) {
        return document.getElementById(id)
    }

    if (ConcertUtilBrowser.versions.weixin) {
        $("ios-download").addEventListener("click", function () {
            $("ios-download").setAttribute("href","https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8");
        })
        $("android-download").addEventListener("click", function () {
            $("android-download").setAttribute("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.ucf.jrgc.cfinance");
        })
    } else if (ConcertUtilBrowser.versions.ios) {
        $("ios-download").addEventListener("click", function () {
            $("ios-download").setAttribute("href", "https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8");
        })
    } else if (ConcertUtilBrowser.versions.android) {
        $("android-download").addEventListener("click", function () {
            $FW.Ajax(`${API_PATH}/api/v1/download.json?name=${channel}`).then(data => {
                    location.href = data.url;
                }, (e) => $FW.Component.Toast(e.message)
            )
        })
    }
});
