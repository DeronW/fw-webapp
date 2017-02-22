$FW.DOMReady(function () {

    var ConcertUtilBrowser = {
        versions: (function () {
            var u = navigator.userAgent;
            var ua = window.navigator.userAgent.toLowerCase();
            return {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                weixin:ua.match(/MicroMessenger/i) == 'micromessenger'
            };
        })()
    };

    function $(id) { return document.getElementById(id) }

    if (ConcertUtilBrowser.versions.ios) {
        $("download-btn").innerHTML = "IOS客户端下载";
    }else{
        $("download-btn").innerHTML = "Android客户端下载";
    }
    $("download-btn").addEventListener("click", function () {
        if(ConcertUtilBrowser.versions.weixin){
            $("mask").style.display = "block";
        }else{
            location.href = '/api/v1/download.json?name=JRGC';
        }

    });
    $("mask").addEventListener("click", function () {
        $("mask").style.display = "none";
    });

});
