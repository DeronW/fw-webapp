

$FW.DOMReady(function () {
    //切换音乐模式
    var mediao=$('#media')[0];
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }(),
    }
    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {


    }
    var n=true;
    $(document).on("touchstart",function(){
        if(n&&mediao.paused){
            alert(mediao.paused);
            mediao.play();
            n=false;
        }
    });
    if(mediao.paused){
        alert(1);
        mediao.play();

    }
    $("#audio-btn img").on("click",function(){

        if($(this).hasClass('on')){
            $(this).attr("src","{$path}img/musicOff.png");
            $(this).removeClass('on');
            mediao.pause();
        }else{
            $(this).attr("src","{$path}img/music.png");
            $(this).addClass('on');
            mediao.play();
        }
    });
    //加载图片
    $(".percent").on('touchstart',function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    $(".spinner").on('touchstart',function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    $("#touchStyleLoading").on('touchstart',function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    function loadImage(src, callback) {
        var img = document.createElement("img");
        function loadComplete() {
            img = null;
            if (callback) callback();
        }
        img.onerror = loadComplete;
        img.onload = loadComplete;
        img.src = src;
    }
    var http=
    var ImageLoader = {
        loadImage: loadImage,
        loadImages: function(images, callback) {
            var count = 0,
                i = 0,
                len,
                check;

            if (images && (len = images.length) > 0) {
                check = function() {
                    if (count === len) {
                        setTimeout(function() {
                            if (callback) callback(100);
                        }, 3e2);
                    } else {
                        ++count;
                        if (callback) callback(Math.floor(count / len * 100));
                    }
                };
                for (; i < len; ++i) {
                    loadImage(images[i], check);
                }
            } else {
                if (callback) callback(100);
            }
        }
    };
    var touchStyleLoadingEl = document.getElementById('touchStyleLoading');
    ImageLoader.loadImages([
        "http://192.168.1.150:8080/100/img/p0-1.png",
        "http://192.168.1.150:8080/100/img/p0-2.png",
        "http://192.168.1.150:8080/100/img/p0-3.png",
        "http://192.168.1.150:8080/100/img/p0-4.png",
        "http://192.168.1.150:8080/100/img/p1-1.png",
        "http://192.168.1.150:8080/100/img/p1-2.png",
        "http://192.168.1.150:8080/100/img/p1-3.png",
        "http://192.168.1.150:8080/100/img/p1-4.png",
        "http://192.168.1.150:8080/100/img/p1-5.png",
        "http://192.168.1.150:8080/100/img/p1-6.png",
        "http://192.168.1.150:8080/100/img/p1-7.png",
        "http://192.168.1.150:8080/100/img/p1-8.png",
        "http://192.168.1.150:8080/100/img/p1-9.png",
        "http://192.168.1.150:8080/100/img/p1-10.png",
        "http://192.168.1.150:8080/100/img/P2-1.png",
        "http://192.168.1.150:8080/100/img/p2-2.png",
        "http://192.168.1.150:8080/100/img/p2-3.png",
        "http://192.168.1.150:8080/100/img/p2-4.png",
        "http://192.168.1.150:8080/100/img/p2-5.png",
        "http://192.168.1.150:8080/100/img/p2-6.png",
        "http://192.168.1.150:8080/100/img/p2-7.png",
        "http://192.168.1.150:8080/100/img/p3-1.png",
        "http://192.168.1.150:8080/100/img/p3-2.png",
        "http://192.168.1.150:8080/100/img/p3-3.png",
        "http://192.168.1.150:8080/100/img/p3-4.png",
        "http://192.168.1.150:8080/100/img/p3-5.png",
        "http://192.168.1.150:8080/100/img/p4-1.png",
        "http://192.168.1.150:8080/100/img/p4-2.png",
        "http://192.168.1.150:8080/100/img/p5-1.png",
        "http://192.168.1.150:8080/100/img/p5-2.png",
        "http://192.168.1.150:8080/100/img/p5-3.png",
        "http://192.168.1.150:8080/100/img/p5-4.png",
        "http://192.168.1.150:8080/100/img/p6-1.gif",
        "http://192.168.1.150:8080/100/img/p6-2.png",
        "http://192.168.1.150:8080/100/img/p6-3.png",
        "http://192.168.1.150:8080/100/img/p7-1.png",
        "http://192.168.1.150:8080/100/img/p7-2.png",
        "http://192.168.1.150:8080/100/img/p7-3.png",
        "http://192.168.1.150:8080/100/img/p7-4.png",
        "http://192.168.1.150:8080/100/img/p7-5.png",
        "http://192.168.1.150:8080/100/img/p7-6.png",
        "http://192.168.1.150:8080/100/img/p8-1.gif",
        "http://192.168.1.150:8080/100/img/share.png",
        "http://192.168.1.150:8080/100/img/up.png",
        "http://192.168.1.150:8080/100/img/musicOff.png",
        "http://192.168.1.150:8080/100/img/close.png",
        http://10.105.6.217:8046/jrgc/mallmain/build/wap/game-year-end/images/
        "http://192.168.1.150:8080/100/img/ico-password.png",
        "http://192.168.1.150:8080/100/img/ico-per.png",
        "http://192.168.1.150:8080/100/img/logo.png",
    ], function(percent) {
        touchStyleLoadingEl.children[0].innerHTML = percent+"%";
        if (percent >= 100) {
            touchStyleLoadingEl.style.opacity = '0';
            //mediao.play();
            $(".page0").eq(0).removeClass("swiper-slide-active");
            setTimeout(function() {
                touchStyleLoadingEl.parentNode.removeChild(touchStyleLoadingEl);
                $(".page0").eq(0).addClass("swiper-slide-active");
            }, 5e2);
        }
    });
    $(".swiper-container").css("width",$(window).width());
    $(".swiper-container").css("height",$(window).height());
    var mySwiper = new Swiper ('.swiper-container', {
        watchSlidesProgress : true,
        watchSlidesVisibility : true,
        loop : true,
        direction : 'vertical',
        onSlideChangeEnd: function(swiper){
        }
    });




    /*
     * 注意：
     * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
     * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
     * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
     *
     * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
     * 邮箱地址：weixin-open@qq.com
     * 邮件主题：【微信JS-SDK反馈】具体问题
     * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
     */
    // wx.config({
    //     debug: false,
    //     appId: '{$h.signPackage.appId}',
    //     timestamp: '{$h.signPackage.timestamp}',
    //     nonceStr: '{$h.signPackage.nonceStr}',
    //     signature: '{$h.signPackage.signature}',
    //     jsApiList: [
    //         // 所有要调用的 API 都要加到这个列表中
    //         'onMenuShareTimeline',
    //         'onMenuShareAppMessage',
    //     ]
    // });
    // var texttit='我在金融工场总收益超过了80%的工友！';
    // wx.ready(function () {
    //     // 在这里调用 API
    //     var ShareAppMessage = {
    //         title:texttit,
    //         desc: '一分耕耘一分收获！每天看收益的感觉真实让人幸福感爆棚啊~好朋友就该一起来！',
    //         link: '{$h.index}',
    //         imgUrl: '{$h.static}',
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //             $.ajax({
    //                 'type' : 'POST',
    //                 'url' : '{$data.share}',
    //                 'data' : 'share=1' ,
    //                 'dataType' : 'json',
    //                 'async' : false,
    //                 success : function(data){
    //                     var res = eval(data);
    //                     if(res.err == 1)
    //                     {
    //                         $(".pop-alert p").html(res.msg);
    //                         $(".masker-alert").show();
    //                         $(".pop-alert").show();
    //                         $(".alert-close").on("click",function(){
    //                             $(".masker-alert").hide();
    //                             $(".pop-alert").hide();
    //                         });
    //                     }
    //                 }
    //             });
    //         },
    //     };
    //     var ShareTimeline = {
    //         title: '我在金融工场总收益超过了80%的工友！',
    //         link: '{$h.index}',
    //         imgUrl: '{$h.static}',
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //             $.ajax({
    //                 'type' : 'POST',
    //                 'url' : '{$data.share}',
    //                 'data' : 'share=1' ,
    //                 'dataType' : 'json',
    //                 'async' : false,
    //                 success : function(data){
    //                     var res = eval(data);
    //                     if(res.err == 1)
    //                     {
    //                         $(".pop-alert p").html(res.msg);
    //                         $(".masker-alert").show();
    //                         $(".pop-alert").show();
    //                         $(".alert-close").on("click",function(){
    //                             $(".masker-alert").hide();
    //                             $(".pop-alert").hide();
    //                         });
    //                     }
    //                 }
    //             });
    //         },
    //     };
    //
    //     wx.onMenuShareAppMessage(ShareAppMessage);//分享朋友
    //     wx.onMenuShareTimeline(ShareTimeline);//分享到朋友圈
    // });

});
