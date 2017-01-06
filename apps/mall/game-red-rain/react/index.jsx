//取消下拉刷新
$FW.DOMReady($FW.Event.cancelSlideDownRefresh);
let Browsertype=$FW.Browser.inIOS()?3:4;
$FW.DOMReady(function () {
    let startRandom=parseInt(Math.random()*100000+1000);
    let startTime=new Date().getTime();
    let startToken=hex_md5(startRandom+''+startTime);
    console.log(Browsertype+''+startRandom+''+startTime);
    $FW.Ajax({
        url:`${location.protocol}//game.9888.cn/index.php?r=redrain/trig`,
        data:{
            client_type:Browsertype,
            nonce:startRandom,
            time:startTime,
            token:startToken,

        },
        method:'POST',
        success:data=>{
            //console.log(startToken);
        }
    });
    //倒计时准备开始
    readyCounting(
        () => fnStartRedbag(
            (result) => fnShowResult(result)
        )
    );
})
