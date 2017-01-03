$FW.DOMReady(function () {
    $FW.Event.cancelSlideDownRefresh();
    //倒计时准备开始
    fnReady();
    let fnRedBag=setInterval(()=>{
        let newBag=new Redbag();
        newBag.fnCreateNode();
        newBag.fnAnimation();

    },redRain.time);

});
