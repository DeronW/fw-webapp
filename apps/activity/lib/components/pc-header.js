import React from 'react'
import CSSModules from 'react-css-modules'

import InvestGiftPanel from './invest-gift-panel.js'
import styles from '../css/pc-header.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PCHeader extends React.Component {

    state = {
        isLogin: false,
        show_gift: true
    }

    componentDidMount() {

    }

    toggleGift = () => {
        this.setState({ show_gift: !this.state.show_gift })
    }

    render() {

        let GiftPanel = this.state.show_gift

        return <div styleName="header-placeholder">
            <div styleName="header" style={
                { backgroundColor: this.props.bgColor || 'black' }}>
                <div styleName="header-panel">
                    <a styleName="nav-link" href="http://www.9888keji.com/">
                        <img src={require("../images/header/home.png")} />
                    </a>

                    <a styleName="nav-link nav-link-mall" href="http://www.dougemall.com/">
                        <img src={require("../images/header/mall.png")} />
                    </a>

                    <a styleName="nav-link" href="http://bbs.9888.cn">
                        <img src={require("../images/header/bbs.png")} />
                    </a>

                    <a styleName="btn-link">注册</a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link">登录</a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link" href="http://www.9888keji.com/orderUser/loginout.do">退出</a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link" target="_blank" href="http://www.9888keji.com/static/web/app-download/index.html">APP下载</a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link" target="_blank" href="http://www.9888keji.com/static/web/guide-cookbook/index.html">玩赚攻略</a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link" onClick={this.toggleGift}>邀请有礼</a>
                </div>
            </div>

            {/*<InvestGiftPanel/>*/}
            {GiftPanel}
        </div>
    }
}


export default PCHeader
