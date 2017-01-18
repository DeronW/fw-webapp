function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

$FW.DOMReady(function () {
    $FW.Ajax({
        url: `${location.protocol}//game.9888.cn/index.php?r=games/getshare`,
        data: {url: location.href},
        fail: () => true,
        complete: (data) => {
            setWxConfig(true, data.appId, data.timestamp, data.nonceStr, data.signature);
        }
    });
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: '豆尔摩斯年度大揭秘，快来查看你的组织身份！', // 分享标题
            link: 'https://m.9888.cn/static/wap/game-year-end/index.html', // 分享链接
            imgUrl: 'https://m.9888.cn/static/wap/game-year-end/images/share-ico.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: '豆尔摩斯年度大揭秘，快来查看你的组织身份！', // 分享标题
            desc: '金融工场机密档案大集合，解封时刻，速来围观', // 分享描述
            link: 'https://m.9888.cn/static/wap/game-year-end/index.html', // 分享链接
            imgUrl: 'https://m.9888.cn/static/wap/game-year-end/images/share-ico.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    function setWxConfig(debug, appid, timestamp, noncestr, signature) {
        wx.config({
            debug: debug,
            appId: appid,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
    }

    $(".p1-2-1").on("touchstart", function () {
        gotoHandler("https://m.9888.cn/mpwap/orderuser/toLogin.shtml?is_mall=4&redirect_url=https://m.9888.cn/static/wap/game-year-end/index.html?isLoginVist=1", true);
    });
    let str;
    let login = false;
    $("#p4-3-2").attr("src", "images/p4-text" + parseInt(Math.random() * 3 + 1) + ".png");
    $FW.Ajax(`${API_PATH}/mpwap/api/v1/getAllRegistCount.shtml`).then((data) => {
        let allUserCount = (data.allUserCount + "").split("");
        let s = "";
        for (var i = 0; i < allUserCount.length; i++) {
            s += "<span class='p1-num" + i + "' style='transition-delay:" + 0.2 * i + "s ;'>" + allUserCount[i] + "</span>";
        }
        $("#p1-num").html(s);
    });
    $FW.Ajax({
        url: `${API_PATH}mpwap/api/v1/getUserRanking.shtml`,//第二三页
        fail: () => true,
        complete: (data) => {
            if (data.code == 10000) {
                login = true;
                $(".p2-0-1").html(data.data.userName ? data.data.userName : "豆尔摩斯");
                $(".p2-2-2").html(data.data.registDate);
                $("#p2-2-3").html(data.data.myRank);
                $(".p1-2").hide();
                $FW.Ajax(`${API_PATH}mpwap/api/v1/getUserIncome.shtml`).then((data) => {
                    $("#p3-2").html(data.investTimesAll);
                    $("#p3-3").html(data.investAmountAll);
                    $("#p3-5").html(data.allReceipt);
                    $("#smoke-num").html(data.pipeCount);
                    $("#cloth-num").html(data.windbreakCount);
                    $("#li-r1").html(data.receivedInterest + "元");
                    $("#li-r2").html(data.waitedInterest + "元");
                    $("#li-r3").html(data.cashCoupon + "元");
                    $("#li-r4").html(data.beanCount + "元");
                    data.balanceProfit ? $("#li-r5").html(data.balanceProfit) : null;
                    $FW.Ajax(`${API_PATH}mpwap/api/v1/getUserHabitMess.shtml`).then((data) => {
                        $("#p4-0").html(data.investTimesYear);
                        $("#p4-1").html(data.monthName);
                        $("#p4-2").html(data.investTimeSlot);
                        let investAmountYear = (data.investAmountYear + "").split("");
                        let p5 = "";
                        for (var j = 0; j < investAmountYear.length; j++) {
                            p5 += "<span class='p5-1-" + j + "' style='transition-delay:" + 0.2 * j + "s ;'>" + investAmountYear[j] + "</span>";
                        }
                        $("#p5-1").html(p5);
                        if (data.groupName == "实习豆尔摩斯") {
                            $("#p5-2").attr("src", "images/p5-level-1.png");
                        } else if (data.groupName == "初级豆尔摩斯") {
                            $("#p5-2").attr("src", "images/p5-level-2.png");
                        } else if (data.groupName == "精英豆尔摩斯") {
                            $("#p5-2").attr("src", "images/p5-level-3.png");
                        } else if (data.groupName == "特级豆尔摩斯") {
                            $("#p5-2").attr("src", "images/p5-level-4.png");
                        } else if (data.groupName == "王牌豆尔摩斯") {
                            $("#p5-2").attr("src", "images/p5-level-5.png");
                        }
                    });
                });
            } else if (data.code == 40101) {
                login = false;
                $(".p1-2").show();
            } else {
                $FW.Component.Alert(data.message);
            }
        }
    });
    music();
    load();
    //分享弹层
    $(".pop-share").on("touchstart", function () {
        $(".pop-share").hide();
    });
    $(".p6-8").on("touchstart", function () {
        $(".pop-share").show();
    });
    //查看收益弹层
    $(".pop-close").on("touchstart", function () {
        $(".pop-detail-box").hide();
    });
    $("#p3-5-img").on("touchstart", function () {
        $(".pop-detail-box").show();
    });

    let mySwiper = new Swiper('.swiper-container', {
        loop: false,
        direction: 'vertical',
        initialSlide: $FW.Format.urlQuery().isLoginVist == 1 ? 1 : 0,
        onSlideChangeEnd: function (swiper) {
            if (swiper.isEnd || !login && swiper.activeIndex == 1) {
                $(".up").hide();
            } else {
                $(".up").show();
            }
        },
        onTouchStart: function (swiper, even) {
            swiper.unlockSwipeToPrev();
            swiper.unlockSwipeToNext();
            if (!login && swiper.activeIndex == 1 || swiper.isEnd) {
                swiper.lockSwipeToNext();
            }
            if (swiper.isEnd || !login && swiper.activeIndex == 1) {
                $(".up").hide();
            } else {
                $(".up").show();
            }
            if (swiper.activeIndex == 0) {
                swiper.lockSwipeToPrev();
            }
        }
    });
});
