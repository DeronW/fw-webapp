import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import { Utils, Components } from 'fw-javascripts'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/overview.css'

@inject('investor_account')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Overview extends React.Component {
    state = {
        accumulated_control: true,
        totalAssets_control: false,
        principal_control: false,
        balance_control: false

    }
    componentDidMount(){
        this.props.investor_account.fetchOverview(Utils.hashQuery.type)
    }
    accumulatedHandler = () => {
        this.setState({accumulated_control: !this.state.accumulated_control})
    }

    totalAssetsHandler = () => {
        this.setState({totalAssets_control: !this.state.totalAssets_control})
    }

    principalHanlder = () => {
        this.setState({principal_control: !this.state.principal_control})
    }

    balanceHandler = () => {
        this.setState({balance_control: !this.state.balance_control})
    }

    render() {
        let {history} = this.props
        let { overview } = this.props.investor_account.data
        let {accumulated_control, totalAssets_control, principal_control, balance_control} = this.state

        let item = (text,amount) => {
            return <div styleName="accumulatedLine">
                <div styleName="lineLeft">{text}</div>
                <div styleName="lineRight">￥{amount}</div>
            </div>
        }

        return <div>
            <Header title="款项总览" history={history}/>
            <div styleName={accumulated_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.accumulatedHandler}>
                <div styleName="titleLeft">累计收益￥{overview.accAmt}</div>
                <div styleName="titleRight"></div>
            </div>
            {accumulated_control && <div styleName="accumulatedText">
                {item('已收本息',overview.realInvest)}
                {item('待收利息',overview.waitInvest)}
                {item('已用返现券',overview.usedQuans)}
                {item('已用工豆',overview.usedBeans)}
                {item('余额利息',overview.balanceInterest)}
            </div>}

            <div styleName={totalAssets_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.totalAssetsHandler}>
                <div styleName="titleLeft">总计资产￥{overview.total}</div>
                <div styleName="titleRight"></div>
            </div>
            {totalAssets_control && <div styleName="accumulatedText">
                {item('待收本息',overview.waitPrincipalInterest)}
                {item('账户余额',overview.cashBalance)}
            </div>}

            <div styleName={principal_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.principalHanlder}>
                <div styleName="titleLeft">待收本息￥{overview.waitPrincipalInterest}</div>
                <div styleName="titleRight"></div>
            </div>
            {principal_control && <div styleName="accumulatedText">
                {item('待收本金',overview.waitPrincipal)}
                {item('待收利息',overview.waitInvest)}
            </div>}

            <div styleName={balance_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.balanceHandler}>
                <div styleName="titleLeft">账户余额￥{overview.cashBalance}</div>
                <div styleName="titleRight"></div>
            </div>
            {balance_control && <div styleName="accumulatedText">
                {item('TA的余额',overview.bankBalance)}
                {item('冻结资金',overview.tradeFrozenAmt)}
            </div>}
        </div>
    }
}

export default Overview