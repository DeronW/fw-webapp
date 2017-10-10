import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../../lib/components'
import styles from '../../css/mortgage/download.css'

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Download extends React.Component {
    render() {
        return <div styleName="bg">
            <Header title="放心花" history={this.props.history} />
            <div styleName="download-wrap">
                <div styleName="text-area">审核专员预计在1个工作日内联系您</div>
                <div styleName="qr-img">
                    <img src={require("../../images/mortgage/download/qr.png")} /></div>
                <div styleName="download-area">
                    <div styleName="text">关注服务号或下载APP借款更方便</div>
                    <div styleName="btn-area">
                        <div styleName="btn android-btn">
                            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ucf.jrgc.cfinance">
                                <img src={require("../../images/mortgage/download/android-icon.png")} />
                                Android版下载
                            </a>

                        </div>
                        <div styleName="btn apple-btn">
                            <a href="https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8">
                                <img src={require("../../images/mortgage/download/apple-icon.png")} />
                                iOS版下载
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Download
