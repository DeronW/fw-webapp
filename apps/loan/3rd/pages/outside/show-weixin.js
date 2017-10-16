
import React from 'react'
import CSSModules from 'react-css-modules'

import { Utils } from 'fw-javascripts'

import { Post } from '../../../lib/helpers'

import styles from '../../css/outside/show-weixin.css'

// fix viewport
import forceHotCSS from '../../../lib/helpers/force-hot-css.js'

forceHotCSS()

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class ShowWeixin extends React.Component {
    render() {
        return <div styleName="bg">
            <div styleName="success-info">
                <h3>恭喜您！注册成功</h3>
                <p>还差一步就可以领钱啦</p>
            </div>

            <img styleName="gift" src={require("../../images/outside/show-weixin/qrcode.png")} />

            <div styleName="text-big">微信号：fxhuaba</div>
            <div styleName="text-small">长按上方二维码图片</div>
            <div styleName="text-small">关注放心花微信号</div>

        </div>
    }
}


export default ShowWeixin