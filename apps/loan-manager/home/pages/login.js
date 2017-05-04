import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../less/login.less'
import { observer, inject } from 'mobx-react'

@inject('account') @observer @CSSModules(styles)
export default class Login extends React.Component {

    static onEnter() {
        document.title = 'Login'
    }

    state = {
        phone: '',
        sms_code: ''
    }

    changeHandler = key => e => {
        this.setState({ [key]: e.target.value })
    }

    loginHandler = e => {
        e.preventDefault()

        let { account } = this.props;
console.log(this.props)

        account.login(this.state)
            .then()
            .catch(e => {
                console.log(e.message)
            })
    }

    render() {

        return <div>
            <img className="global-logo" src={require('../images/login/logo.png')} />
            <div className="global-form" styleName="form">
                <input styleName="" value={this.state.phone}
                    onChange={this.changeHandler('phone')} />
                <input styleName="" value={this.state.code}
                    onChange={this.changeHandler('sms_code')} />
            </div>
            <a onClick={this.loginHandler}>
                Login
            </a>
        </div>
    }
}
