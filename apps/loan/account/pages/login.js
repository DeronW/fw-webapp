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

        return <div>
            <a styleName="btn-back"></a>
            <div styleName="title">登录</div>
            <img styleName="logo" src={require('../images/logo.png')} />
            <div styleName="welcome">亲爱的
                <span>{account.phone.replace(/\d{3}\d{4}\d{3}/, '$1***$3')}</span>
                欢迎登录
            </div>
            <div styleName="form">
                <i styleName="icon-lock"></i>
                <i styleName={plaintext ? 'icon-eye-open' : "icon-eye-close"}
                    onClick={this.toggleEye}></i>
                <input styleName="input" type={plaintext ? 'text' : 'password'}
                    value={password}
                    onChange={this.changeHandler}
                    placeholder="请输入登录密码" />
                <div styleName="underline"></div>
            </div>
            <a styleName="btn-submit" onClick={
                () => this.submitHandler(phone, history)}>下一步</a>

            <a styleName="btn-forgot">忘记密码?</a>
        </div>
    }
}

export default Login