import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import Browser from '../helpers/browser.js'
import NativeBridge from '../helpers/native-bridge.js'

import styles from '../css/home.css'

function gotoHandler(link, history, need_login) {

    let full_link = `${location.protocol}//${location.hostname}/static/insurance/weiyun-car/#${link}`;

    Browser.inApp ?
        NativeBridge.goto(full_link, need_login) :
        history.push(link)
}

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Home extends React.Component {

    componentDidMount() {
        document.title = 'HOME'
    }

    startHandler = () => {
        gotoHandler('/basic', this.props.history)
    }

    render() {
        return <div styleName="bg">
            <img styleName="banner" src={require('../images/home/banner.jpg')} />

            <div styleName="car-insurance">
                <div styleName="car-insurance-title">工场车险</div>
                <div styleName="car-insurance-sub-title">20%巨额优惠  30秒精准报价</div>
                <a styleName="btn-start" onClick={this.startHandler}>优惠购买</a>
                <div styleName="v-line"></div>
            </div>

            <div styleName="partner">
                <span styleName="partner-title"> 合作伙伴： </span>
                <img src={require('../images/home/logo-pingan.jpg')} />
                <img src={require('../images/home/logo-picc.jpg')} />
                <img src={require('../images/home/logo-cpic.jpg')} />
            </div>

            <div styleName="faq-title">常见问题</div>
            <div styleName="faq-item">Q1：什么是航空意外险？</div>
            <div styleName="faq-item">Q2：购买交通工具意外保险的原因</div>
            <div styleName="faq-item">Q3：什么是责任保险？</div>
            <div styleName="faq-item">Q4：投保家财险需要避免“四个误区”？</div>
            <div styleName="faq-item">Q5：家财险一定要按房屋的实际价值进行投保么？</div>
            <div styleName="faq-item">Q6：家庭财如何填写房屋保险金额？产保险中，投保人与保险标的物之间关系？</div>
            <div styleName="faq-item">Q7：网站投保时需要您提供车架号，VIN码，发动机号；什么是VIN码/车架号?发动机号？</div>
            <div styleName="faq-item">Q8：如何购买交强险？Q9：投保意外伤害保险能够获得哪些保障？</div>
        </div>
    }
}

export default Home
