import React from 'react'
import CSSModules from 'react-css-modules'

import InvestGiftPanel from './pop-panel.js'
import styles from '../css/pc-header.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PCHeader extends React.Component {

    state = {
        isLogin: false,
        show_gift: false
    }

    componentDidMount() {
        Ajax({
            url: '/api/userState/v1/userState.json'
        }).then(data => {
            this.setState({
                isLogin: data.isLogin
            })
        })
    }

    toggleGift = () => {
        this.setState({ show_gift: !this.state.show_gift })
    }

    showDownload = () => { }

    hideDownload = () => { }

    render() {

        let GiftPanel = this.state.show_gift &&
            <InvestGiftPanel closeHandler={this.toggleGift} />

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
                    <a styleName="btn-link"
                        href="http://www.9888keji.com/orderUser/loginout.do">退出</a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link btn-download-app" target="_blank"
                        onMouseEnter={this.showDownload}
                        onMouseLeave={this.hideDownload}
                        href="http://www.9888keji.com/static/web/app-download/index.html">APP下载
                        <a styleName="download-app">
                            <img src={require('../images/header/app.jpg')} />
                            <a styleName="d-download">立即下载App</a>
                            <a styleName="d-android">Android版下载</a>
                            <a styleName="d-ios">iOS版下载</a>
                        </a>
                    </a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link" target="_blank"
                        href="http://www.9888keji.com/static/web/guide-cookbook/index.html">玩赚攻略</a>
                    <div styleName="btn-link-sp"></div>
                    <a styleName="btn-link" onClick={this.toggleGift}>邀请有礼</a>
                </div>
            </div>
            {GiftPanel}
        </div>
    }
}


export default PCHeader
