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
                    放心花是由深圳市众利财富管理有限公司推出的基于移动端线上贷款信息聚合平台，满足您的各类贷款需求。
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