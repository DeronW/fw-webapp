import React from 'react'
import CSSModules from 'react-css-modules'

import { Components, Utils } from 'fw-javascripts'

import { Header, Captcha } from '../../lib/components'
import { Post } from '../../lib/helpers'

import styles from '../css/auth-request.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AuthRequest extends React.Component {

    state = {
        phone: '',
        captchaTimeStamp: Date.now(),
        captchaToken: '',
        captchaInput: '',
        getSMSTimer: 60,
        SMSToken: '',
        SMSInput: '',
    }

    componentDidMount() {
        this.setState({ phone: Utils.hashQuery.phone })
    }

    get maskedPhone() {
        return this.state.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }

    handleSMSInput = (e) => {
        this.setState({ SMSInput: e.target.value })
    }

    captchaInputHandler = (input, token) => {
        this.setState({ captchaInput: input, captchaToken: token})
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
        let { phone, getSMSTimer, captchaToken, captchaInput } = this.state;
        if (!captchaInput) return Components.showToast('请输入图形验证码');

        let ableToGetSMS = getSMSTimer === 60;
        if (!ableToGetSMS) return

        return Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: phone,
            userOperationType: 3,
            verifyToken: captchaToken,
            verifyCode: captchaInput
        }, 'silence').then((data) => {
            this.setState({ SMSToken: data.codeToken });
            this.SMSTimerController();
        }, e => {
            if (e.code == 20020) {
                Components.showToast('图形验证码不正确');
                this.setState({ captchaTimeStamp: Date.now() });
            }
        })
    }

    submitAuthRequest = () => {
        // return Post('/api/userBase/v1/blabla.json', {
        //     mobile: phone,
        //     verifyToken: captchaToken,
        //     verifyCode: captchaInput
        // }, 'silence').then((data) => {
        //     this.setState({ SMSToken: data.codeToken });
        //     this.SMSTimerController();
        // }, e => {})
    }

    render() {
        let { history } = this.props;
        let { getSMSTimer, captchaImgUrl, captchaInput, SMSInput } = this.state;
        return (
            <div>
                <Header title="授权" history={history} />

                <div styleName="auth-info">请授权
                    <span styleName="auth-phone">{this.maskedPhone}</span>
                    登录放心花
                </div>

                <div>
                    <div styleName="cooperation-logo-container">
                        <i styleName="third-party-logo"></i>
                        <i styleName="fxh-logo"></i>
                    </div>

                    <div styleName="input-field-grp">

                        <Captcha changeHandler={this.captchaInputHandler} timeStamp={this.state.captchaTimeStamp} />

                        <div styleName="input-field">
                            <i styleName="sms-icon"></i>
                            <input styleName="sms-input"
                                maxLength="4" type="number"
                                value={SMSInput}
                                placeholder="请输入短信验证码"
                                onChange={this.handleSMSInput} />
                            <div styleName="sms-btn" onClick={this.getSMS}>
                                {getSMSTimer === 60 ? "获取验证码": `${getSMSTimer}s`}
                            </div>
                        </div>
                    </div>

                    <div styleName="submit-btn" onClick={this.submitAuthRequest}>确认授权</div>
                </div>
            </div>
        )
    }
}

export default AuthRequest
