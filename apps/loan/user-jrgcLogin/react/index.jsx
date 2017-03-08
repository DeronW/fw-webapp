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

    $FW.Post(`${API_PATH}api/user/v1/signature`, {
        jrgcToken:jrgcToken,
        sourceType:sourceType
    }).then(data => {
        return $FW.Post(``,{
            token:null,
            userId:null,
            userGid:null
        })
    }).then(data=>{

       },e => $FW.Component.Toast(e.message)
    );

});
