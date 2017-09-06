import React from 'react'
import CSSModules from 'react-css-modules'
import Ajax from '../helpers/request.js'
import UserReady from '../helpers/user-ready.js'

import InvestGiftPanel from './pop-panel.js'
import styles from '../css/pc-header.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PCHeader extends React.Component {

    state = {
        isLogin: null,
        user: {},
        show_gift: false
    }

    componentDidMount() {
        UserReady((isLogin, user) => {
            this.setState({isLogin: isLogin, user: user})
        })
    }

    toggleGift = () => {
        this.setState({show_gift: !this.state.show_gift})
    }

    login = () => {
        location.href = 'http://passport.9888keji.com/passport/login?sourceSite=jrgc&service=' + location.href;
    }

    downloadHandler = () => {
        location.href = 'https://www.9888keji.com/static/keji-web/app-download/index.html'
    }

    render() {
        let {isLogin, user} = this.state

        let GiftPanel = this.state.show_gift &&
            <InvestGiftPanel closeHandler={this.toggleGift}/>;

        let logout = isLogin &&
            <a styleName="btn-link"
               href="http://www.9888keji.com/orderUser/loginout.do">退出</a>

        let user_panel = () => {
            if (!isLogin) return null;

            return <div styleName="btn-link">你好，
                <div styleName="header-user">
                    <span>{user.nickname}</span>
                    <img styleName="arrow"
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAQAAADoz+32AAAAQ0lEQVQI12M48Wf9yzTBNIY0rgVXzvxlmJF45N+W92kqa18c+bdnLsNlhpXl5/+d+n/+/8zEy+xA7mWginP/lhWAWAAL2SHRnw5VoAAAAABJRU5ErkJggg=="/>

                    <div styleName="header-user-panel">
                        <a styleName="user-link" href="http://www.9888keji.com/account/myHome.shtml">
                            <img src={user.avatar}/>
                        </a>
                        <div styleName="header-user-links">
                            <div styleName="realname">{user.realname}</div>
                            <a href="http://www.9888keji.com/account/myHome.shtml" styleName="btn-recharge">我的工场</a>
                        </div>
                    </div>
                </div>
            </div>
        }

        return <div styleName="header-placeholder">
            <div styleName="header" style=
                {{backgroundColor: this.props.bgColor || 'black'}}>
                <div styleName="header-panel">
                    <a styleName="nav-link" href="http://www.9888keji.com/">
                        <img src={require("../images/header/home.png")}/>
                    </a>

                    {/*<a styleName="nav-link nav-link-mall" href="http://www.dougemall.com/">*/}
                    {/*<img src={require("../images/header/mall.png")} />*/}
                    {/*</a>*/}

                    {/*<a styleName="nav-link" href="http://bbs.9888.cn">*/}
                    {/*<img src={require("../images/header/bbs.png")}/>*/}
                    {/*</a>*/}

                    {!isLogin &&
                    <a styleName="btn-link" href="/depository/regist/toRegist.shtml?sourceSite=jrgc">注册</a>}
                    {!isLogin && <div styleName="btn-link-sp"></div>}
                    {!isLogin && <a styleName="btn-link" onClick={this.login}>登录</a>}
                    {!isLogin && <div styleName="btn-link-sp"></div>}

                    {logout}{user_panel()}
                    {isLogin && <div styleName="btn-link-sp"></div>}
                    <div styleName="btn-link btn-download-app" target="_blank" onClick={this.downloadHandler}>APP下载
                        <div styleName="download-app">
                            <img src={require('../images/header/app.jpg')}/>
                            <a styleName="d-download">立即下载App</a>
                            <a styleName="d-android"
                               href="https://www.9888keji.com/static/keji-web/app-download/index.html">Android版下载</a>
                            <a styleName="d-ios"
                               href="https://www.9888keji.com/static/keji-web/app-download/index.html">iOS版下载</a>
                        </div>
                    </div>
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
