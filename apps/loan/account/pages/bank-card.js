import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'

import styles from '../css/bank-card.css'

@inject('bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCard extends React.Component {

    componentDidMount() {
        this.props.bank_card.fetch_card_list()
    }

    render() {
        let { bank_card } = this.props;

        let bank_item = (item, index) => {
            let cardLabel;
            if (item.authPlatform == 1) {
                cardLabel = '放心花';
            } else if (item.authPlatform == 2) {
                cardLabel = '优易借';
            }
            return <div styleName="card" key={item.cardNo}>
                <div styleName="bank-info">
                    <div styleName="bank-logo">
                        <img src={item.logoUrl} />
                    </div>
                    <div styleName="bank-name">{item.bankShortName}</div>
                </div>
                <div styleName="card-info">
                    <span styleName="card-no">{item.cardNo}</span>
                    <div styleName="card-label">
                        <span>{cardLabel}</span>
                    </div>
                </div>
            </div>
        }

        return <div styleName="cnt-container">
            <Header title="银行卡管理" history={history} />

            <div styleName="tips">
                1.在这里您可以看到使用不同借款产品时绑定过的银行卡；
                <br/>
                2.在实际使用中我们会自动为您筛选当前可用的银行卡。
            </div>

            <div styleName="list-container">
                { bank_card.all.map(bank_item) }
            </div>

            <div styleName="submit-btn-container">
                <Link styleName="submit-btn" to="/bank-card-add">
                    添加银行卡
                </Link>
            </div>
        </div>
    }
}

export default BankCard
