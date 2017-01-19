//切换音乐模式
function music() {
    let mediao = $('#media')[0];
    let n = true;
    $(document).on("touchstart", function () {
        if (n && mediao.paused) {
            n = false;
            mediao.play();
        }
    });
    if (mediao.paused) {
        mediao.play();
    };
    $("#audio-btn").on("touchstart", function () {
        if ($("#audio-btn .music1").hasClass('on')) {
            $("#audio-btn .music1").removeClass('on');
            mediao.pause();
            n = false;
        } else {
            $("#audio-btn .music1").addClass('on');
            mediao.play();
            n = false;
        }
    });
}
