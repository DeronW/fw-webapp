import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'

import styles from '../css/red-bag.css'

@inject('bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class RedBag extends React.Component {

    componentDidMount() {
        this.props.bank_card.fetch_card_list()
    }

    render() {
        return <div>
            <Header title="红包账户" />
        </div>
    }
}

export default RedBag