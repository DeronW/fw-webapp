//切换音乐模式
function music() {
    let mediao = $('#media')[0];
    let n = true;
    $(document).on("touchstart", function () {
        console.log(n);
        if (n && mediao.paused) {
            n = false;
            mediao.play();
        }
    });
    if (mediao.paused) {
        mediao.play();
    };
    $("#audio-btn").on("touchstart", function () {
        if ($("#audio-btn  .music1").hasClass('on')) {
            //$(this).attr("src",http+"/musicOff.png");
            $("#audio-btn .music1").removeClass('on');
            mediao.pause();
        } else {
            //$(this).attr("src",http+"/music.png");
            $("#audio-btn .music1").addClass('on');
            mediao.play();
        }
    });
}
