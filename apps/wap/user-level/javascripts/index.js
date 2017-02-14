(function () {
    var p = document.getElementById('api-path').value;
    if (p.substr(0, 2) != '//') p = '//' + p;
    window.API_PATH = location.protocol + p;
})();
var dd = window.outerWidth;
alert(dd);
function inApp() {
    return navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
}

function redirectToAppUserContribute() {
    if (inApp()) {
        NativeBridge.toNative('app_contribute_detail');
    } else {
        location.href = '/static/wap/user-contribute/index.html'
    }
}

var qryDetail = function (giftBagId, level, bagType) {

    var app_login_sign = navigator.userAgent.indexOf('FinancialWorkshop') > -1;
    if (app_login_sign !== null && app_login_sign !== '') {
        jsPost(location.protocol + '//m.9888.cn/mpwap/app/vipTeQuan/qryVipTeQuanDetail.shtml', {
            'level': level,
            'giftBagId': giftBagId,
            'bagType': bagType
        });
    } else {
        jsPost(location.protocol + '//m.9888.cn/mpwap/vipTeQuan/qryVipTeQuanDetail.shtml', {
            'level': level,
            'giftBagId': giftBagId,
            'bagType': bagType
        });
    }
};

var jsPost = function (action, values) {
    var id = Math.random();
    document.write('<form id="post' + id + '" name="post' + id + '" action="' + action + '" method="post">');
    for (var key in values) {
        document.write('<input type="hidden" name="' + key + '" value="' + values[key] + '" />');
    }
    document.write('</form>');
    document.getElementById('post' + id).submit();
};

$(function () {

    $.ajax({
        type: "GET",
        url: API_PATH+"mpwap/api/v1/user/level-info.shtml",
        //url: "http://10.105.7.124/xxxxx.json",
        //url: "http://localhost/user-level.json",
        dataType: "json",
        success: function (data) {

            if (data.code == 50001) {
                alert(data.message)
            }

            if (data.code == 40101) {
                if (inApp()) {
                    NativeBridge.login()
                } else {
                    location.href = location.protocol + '//m.9888.cn/mpwap/orderuser/toLogin.shtml?is_mall=2&redirect_url=' + location.pathname + location.search;
                }
            }

            $(".level-progress-text span").text(data.data.contributeValue);

            $("#vipText").text(data.data.leveHint);

            var num = data.data.userLevel - 1;
            var value = data.data.contributePercent;
            var contribute = data.data.contributeTotal;
            $(".level-progress-text").find("span").text(contribute);

            var levelGiftsData = data.data.levelGifts;

            for (var i = 0; i < levelGiftsData.length; i++) {
                var level = levelGiftsData[i].level;
                //奖励加息
                $(".vip1-interest span").eq(i).text();
                $(".vip2Invest span").text(levelGiftsData[2].levelRate);
                $(".vip3Invest span").text(levelGiftsData[3].levelRate);
                $(".vip4Invest span").text(levelGiftsData[4].levelRate);
                for (var j = 0; j < levelGiftsData[i].lvGiftIdMap.length; j++) {
                    if (levelGiftsData[i].lvGiftIdMap[j].giftBagId !== "") {
                        $(".level-img" + i).append(
                            //"<a href=''onclick='"qryDetail(" a + , level, levelGiftsData[i].lvGiftIdMap[j].bagType)'>"+
                            "<a onclick='qryDetail(" + levelGiftsData[i].lvGiftIdMap[j].giftBagId + "," + level + "," +
                            levelGiftsData[i].lvGiftIdMap[j].bagType + ")'>" +
                            "<img src='images/level-" + (i + 1) + "-" + levelGiftsData[i].lvGiftIdMap[j].bagType + ".png'/>" +
                            "</a>"
                        );
                    }
                }
                $(".level-img" + i).append("<a href='javascript:void(0)'><img src='images/waiting.png'/></a>");
            }

            $("#vip0, #vip1, #vip2, #vip3, #vip4").attr("class", "change-img-gray");
            $("#vip0-jindutiao, #vip1-jindutiao, #vip2-jindutiao, #vip3-jindutiao, #vip4-jindutiao").addClass("gray-class");

            $("#vip" + num + "-jindutiao").removeClass("gray-class");

            $(".level-img").not(".level-img" + num).find("img").addClass("change-img-gray");

            $("#vip" + num).removeClass("change-img-gray").click(redirectToAppUserContribute);

            var txt = $("#about_swiper_txt .slide-txt");

            var ua = navigator.userAgent;
            // hack 针对华为B199 机型的兼容, 不使用滑动功能
            if (ua.match(/FinancialWorkshop/) && ua.match(/HuaweiB199/)) {
                [0, 1, 2, 3, 4].forEach(function (i) {
                    if (i != num)
                        $(".center.slider > div:eq(" + i + ")").hide()
                })
            } else {
                $(".center").slick({
                    dots: true,
                    infinite: true,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    initialSlide: num,
                    centerPadding: "30px"
                }).on("afterChange", function () {
                    var t = $(".slider .slick-active .img-box").attr("data-tab");
                    txt.removeClass("show").hide();
                    txt.eq(t).show();
                    setTimeout(function () {
                        txt.eq(t).addClass("show")
                    }, 10)
                });
            }

            txt.hide().eq(num).show().addClass("show");

            var userLevel = parseInt(data.data.userLevel);
            if (data.data.contributeValue == 0 && userLevel == 1) userLevel = 0;

            [0, 1, 2, 3, 4].forEach(function (i) {
                $(".level-progress-box" + i + " .level-progress-red").css("width", parseInt(data.data.contributePercent) + "%");
                $(".level-progress-box" + i + " .level-progress-bar").css("width", (userLevel - 1) * 20) + "%";
            });

            $(".slider-block").css("visibility", "visible");
        }
    });
});

$(function () {
    if (inApp()) {
        $("#header").hide();

        $(".level-notice").css({
            top: 0
        });
        $(".slider-block").css({
            marginTop: "4rem"
        });
        NativeBridge.setTitle('会员等级');
    }
});
