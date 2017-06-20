import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import styles from '../css/login.css'

@inject('account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Login extends React.Component {

    state = {
        plaintext: false,
        password: ''
    }

    toggleEye = () => {
        this.setState({ plaintext: !this.state.plaintext })
    }

    changeHandler = e => {
        this.setState({ password: e.target.value })
    }

    render() {
        let { account, history } = this.props;
        let { password, plaintext } = this.state;

        return <div styleName="bg">
            <a styleName="btn-back" onClick={history.goBack}></a>
            <div styleName="title">登录</div>
            <img styleName="logo" src={require('../images/logo.png')} />
            <div styleName="welcome">亲爱的
                <span>{account.mask_phone}</span>
                欢迎登录
            </div>
            <div styleName="form">
                <i className="icon-lock" styleName="icon-lock"></i>
                <i className={plaintext ? 'icon-eye-open' : "icon-eye-close"}
                    styleName="icon-eye"
                    onClick={this.toggleEye}></i>
                <input styleName="input" type={plaintext ? 'text' : 'password'}
                    value={password}
                    onChange={this.changeHandler}
                    placeholder="请输入登录密码" />
                <div styleName="underline"></div>
            </div>
            <a styleName="btn-submit" onClick={
                () => account.login(password, history)}>下一步</a>

            <a styleName="btn-forgot"
                onClick={() => account.forget_password(history)}>
                忘记密码?</a>
        </div>
    }
}

export default Login