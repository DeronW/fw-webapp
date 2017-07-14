import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'

import { Browser,Storage,NativeBridge } from '../../lib/helpers'
export default class Login{
    constructor(Post){
        this.Post = Post;

        extendObservable(this,{
            show:false
        })
    }
    gotoLogin = ()=>{
        let sourceType;
        let jrgc_ios = Browser.inIOSApp;
        let jrgc_android = Browser.inAndroidApp;
        let jrgc_weixin = Browser.inWeixin;
        let jrgc_wap = Browser.inMobile;
        let jrgc_web = !Browser.inMobile;

        if (jrgc_ios) sourceType = 1;
        if (jrgc_android) sourceType = 2;
        if (jrgc_wap) sourceType = 3;
        if (jrgc_weixin) sourceType = 4;
        if (jrgc_web) sourceType = 5;

        NativeBridge.trigger("refresh_loan_token");
        NativeBridge.onReceive(data => {
            data.token ? this.login(data.token,sourceType) : NativeBridge.login()
        })
    }

    login = (jrcgToken,sourceType) => {
        Components.showAlert(`jrgc:${jrcgToken.slice(0,5)}`)
         Post(`${API_PATH}/api/userext/v1/signature.json`, {
            jrgcToken: jrcgToken,
            sourceType: sourceType
        }).then(data => {
            let dict = data;
            alert(dict.userStatus)
            Storage.setUserDict({
                token: dict.token,
                status: dict.userStatus,
                code: dict.invitationCode,
                uid: dict.uid
            })
            location.href = '/static/loan/jrgc/index.html#/home';
        }, e => Components.showAlert(e.message));
    }
    reload_jrgc = () => {
        location.href = "/static/loan/jrgc/index.html#/login"
    }

    setShow = () =>{
        this.show = true
    }
}