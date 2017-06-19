import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import styles from '../css/entry.css'

@inject('account')
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Entry extends React.Component {

    state = {
        phone: ''
    }

    clearHandler = () => {
        this.setState({ phone: '' })
    }

    changeHandler = e => {
        let v = parseInt(e.target.value) || '';
        v = String(v).substr(0, 11)
        this.setState({ phone: v })
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
                <input styleName="input" value={phone}
                    onChange={this.changeHandler}
                    placeholder="请输入手机号进行注册" />
                <div styleName="underline"></div>
            </div>
            <a styleName="btn-submit" onClick={
                () => account.submit(phone, history)}>下一步</a>
        </div>
    }
}

export default Entry