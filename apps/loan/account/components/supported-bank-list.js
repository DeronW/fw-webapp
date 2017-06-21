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

        let bank = (item, index) => { }

        return <div>
            {this.props.bank_card.supported_list.map(bank)}
            <div styleName="fixed-btn">
                <a onClick={this.props.closeHandler}
                >{props.title}</a>
            </div>
        </div>
    }
}

export default List