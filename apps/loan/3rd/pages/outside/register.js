
import React from 'react'
import CSSModules from 'react-css-modules'

import { Components, Utils } from 'fw-javascripts'

import { Post } from '../../../lib/helpers'

import styles from '../../css/outside/register.css'

// fix viewport
import forceHotCSS from '../../../lib/helpers/force-hot-css.js'

forceHotCSS()


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Register extends React.Component {

    state = {
        phone: '',
        captcha: '',
        sms_code: '',
        invite_code: '',
        pwd: '',
        show_pwd: false,

        captcha_url: '',
        verifyToken: '',
        codeToken: '',

        sms_counting: 0,
        registered_mask: false
    }

    componentDidMount() {
        this.refreshCaptcha()
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }

    redirechHandler = data => {
        let { history } = this.props

        let dict = data.userLogin,
            jt = Utils.hashQuery().jumpType;

        if (jt == 'app') {
            history.push('/outside/show-app')
        } else if (jt == 'wx') {
            history.push('/outside/show-wx')
        } else if (jt == 'other_apps') {
            history.push('/outside/show-other-app')
        } else if (jt == 'to_home' && data != false) {
            // 如果传入参数 data 是 false , 则不跳转, 这可能是因为用户已经注册,
            // 且不能跳转到首页, 因为TA还没有登录

            $FW.Store.setUserDict({
                token: dict.userToken,
                id: dict.userId,
                gid: dict.userGid,
                status: dict.userStatus,
                invitCode: dict.invitationCode,
                uid: dict.uid
            })
            window.location.href = '/';

        }
    }

    changeHandler = field_name => e => {
        this.setState({ [field_name]: e.target.value })
    }

    emptyHandler = name => () => {
        this.setState((prevState, _) => ({ [name]: '' }))
    }

    refreshCaptcha = () => {
        Post('/api/userBase/v1/verifyNum.json')
            .then((data) => {
                this.setState({
                    captcha_url: data.url,
                    verifyToken: data.verifyToken
                })
            })
    }

    togglePassword = () => {
        this.setState({ show_pwd: !this.state.show_pwd })
    }

    startCounting = () => {
        this.setState({ sms_counting: 60 })

        this._timer = setInterval(() => {
            if (this.state.sms_counting <= 0) clearInterval(this._timer)
            this.setState({ sms_counting: this.state.sms_counting - 1 })
        }, 1000)
    }

    refreshSMSHandler = () => {
        if (!this.state.captcha)
            return Components.showToast('请输入图片验证码')

        if (this.state.sms_counting > 0)
            return Components.showToast('操作频繁, 请稍后再试')

        if (!/^1[3|4|5|7|8]\d{9}$/.test(this.state.phone))
            return Components.showToast('手机号格式不正确')

        Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: this.state.phone,
            userOperationType: 3,
            verifyToken: this.state.verifyToken,
            verifyCode: this.state.captcha
        }, { silence: true }).then((data) => {
            this.setState({ codeToken: data.codeToken }, this.startCounting)
        }, (e) => {

            if (e.code == 201003) {
                // 手机号已注册
                this.setState({ registered_mask: true })
            } else if (e.code == 20020) {
                Components.showToast(e.message || "图片验证码不正确")
                this.getCaptcha()
            } else {
                Components.showToast(e.message)
            }
        });
    }

    registerHandler = () => {
        let err, { phone, captcha, sms_code, pwd } = this.state

        if (pwd.length > 16) err = '密码不能大于16位'
        if (pwd.length < 8) err = '密码不能少于8位'
        if (/[^A-Za-z0-9]/.test(pwd)) err = "密码只能包含数字和字母"
        if (!pwd) err = '请输入密码'
        if (!sms_code) err = '请输入短信验证码'
        if (!captcha) err = '请输入图形验证码'
        if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) err = '手机号格式不正确'
        if (!phone) err = '请输入手机号'

        err ?
            Components.showToast(err) :
            Post('/api/userBase/v1/register.json', {
                channelCode: Utils.hashQuery.channelCode,
                extInvCode: Utils.hashQuery.extInvCode || '',
                codeToken: this.state.codeToken,
                invitationCode: this.state.invitationCode,
                mobile: phone,
                password: pwd,
                verifyCode: sms_code
            }).then(data => {
                this.redirechHandler(data)
            }, (e) => {
                if (e.code === 20010) this.setState({ sms_code: '' });
            })
    }

    render() {

        let {
            phone, captcha, sms_code, pwd, show_pwd,
            captcha_url, invite_code, sms_counting
        } = this.state

        let empty_btn = field_name => {
            if (!this.state[field_name]) return null;

            return <div styleName="btn-empty"
                onClick={this.emptyHandler(field_name)}>
            </div>
        }

        let MASK = () => {
            return <div styleName="mask">
                <div styleName="pop-wrap">
                    <p styleName="registered-tip">手机号已注册，请直接登录</p>
                    <img styleName="mask-close-icon" src={require("../../images/outside/register/close-icon.jpg")}
                        onClick={() => { this.setState({ registered_mask: false }) }}></img>
                    <div styleName="mask-opts">
                        <div styleName="mask-close" onClick={() => { this.setState({ registered_mask: false }) }}>关闭</div>
                        <a styleName="mask-to-next" href="/static/loan/account/index.html#/entry">立即登录</a>
                    </div>
                </div>
            </div>
        }

        return <div styleName="bg">
            <div styleName="form">
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-phone.png')} />
                    <input placeholder="请输入手机号" type="tel"
                        maxLength="11" value={phone}
                        onChange={this.changeHandler('phone')} />
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-code.png')} />
                    <input placeholder="请输入图片验证码" maxLength="6"
                        value={captcha}
                        onChange={this.changeHandler('captcha')}
                    />

                    <img styleName="captcha-img" onClick={this.refreshCaptcha} src={captcha_url} />
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-code.png')} />
                    <input placeholder="请输入短信验证码" maxLength="6"
                        onChange={this.changeHandler('sms_code')}
                        value={sms_code} />
                    <a styleName="sms-code" onClick={this.refreshSMSHandler}>
                        {sms_counting > 0 ? `${sms_counting}s` : '获取短信验证码'}
                    </a>
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-pwd.png')} />
                    <input placeholder="请输入密码，8-16位数字字母组合"
                        type={show_pwd ? "text" : "password"}
                        onChange={this.changeHandler('pwd')}
                        value={pwd} />
                    <div styleName="toggle-password" onClick={this.togglePassword}>
                        {show_pwd && <img styleName="toggle-password-img" src={require('../../images/outside/register/show-password.png')} />}
                        {!show_pwd && <img styleName="toggle-password-img" src={require('../../images/outside/register/hide-password.png')} />}
                    </div>
                </div>
                <div styleName="field">
                    <img styleName="icon"
                        src={require('../../images/outside/register/icon-invite.png')} />
                    <input placeholder="请输入邀请码" value={invite_code}
                        onChange={this.changeHandler('invite_code')}
                    />
                    <div styleName="veri-code-info">(选填)</div>
                </div>
                <a styleName="btn-register" onClick={this.registerHandler}>立即领钱</a>
            </div>
            <a styleName="btn-login" href="/static/loan/account/index.html#/entry">已有账号？立即登录 &gt;&gt;</a>

            {this.state.registered_mask && MASK()}
        </div>
    }
}

export default Register