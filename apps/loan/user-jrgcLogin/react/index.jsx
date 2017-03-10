$FW.DOMReady(function () {
    let jrcgToken;
    let sourceType;
    let jrgc_ios = $FW.Browser.inIOSApp();
    let jrgc_android = $FW.Browser.inAndroidApp();
    let jrgc_weixin = $FW.Browser.inWeixin();
    let jrgc_wap = $FW.Browser.inMobile();
    let jrgc_web = !$FW.Browser.inMobile();

    if(jrgc_ios) sourceType = 1;
    if(jrgc_android) sourceType = 2;
    if(jrgc_wap) sourceType = 3;
    if(jrgc_weixin) sourceType = 4;
    if(jrgc_web) sourceType = 5;

    function action(name){
        NativeBridge[name]();
    }

    action("refresh_loan_token");
    window.onNativeMessageReceive = function(data){
        let receiveData = JSON.stringify(data);
        if(receiveData == ""){
            action("login");
        }else{
            jrcgToken = receiveData;
            if(jrcgToken){
                login(jrcgToken);
            }
        }
    }

    function login(jrcgToken){
        $FW.Post(`${API_PATH}api/user/v1/signature`, {
            jrgcToken:jrcgToken,
            sourceType:sourceType
        }).then(data => {
            let dict = data.userLogin;
            $FW.Store.setUserDict({
                token: dict.userToken,
                id: dict.userId,
                gid: dict.userGid,
                status: dict.userStatus
            })
            location.href = `/static/loan/home/index.html`;
        }, e => $FW.Component.Toast(e.message));
    }

});
