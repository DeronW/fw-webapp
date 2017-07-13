import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { BrowserFactory } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/about-us.css'
import {NativeBridge} from '../../lib/helpers'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AboutUs extends React.Component {
    render() {
        let {history} = this.props
        let Browser = new BrowserFactory(navigator.userAgent, 'EasyLoan888');
        let goBack = () => {
            Browser.inApp ? NativeBridge.close() : history.goBack()
        }
        return <div styleName="bg">
            <Header title="关于我们" goBack={goBack} enable={'force'}/>
            <div styleName="banner">
                <img src={require('../images/about-us/logo.png')} />
                <div styleName="banner-intro">
                    放心花主要为用户提供短期的小额急借的现金借贷服务。用户通过授信认证获得授信额度，在额度内随时可进行借款，借款额度在500元-50000元之间。操作简单、方便快速、实时秒到账，做年轻人专属的手机钱包。
                    </div>
            </div>
            <div styleName="wexin-panel">
                <i styleName="icon-wexin"></i>
                微信公众号
                <span styleName="pull-right">fxhuaba</span>
            </div>
        </div>
    }
}

export default AboutUs