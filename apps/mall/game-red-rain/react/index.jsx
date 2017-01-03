$FW.DOMReady(function () {
    $FW.Event.cancelSlideDownRefresh();
    //倒计时准备开始
    fnReady();
    var box = document.getElementById("red-rain");
    console.log(window.innerHeight);
    box.style.height=window.innerHeight+'px';
    let fnRedBag=setInterval(()=>{
        if (redRain.nowNum < redRain.totalRed) {
            let newBag=new Redbag();
            let node=newBag.fnCreateNode();
            newBag.fnAnimation(node);
        }
    },redRain.time);

});
