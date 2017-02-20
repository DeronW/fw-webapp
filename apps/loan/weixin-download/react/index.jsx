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
    }else{
        $("download-btn").innerHTML = "Android客户端下载";
    }
    $("download-btn").addEventListener("click", function () {
        $FW.Ajax({
            url:`${API_PATH}/api/v1/download.json`,
            data:{name: "JRGC"}
        });
        $("mask").style.display = "block";
    });
    $("mask").addEventListener("click", function () {
        $("mask").style.display = "none";
    });

});
