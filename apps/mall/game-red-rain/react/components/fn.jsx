let G = id => document.getElementById(id);
let show = id => G(id).className = '';
let hide = id => G(id).className = 'hide';

//倒计时准备开始
function readyCounting(callback) {
    let id = 'ready', ct = G('ready-num'), num = 3;
    let imgReady = ["go.png", "num1.png", "num2.png", "num3.png"];
    G('ready-num').className = 'ready-num';
    show(id);
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
        let endRandom = parseInt(Math.random() * 100000 + 1000);
        let endTime = new Date().getTime();
        let endToken = hex_md5(endRandom+'' +num+ '' + endTime);
            alert("将要请求");
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=redrain/rob`,
            withCredentials:true,
            data: {
                nonce: endRandom,
                red_num: num,
                time: endTime,
                token: endToken,
            },
            method: 'POST',
            success: (data) => {
                alert(data.red_name+"返回数据类型data："+data.red_type);
                if(num>0){
                    G('getNum').innerHTML = num;
                    G('getPrize').innerHTML = data.red_name;
                    G('pop-success').className = '';
                    successBtn(data.red_type);
                    function successBtn(data) {
                        var mygetprize=data;
                        G('success-btn').onclick = function () {
                            if (mygetprize == 1) {
                                NativeBridge.toNative('app_scores');
                                $FW.Browser.inIOS()?null:NativeBridge.close();
                            } else if(mygetprize == 2) {
                                NativeBridge.toNative('app_coupon');
                                $FW.Browser.inIOS()?null:NativeBridge.close();
                            }else if(mygetprize==3) {
                                NativeBridge.toNative('app_fanxiCoupon');
                                $FW.Browser.inIOS()?null:NativeBridge.close();
                            }
                        };
                    }
                }else{
                    G('pop-fail').className = '';
                }
            }
        });
};
G('fail-btn').onclick = function () {
    NativeBridge.close();
};

