import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { BrowserFactory } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/contact-us.css'
import {NativeBridge} from '../../lib/helpers'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class ContactUs extends React.Component {
    render() {
        let {history} = this.props
        let Browser = new BrowserFactory(navigator.userAgent, 'EasyLoan888');
        let goBack = () => {
            Browser.inApp ? NativeBridge.close() : history.goBack()
        }
        return <div styleName="bg">
            <Header title="联系我们" goBack={goBack} enable={'force'}/>
            <div styleName="banner">
                <img src={require('../images/contact-us/banner.png')} />
            </div>
            <div styleName="info-panel">
                <div styleName="info-title">
                    <img src={require('../images/contact-us/icon1.png')}/>
                    商务合作
                </div>
                <div styleName="info-content">
                    <div>电子邮箱：zhangqiaosheng@ucfgroup.com</div>
                </div>
            </div>
            <div styleName="info-panel">
                <div styleName="info-title">
                    <img src={require('../images/contact-us/icon2.png')}/>
                    客服服务
                </div>
                <div styleName="info-content">
                    <div>联系电话：400-102-0066</div>
                    <div>电子邮箱：fangxinhua_kefu@9888.cn</div>
                </div>
            </div>
            <div styleName="info-panel">
                <div styleName="info-title">
                    <img src={require('../images/contact-us/icon3.png')}/>
                    联系地址
                </div>
                <div styleName="info-content">
                    <div>地址：北京市朝阳区朝阳门外大街18号丰联广场A座写字楼11层1105室</div>
                    <div>邮编：100020</div>
                </div>
            </div>
        </div>
    }
}

export default ContactUs
