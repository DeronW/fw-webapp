import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'

import { Browser, Storage, NativeBridge } from '../../lib/helpers'

export default class Login {
    constructor(Post) {
        this.Post = Post;

        extendObservable(this, {

        })
    }
    gotoLogin = () => {
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

        let login = (jrcgToken) => {
            this.Post(`/api/userext/v1/signature.json`, {
                jrgcToken: jrcgToken,
                sourceType: sourceType
            }).then(data => {
                let dict = data;
                Storage.setUserDict({
                    token: dict.token,
                    status: dict.userStatus,
                    code: dict.invitationCode,
                    uid: dict.uid
                })
                location.href = '/static/loan/3rd/index.html#/jrgc-home';
            }, e => Components.showAlert(e.message));
        }

        NativeBridge.trigger("refresh_loan_token");
        NativeBridge.onReceive(data => {
            data.token ? login(data.token) : NativeBridge.login()
        })
    }


    reload_jrgc = () => {
        location.href = "/static/loan/3rd/index.html#/jrgc-login"
        location.reload()
    }
}