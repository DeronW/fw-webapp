$FW.DOMReady(function () {
    $FW.Event.cancelSlideDownRefresh();
    //倒计时准备开始
    fnReady();
    let fnRedBag=setInterval(()=>{
        if (redRain.nowNum < redRain.totalRed) {
            let newBag=new Redbag();
            let node=newBag.fnCreateNode();
            console.log(node);
            node.fnAnimation();
        }
    },redRain.time);

});
