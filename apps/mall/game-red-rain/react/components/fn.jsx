

let G = id => document.getElementById(id);
let show = id => G(id).className = '';
let hide = id => G(id).className = 'hide';

//倒计时准备开始
function readyCounting(callback) {
    let id = 'ready', ct = G('ready-num'), num = 1;
    show(id)
    ct.innerHTML = num--;
    let readyTime = setInterval(() => {
        if (num > 0) {
            ct.innerHTML = num--;
        } else {
            hide(id)
            clearInterval(readyTime);
            callback && callback();
        }
    }, 1000)
};

let fnStartRedbag = (callback) => {
    show('red-cnt')

    let GAME_TIME = 10 * 1000;
    let ct = G('remain-time'), num = GAME_TIME / 1000;


    ct.innerHTML = num--;
    let timer = setInterval(() => {
        if (num > 0) {
            ct.innerHTML = num--;
        } else {
            hide('red-cnt')
            clearInterval(timer);
            endGame();
            callback(getCheckedCount());
        }
    }, 1000);

    startGame(GAME_TIME);
}

function fnShowResult(success) {
    if (success) {
        G('pop-success').className = '';
    } else {

        G('pop-fail').className = '';
    }
}
