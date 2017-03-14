$FW.DOMReady(function () {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'跳转'} />, HEADER_NODE);


    let sourceType;
    let jrgc_ios = $FW.Browser.inIOSApp();
    let jrgc_android = $FW.Browser.inAndroidApp();
    let jrgc_weixin = $FW.Browser.inWeixin();
    let jrgc_wap = $FW.Browser.inMobile();
    let jrgc_web = !$FW.Browser.inMobile();

    if (jrgc_ios) sourceType = 1;
    if (jrgc_android) sourceType = 2;
    if (jrgc_wap) sourceType = 3;
    if (jrgc_weixin) sourceType = 4;
    if (jrgc_web) sourceType = 5;

    NativeBridge.trigger("refresh_loan_token")

    window.onNativeMessageReceive = function (data) {
        //alert(data.token);
        console.log(data)
        data.token ? login(data.token) : NativeBridge.login()
    }

    function login(jrcgToken) {
        $FW.Post(`${API_PATH}api/userext/v1/signature.json`, {
            jrgcToken: jrcgToken,
            sourceType: sourceType
        }).then(data => {
            let dict = data;
            $FW.Store.setUserDict({
                token: dict.token,
                id: dict.userId,
                gid: dict.userGid,
                status: dict.userStatus
            })
            location.href = '/static/loan/home/index.html';
        }, e => $FW.Component.Toast(e.message));
    }

});
