import React from 'react'
import { observer, inject } from 'mobx-react'
import CSSModules from 'react-css-modules'
import styles from '../css/components/supported-bank-list.css'


@inject('bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class List extends React.Component {

    componentDidMount() {
        this.props.bank_card.fetch_supported_list()
    }

    render() {

        let { bank_card, title, closeHandler } = this.props

        let bank = (item, index) => (
            <div styleName="bank-item" key={index}>
                <img src={item.logoUrl || require('../images/logo.png')} />
                {item.bankName}
            </div>
        )

        return <div styleName="bg">
            {bank_card.supported_list.map(bank)}
            <div styleName="panel-know-it">
                <a styleName="btn-know-it" onClick={closeHandler}>我知道了</a>
            </div>
        </div>
    }
}

export default List