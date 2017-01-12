/**
 * Created by Administrator on 2017/1/12.
 */
function load(){
    let http=location.href.split("game-year-end")[0]+"images" ;
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
        http+"/up.png",
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
