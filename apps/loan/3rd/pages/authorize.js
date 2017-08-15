import React from 'react'
import CSSModules from 'react-css-modules'

import { Components, Utils } from 'fw-javascripts'

import { Header } from '../../lib/components'
import { Post, Storage } from '../../lib/helpers'

import styles from '../css/authorize.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Authorize extends React.Component {

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
        this.setState({ phone: Utils.hashQuery.mobile })
        this.getCaptcha();
    }

    componentWillUnmount() {
        if (this._timer) clearInterval(this._timer);
    }

    get maskedPhone() {
        return this.state.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }

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
        let { phone, getSMSTimer, captchaToken, captchaInput } = this.state;
        if (!captchaInput) return Components.showToast('请输入图片验证码');

        let ableToGetSMS = getSMSTimer === 60;
        if (!ableToGetSMS) return

        return Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: phone,
            userOperationType: 3,
            verifyToken: captchaToken,
            verifyCode: captchaInput
        }).then((data) => {
            Components.showToast('验证码已发送');
            this.setState({ SMSToken: data.codeToken });
            this.SMSTimerController();
        }, e => {
            if (e.code == 20020) {
                Components.showToast('请输入正确的图片验证码');
                return this.getCaptcha();
            }
            Components.showToast(e.message);
        })
    }

    submitAuthorize = () => {
        let { phone, SMSToken, SMSInput } = this.state;
        let { history } = this.props;

        if ( SMSInput == '' ) return Components.toast('请输入短信验证码')

        return Post('/api/userBase/v1/channelRegister.json', {
            mobile: phone,
            partner: Utils.hashQuery.partner,
            sign: Utils.hashQuery.sign,
            timestamp: Utils.hashQuery.timestamp,
            codeToken: SMSToken,
            verifyCode: SMSInput
        }, true).then((data) => {
            let dict = data;
            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid,
                phone: dict.mobile,
                invite_code: dict.invitationCode
            })
            location.href = '/static/loan/products/index.html#/';
        }, e => {
            if (e.code == 20010) return Components.showToast('短信验证码错误，请重新输入')
            history.push('/fail');
        })
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
                        <div styleName="input-field">
                            <i styleName="captcha-icon"></i>
                            <input styleName="captcha-input"
                                maxLength="4"
                                value={captchaInput}
                                placeholder="请输入图形验证码"
                                onChange={this.handleInput('captchaInput')}/>
                            <div styleName="captcha-img-container" onClick={this.getCaptcha}>
                                <img src={captchaImgUrl} />
                            </div>
                        </div>

                        <div styleName="input-field">
                            <i styleName="sms-icon"></i>
                            <input styleName="sms-input"
                                maxLength="4" type="number"
                                value={SMSInput}
                                placeholder="请输入短信验证码"
                                onChange={this.handleInput('SMSInput')} />
                            <div styleName="sms-btn" onClick={this.getSMS}>
                                {getSMSTimer === 60 ? "获取验证码": `${getSMSTimer}s`}
                            </div>
                        </div>
                    </div>

                    <div styleName="submit-btn" onClick={this.submitAuthorize}>确认授权</div>
                </div>
            </div>
        )
    }
}

export default Authorize
