import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import { Browser, Storage, NativeBridge, Post } from '../../lib/helpers'
import { Header } from '../../lib/components'
import styles from '../css/jrgc-login.css'

@inject("jrgc_login")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class JRGCLogin extends React.Component {

    state = {
        show: false
    }

    componentDidMount() {
        // 2017-08-12, 金融工场iOS审核被拒, 临时跳转
        // if (Browser.inIOS) {
        //     try {
        //         NativeBridge.trigger('show_header')
        //         NativeBridge.setTitle('敬请期待')
        //     } catch (e) { }
        //     location.href = '/static/loan/features/index.html#/waiting'
        // }

        this.props.jrgc_login.gotoLogin()
        setTimeout(() => this.setState({ show: true }), 8000)
    }

    render() {
        let { jrgc_login } = this.props
        let { show } = this.state

        let noticePanel = <div styleName="delayPanel">
            <div styleName="tip">很抱歉，访问此页面暂时出现问题</div>
            <div styleName="tip-img"><img src={require("../images/jrgc/icon.png")} /></div>
            <div styleName="tip-info">你可点击下方按钮刷新页面<br />或拨打<a href="tel:400-102-0066">400-102-0066</a>联系客服</div>
            <a styleName="relogin" onClick={jrgc_login.reload_jrgc}> 刷新 </a>
        </div>

        return show && noticePanel
    }
}

export default JRGCLogin
