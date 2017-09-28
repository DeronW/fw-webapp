import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/account-zx.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class AccountZx extends React.Component {

    jumpToOverview = () => {
        let {history} = this.props
        history.push('/investor-overview')
    }

    render() {
        let {history} = this.props
        return <div>
            <Header title="TA的尊享账户" history={history}/>
            <div styleName="totalIncome">
                <div styleName="incomeLeft">
                    <div styleName="incomeName">累计收益</div>
                    <div styleName="incomeCount">¥10,000.00</div>
                </div>
                <div styleName="incomeRight">

                </div>
            </div>

            <div styleName="incomeInfo">
                <div styleName="inIofoItem inIofoLeft" onClick={this.jumpToOverview}>
                    <div>尊享总资产</div>
                    <div styleName="incomeNum">¥20,000.00</div>
                </div>
                <div styleName="inIofoItem inIofoRight" onClick={this.jumpToOverview}>
                    <div>可用金额</div>
                    <div styleName="incomeNum">¥10,000.00</div>
                </div>
            </div>
            <div styleName="incomeItem">
                <div styleName="itemDes">
                    <div styleName="desLeft">Ta的投资</div>
                    <div styleName="desRight">
                        <span styleName="rightText">3笔</span>
                        <span styleName="icon-arrow"></span>
                    </div>
                </div>
            </div>
            <div styleName="incomeItem">
                <div styleName="itemDes">
                    <div styleName="desLeft">Ta的回款明细</div>
                    <div styleName="desRight">
                        <span styleName="rightText">最近还款日2017-05-30</span>
                        <span styleName="icon-arrow"></span>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default AccountZx