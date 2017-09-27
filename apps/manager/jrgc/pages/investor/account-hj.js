import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/account-hj.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class AccountHj extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="他的黄金账户" history={history}/>
            <div styleName="hjInfo">
                <div styleName="infoName">持有黄金</div>
                <div styleName="infoCount">1,000.000 <span styleName="unit-hj">克</span></div>
                <div styleName="infoLine line1">
                    <div styleName="lineLeft">可用黄金</div>
                    <div styleName="lineRight">总待收黄金</div>
                </div>
                <div styleName="infoLine line2">
                    <div styleName="lineLeft">1,000.000克(当前市值约¥1280)</div>
                    <div styleName="lineRight">800,00.000克</div>
                </div>
            </div>
        </div>
    }
}

export default AccountHj