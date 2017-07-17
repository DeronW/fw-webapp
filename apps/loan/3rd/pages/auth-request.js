import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/auth-request.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AuthFail extends React.Component {

    state = {
        captchaImgUrl: require("../images/auth-request/captcha-img-holder.png"),
        smsBtnText: '获取验证码'
    }

    render() {
        let { history } = this.props;
        return (
            <div>
                <Header title="授权" history={history} />
                <div styleName="auth-info">请授权
                    <span styleName="auth-phone"></span>
                    登录放心花
                </div>
                <div>
                    <div styleName="cooperation-logo-container">
                        <i styleName="third-party-logo"></i>
                        <i styleName="fxh-logo"></i>
                    </div>
                    <div styleName="input-field-grp">
                        <div styleName="input-field">
                            <i styleName="captcha-icon"></i>
                            <input styleName="captcha-input" />
                            <div styleName="captcha-img-container">
                                <img src={this.state.captchaImgUrl} />
                            </div>
                        </div>
                        <div styleName="input-field">
                            <i styleName="sms-icon"></i>
                            <input styleName="sms-input" />
                            <div styleName="sms-btn">{this.state.smsBtnText}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthFail
