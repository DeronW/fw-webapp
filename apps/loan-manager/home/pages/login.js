import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../less/login.less'
import { observer, inject } from 'mobx-react'

@inject('account') @observer
class Login extends React.Component {

    static onEnter() {

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
        let { user } = this.props;
        user.login(this.state)
            .then()
            .catch(e => {
                console.log(e.message)
            })
    }

    render() {

        return <div>
            <img styleName="bg-logo" src={require('../images/login/logo.png')} />
            <div styleName="form">
                <input styleName="input" value={this.state.phone}
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

export default CSSModules(Login, styles)

