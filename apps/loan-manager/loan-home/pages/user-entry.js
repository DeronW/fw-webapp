import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/user-entry.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import Nav from './components/nav'


let isMobilePhone = phone => /^1(3|4|5|7|8)\d{9}$/.test(phone)

let verificationNum = val => /^[0-9]*$/.test(val)


@inject('account') @observer @CSSModules(styles)
class UserEntry extends React.Component{

    constructor() {
        super();
        this.state = {
            phone: '',
            deleteShow: false,
            redirect: ''
        }
    }

    changeHandler = (e) => {
        let v = e.target.value;

        if (e.target.value.length > 11) {
            this.setState({
                phone: this.state.phone,
                deleteShow: true
            });
        } else if (verificationNum(v)) {
            this.setState({
                phone: v,
                deleteShow: true
            })
        }
    }

    clearHandler = () => {
        this.setState({ phone: '' })
    }

    handleGetCode = () => {
        let phone = this.state.phone;

        if (!isMobilePhone(phone)) {
            // $FW.Component.Toast("手机号格式不对");
            return;
        }

        this.props.account.getVeriCode(this.state.phone)
            .then(data => {
                this.props.account.setPhone(this.state.phone);
                if (data.codeType == 1) this.setState({ redirect: '/register' })
                if (data.codeType == 2) this.setState({ redirect: '/forget-password' })
            }, e => {
                if (e.code == 201003) {
                    this.props.account.setPhone(this.state.phone);
                    this.setState({ redirect: '/login' })
                } else {
                    // $FW.Component.Toast(e.message)
                }
            })
    }

    keyUpHandler = (e) => {
        if (e.keyCode === 13) this.handleGetCode()
    }

    render() {
        return (
            this.state.redirect ?
            <Redirect to={this.state.redirect} /> :
            <div styleName="fake-body">
                <div styleName="register-login-cnt">
                    <div styleName="top">
                        <span styleName="title">放心花</span>
                    </div>
                    <div styleName="logo"> <img src={require('../images/user-entry/logo.png')} /> </div>
                    <div styleName="register-login-cnt">
                        <div styleName="from-cnt">
                            <div styleName="from">
                                <div styleName="icon"></div>
                                <div styleName="input">
                                    <input type="text" value={this.state.phone}
                                           onChange={this.changeHandler} onKeyUp={this.keyUpHandler}
                                           placeholder="请输入手机号进行注册登录" />
                                    {this.state.deleteShow &&
                                    <span styleName="clear-num" onClick={this.clearHandler}></span>}
                                </div>
                            </div>
                            <div styleName="form-border"></div>
                        </div>
                    </div>
                    <div styleName="register-login-btn">
                        <Nav styleName="ui-btn" onClick={this.handleGetCode}>下一步</Nav>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserEntry
