import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/user-entry.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import Nav from './components/nav'


let isMobilePhone = phone => /^1(3|4|5|7|8)\d{9}$/.test(phone)

let verificationNum = val => /^[0-9]*$/.test(val)


@observer @CSSModules(styles)
class Register extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            phone: '',
            deleteShow: false
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

        $FW.Post(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
            mobile: phone,
            userOperationType: 3,
            sourceType: SOURCE_TYPE
        }).then(data => {
            //$FW.Store.set('phone', phone);
            if(data.codeType == 1){
                // location.href = `/static/loan/user-set-password/index.html?codeToken=${data.codeToken}&phone=${phone}`;
            }else if(data.codeType == 2){
                // location.href = `/static/loan/user-reset-password/index.html?codeToken=${data.codeToken}&phone=${phone}`;
            }
        }, res => {
            if (res.code === 201003) {
                //$FW.Store.set('phone', phone);
                // location.href = `/static/loan/user-login/index.html?phone=${phone}`;
            } else {
                // $FW.Component.Toast(res.message)
            }
        })
    }

    keyUpHandler = (e) => {
        if (e.keyCode === 13) this.handleGetCode()
    }

    render() {
        return (
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
                                <div styleName="pwd-icon"> </div>
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

export default Register
