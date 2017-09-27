import React from 'react'
import CSSModules from 'react-css-modules'
import { Utils } from 'fw-javascripts'

import { Header } from '../../lib/components'
import { NativeBridge, Browser, Post } from '../../lib/helpers'

import styles from '../css/download.css'

@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
class Download extends React.Component {

    state = {
        android: ''
    }

    componentDidMount() {
        this.try_to_open_app_directly()

        if (Browser.inWeixin) {
            this.setState({
                android: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ucf.jrgc.cfinance'
            })
        } else if (Browser.inAndroid) {
            let name = Utils.urlQuery.name || Utils.hashQuery.name

            Post('/api/v1/download.json', { name: name })
                .then(data => {
                    this.setState({ android: data.url })
                })
        }
    }


    try_to_open_app_directly() {

        let appendIframe = src => {
            let iframe;
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = src;
            document.body.appendChild(iframe)
        }

        let q = Utils.hashQuery

        if (q.view) {

            let params = '?view=' + q.view
            if (q.id) params += '&id=' + id
            if (q.url) params += '&url=' + url

            try {
                appendIframe('jrgc://jrgc.com/openApp' + params)
                setTimeout(function () {
                    location.href = 'jrgc://jrgc.com/openApp' + params
                }, 300)
            } catch (e) { }
        }
    }

    render() {

        let { history } = this.props
        let goBack = () => {
            Browser.inApp ? NativeBridge.close() : history.goBack()
        }

        return <div styleName="bg">
            {!Browser.inFXHApp && <Header title="关注下载" goBack={goBack} />}

            <img styleName={Browser.inWeixin ? "qr-weixin-img" : "qr-img"} src={require("../images/download/qr.jpg")} />

            <div styleName="tip">关注放心花微信公众号或使用APP可获得更高借款额度，且随时查看还款计划</div>

            <a styleName="download-btn" href="https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8">
                <img src={require("../images/download/ios-icon.png")} />iOS客户端下载</a>
            <a styleName="download-btn" href={this.state.android}>
                <img src={require("../images/download/android-icon.png")} />Android客户端下载</a>
        </div>
    }
}

export default Download
