import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import styles from '../css/entry.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Entry extends React.Component {


    render() {
        return <div>
            <div styleName="title">放心花</div>
            <img styleName="logo" src={require('../images/logo.png')} />
            <div styleName="form">
                <i styleName="icon-phone"></i>
                <i styleName="icon-clear"></i>
                <input styleName="input" placeholder="请输入手机号进行注册" />
                <div styleName="underline"></div>
            </div>
            <a styleName="btn-submit">下一步</a>
        </div>
    }
}

export default Entry