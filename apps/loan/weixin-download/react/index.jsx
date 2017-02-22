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
            $FW.Ajax({
                url: `${API_PATH}api/v1/download.json`,
                data:{
                    name:"JRGC"
                },
                success:(data)=>{
                    location.href = data.url;
                }
            });
        }

    });
    $("mask").addEventListener("click", function () {
        $("mask").style.display = "none";
    });

});
