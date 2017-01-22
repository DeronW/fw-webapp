
let Browsertype=$FW.Browser.inIOS()?3:4;
const API_PATH = document.getElementById('api-path').value;
$FW.DOMReady(function () {
    $FW.Ajax({
        url:`${API_PATH}/api/v1/user-state.json`,
        success:(data)=>{
           if (FinancialWorkspace.Browser.inApp()&&!data.is_login) {
                NativeBridge.login();
            }
        }
    });
    let startRandom=parseInt(Math.random()*100000+1000);
    let startTime=new Date().getTime();
    let startToken=hex_md5(Browsertype+''+startRandom+''+startTime);
    $FW.Ajax({
        url:`${location.protocol}//game.9888.cn/index.php?r=redrain/trig`,
        withCredentials:true,
        data:{
            client_type:Browsertype,
            nonce:startRandom,
            time:startTime,
            token:startToken
        },
        method:'POST',
        success:(data)=>{
            //console.log(startToken);
        }
    });
    //倒计时准备开始
    readyCounting(
        () => fnStartRedbag(
            (result) => fnShowResult(result)
        )
    );
});
