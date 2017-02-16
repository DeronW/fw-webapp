$FW.DOMReady(function () {
    var ConcertUtilBrowser = {
        versions: (function () {
            var u = navigator.userAgent;
            return {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
            };
        })()
    };

    function $(id) { return document.getElementById(id) }

    if (ConcertUtilBrowser.versions.ios) {
        $("download-btn").innerHTML = "IOS客户端下载";
    }
    if (ConcertUtilBrowser.versions.android) {
        $("download-btn").innerHTML = "Android客户端下载";
    }

    $("download-btn").addEventListener("click", function () {
        $("mask").style.display = "block";
    });
    $("mask").addEventListener("click", function () {
        $("mask").style.display = "none";
    });

});
