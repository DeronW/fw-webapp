import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/login.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import Nav from './components/nav'


function istrue(str) {
    var reg = /^([a-z]+(?=[0-9])|[0-9]+(?=[a-z]))[a-z0-9]+$/ig;

    return reg.test(str);
}

let ConcertUtilBrowser = {
    versions: (function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return {
            weixin: ua.match(/MicroMessenger/i) == 'micromessenger'
        };
    })()
}


@inject('account') @observer @CSSModules(styles)
class Login extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            plainCode: false,
            redirect: ''
        }
    }

    changePasswordHandler = (e) => {
        let v = e.target.value;
        v.length < 17 && this.setState({ password: v });
    }

    handlePlainCode = () => {
        this.setState({ plainCode: !this.state.plainCode });
    }

    loadingBtn = () => {
        let err, {password} = this.state;
        if (password == '') err = "请输入登录密码";
        if (password.length < 8) err = "密码不能少于8位";
        if (password.length > 16) err = "密码不能多于16位";
        //if (!istrue(password)) err = "必须是字母及数字组合密码";

        if (err) return $FW.Component.Toast(err);

        this.props.account.login(password)
            .then((data) => {
                this.setState({ redirect: this.props.account.nextPage })
            })
    }

    forgotPasswordHandler = () => {
        $FW.Post(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
            mobile: PHONE,
            userOperationType: 2,
            sourceType: SOURCE_TYPE
        }).then(data => {
            location.href = `/static/loan/user-reset-password/index.html?phone=${PHONE}&codeToken=${data.codeToken}`;
        }, err => $FW.Component.Toast(err.message));
    }

    keyUpHandler = (e) => {
        if (e.keyCode === 13) this.loadingBtn()
    }

    render() {

        let {plainCode} = this.state;

        return (
            this.state.redirect ?
            <Redirect to={this.state.redirect} /> :
            <div styleName="fake-body">
                <div styleName="login-cnt">
                    {
                        ConcertUtilBrowser.versions.weixin ? <div styleName="top"></div> :
                            <div styleName="top">
                                <a styleName="icon" href={`/static/loan/user-entry/index.html`}></a>
                                <span styleName="title">登录</span>
                            </div>
                    }
                    <div styleName="logo"> <img src={require('../images/login/logo.png')} /> </div>
                    <div styleName="get-name-phone">
                        亲爱的<span styleName="phone-text">  { this.props.account.maskedPhone }  </span>欢迎登录
                    </div>

                    <div styleName="from-cnt">
                        <div styleName="from">
                            <div styleName="icon"></div>
                            <div styleName="input">
                                <input type={plainCode ? "text" : "password"} value={this.state.password}
                                       placeholder="请输入登录密码" onKeyUp={this.keyUpHandler} onChange={this.changePasswordHandler} />
                            </div>

                            <div styleName={this.state.plainCode ? "pwd-icon1" : "pwd-icon"} onClick={this.handlePlainCode}>
                            </div>
                        </div>
                        <div styleName="form-border"></div>
                    </div>
                    <div styleName="register-login-btn">
                        <Nav styleName="ui-btn" onClick={this.loadingBtn}>确定</Nav>
                    </div>
                    <div styleName="forget-pwd-link">
                        <a onClick={this.forgotPasswordHandler}> 忘记密码?</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login
