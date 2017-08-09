import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import styles from '../css/more.css'
import { Header } from '../../lib/components'
import { Storage } from '../../lib/helpers'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class More extends React.Component {
    state = {
        contact: false,
        logout: false
    }

    toggleContactHandler = () => {
        this.setState({ contact: !this.state.contact })
    }

    toggleLogoutHandler = () => {
        this.setState({ logout: !this.state.logout })
    }

    logout = () => {
        Storage.logout()
        location.href = '/static/loan/account/index.html#/entry'
    }

    render() {

        let Contact = <div styleName="pop-bg">
            <div styleName="pop-panel">
                <div styleName="pop-title">联系客服</div>
                {/*<a styleName="pop-close" onClick={this.toggleContactHandler}>&times;</a>*/}
                <div styleName="pop-content">400-102-0066</div>
                <a styleName="pop-cancel"
                    onClick={this.toggleContactHandler}>取消</a>
                <a styleName="pop-confirm" href="tel:400-102-0066">马上拨打</a>
            </div>
        </div>

        let Logout = <div styleName="pop-bg">
            <div styleName="pop-panel">
                <div styleName="pop-title">退出登录</div>
                {/*<a styleName="pop-close" onClick={this.toggleLogoutHandler}>&times;</a>*/}
                <div styleName="pop-content">确定退出登录当前账号？</div>
                <a styleName="pop-cancel"
                    onClick={this.toggleLogoutHandler}>取消</a>
                <a styleName="pop-confirm" onClick={this.logout}>确认</a>
            </div>
        </div>

        return <div styleName="bg">
            <Header title="更多" history={this.props.history} />

            <img styleName="banner" src={require('../images/more/hotline.jpg')}
                onClick={this.toggleContactHandler} />

            <a styleName="btn-item link-us" onClick={this.toggleContactHandler}>
                <i styleName="icon icon-phone"></i>
                联系我们
                <i styleName="icon-ra"></i>
                <div styleName="v-line"></div>
            </a>

            <Link styleName="btn-item" to="/about-us">
                <i styleName="icon icon-about-us"></i>
                关于我们
                <i styleName="icon-ra"></i>
                <div styleName="v-line"></div>
            </Link>

            <Link styleName="btn-item" to="/faq">
                <i styleName="icon icon-faq"></i>
                常见问题
                <i styleName="icon-ra"></i>
                {/*<div styleName="v-line"></div>*/}
            </Link>

            <a styleName="btn-logout" onClick={this.toggleLogoutHandler}>退出登录</a>

            {this.state.contact && Contact}
            {this.state.logout && Logout}

        </div>
    }
}

export default More