import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import SupportedBankList from '../components/supported-bank-list.js'

import styles from '../css/bank-card-add.css'

@inject('bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCardAdd extends React.Component {

    state = {
        show_supported_bank: false
    }

    componentDidMount() {
    }

    showSupportedBankList = () => {
        this.setState({ show_supported_bank: true })
    }

    submitHandler = () => {

    }

    render() {

        return <div>
            <Header title="添加储蓄卡" history={history} />

            <div styleName="sp-a"></div>

            <div styleName="field">
                储蓄卡号
                <input placeholder="输入储蓄卡号" />
            </div>
            <div styleName="bank-list">
                <a onClick={this.showSupportedBankList}
                    styleName="btn-show-list">支持银行
                <i styleName="icon-question"></i>
                </a>
            </div>

            <div styleName="sp-b"></div>

            <div styleName="field">
                手机号
                <input placeholder="银行卡预留手机号" />
            </div>

            <div styleName="btn-submit">
                <a onClick={this.submitHandler} styleName="ui-btn">下一步</a>
            </div>

            {this.state.show_supported_bank && <SupportedBankList />}
        </div>
    }
}

export default BankCardAdd