import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'

import styles from '../css/bank-card.css'

@inject('repayment_fangxin', 'bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class RepaymentBankCard extends React.Component {

    componentDidMount() {
        document.title = '选择银行卡';
        this.props.bank_card.fetch_card_list();
    }

    handleChoose = (history, gid, type, name, no) => () => {
        this.props.repayment_fangxin.chooseCard(gid, type, name, no);
        history.goBack();
    }

    render() {
        // 从放心花还款页跳转过来：
        // *1 仅显示在掌众绑过的卡
        // *2 不显示卡片label
        // *3 不显示tips
        // *4 可能允许绑卡
        // *5 点击银行卡有选择效果
        let { bank_card, history } = this.props;

        let bank_item = (item, index) => {
            if (item.authPlatform == 2) return null // *1

            let { cardGid, cardType, bankShortName, cardNo, logoUrl } = item;

            return <div styleName="card" key={cardNo}
                onClick={this.handleChoose(history, cardGid, cardType, bankShortName, cardNo.slice(-4))}>
                <div styleName="bank-info">
                    <div styleName="bank-logo">
                        <img src={logoUrl} />
                    </div>
                    <div styleName="bank-name">{bankShortName}</div>
                </div>
                <div styleName="card-info">
                    <span styleName="card-no">{cardNo}</span>
                </div>
            </div>
        }

        return <div styleName="cnt-container">
            <Header title="银行卡管理" history={history} />

            <div styleName="list-container">
                { bank_card.all.map(bank_item) }
            </div>

            { bank_card.all.length < 10 && // *4
                <div styleName="submit-btn-container">
                    {/*<a styleName="submit-btn" href="/static/loan/user-card-add/index.html">*/}
                    <a styleName="submit-btn" href="/static/loan/account/index.html#/bank-card-add">
                        添加银行卡
                    </a>
                </div>
            }
        </div>
    }
}

export default RepaymentBankCard
