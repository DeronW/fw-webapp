import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components, Utils } from 'fw-javascripts'

import styles from '../css/entry.css'

@inject('account')
@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class Entry extends React.Component {

    constructor(props) {
        super(props)

        let phone = this.props.account.data.phone

        // 如果参数中带了phone参数, 优先使用参数中的phone, 该功为了支持第三方登录显示默认手机号
        if (Utils.hashQuery.phone) phone = Utils.hashQuery.phone

        this.state = {
            phone: phone
        }
    }

    componentDidMount() {
        document.title = '放心花'
    }

    clearHandler = () => {
        this.setState({ phone: '' })
    }

    changeHandler = e => {
        let v = parseInt(e.target.value) || '';
        v = String(v).substr(0, 11)
        this.setState({ phone: v })
    }

    submitHandler = () => {
        let { account, history } = this.props
        let { phone } = this.state

        let err;
        if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) err = '手机号码格式不正确'
        if (String(phone).length != 11) err = '手机号位数不正确'
        if (!phone) err = '请填写手机号码'

        if (err) return Components.showToast(err);

        account.check_user_exist(phone).then(() => {
            if (account.userCode == 201003 || account.userCode == 20014)
                history.push('/set-password')
            if (account.userCode == 10000)
                history.push('/login')
        })
    }

    render() {
        let { account, history } = this.props;
        let { phone } = this.state;

        return <div styleName="bg">
            <div styleName="title">放心花</div>
            <img styleName="logo" src={require('../images/logo.png')} />
            <div styleName="form">
                <i className="icon-phone" styleName="icon-phone"></i>
                {phone &&
                    <i styleName="icon-clear" onClick={this.clearHandler}></i>}
                <input styleName="input" type="number" value={phone}
                    onChange={this.changeHandler}
                    placeholder="请输入手机号进行注册" />
                <div styleName="underline"></div>
            </div>
            <a styleName="btn-submit" onClick={this.submitHandler}>下一步</a>
        </div >
    }
}

export default Entry
