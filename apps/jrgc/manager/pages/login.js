import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { showToast } from 'fw-components';
import { Post } from '../helpers'

import { Header } from '../components'
import styles from '../css/login.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    changeHandler = name => e => {
        this.setState({ [name]: e.target.value })
    }
    submitHandler = () => {
        let { username, password } = this.state
        let { history } = this.props
        if (!username) showToast("用户名不能为空")
        if (!password) showToast("密码不能为空")
        console.log(encodeURIComponent(password))
        Post('/finManager/user/login.shtml', {
            username: username,
            pwd: encodeURIComponent(password),
            sourceType: 3
        }).then(() => {
            history.push('/')
        })
    }
    render() {
        let { history } = this.props
        let { username, password } = this.state

        return <div styleName="bg">
            <div styleName="bgUp"></div>
            <img styleName="logo" src={require('../images/login/logo.png')}/>
            <div styleName="remind">请使用金融工场账户登录</div>
            <div styleName="username">
                <i></i>
                <input
                    placeholder="手机号/用户名"
                    value={username}
                    onChange={this.changeHandler('username')} />
            </div>
            <div styleName="password">
                <i></i>
                <input
                    type="password"
                    maxLength="16"
                    placeholder="登录密码"
                    value={password}
                    onChange={this.changeHandler('password')} />
            </div>
            <div styleName="bgDown"></div>
            <div styleName="submit" onClick={this.submitHandler}>登录</div>
        </div>
    }
}
export default Login