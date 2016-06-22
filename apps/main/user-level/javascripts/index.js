var imageList = [
    [
        'images/level-1-1.png',
        'images/level-1-2.png',
        'images/level-1-3.png'
    ],
    [
        'images/level-2-1.png',
        'images/level-2-3.png',
        'images/level-2-3.png'
    ],
    [
        'images/level-3-1.png',
        'images/level-3-3.png',
        'images/level-3-3.png'
    ],
    [
        'images/level-4-1.png',
        'images/level-4-2.png',
        'images/level-4-3.png'
    ],
    [
        'images/level-5-1.png',
        'images/level-5-2.png'
    ]
];

function redirectToAppUserContribute() {
    if (navigator.userAgent.indexOf('FinancialWorkshop') > -1) {
        NativeBridge.toNative('app_contribute_detail');
    } else {
        location.href = '/static/wap/user-contribute/index.html'
    }
}

$(function () {

    $.ajax({
        type: "GET",
        url: "/api/v1/user/level-info.shtml",
        //url: "http://localhost/level.json",
        dataType: "json",
        success: function (data) {

            $(".slider-block").css('display', 'block');

            var num = data.data.userLevel - 1;
            var value = data.data.contributePercent;
            var contribute = data.data.contributeTotal;
            $(".level-progress-text").find("span").text(contribute);

            [0, 1, 2, 3, 4].forEach(function (k) {
                imageList[k].forEach(function (i) {
                    $(".level-img" + k).append('<img src="' + i + '" />');
                });
            });

            /*
             imageList[0].forEach(function (i) {
             $(".level-img0").append('<img src="' + i + '" />');
             });
             imageList[1].forEach(function (i) {
             $(".level-img1").append('<img src="' + i + '" />');
             });
             imageList[2].forEach(function (i) {
             $(".level-img2").append('<img src="' + i + '" />');
             });
             imageList[3].forEach(function (i) {
             $(".level-img3").append('<img src="' + i + '" />');
             });
             imageList[4].forEach(function (i) {
             $(".level-img4").append('<img src="' + i + '" />');
             });
             */

            $("#vip0, #vip1, #vip2, #vip3, #vip4").attr("class", "change-img-gray");
            $("#vip0-jindutiao, #vip1-jindutiao, #vip2-jindutiao, #vip3-jindutiao, #vip4-jindutiao").addClass("gray-class");

            $("#vip" + num).removeClass("change-img-gray");
            $(".level-img").not(".level-img" + num).find("img").addClass("change-img-gray");

            /*
             if (num == 0) {
             $("#vip0").removeClass("change-img-gray");
             $("#vip1").attr("class", "change-img-gray");
             $("#vip2").attr("class", "change-img-gray");
             $("#vip3").attr("class", "change-img-gray");
             $("#vip4").attr("class", "change-img-gray");
             $("#vip0-jindutiao").removeClass("gray-class");
             $("#vip1-jindutiao").addClass("gray-class");
             $("#vip2-jindutiao").addClass("gray-class");
             $("#vip3-jindutiao").addClass("gray-class");
             $("#vip4-jindutiao").addClass("gray-class");
             $(".level-img").not(".level-img0").find("img").addClass("change-img-gray");
             } else if (num == 1) {
             $("#vip0").attr("class", "change-img-gray");
             $("#vip1").removeClass("change-img-gray");
             $("#vip2").attr("class", "change-img-gray");
             $("#vip3").attr("class", "change-img-gray");
             $("#vip4").attr("class", "change-img-gray");
             $("#vip0-jindutiao").addClass("gray-class");
             $("#vip1-jindutiao").removeClass("gray-class");
             $("#vip2-jindutiao").addClass("gray-class");
             $("#vip3-jindutiao").addClass("gray-class");
             $("#vip4-jindutiao").addClass("gray-class");
             $(".level-img").not(".level-img1").find("img").addClass("change-img-gray");
             } else if (num == 2) {
             $("#vip0").attr("class", "change-img-gray");
             $("#vip1").attr("class", "change-img-gray");
             $("#vip2").removeClass("change-img-gray");
             $("#vip3").attr("class", "change-img-gray");
             $("#vip4").attr("class", "change-img-gray");
             $("#vip0-jindutiao").addClass("gray-class");
             $("#vip1-jindutiao").addClass("gray-class");
             $("#vip2-jindutiao").removeClass("gray-class");
             $("#vip3-jindutiao").addClass("gray-class");
             $("#vip4-jindutiao").addClass("gray-class");
             $(".level-img").not(".level-img2").find("img").addClass("change-img-gray");
             } else if (num == 3) {
             $("#vip0").attr("class", "change-img-gray");
             $("#vip1").attr("class", "change-img-gray");
             $("#vip2").attr("class", "change-img-gray");
             $("#vip3").removeClass("change-img-gray");
             $("#vip4").attr("class", "change-img-gray");
             $("#vip0-jindutiao").addClass("gray-class");
             $("#vip1-jindutiao").addClass("gray-class");
             $("#vip2-jindutiao").addClass("gray-class");
             $("#vip3-jindutiao").removeClass("gray-class");
             $("#vip4-jindutiao").addClass("gray-class");
             $(".level-img").not(".level-img3").find("img").addClass("change-img-gray");
             } else if (num == 4) {
             $("#vip0").attr("class", "change-img-gray");
             $("#vip1").attr("class", "change-img-gray");
             $("#vip2").attr("class", "change-img-gray");
             $("#vip3").attr("class", "change-img-gray");
             $("#vip4").removeClass("change-img-gray");
             $("#vip0-jindutiao").addClass("gray-class");
             $("#vip1-jindutiao").addClass("gray-class");
             $("#vip2-jindutiao").addClass("gray-class");
             $("#vip3-jindutiao").addClass("gray-class");
             $("#vip4-jindutiao").removeClass("gray-class");
             $(".level-img").not(".level-img4").find("img").addClass("change-img-gray");
             }
             */

            var txt = $("#about_swiper_txt .slide-txt");

            $(".center").slick({
                dots: true,
                infinite: true,
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                initialSlide: num
            }).on("afterChange", function () {
                var t = $(".slider .slick-active .img-box").attr("data-tab");
                txt.removeClass("show").hide();
                txt.eq(t).show();
                setTimeout(function () {
                    txt.eq(t).addClass("show")
                }, 10)
            });

            txt.hide().eq(num).show().addClass("show");

            /*
             $(".center").on("afterChange", function () {
             var t = $(".slider .slick-active .img-box").attr("data-tab");
             txt.removeClass("show").hide();
             txt.eq(t).show();
             setTimeout(function () {
             txt.eq(t).addClass("show")
             }, 10)
             });
             */

            var barNum0 = (num + 1) * 20;
            var redNum0 = value;

            [0, 1, 2, 3, 4].forEach(function (i) {
                $(".level-progress-box" + i + " .level-progress-bar").css("width", barNum0 + "%");
                $(".level-progress-box" + i + " .level-progress-red").css("width", redNum0 + "%");
            });

            /*
             $(".level-progress-box0 .level-progress-bar").css("width", barNum0 + "%");
             $(".level-progress-box1 .level-progress-bar").css("width", barNum0 + "%");
             $(".level-progress-box2 .level-progress-bar").css("width", barNum0 + "%");
             $(".level-progress-box3 .level-progress-bar").css("width", barNum0 + "%");
             $(".level-progress-box4 .level-progress-bar").css("width", barNum0 + "%");

             $(".level-progress-box0 .level-progress-red").css("width", redNum0 + "%");
             $(".level-progress-box1 .level-progress-red").css("width", redNum0 + "%");
             $(".level-progress-box2 .level-progress-red").css("width", redNum0 + "%");
             $(".level-progress-box3 .level-progress-red").css("width", redNum0 + "%");
             $(".level-progress-box4 .level-progress-red").css("width", redNum0 + "%");
             */
        }
    });
});