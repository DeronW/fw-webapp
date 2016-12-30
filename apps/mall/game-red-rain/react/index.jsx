$FW.DOMReady(function () {
    $FW.Event.cancelSlideDownRefresh();
    //倒计时准备开始

    let fnReady = (callback)=> {
        let readyTime = setInterval(()=> {
            var num = document.getElementById("ready-num").innerHTML;
            if (num > 0) {
                document.getElementById("ready-num").innerHTML = num - 1;
            } else {
                clearInterval(readyTime);
                callback && callback();
            }
        }, 1000)
    }
    fnReady();
    let redRain={
        totalRed:10,
        maxTime:1000,
        minTime:500,
        idNum:0,
        getRed:0,
        nowNum:0,
    };
     let fnCreateOne=()=>{

     };
    Redbag.prototype={
        fnCreateNode :()=> {
            if(redRain.nowNum<redRain.totalRed){
                redRain.idNum=redRain.idNum+1;
                var box=document.getElementById("red-rain");
                var li = '<div class="bag-li" id="li'+redRain.idNum+'"><div class="bag-text">+1</div><div class="bag-img"><img src="images/default-avatar.png"></div></div>'
                box.appendChild(li);
            }
        },
    fnAnimation:()=>{
        var step=0.1;
        this.scale=0;
        this.timer = setInterval(()=>{
            this.scale += step;
            if(this.scale >= 1) {
                this.scale=1
                step=-step;
                requestAnimationFrame(()=>{
                    this.style.transmateScale = this.scale +step;
                });
            }else if(this.scale<=0){
                this.scale=0
                clearInterval(this.timer);
                this.fnRemoveNode();
            }else{
                requestAnimationFrame(()=>{
                    this.style.transmateScale = this.scale +step;
                });
            }
        }), parseInt(redRain.minTime+(redRain.maxTime-redRain.minTime).random())
    },
     fnRemoveNode:(time)=>{
            var time=time||0;
        if (this!= null){
            setTimeout(()=>{
                this.parentNode.removeChild(this);
            },time)
        }
    },
     fnClickElement:()=>{
            if(!this.checked){
                redRain.totalRed++;
                this.
                this.fnRemoveNode(100);
            }

        }
    }


});
