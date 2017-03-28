$FW.DOMReady(function () {
    NativeBridge.setTitle('APP下载');
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

    function $(id) { return document.getElementById(id) }

    if (ConcertUtilBrowser.versions.ios) {
        $("download-btn").innerHTML = "iOS客户端下载";
    } else {
        $("download-btn").innerHTML = "Android客户端下载";
    };


    $("download-btn").addEventListener("click", function () {
        if (ConcertUtilBrowser.versions.weixin) {
            $("mask").style.display = "block";
        } else {
            if (ConcertUtilBrowser.versions.ios) {
                location.href = 'https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8';
            } else {
                $FW.Ajax(`${API_PATH}api/v1/download.json?name=${channel}`).then(data => {
                    location.href = data.url;
                }, e => $FW.Component.Toast(e.message));
            }
        }
    });
    $("mask").addEventListener("click", function () {
        $("mask").style.display = "none";
    });

});
