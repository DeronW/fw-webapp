/**
 * Created by Administrator on 2016/12/30.
 */
let redRain = {
    totalRed: 10,
    maxTime: 1000,
    minTime: 500,
    idNum: 0,
    getRed: 0,
    nowNum: 0,
    redImg: ["redBag0.png", "redBag1.png", "redBag2.png", "redBag3.png", "redBag4.png", "redBa5.png"],
    time:500,
    x:Math.random() *window.innerWith+'px',
    y:Math.random() *window.innerHeight+'px',
};
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
//单个红包
let Redbag = ()=> {};
Redbag.prototype = {
    fnCreateNode: ()=> {
            redRain.idNum = redRain.idNum + 1;
            var box = document.getElementById("red-rain");
            var newNode = document.createElement("div");
            newNode.className="bag-li";
            newNode.id='li' + redRain.idNum;
            newNode.style.left=redRain.x;
            newNode.style.top=redRain.y;
            newNode.innerHTML = '<div class="bag-text">+1</div><div class="bag-img"><img src="images/' + redRain.redImg[parseInt(redRain.redImg.length * Math.random())] + '"></div>';
            box.appendChild(newNode);
        return newNode
    },
    fnAnimation: (callback)=> {
        var step = 0.1;
        this.scale = 0;
        this.timer = setInterval(()=> {
            this.scale += step;
            if (this.scale >= 1) {
                this.scale = 1;
                step = -step;
                requestAnimationFrame(()=> {
                    this.style.Transform = scale(this.scale + step);
                });
            } else if (this.scale <= 0) {
                this.scale = 0;
                clearInterval(this.timer);
                callback && callback();
                this.fnRemoveNode();
            } else {
                requestAnimationFrame(()=> {
                    this.style.Transform = scale(this.scale + step);
                });
            }
        }), parseInt(redRain.minTime + (redRain.maxTime - redRain.minTime).random())
    },
    fnRemoveNode: (time)=> {
        var time = time || 0;
        if (this != null) {
            setTimeout(()=> {
                this.parentNode.removeChild(this);
            }, time)
        }
    },
    fnClickElement: ()=> {
        if (!this.checked) {
            redRain.totalRed++;
            this.className = "bag-li bag-li-on";
            this.fnRemoveNode(100);
        }

    }
}



