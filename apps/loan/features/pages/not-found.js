import React from 'react'
import { Header } from '../../lib/components'
import styles from '../css/not-found.css'
import CSSModules from 'react-css-modules'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class NotFound extends React.Component {
    render() {
        return <div>
            <Header title="404" />

            <div styleName="delay-panel">
                <div styleName="tip">很抱歉，访问此页面暂时出现问题</div>
                <div styleName="tip-img">
                    <img src={require("../images/not-found/icon.png")} /></div>
                <div styleName="tip-info"> 你可点击下方按钮刷新页面<br />或拨打
                <a href="tel:400-102-0066">400-102-0066</a>联系客服</div>
                <a styleName="relogin" href="/"> 回到首页 </a>
            </div>

        </div>
    }
}

export default NotFound