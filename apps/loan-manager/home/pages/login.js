import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/login.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import * as $FWC from 'fw-components'

@inject('account') @observer @CSSModules(styles)
export default class Login extends React.Component {

    static onEnter() {
        document.title = 'Login'
    }

    state = {
        phone: '',
        sms_code: '',
        loginSuccess: false
    }

    changeHandler = key => e => {
        this.setState({ [key]: e.target.value })
    }

    loginHandler = e => {
        e.preventDefault()

        let { account } = this.props;

        // account.login(this.state)
        //     .then()
        //     .catch(e => {
        //         console.log(e.message)
        //     })
$FWC.showAlert('fake login')
        console.log("fake login success")
        // this.setState({ loginSuccess: true })
    }

    render() {

        if (this.state.loginSuccess) {
            return <Redirect to={'/statis/register'} />
        }

        return <div>
            <img styleName="bg-logo" src={require('../images/login/logo.png')} />
            <div styleName="form">
                <input styleName="input"
                    value={this.state.phone}
                    placeholder="手机号码"
                    onChange={this.changeHandler('phone')} />
                <input styleName="input"
                    value={this.state.code}
                    placeholder="短信验证码"
                    onChange={this.changeHandler('sms_code')} />
            </div>
            <a styleName="btn-login" onClick={this.loginHandler}>
                登录
            </a>
        </div>
    }
}
