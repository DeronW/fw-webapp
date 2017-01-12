$FW.DOMReady(function () {
    let str;
    let login=true;
    music();
    load();
    $(".swiper-container").css("width", $(window).width());
    $(".swiper-container").css("height", $(window).height());
    let mySwiper = new Swiper('.swiper-container', {
        //watchSlidesProgress: true,
        //watchSlidesVisibility: true,
        loop: false,
        direction: 'vertical',
        onSlideChangeEnd: function (swiper) {

        },
        onTouchStart: function(swiper,even){
            console.log(swiper.activeIndex);
            swiper.unlockSwipeToPrev();
            swiper.unlockSwipeToNext();
            if(!login&&swiper.activeIndex==1||swiper.isEnd){
                swiper.lockSwipeToNext();
            }
            if(swiper.activeIndex==0){
                swiper.lockSwipeToPrev();
            }
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
    // let texttit='我在金融工场总收益超过了80%的工友！';
    // wx.ready(function () {
    //     // 在这里调用 API
    //     let ShareAppMessage = {
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
    //                     let res = eval(data);
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
    //     let ShareTimeline = {
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
    //                     let res = eval(data);
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
