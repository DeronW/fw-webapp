//切换音乐模式
function music() {
    let mediao = $('#media')[0];
    let n = true;
    $(document).on("touchstart", function () {
        if (n && mediao.paused) {
            alert(mediao.paused);
            mediao.play();
            n = false;
        }
    });
    if (mediao.paused) {
        mediao.play();
    }
    ;
    $("#audio-btn img").on("click", function () {
        if ($(this).hasClass('on')) {
            //$(this).attr("src",http+"/musicOff.png");
            $(this).removeClass('on');
            mediao.pause();
        } else {
            //$(this).attr("src",http+"/music.png");
            $(this).addClass('on');
            mediao.play();
        }
    });
}
