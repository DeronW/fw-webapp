import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import { Components } from 'fw-javascripts'

import { Header } from '../../lib/components'
import { Post } from '../../lib/helpers'
import SupportedBankList from '../components/supported-bank-list.js'

import styles from '../css/bank-card-add.css'

@inject('bank_card', 'account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCardAdd extends React.Component {

    state = {
        phone: this.props.account.phone,
        card_no: '',
        card_info: {
            // "bankName": "招商银行",
            // "cardType": 0,
            // "canVerify": 1,
            // "logoUrl": null
        },
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
        let { bank_card, account, history } = this.props;
        let { card_no, phone, card_info } = this.state;
        let err;

        if (card_no == '') err = "储蓄卡不能为空";
        if (card_no.length > 19 || card_no.length < 16) err = "储蓄卡格式不对";
        if (phone == '') err = "手机号不能为空";
        if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) err = "手机号格式不对";
        if (card_info.cardType === 1) err = "请绑定借记卡";
        if (card_info.canVerify === 0) err = "不支持绑定此类卡";
        err ?
            Components.showToast(err) :
            bank_card.add_new_card_info(
                card_info.bankName, card_no,
                card_info.cardType, phone,
                account.get_user_status())
                // .then(() => {
                //     history.push('/bank-card-verify')
                // }, e => {
                //     Components.showToast(err);
                // })
                .then(() => {
                     history.push('/bank-card-verify')
                }, e => {
                    Components.showToast(err);
                })
    }

    cardNoChangeHandler = e => {
        let v = e.target.value.replace(/[^\d|\b]/g, '')
        v = v.substr(0, 19)
        this.setState({ card_no: v })
    }

    blurHandler = e => {
        let { card_no } = this.state;
        if (card_no.length < 16 || card_no.length > 19)
            return Components.showToast("储蓄卡格式不对")

        Post('/api/bankcard/v1/cardinfo.json', {
            bankCardNo: card_no
        }).then(data => this.setState({ card_info: data.cardInfo }))
    }

    phoneChangeHandler = e => {
        let v = String(parseInt(e.target.value) || '').substr(0, 11)
        this.setState({ phone: v })
    }

    render() {
        let { card_no, phone, show_supported_bank } = this.state
        let { history } = this.props

        let format_card_no = card_no.replace(/(\d{4})(?=\d)/g, '$1 ')

        return <div>
            {!show_supported_bank &&
                <Header title="添加储蓄卡" history={history} />}

            <div styleName="sp-a"></div>

            <div styleName="field">
                储蓄卡号
                <input placeholder="输入储蓄卡号" value={format_card_no}
                    onBlur={this.blurHandler}
                    onChange={this.cardNoChangeHandler} />
            </div>
            <div styleName="bank-list">
                <a onClick={this.toggleSupportedBankList}
                    styleName="btn-show-list">支持银行
                    <i styleName="icon-question"></i>
                </a>
                <span>{this.state.card_info.bankName}</span>
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