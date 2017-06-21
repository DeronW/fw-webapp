import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'

import styles from '../css/bank-card-add.css'

@inject('bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCardAdd extends React.Component {

    componentDidMount() {
    }

    render() {

        return <div>
            <Header title="添加银行卡" history={history} />
        </div>
    }
}

export default BankCardAdd