import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { showToast } from 'fw-components';

import { Header } from '../components'
import styles from '../css/login.css'

@inject("login")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    changeName = e => {
        this.setState({ username: e.target.value })
    }

    changePwd = e => {
        if (e.target.value.length <= 16) {
            this.setState({ password: e.target.value })
        }
    }
    submitHandler = () => {
        let { username, password } = this.state
        let { history } = this.props
        if(!username) showToast("用户名不能为空")
        if(!password) showToast("密码不能为空")

        this.props.login.login(username,password).then(()=>{
            history.push('/')
        })
    }
    render() {
        let { history, login } = this.props
        let { username, password } = this.state

        return <div styleName="bg">
            <Header title="登录" history={history} />
            <div styleName="username">
                <i></i>
                <input
                    placeholder="用户名/邮箱/手机号"
                    value={username}
                    onChange={this.changeName} />
            </div>
            <div styleName="password">
                <i></i>
                <input
                    type="password"
                    placeholder="登录密码"
                    value={password}
                    onChange={this.changePwd}/>
            </div>
            <div styleName="submit" onClick={this.submitHandler}>登录</div>
        </div>
    }
}
export default Login