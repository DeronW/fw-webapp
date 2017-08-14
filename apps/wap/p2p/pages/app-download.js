import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../components'
import styles from '../css/app-download.css'

@CSSModules(styles, {allowMultiple: true, errorWhenNotFound: false})
class AppDownload extends React.Component {
    render() {
        return <div styleName="appDownload-box">
            <Header title='下载APP'/>
            <img src={require("../images/app-download/img_thumb.jpg")}/>
            <br/>
            <a href="http://app.9888.cn/download/apk">
                <img src={require("../images/app-download/btn_android.png")}/></a>
            <br/>
            <a href="https://itunes.apple.com/cn/app/jin-rong-gong-chang/id939125881?mt=8">
                <img src={require("../images/app-download/btn_ios.png")}/></a>
            <br/>
            <div styleName="hr"></div>
            <img src={require("../images/app-download/1.jpg")}/>
            <div styleName="big-text">随手出借，小钱尽享高收益</div>
            <div styleName="hr"></div>
            <img src={require("../images/app-download/2.jpg")}/>
            <div styleName="big-text">邀亲友，一起分享财富</div>
            <div styleName="small-text">用工场码邀亲友注册、出借<br/>双方均可获得高额返利</div>
            <div styleName="hr"></div>
            <img src={require("../images/app-download/3.jpg")}/>
            <div styleName="big-text">出借收益看得见，一键提现</div>
            <div styleName="small-text">
                随时查看余额、收益、回款、欠款等信息<br/>
                更可以直接用手机提现
            </div>
            <div styleName="hr"></div>
            <img src={require("../images/app-download/4.jpg")}/>
            <div styleName="big-text">多重安全防控，出借更安心</div>
            <div styleName="small-text">
                实名认证、动态口令、手势密码、安全证书等<br/>多种安全手段，确保资金和隐私安全
            </div>
            <div styleName="hr"></div>
            <a href="http://app.9888.cn/download/apk">
                <img src={require("../images/app-download/btn_android.png")}/>
            </a>
            <a href="https://itunes.apple.com/cn/app/jin-rong-gong-chang/id939125881?mt=8">
                <img src={require("../images/app-download/btn_ios.png")}/>
            </a>
            <div styleName="copyright">©2017 工场微金版权所有</div>
        </div>
    }
}

export default AppDownload
