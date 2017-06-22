import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import SupportedBankList from '../components/supported-bank-list.js'

import styles from '../css/bank-card-add.css'

@inject('bank_card', 'account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCardAdd extends React.Component {

    state = {
        phone: this.props.account.phone,
        card_no: '',
        show_supported_bank: false
    }

    componentDidMount() {
    }

    toggleSupportedBankList = () => {
        this.setState({
            show_supported_bank: !this.state.show_supported_bank
        })
    }

    submitHandler = () => {

    }

    cardNoChangeHandler = e => {
        let v = e.target.value.replace(/[^\d|\b]/g, '')
        v = v.substr(0, 19)
        this.setState({ card_no: v })
    }

    phoneChangeHandler = e => {
        let v = String(parseInt(e.target.value) || '').substr(0, 11)
        this.setState({ phone: v })
    }

    render() {
        let { card_no, phone, show_supported_bank } = this.state
        let { history } = this.props

        let format_card_no = card_no.replace(/(\d{4})/g, '$1 ').trim()

        return <div>
            {!show_supported_bank &&
                <Header title="添加储蓄卡" history={history} />}

            <div styleName="sp-a"></div>

            <div styleName="field">
                储蓄卡号
                <input placeholder="输入储蓄卡号" value={format_card_no}
                    onChange={this.cardNoChangeHandler} />
            </div>
            <div styleName="bank-list">
                <a onClick={this.toggleSupportedBankList}
                    styleName="btn-show-list">支持银行
                <i styleName="icon-question"></i>
                </a>
            </div>

            <div styleName="sp-b"></div>

            <div styleName="field">
                手机号
                <input placeholder="银行卡预留手机号" value={phone}
                    onChange={this.phoneChangeHandler} />
            </div>

            <div styleName="btn-submit">
                <a onClick={this.submitHandler} styleName="ui-btn">下一步</a>
            </div>

            {show_supported_bank &&
                <SupportedBankList closeHandler={this.toggleSupportedBankList} />}
        </div>
    }
}

export default BankCardAdd