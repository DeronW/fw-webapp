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
                location.href = 'https://appsto.re/cn/-mzaib.i';
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
