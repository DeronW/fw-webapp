import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../components'

import styles from '../css/credit-msp.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class CreditMsp extends React.Component {

    _timer = null

    state = {
        phone: '',
        pwd: '',
        sms: '',
        smsTimer: 60
    }

    componentWillUnmount() {
        if (this._timer) clearInterval(this._timer)
    }

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

    handleChange = type => e => {
        this.setState({ [type]: e.target.value })
    }

    handleSubmit = () => { }

    render() {
        const { phone, pwd, sms, smsTimer } = this.state;

        return <div styleName="container">
            <Header title="紧急联系人" history={this.props.history} />

            <div styleName="input-item-grp">
                <div styleName="input-item">
                    <div styleName="item-name">手机号</div>
                    <input styleName="item-value" placeholder="请填写" type="tel"
                        value={phone} onChange={this.handleChange('phone')}/>
                </div>
                <div styleName="input-item">
                    <div styleName="item-name">服务密码</div>
                    <input styleName="item-value" placeholder="请填写" type="password"
                        value={pwd} onChange={this.handleChange('pwd')}/>
                </div>
                <div styleName="input-item">
                    <div styleName="item-name">手机验证码</div>
                    <input styleName="item-value" placeholder="请填写" type="number"
                        value={sms} onChange={this.handleChange('sms')}/>
                    <div styleName="sms-info" onClick={this.handleSmsSend}>
                        {smsTimer === 60 ? '获取验证码' : `${smsTimer}s`}
                    </div>
                </div>
            </div>

            <div styleName="tip">
                访问<a href="/">中国移动网上营业厅</a>，
                然后输入手机号进行查找或重置密码服务
            </div>

            <div styleName="submit-btn" onClick={this.handleSubmit}>下一步</div>
        </div>
    }
}


export default CreditMsp