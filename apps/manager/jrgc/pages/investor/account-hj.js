import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/account-hj.css'

@inject('investor_account')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class AccountHj extends React.Component {
    state={
        close:false
    }
    componentDidMount() {
        this.props.investor_account.fetchAccountHj()
    }

    jumpToList = () => {
        let {history} = this.props
        history.push('investor-hj-list')
    }
    showHandler = () => {
        this.setState({close:true})
    }
    closeHandler = () => {
        this.setState({close:false})
    }
    render() {
        let {history} = this.props
        let {close} = this.state
        let {info, goldPrice} = this.props.investor_account.data_hj
        let { fetchGoldPrice } = this.props.investor_account
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
                    </div>
                </div>
            </div>
            <div styleName="hjPrice">
                <div styleName="priceItem">
                    <div styleName="itemLineUp"><span styleName="itemName">累计盈亏</span><span
                        styleName="icon-question" onClick={this.showHandler}></span></div>
                    <div styleName="itemLineDown colorRed">+¥{info.accProfitLoss}</div>
                </div>
                <div styleName="priceItem">
                    <div styleName="itemLineUp"><span styleName="itemName">实时金价(每克)</span>
                        <span styleName="icon-refresh" onClick={fetchGoldPrice}></span>
                    </div>
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
            {close && <div styleName="pop-bg">
                <div styleName="pop">
                    <div styleName="pop-title">累计盈亏</div>
                    <div styleName="remind">累计盈亏指消费者在尊享进度累计盈利<br/>或亏损</div>
                    <div styleName="formula">
                        计算公式：
                        <div>消费者总盈亏=（消费者持有黄金市值+消费</div>
                        <div>者变现总金额+消费者提取金条市值+活期</div>
                        <div>累计收益）-消费者实际购买总金额</div>
                    </div>
                    <div styleName="pop-close" onClick={this.closeHandler}></div>
                </div>
            </div>}

        </div>
    }
}

export default AccountHj