import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import { Header } from '../../../../es7-lib/loan/components'

import styles from '../css/about-us.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AboutUs extends React.Component {
    render() {
        return <div styleName="bg">
            <Header title="关于我们" history={this.props.history} />
            <div styleName="banner">
                <img src={require('../images/logo.png')} />
                <div styleName="banner-intro">
                    放心花是由深圳市众利财富管理有限公司推出的基于移动端线上贷款信息聚合平台，对接多家主流平台，满足您的各类贷款需求。
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