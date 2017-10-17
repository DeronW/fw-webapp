import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/account-hj.css'

@inject('investor_account')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class AccountHj extends React.Component {
    componentDidMount() {
        //id为从上一页面获取
        this.props.investor_account.fetchAccountHj()
    }

    jumpToList = () => {
        let {history} = this.props
        history.push('investor-hj-list')
    }

    render() {
        let {history} = this.props
        let {info, goldPrice} = this.props.investor_account.data.hj
        return <div>
            <Header title="TA的黄金账户" history={history}/>
            <div styleName="hjInfo">
                <div styleName="infoName">持有黄金</div>
                <div styleName="infoCount">{info.goldAmount} <span styleName="unit-hj">克</span></div>
                <div styleName="infoLine line1">
                    <div styleName="lineLeft">可用黄金</div>
                    <div styleName="lineRight">总待收黄金</div>
                </div>
                <div styleName="infoLine line2">
                    <div styleName="lineLeft">{info.availableAmount}克(当前市值约¥{info.cuurMarketValue})</div>
                    <div styleName="lineRight">
                        <span styleName="number">{info.waitAmount}克</span>
                        <span styleName="icon-question-up"></span>
                    </div>
                </div>
            </div>
            <div styleName="hjPrice">
                <div styleName="priceItem">
                    <div styleName="itemLineUp"><span styleName="itemName">浮动盈亏</span><span
                        styleName="icon-question"></span></div>
                    <div styleName="itemLineDown colorRed">+¥{info.accProfitLoss}</div>
                </div>
                <div styleName="priceItem">
                    <div styleName="itemLineUp"><span styleName="itemName">实时金价(每克)</span><span
                        styleName="icon-refresh"></span></div>
                    <div styleName="itemLineDown">¥{goldPrice}</div>
                </div>
                <div styleName="priceItem itemLast">
                    <div styleName="itemLineUp"><span>成交金价(每克)</span></div>
                    <div styleName="itemLineDown">¥{info.dealPrice}</div>
                </div>
            </div>

            <div styleName="zxGold" onClick={this.jumpToList}>
                <div styleName="goldLeft">Ta的尊享金</div>
                <div styleName="goldRight"></div>
            </div>

            <div styleName="accont">
                <span>支付账户</span><span styleName="tips">（可用余额仅限在黄金账户使用）</span>
            </div>

            <div styleName="remain">
                可用余额<span>¥{info.availableBalance}</span>
            </div>
        </div>
    }
}

export default AccountHj