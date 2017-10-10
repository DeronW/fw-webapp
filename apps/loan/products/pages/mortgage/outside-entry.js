import React from 'react'
import CSSModules from 'react-css-modules'

import { Components, Utils } from 'fw-javascripts'

import { Header } from '../../../lib/components'
import { Post } from '../../../lib/helpers'

import styles from '../../css/mortgage/outside-entry.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OutsideEntry extends React.Component {

    state = {
        phone: '',
        captchaImgUrl: '',
        captchaToken: '',
        captchaInput: '',
        getSMSTimer: 60,
        SMSToken: '',
        SMSInput: '',
    }

    componentDidMount() {
        this.getCaptcha();
    }

    componentWillUnmount() {
        if (this._timer) clearInterval(this._timer);
    }

    isPhoneValid = () => /^1(3|4|5|7|8)\d{9}$/.test(this.state.phone)

    getCaptcha = () => {
        Post('/api/userBase/v1/verifyNum.json').then(data => {
            this.setState({
                captchaImgUrl: data.url,
                captchaToken: data.verifyToken
            })
        })
    }

    handleInput = (inputType) => (e) => {
        this.setState({ [inputType]: e.target.value })
    }

    SMSTimerController = () => {
        this._timer = setInterval(() => {
            if (this.state.getSMSTimer <= 1) {
                clearInterval(this._timer);
                return this.setState({ getSMSTimer: 60 })
            }
            this.setState({ getSMSTimer: this.state.getSMSTimer - 1 })
        }, 1000)
    }

    getSMS = () => {
        if (!this.state.phone) return Components.showToast('手机号不能为空')
        if (!this.isPhoneValid()) return Components.showToast('手机号格式不正确')
        if (!this.state.captchaInput) return Components.showToast('请输入图形验证码')

        let { phone, getSMSTimer, captchaToken, captchaInput } = this.state;

        let ableToGetSMS = getSMSTimer === 60;
        if (!ableToGetSMS) return

        Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: phone,
            userOperationType: 3,
            sourceType: 5,
            verifyToken: captchaToken,
            verifyCode: captchaInput
        }, 'silence').then((data) => {
            Components.showToast('验证码已发送');
            this.setState({ SMSToken: data.codeToken });
            this.SMSTimerController();
        }, e => {
            if (e.code == 201003) {
                Components.showToast('手机号已注册');
                setTimeout(() => this.props.history.push('/mortgage/download'), 1700)
            }
            if (e.code == 20020) {
                Components.showToast('图形验证码不正确');
                this.getCaptcha();
            }
        })
    }

    register = () => {
        let { phone, SMSToken, SMSInput } = this.state;
        if (!(phone && SMSInput)) return

        if (!this.isPhoneValid()) return Components.showToast('手机号格式不正确')

        let { history } = this.props;
        Post('/api/userBase/v1/register.json', {
            mobile: phone,
            codeToken: SMSToken,
            verifyCode: SMSInput,
            channelCode: Utils.hashQuery.channelCode || 'OFFICIAL',
            sourceType: 5
        }).then(data => {
            history.push(`/mortgage/outside-apply?uid=${data.userLogin.uid}&token=${data.userLogin.userToken}&phone=${this.state.phone}`);
        }, e => {
            Components.showToast(e.message);
        })
    }

    render() {
        let { history } = this.props;
        let { phone, getSMSTimer, captchaImgUrl, captchaInput, SMSInput } = this.state,
            allFieldsFilled = phone && captchaInput && SMSInput;

        return (
            <div>
                <Header noBack title="放心花" history={history} />

                <div styleName="cnt-container">
                    <div styleName="input-item phone-input">
                        <i styleName="item-icon"></i>
                        <input maxLength="11" type="tel"
                            value={phone}
                            placeholder="请输入手机号"
                            onChange={this.handleInput('phone')}/>
                    </div>

                    <div styleName="input-item captcha-input">
                        <i styleName="item-icon"></i>
                        <input maxLength="4"
                            value={captchaInput}
                            placeholder="请输入图形验证码"
                            onChange={this.handleInput('captchaInput')}/>
                        <div styleName="captcha-img-container" onClick={this.getCaptcha}>
                            <img src={captchaImgUrl} />
                        </div>
                    </div>

                    <div styleName="input-item sms-input">
                        <i styleName="item-icon"></i>
                        <input maxLength="6" type="number"
                            value={SMSInput}
                            placeholder="请输入短信验证码"
                            onChange={this.handleInput('SMSInput')} />
                        <div styleName="sms-btn" onClick={this.getSMS}>
                            {getSMSTimer === 60 ? "获取验证码": `${getSMSTimer}s`}
                        </div>
                    </div>

                    <a styleName="register-btn"
                        style={{ 'background': allFieldsFilled ? '#f26052' : '#1e8570', 'color': allFieldsFilled ? '#fff' : '#0d5c4c'}}
                        onClick={this.register}>申请千万贷款</a>
                </div>
            </div>
        )
    }
}

export default OutsideEntry
