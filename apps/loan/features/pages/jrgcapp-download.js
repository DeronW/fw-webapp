import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'

import {Header} from '../../lib/components'
import {Browser, Post, NativeBridge} from '../../lib/helpers'

import {Utils, Components} from 'fw-javascripts'

import styles from '../css/jrgcapp-download.css'

@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class JrgcappDownload extends React.Component {
    componentDidMount() {
        NativeBridge.setTitle('关注微信');
    }
    copyHandler = () => {
        NativeBridge.clipboard("fxhuaba")
    }
    saveHandler = () => {
        NativeBridge.trigger("save_fxh_qrcode")
    }
    clickHandler = () => {
        if (Browser.inIOS()) {
            window.location.href = 'https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8'
        }
        if (Browser.inAndroid()) {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ucf.jrgc.cfinance'
        }
    }
    render() {
        let {history} = this.props;
        let goBack = () => {
            Browser.inApp
                ? NativeBridge.close()
                : history.goBack();
        }
        return (
            <div>
                <Header title={"关注微信"} goBack={goBack}/>
                <div styleName="content-wrap">
                    <div styleName="p1"><img src={require("../images/jrgcapp-download/icon1.jpg")}/>关注了微信之后有什么好处</div>
                    <div styleName="p2-wrap">
                        <div styleName="p2">1.获得更高授信额度</div>
                        <div styleName="p2">2.实时查看还款计划，避免逾期</div>
                        <div styleName="p2">3.将放心花分享给好友</div>
                    </div>
                    <div styleName="p1"><img src={require("../images/jrgcapp-download/icon2.jpg")}/>如何关注我们</div>
                    <div styleName="p2-wrap">
                        <div styleName="p2">1、您可以扫描二维码关注我们</div>
                        <div styleName="p3">长按下图二维码保存到相册>打开微信>扫一扫> 关注放心花公众号</div>
                        <img src={require("../images/jrgcapp-download/qr.jpg")} styleName="qr" onClick={this.saveHandler}/>
                        <div styleName="p2">2、或您可直接打开微信>添加朋友</div>
                        <div styleName="p3">搜索“fxhuaba”公众号<span styleName="copy-qr" onClick={this.copyHandler}>点击复制公众号</span>
                        </div>
                        <div styleName="p2 p4">3、点击此处<a onClick={this.clickHandler}>下载APP</a>
                        </div>
                    </div>
                </div>
            </div>)
        }
    }
