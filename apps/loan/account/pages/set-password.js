import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import { Header } from '../../lib/components'

import styles from '../css/set-password.css'

@inject('account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class SetPassword extends React.Component {

    state = {
        agree: true,
        plaintext: false
    }

    checkHandler = () => {
        this.setState({ agree: !this.state.agree })
    }

    componentDidMount() {
        document.title = '设置密码'
    }

    render() {
        let { history, account } = this.props
        let { plaintext, agree } = this.state

        return <div>
            <Header title="设置密码" history={history} />

            <div styleName="send-tips">已发送短信验证码到尾号为
                <span>{account.mask_phone}</span>的手机</div>

            <div styleName="field-input">
                <i className="icon-phone" styleName="icon-phone"></i>
                <input placeholder="输入手机验证码" />
                <a styleName="btn-verify-code">获取验证码</a>
                <div styleName="v-line"></div>
            </div>
            <div styleName="field-input">
                <i className="icon-lock" styleName="icon-lock"></i>
                <input placeholder="设置8-16位的字母及数字组合密码" />
                <i className={plaintext ? "icon-eye-open" : "icon-eye-close"}
                    styleName="icon-eye"></i>

                <div styleName="v-line"></div>
            </div>
            <div styleName="field-input">
                <i className="icon-people" styleName="icon-people"></i>
                <input placeholder="请输入邀请码" />
                <span styleName="xuan-tian">(选填)</span>
            </div>
            <div styleName="protocol">
                <i styleName={agree ? 'checked-btn' : "check-btn"}
                    onClick={this.checkHandler}></i>
                同意 <a>《放心花用户注册协议》</a>
            </div>

            <a styleName="btn-submit">确定</a>
        </div>
    }
}

export default SetPassword