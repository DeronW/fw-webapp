
import React from 'react'
import CSSModules from 'react-css-modules'

import { Utils } from 'fw-javascripts'

import { Post } from '../../../lib/helpers'

import styles from '../../css/outside/show-app.css'

// fix viewport
import forceHotCSS from '../../../lib/helpers/force-hot-css.js'

forceHotCSS()

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class ShowApp extends React.Component {
    launchDownload(e) {
        var deviceType = e.target.id;

        switch (deviceType) {
            case 'ios':
                location.href = 'https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8';
                break;
            case 'android':
                var channel = Utils.hashQuery.name;
                Post(`/api/v1/download.json?name=${channel}`).then(data => {
                    location.href = data.url
                });
                break;
            default:
                break;
        }
    }

    render() {
        return <div styleName="bg">
            <div styleName="success-info">
                <h3>恭喜您！注册成功</h3>
                <p>还差一步就可以领钱啦</p>
            </div>

            <img styleName="gift" src={require("../../images/outside/show-app/gift.png")} />

            <div styleName="btns" onClick={this.launchDownload}>
                <div id="ios">
                    <img src={require("../../images/outside/show-app/ios-icon.png")} />
                    iOS版下载
                        </div>
                <div id="android">
                    <img src={require("../../images/outside/show-app/android-icon.png")} />
                    Android版下载
                        </div>
            </div>
        </div>
    }
}


export default ShowApp