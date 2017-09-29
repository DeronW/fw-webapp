import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/item-collection.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class itemCollection extends React.Component {
    render(){
        let {history} = this.props
        return <div styleName="bg">
            <div styleName="bar">
                <div styleName="header">
                    <a styleName="btn" onClick={history.goBack}> </a>
                    闪信贷28天项目集001
                </div>
                <div styleName="earnings">年化收益 <span>8.4%</span></div>
                <div styleName="time">投资期限 <span>28天</span></div>
                <div styleName="info">
                    <div styleName="start">100元起</div>
                    <div styleName="start">一次结清</div>
                    <div styleName="amount">可投金额 ¥12000.00</div>
                    <div styleName="number">可投项目 10个</div>
                </div>
            </div>
        </div>
    }
}
export default itemCollection