import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Components, Utils } from 'fw-javascripts'

import { Header } from '../../lib/components'

import styles from '../css/set-password.css'

@inject('account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class SetPassword extends React.Component {

    constructor(props) {
        super(props)
        let { account } = this.props

        this.state = {
            // 当前页面可能是, 设置密码和重置密码 两种状态, 输入框不同, 提交数据不同
            reset_pwd: account.userCode == 10000 || account.userCode == 201003,
            agree: true,
            plaintext: false,
            password: '',
            sms_code: '',
            invite_code: '',
            captcha: '',
            count: 0
        }
    }


    toggleEye = () => {
        this.setState({ plaintext: !this.state.plaintext })
    }

    agreeHandler = () => {
        this.setState({ agree: !this.state.agree })
    }

    componentDidMount() {
        let { account } = this.props;
        this.state.reset_pwd ? document.title = '设置新密码' : document.title = '设置密码'
        account.get_captcha();
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }

    startCounting = () => {
        this.setState({ count: 60 })
        this._timer = setInterval(() => {
            if (this.state.count <= 1) clearInterval(this._timer)
            this.setState({ count: this.state.count - 1 })
        }, 1000)
    }

    getSMSCode = () => {
        //let userOperationType = this.state.reset_pwd ? 2 : 3;
        let { account } = this.props;
        let { captcha } = this.state;

        if (!this.state.captcha) {
            Components.showToast('请输入图片验证码');
        } else {
            this.props.account.send_sms_code(captcha).then(() => {
                this.startCounting()
            }, e => {
                Components.showToast(e.message)
                clearInterval(this._timer)
                if (e.code == 20020) {
                    account.get_captcha();
                }
            });
        }
    }

    inputSMSCodeHandler = e => {
        if (e.target.value.length <= 6) {
            this.setState({ sms_code: e.target.value })
        }
    }

    inputPwdHandler = e => {
        let v = e.target.value.substr(0, 16)
        this.setState({ password: v })
    }

    inviteCodeHandler = e => {
        this.setState({ invite_code: e.target.value })
    }

    captchaHandler = e => {
        this.setState({ captcha: e.target.value })
    }

    reGetCaptcha = () => {
        let { account } = this.props;
        account.get_captcha();
    }

    submitHandler = () => {
        let { account } = this.props;
        let { password, sms_code, invite_code, agree, reset_pwd, captcha } = this.state;

        let err;

        if (!password.match(/\d/) || !password.match(/[^\d]/))
            err = "密码必须是字母和数字组合";
        if (password.length > 16) err = "密码不能多于16位";
        if (!agree) err = '您还未同意注册协议'
        if (password.length < 8) err = "密码不能少于8位";
        if (!password) err = '请填写密码';
        if (!sms_code) err = '请填写手机验证码';
        if (!captcha) err = '请输入图片验证码';

        if (err) return Components.showToast(err);

        if (reset_pwd) {
            account.reset_password(password, sms_code, captcha, history)
        } else {
            account.register(password, sms_code, invite_code, captcha, history)
        }
    }

    render() {
        let { history, account } = this.props
        let { plaintext, agree, count, sms_code,
            password, invite_code, captcha, reset_pwd } = this.state

        let invite_code_line = !reset_pwd && <div styleName="field-input">
            <i className="icon-people" styleName="icon-people"></i>
            <input placeholder="请输入邀请码" styleName="pwd-input" value={invite_code} onChange={this.inviteCodeHandler} />
            <span styleName="xuan-tian">(选填)</span>
        </div>

        let agree_line = !reset_pwd && <div styleName="protocol">
            <i styleName={agree ? 'checked-btn' : "check-btn"}
                onClick={this.agreeHandler}></i>
            同意 <a href="/static/loan/products/index.html#/protocols/register">《放心花用户注册协议》</a>
        </div>

        return <div>
            <Header title={this.state.reset_pwd ? '设置新密码' : '设置密码'} history={history} />

            {/*<div styleName="send-tips">已发送短信验证码到尾号为*/}
            {/*<span>{account.mask_phone}</span>的手机</div>*/}
            <div styleName="space-wrap"></div>
            <div styleName="field-input">
                <i className="icon-lock" styleName="icon-lock"></i>
                <input placeholder="请输入图片验证码" value={captcha} styleName="pwd-input"
                    type="text"
                    onChange={this.captchaHandler} maxLength="4" />
                <i styleName="captcha-img" onClick={this.reGetCaptcha}><img src={account.captcha_img_url} /></i>
                <div styleName="v-line"></div>
            </div>
            <div styleName="field-input">
                <i className="icon-phone" styleName="icon-phone"></i>
                <input placeholder="输入手机验证码" value={sms_code} styleName="pwd-input"
                    onChange={this.inputSMSCodeHandler} />
                <a styleName="btn-verify-code" onClick={this.getSMSCode}>
                    {count ? `${count}s` : '获取验证码'}</a>
                <div styleName="v-line"></div>
            </div>
            <div styleName="field-input">
                <i className="icon-lock" styleName="icon-lock"></i>
                <input placeholder="设置8-16位的字母及数字组合密码" value={password} styleName="pwd-input"
                    type={plaintext ? 'text' : 'password'}
                    onChange={this.inputPwdHandler} />
                <i className={plaintext ? "icon-eye-open" : "icon-eye-close"}
                    onClick={this.toggleEye}
                    styleName="icon-eye"></i>

                {!reset_pwd && <div styleName="v-line"></div>}
            </div>

            {invite_code_line}
            {agree_line}

            <a styleName="btn-submit" onClick={this.submitHandler}>确定</a>
        </div>
    }
}

export default SetPassword