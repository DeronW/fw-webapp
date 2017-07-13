import React from 'react'
import CSSModules from 'react-css-modules'
import { Components } from 'fw-javascripts'

import { Browser,Storage,NativeBridge } from '../../lib/helpers'
import { Header } from '../../lib/components'
import styles from '../css/login.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Login extends React.Component {
    state = {
        show:false
    }
    componentDidMount() {
        this.gotoLogin();
        setTimeout( () => {
            this.setState({show:true})
        }, 10000)
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
            alert(data.token)
            data.token ? this.login(data.token) : NativeBridge.login()
        })
    }
    login = (jrcgToken) => {
        alert(jrgcToken);
         this.Post(`${API_PATH}/api/userext/v1/signature.json`, {
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
            location.href = '/static/loan/jrgc/index.html#/home';
        }, e => Components.showAlert(e.message));
    }
    reload_jrgc = () => {
        location.href = "/static/loan/jrgc/index.html#/login"
    }


    render() {
        return <div>
            {!Browser.inJRGCApp && <Header title={'跳转'} />}

            <div styleName="delayPanel" style={{display: this.state.show ? 'block':"none"}}>
                <div styleName="tip">很抱歉，访问此页面暂时出现问题</div>
                <div styleName="tip-img"><img src={require("../images/icon.png")} /></div>
                <div styleName="tip-info">你可点击下方按钮刷新页面<br />或拨打<a href="tel:400-102-0066">400-102-0066</a>联系客服</div>
                <a styleName="relogin" onClick={() => this.reload_jrgc()}> 刷新 </a>
            </div>
        </div>
    }
}
export default Login
