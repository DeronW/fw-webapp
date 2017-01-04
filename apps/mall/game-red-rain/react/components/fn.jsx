

let G = id => document.getElementById(id);
let show = id => G(id).className = '';
let hide = id => G(id).className = 'hide';

//倒计时准备开始
function readyCounting(callback) {
    let id = 'ready', ct = G('ready-num'), num = 3;
    let imgReady=["go.png","1.png","2.png","3.png"];
    show(id)
    let readyTime = setInterval(() => {
        if (num > 0) {
            num--;
            ct.src="images/"+imgReady[num];
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
    ct.innerHTML = num--;
    let timer = setInterval(() => {
        if (num > 0) {
            ct.innerHTML = num--;
        } else {
            clearInterval(timer);
            endGame();
            callback(getCheckedCount());
        }
    }, 1000);
    startGame(GAME_TIME);
};
function encryption(){

};
function fnShowResult(num) {
    if (num) {
        // $FW.Ajax({
        //     url:'',
        //     data:{
        //         getNum:num,
        //         iosOrAndroid:$FW.Browser.inAndroid()?"inAndroid":"ios",
        //         encryption:encryption()
        //     },
        //     success:data=>{
                G('getNum').innerHTML=num;
        //         G('getPrize').innerHTML=data.prize;
                 G('pop-success').className = '';
        //     }
        // });

    } else {
        G('pop-fail').className = '';
    }
};
G('fail-btn').onClick=function(){
    //NativeBridge.close()
};
G('success-btn').onClick=function(){
//NativeBridge.close()
};
G('fail-close').onClick=function(){
//NativeBridge.close()
};
G('success-close').onClick=function(){
//NativeBridge.close()
};
G('red-cnt-close').onClick=function(){
//NativeBridge.close()
};
G('ready-close').onClick=function(){
//NativeBridge.close()
};
