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
        this.props.bank_card.fetch_user_list()
    }

    render() {
        let { bank_card } = this.props;

        let bank_item = (item, index) => {
            let cpcn = 'card-panel card-panel-';
            if (index % 3 === 0) cpcn += 'red'
            if (index % 3 === 1) cpcn += 'blue'
            if (index % 3 === 2) cpcn += 'green'

            return <div styleName="card" key={index}>
                <div styleName={cpcn}>
                    <div styleName="card-panel-t">
                        <div styleName="bank-logo">
                            <img src={item.logoUrl} />
                        </div>
                        <span>{item.bankShortName}</span>
                    </div>

                    <div styleName="card-type">{item.cardType == 0 ? "借记卡" : "信用卡"}</div>
                    <div styleName="card-number">{item.cardNo}</div>

                    {item.isRealNameBindCard &&
                        <div styleName="default-bank-card">提现卡</div>}
                </div>
                <div styleName="bottom-line"></div>
            </div>
        }

        return <div>
            <Header title="银行卡管理" history={history} />
            {bank_card.all.map(bank_item)}

            <div styleName="management-tips">
                <div>1.储蓄卡(尾号{bank_card.default_card_number.slice(-4)})为默认提现卡，不可变更。</div>
                <div>2.支持绑定多张银行卡。</div>
            </div>

            <div styleName="fixed-panel-holder">
                <div styleName="fixed-panel">
                    <div styleName="fixed-panel-tips">
                        绑定银行卡越多，信用额度越高！
                    </div>
                    <Link styleName="fixed-panel-btn" to="/bank-card-add">
                        马上添加
                    </Link>
                </div>
            </div>
        </div>
    }
}

export default BankCard