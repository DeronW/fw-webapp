//切换音乐模式
function music() {
    let mediao = $('#media')[0];
    let n = true;
    $(document).on("touchstart", function () {
        if (n && mediao.paused) {
            mediao.play();
            n = false;
        }
    });
    if (mediao.paused) {
        mediao.play();
    };
    $("#audio-btn").on("touchstart", function () {
        if ($("#audio-btn img").hasClass('on')) {
            //$(this).attr("src",http+"/musicOff.png");
            $("#audio-btn img").removeClass('on');
            mediao.pause();
        } else {
            //$(this).attr("src",http+"/music.png");
            $("#audio-btn img").addClass('on');
            mediao.play();
        }
    });
}
