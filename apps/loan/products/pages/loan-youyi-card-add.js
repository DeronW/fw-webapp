import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils } from 'fw-javascripts'
import { Header } from '../../lib/components'
import { NativeBridge, Browser } from '../../lib/helpers'
import styles from '../css/loan-youyi-card-add.css'

@inject('loopLoan')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanCardAdd extends React.Component {

    constructor(props) {
        super(props)
        
    }
    componentDidMount() {
        document.title = '设置提现卡';
      
    }

    render() {
        let { history, loopLoan } = this.props;

        return (
            <div styleName="cnt-container">
                {!Browser.inFXHApp && <Header title="设置提现卡" history={history} />}
            </div>
        )
    }
}

