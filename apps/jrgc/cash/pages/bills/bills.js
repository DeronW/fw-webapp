import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import Header from '../../components/header'
import styles from '../../css/bills/bills.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Bills extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="账单" history={history} noBack={true}/>
            <div styleName="totalCount">
                <div styleName="totalNum">2600.99</div>
                <div styleName="totalTips">待还总金额(元)</div>
            </div>
            <div styleName="bg"></div>
        </div>
    }
}

export default Bills
