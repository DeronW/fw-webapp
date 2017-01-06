//取消下拉刷新
$FW.DOMReady($FW.Event.cancelSlideDownRefresh);

$FW.DOMReady(function () {
    let startRandom=parseInt(Math.random()*100000+1000);
    let startTime=new Date().getTime();
    let startToken=hex_md5(startRandom+''+startTime);
    $FW.Ajax({
        url:`${location.protocol}//game.9888.cn/index.php?r=redrain/trig`,
        data:{
            rand:startRandom,
            time:startTime,
            token:startToken,
            trig:'',
        },
        method:'POST',
        success:data=>{
            console.log(startToken);
        }
    });
    //倒计时准备开始
    readyCounting(
        () => fnStartRedbag(
            (result) => fnShowResult(result)
        )
    );
})
