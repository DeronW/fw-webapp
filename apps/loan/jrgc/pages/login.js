import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import { Browser,Storage,NativeBridge,Post } from '../../lib/helpers'
import { Header } from '../../lib/components'
import styles from '../css/login.css'

@inject("login")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Login extends React.Component {

    componentDidMount() {
        let {login} =this.props;
        login.gotoLogin();
        setTimeout( () => {
            login.setShow()
        }, 10000)
    }

    render() {
        let {login} =this.props;
        return <div>
            {!Browser.inJRGCApp && <Header title={'跳转'} />}
            <div styleName="delayPanel" style={{display: login.show ? 'block':"none"}}>
                <div styleName="tip">很抱歉，访问此页面暂时出现问题</div>
                <div styleName="tip-img"><img src={require("../images/icon.png")} /></div>
                <div styleName="tip-info">你可点击下方按钮刷新页面<br />或拨打<a href="tel:400-102-0066">400-102-0066</a>联系客服</div>
                <a styleName="relogin" onClick={() => login.reload_jrgc()}> 刷新 </a>
            </div>
        </div>
    }
}
export default Login
