let G = id => document.getElementById(id);
let show = id => G(id).className = '';
let hide = id => G(id).className = 'hide';

//倒计时准备开始
function readyCounting(callback) {
    let id = 'ready', ct = G('ready-num'), num = 3;
    let imgReady = ["go.png", "num1.png", "num2.png", "num3.png"];
    G('ready-num').className = 'ready-num';
    show(id)
    let readyTime = setInterval(() => {
        if (num > 0) {
            num--;
            ct.src = "images/" + imgReady[num];
        } else {
            hide(id);
            clearInterval(readyTime);
            callback && callback();
        }
    }, 1000)
};

let fnStartRedbag = (callback) => {
    show('red-cnt');
    let GAME_TIME = 10 * 1000;
    let ct = G('remain-time'), num = GAME_TIME / 1000;
    ct.innerHTML = num;
    let timer = setInterval(() => {
        if (num > 0) {
            ct.innerHTML = --num;
        } else {
            ct.innerHTML = 0;
            clearInterval(timer);
            endGame();
            callback(getCheckedCount());
        }
    }, 1000);
    startGame(GAME_TIME);
};
function fnShowResult(num) {
    if (num > 0) {
        let endRandom = parseInt(Math.random() * 100000 + 1000);
        let endTime = new Date().getTime();
        let endToken = hex_md5(endRandom + '' + endTime);
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=redrain/rob`,
            data: {
                nonce: endRandom,
                time: endTime,
                token: endToken,
                red_num: num,
            },
            method: 'POST',
            success: data => {
                G('getNum').innerHTML = num;
                G('getPrize').innerHTML = data.red_name;
                G('pop-success').className = '';
                successBtn(data.red_type);
            }
        });
    } else {
        G('pop-fail').className = '';
    }
};
G('fail-btn').onClick = function () {
    NativeBridge.close()
};
function successBtn(type) {
    G('success-btn').onClick = function (type) {
        if (type == 1) {
            NativeBridge.toNative('app_scores');
        } else if (type == 2||type ==3) {
            NativeBridge.toNative('app_coupon');
        }
    };
}

G('fail-close').onClick = function () {
    NativeBridge.close()
};
G('success-close').onClick = function () {
    NativeBridge.close()
};
G('red-cnt-close').onClick = function () {
    NativeBridge.close()
};
G('ready-close').onClick = function () {
    NativeBridge.close()
};
