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

    componentDidMount() {
        document.title = '放心花'
    }

    toggleEye = () => {
        this.setState({ plaintext: !this.state.plaintext })
    }

    changeHandler = e => {
        if (e.target.value.length <= 16) {
            this.setState({ password: e.target.value })
        }
    }

    forgetHandler = () => {
        this.props.history.replace('/set-password')
    }

    keydownHandler = event => {
        if (event.keyCode == 13) {
            this.passwordInput && this.passwordInput.blur()
            this.submitHandler()
        }
    }

    submitHandler = () => {
        this.props.account.login(this.state.password)
    }

    render() {
        let { account, history } = this.props;
        let { password, plaintext } = this.state;

        return <div styleName="bg">
            <a styleName="btn-back" onClick={history.goBack}></a>
            <div styleName="title">登录</div>
            <img styleName="logo" src={require('../images/logo.png')} />
            <div styleName="welcome">
                亲爱的<span>{account.mask_phone}</span>欢迎登录
            </div>
            <div styleName="form">
                <i className="icon-lock" styleName="icon-lock"></i>
                <i className={plaintext ? 'icon-eye-open' : "icon-eye-close"}
                    styleName="icon-eye"
                    onClick={this.toggleEye}></i>
                <input styleName="input"
                    ref={input => this.passwordInput = input}
                    type={plaintext ? 'text' : 'password'}
                    value={password}
                    onChange={this.changeHandler}
                    onKeyDown={this.keydownHandler}
                    placeholder="请输入登录密码" />
                <div styleName="underline"></div>
            </div>
            <a styleName="btn-submit" onClick={this.submitHandler}>下一步</a>
            <a styleName="btn-forgot" onClick={this.forgetHandler}>忘记密码?</a>
        </div>
    }
}

export default Login