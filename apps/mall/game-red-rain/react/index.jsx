$FW.DOMReady(function () {
    $FW.Event.cancelSlideDownRefresh();
    //倒计时准备开始
    fnReady();
    var box = document.getElementById("red-rain");
    box.style.height=window.innerHeight+'px';
    let fnRedBag=setInterval(()=>{
        console.log()
        if (redRain.nowNum < redRain.totalRed) {
            redRain.nowNum++;
            let newBag=new Redbag();
            let node=newBag.fnCreateNode();
            newBag.fnAnimation(node,newBag.fnRemoveNode(node));

        }
    },redRain.time);

});
