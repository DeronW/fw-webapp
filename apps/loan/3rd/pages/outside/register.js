
import React from 'react'
import CSSModules from 'react-css-modules'

import { Components, Utils } from 'fw-javascripts'

import { Post } from '../../../lib/helpers'

import styles from '../../css/outside/register.css'

// fix viewport
import forceHotCSS from '../../../lib/helpers/force-hot-css.js'

forceHotCSS()

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Register extends React.Component {

    state = {
        phone: '',
        captcha: '',
        sms_code: '',
        invite_code: '',
        pwd: '',

        captcha_url: '',
        verifyToken: ''
    }

    componentDidMount() {
        this.refreshCaptcha()
    }

    changeHandler = field_name => e => {
        this.setState({ [field_name]: e.target.value })
    }

    emptyHandler = name => () => {
        this.setState((prevState, _) => ({ [name]: '' }))
    }

    refreshCaptcha = () => {
        captcha_url
    }

    registerHandler = () => {
        let err

        err ? Components.showToast(err) : Post
    }

    render() {

        let { phone, captcha, sms_code, pwd, invite_code } = this.state

        let empty_btn = field_name => {
            if (!this.state[field_name]) return null;

            return <div styleName="btn-empty"
                onClick={this.emptyHandler(field_name)}>
            </div>
        }

        return <div styleName="bg">
            <div styleName="form">
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-phone.png')} />
                    <input placeholder="请输入手机号" type="tel"
                        maxLength="11" value={phone}
                        onChange={this.changeHandler('phone')} />
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-code.png')} />
                    <input placeholder="请输入图片验证码" maxLength="6"
                        value={captcha}
                        onChange={this.changeHandler('captcha')}
                    />
                    <img onClick={this.refreshCaptcha} />
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-code.png')} />
                    <input placeholder="请输入短信验证码" type="number" maxLength="11"
                        onChange={this.changeHandler('sms_code')}
                        value={sms_code} />
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-pwd.png')} />
                    <input placeholder="请输入密码，8-16位数字字母组合"
                        type="password"
                        onChange={this.changeHandler('pwd')}
                        value={pwd} />
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-invite.png')} />
                    <input placeholder="请输入邀请码" value={invite_code}
                        onChange={this.changeHandler('invite_code')}
                    />
                </div>
                <a styleName="btn-register" onClick={this.registerHandler}>立即领钱</a>
            </div>
            <a styleName="btn-login" href="/static/loan/account/index.html#/entry">已有账号？立即登录 &gt;&gt;</a>
        </div>
    }
}

export default Register