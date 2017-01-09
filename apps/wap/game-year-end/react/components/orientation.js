/**
 * Created by Administrator on 2017/1/9.
 */
!function () {
    function b() {
        if (!a) {
            var b = '<div class="yyfm-orientationLayer" style="background: black; color: white; font-size: 2.4rem; text-align: center; position: fixed; width: 100%; top: 0; left: 0; bottom: 0; z-index: 10000; overflow: hidden;"><div  style="height: 45%"></div><div style="text-align: center">请竖屏浏览</div></div>';
            a = $(b), $(document.body).append(a)
        }
        a.show(), $(".yyfm-orientationLayer").on("touchstart", e)
    }

    function c() {
        a && a.hide(), $(".yyfm-orientationLayer").off("touchstart", e)
    }

    function d() {
        var a = window.orientation;
        switch (a) {
            case 90:
            case-90:
                a = "landscape", b();
                break;
            default:
                a = "portrait", c()
        }
    }

    function e(a) {
        a.preventDefault(), a.stopPropagation()
    }

    function f() {
        var a = "onorientationchange" in window ? "orientationchange" : "resize";
        window.addEventListener(a, d, !1), d()
    }

    var a;
    f()
}();
