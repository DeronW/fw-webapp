$FW.DOMReady(function () {

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
        $("download-btn").innerHTML = "iOS客户端敬请期待";
    } else if(ConcertUtilBrowser.versions.android){
        $("download-btn").innerHTML = "Android客户端下载";
    };

    if(ConcertUtilBrowser.versions.android){
        $("download-btn").addEventListener("click", function () {
            if (ConcertUtilBrowser.versions.weixin) {
                $("mask").style.display = "block";
            } else {
                $FW.Ajax(`${API_PATH}api/v1/download.json?name=HLWZZ`).then(data => {
                    location.href = data.url;
                    alert(data.url);
                }, e => $FW.Component.Toast(e.message));
            }
        });
        $("mask").addEventListener("click", function () {
            $("mask").style.display = "none";
        });
    }

});
