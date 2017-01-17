/**
 * Created by Administrator on 2017/1/12.
 */
function load(){
    let http=location.href.split("game-year-end")[0]+"game-year-end/images" ;
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
        let img = document.createElement("img");
        function loadComplete() {
            img = null;
            if (callback) callback();
        }
        img.onerror = loadComplete;
        img.onload = loadComplete;
        img.src = src;
    }

    let ImageLoader = {
        loadImage: loadImage,
        loadImages: function(images, callback) {
            let count = 0,
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
    let touchStyleLoadingEl = document.getElementById('touchStyleLoading');
    ImageLoader.loadImages([
        http+"/p0-0.jpg",
        http+"/p0-1.png",
        http+"/p0-2.png",
        http+"/p0-3.png",
        http+"/p0-4.png",

        http+"/p1-0.png",
        http+"/p1-1.png",
        http+"/p1-2.png",

        http+"/p2-0.png",
        http+"/p2-1.png",
        http+"/p2-3.png",

        http+"/p3-0.png",
        http+"/p3-1.png",
        http+"/p3-2.png",
        http+"/p3-3.png",
        http+"/p3-close.png",
        http+"/p3-masker.png",

        http+"/p4-1.png",
        http+"/p4-2.png",
        http+"/p4-3.png",
        http+"/p4-4.png",
        http+"/p4-text1.png",
        http+"/p4-text2.png",
        http+"/p4-text3.png",

        http+"/p5-1.png",
        http+"/p5-2.png",
        http+"/p5-3.png",
        http+"/p5-level-1.png",
        http+"/p5-level-2.png",
        http+"/p5-level-3.png",
        http+"/p5-level-4.png",
        http+"/p5-level-5.png",

        http+"/p6-0.png",
        http+"/p6-1.png",
        http+"/p6-2.png",
        http+"/p6-3.png",
        http+"/p6-4.png",
        http+"/p6-5.png",
        http+"/p6-6.png",
        http+"/p6-7.png",
        http+"/p6-8.png",

        http+"/share.png",
        http+"/up-text1.png",
        http+"/up.png",
        http+"/music1.png",
        http+"/music2.png",
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
}
