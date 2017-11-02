import React from 'react'
import CSSModules from 'react-css-modules'

import { showToast } from 'fw-components'

import { Header } from '../components'

import styles from '../css/login.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Login extends React.Component {

    _timer = null

    state = {
        phone: '',
        sms: '',
        smsTimer: 60,
        agreementChecked: true,
    }

    componentDidMount() {
        const body = document.querySelector('body');

        body.style.backgroundColor = '#fff';
        body.addEventListener('touchmove', e => e.preventDefault(), false)

        if (this._timer) clearInterval(this._timer)
    }

    componentWillUnmount() {
        const body = document.querySelector('body');

        body.style.backgroundColor = '';
    }

    toggleAgreementCheck = () => this.setState({ agreementChecked: !this.state.agreementChecked })

    handleSmsSend = () => {

        if ( this.state.smsTimer < 60) return

        // request

        this._timer = setInterval(() => {
            const { smsTimer } = this.state;

            if (smsTimer === 1) {
                clearInterval(this._timer);
                return this.setState({ smsTimer: 60 })
            }

            this.setState({ smsTimer: smsTimer - 1 })
        }, 1000)
    }

    handleInputChange = type => e => {
        this.setState({ [type]: e.target.value })
    }

    validator = () => {
        const { phone, sms, agreementChecked } = this.state;
        if (phone === '') return showToast('请输入手机号')
        if (sms === '') return showToast('请输入验证码')
        if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) return showToast('手机号格式不正确')
        if (!agreementChecked) return showToast('请同意现金大师注册服务协议')
    }

    handleSubmit = () => {
        this.validator();
        // request
    }

    render() {
        const { agreementChecked, smsTimer, phone, sms } = this.state;

        return <div styleName="container">

            <Header title="登录" history={this.props.history} />

            <div styleName="logo"></div>

            <div styleName="input-item">
                <i styleName="input-icon-phone"></i>
                <input type="tel" placeholder="请输入手机号" value={phone}
                    onChange={this.handleInputChange('phone')} />
            </div>

            <div styleName="input-item">
                <i styleName="input-icon-sms"></i>
                <input placeholder="请输入验证码" value={sms}
                    onChange={this.handleInputChange('sms')} />
                <div styleName="sms-info" onClick={this.handleSmsSend}>
                    {smsTimer === 60 ? '获取验证码' : `${smsTimer}s`}
                </div>
            </div>

            <div styleName="submit-btn" onClick={this.handleSubmit}>下一步</div>

            <div styleName="agreement">
                <i styleName={agreementChecked ? "checked" : "unchecked"}
                    onClick={this.toggleAgreementCheck} />
                同意<span>《现金大师注册服务协议》</span>
            </div>

            <div styleName="service-time">周一至周日8:30-21:00     400-0322-988</div>
        </div>
    }
}

export default Login