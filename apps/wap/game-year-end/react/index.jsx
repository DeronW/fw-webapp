$FW.DOMReady(function () {
    let str;
    let login=true;
    $FW.Ajax(`http://m.9888.cn/mpwap/api/v1/getAllRegistCount.shtml`).then((data)=>{
        $(".p1-num").html(data.allUserCount);
    });
    $FW.Ajax({
        url: `${API_PATH}/mpwap/api/v1/getUserRanking.shtml`,//第二三页
        fail: () => true,
        complete: (data) => {
            if(data.code==10000){
                swiper.lockSwipeToNext();
                $(".p1-2").hide();
                $FW.Ajax(`${API_PATH}/mpwap/api/v1/getUserIncome.shtml`).then((data)=>{

                    $FW.Ajax(`${API_PATH}/mpwap/api/v1/getUserHabitMess.shtml`).then((data)=>{

                    });
                });
            }else if(data.code==40101){
                login=false;
                swiper.lockSwipeToNext();
                $(".p1-2").show();
            }else{

            }

        }
    });
    music();
    load();
    $(".swiper-container").css("width", $(window).width());
    $(".swiper-container").css("height", $(window).height());
    //分享弹层
    $(".pop-share").on("touchstart",function(){
        $(".pop-share").hide();
    });
    $(".p6-8").on("touchstart",function(){
        $(".pop-share").show();
    });
    //查看收益弹层
    $(".pop-close").on("touchstart",function(){
        $(".pop-detail-box").hide();
    });
    $("#p3-5-img").on("touchstart",function(){
        $(".pop-detail-box").show();
    });

    let mySwiper = new Swiper('.swiper-container', {
        //watchSlidesProgress: true,
        //watchSlidesVisibility: true,
        loop: false,
        direction: 'vertical',
        onSlideChangeEnd: function (swiper) {

        },
        onTouchStart: function(swiper,even){
            swiper.unlockSwipeToPrev();
            swiper.unlockSwipeToNext();
            if(!login&&swiper.activeIndex==1||swiper.isEnd){
                $(".up").hide();
                swiper.lockSwipeToNext();
            }else{
                $(".up").show();
            }
            if(swiper.activeIndex==0){
                swiper.lockSwipeToPrev();
            }
        }
    });


    // function setWxConfig(debug, appid, timestamp, noncestr, signature) {
    //     wx.config({
    //         debug: debug,
    //         appId: appid,
    //         timestamp: timestamp,
    //         nonceStr: noncestr,
    //         signature: signature,
    //         jsApiList: [
    //             'onMenuShareTimeline',
    //             'onMenuShareAppMessage'
    //         ]
    //     });
    // }
    //
    // var gurl = 'http://game.9888.cn/index.php?r=games/game-notice&gameNo=0pn5m';
    // var iurl = 'http://game.9888.cn/static/frontend/game/axc/image/axc_share.jpg';
    //
    // function setShareFriend() {
    //     wx.onMenuShareAppMessage({
    //         title: "豆尔摩斯年度大揭秘，快来查看你的组织身份！", // 分享标题
    //         desc: "金融工场机密档案大集合，解封时刻，速来围观", // 分享描述
    //         link: gurl, // 分享链接
    //         imgUrl: iurl, // 分享图标
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //             //alert("喵喵感谢您！");
    //         },
    //         cancel: function () {
    //             // 用户取消分享后执行的回调函数
    //         }
    //     });
    // }
    // function setShareFriendQuan() {
    //     wx.onMenuShareTimeline({
    //         title: '豆尔摩斯年度大揭秘，快来查看你的组织身份！', // 分享标题
    //         link: gurl, // 分享链接
    //         imgUrl: iurl, // 分享图标
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户取消分享后执行的回调函数
    //         }
    //     });
    // }
    //
    //
    // // $.get('http://fore.9888.cn/weixin/jssdk/share', {
    // $.get('http://game.9888.cn/index.php?r=games/getshare', {
    //     url: location.href
    // }, function (data) {
    //     setWxConfig(false, data.appId, data.timestamp, data.nonceStr, data.signature);
    //     setShareFriend()
    //     setShareFriendQuan()
    // }, 'json')

});
