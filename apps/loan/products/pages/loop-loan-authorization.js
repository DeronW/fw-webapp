import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loop-loan-authorization.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanAuthorization extends React.Component {
    componentDidMount(){
        document.title = '授权结果';
    }
    render(){
        let { history } = this.props;
        return (
            <div styleName="cnt-container">
                <Header title="授权结果" history={history} />
            </div>
        )

    }
}

