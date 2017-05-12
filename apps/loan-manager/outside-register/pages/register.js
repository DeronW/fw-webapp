import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/register.css'
import { observer, inject } from 'mobx-react'

@inject('registerInfo', 'uiStores') @observer @CSSModules(styles)
export default class Register extends React.Component {

    render() {
        return (
            <div>
                <input
                    value={this.props.registerInfo.phone}
                    onChange={ this.handleChange('phone') }
                    placeholder="手机号" />
                <input
                    value={this.props.registerInfo.smsCode}
                    onChange={ this.handleChange('smsCode') }
                    placeholder="验证码" />
                <div
                    onClick={ () => {this.props.uiStores.getCode(this.props.registerInfo.phone)} } >
                    {this.props.uiStores.codeAvail ? "获取验证码" : this.props.uiStores.codeAvailAfter}
                </div>
                <input
                    value={this.props.registerInfo.password}
                    onChange={ this.handleChange('password') }
                    placeholder="密码" />
            </div>
        )
    }

    handleChange = (type) => (e) => {
        this.props.registerInfo.handleInput(type, e.target.value);
        this.props.uiStores.switchActiveType(type);
    }

}
