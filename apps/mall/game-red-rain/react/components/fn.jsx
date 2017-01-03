/**
 * Created by Administrator on 2016/12/30.
 */
let redRain = {
    totalRed: 10,
    maxTime: 3500,
    minTime: 2000,
    idNum: 0,
    getRed: 0,
    nowNum: 0,
    redImg: ["redBag0.png", "redBag1.png", "redBag2.png", "redBag3.png", "redBag4.png", "redBag5.png"],
    time: 500,
    x: 720,
    y: 700,
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
};
//单个红包
let Redbag = ()=> {
};
Redbag.prototype = {
    fnRemoveNode: (node, time)=> {
        var time = time || 0;
        clearInterval(node.timer);
        console.log(node.timer);
        if (node) {
            setTimeout(()=> {
                node.parentNode.removeChild(node);
                if (redRain.nowNum > 0) {
                    redRain.nowNum--;
                }
            }, time)
        }
    },
    fnCreateNode: ()=> {
        redRain.idNum = redRain.idNum + 1;
        var box = document.getElementById("red-rain");
        var newNode = document.createElement("div");
        newNode.className = "bag-li";
        newNode.id = 'li' + redRain.idNum;
        newNode.style.left = Math.random() * redRain.x + 'px';
        newNode.style.top = Math.random() * redRain.y + 'px';
        newNode.innerHTML = '<div class="bag-text">+1</div><div class="bag-img"><img src="images/' + redRain.redImg[parseInt(redRain.redImg.length * Math.random())] + '"></div>';
        box.appendChild(newNode);
        return document.getElementById('li' + redRain.idNum);
    },
    fnAnimation: (node, callback)=> {
        var step = 0.1;
        node.setAttribute("scale", 0);
        node.timer = setInterval(()=> {
            node.setAttribute("scale", (parseFloat(node.getAttribute("scale")) + step));
            if (node.getAttribute("scale") >= 1) {
                node.setAttribute("scale", 1);
                step = -step;
                requestAnimationFrame(()=> {
                    node.style.transform = node.style.webkitTransform = "scale(1)";
                });
            } else if (node.getAttribute("scale") <= 0) {
                node.setAttribute("scale", 0);
                requestAnimationFrame(()=> {
                    node.style.transform = node.style.webkitTransform = "scale(0)";
                });
                callback && callback();
            } else {
                requestAnimationFrame(()=> {
                    node.style.transform = node.style.webkitTransform = "scale(" + (parseFloat(node.getAttribute("scale")) + step) + ")";
                });
            }
        }), parseInt(redRain.minTime + (redRain.maxTime - redRain.minTime) * Math.random())
    },

    fnClickElement: ()=> {
        if (!this.checked) {
            redRain.getRed++;
            this.className = "bag-li bag-li-on";
            this.fnRemoveNode(100);
        }

    }
}



