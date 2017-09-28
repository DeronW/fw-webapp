import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/overview.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Overview extends React.Component {
    state = {
        accumulated_control: false,
        totalAssets_control: false,
        principal_control: false,
        balance_control: false

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
        let {accumulated_control, totalAssets_control, principal_control, balance_control} = this.state
        let accumulated_text = () => {
            return <div styleName="accumulatedText">
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">已收本息</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">代收本息</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">已用返息券</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">已用工豆</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">余额利息</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
            </div>
        }

        let totalAssets_text = () => {
            return <div styleName="accumulatedText">
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">余额利息</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
            </div>
        }

        let principal_text = () => {
            return <div styleName="accumulatedText">
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">待收本息</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
            </div>
        }

        let balance_text = () => {
            return <div styleName="accumulatedText">
                <div styleName="accumulatedLine">
                    <div styleName="lineLeft">待收本息</div>
                    <div styleName="lineRight">￥100.29</div>
                </div>
            </div>
        }
        return <div>
            <Header title="款项总览" history={history}/>
            <div styleName={accumulated_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.accumulatedHandler}>
                <div styleName="titleLeft">累计收益￥9,888.12</div>
                <div styleName="titleRight"></div>
            </div>
            {accumulated_control && accumulated_text()}
            <div styleName={totalAssets_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.totalAssetsHandler}>
                <div styleName="titleLeft">总计资产￥9,888.12</div>
                <div styleName="titleRight"></div>
            </div>
            {totalAssets_control && totalAssets_text()}
            <div styleName={principal_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.principalHanlder}>
                <div styleName="titleLeft">待收本息￥9,888.12</div>
                <div styleName="titleRight"></div>
            </div>
            {principal_control && principal_text()}

            <div styleName={balance_control ? "accumulatedTitle aTitleUp" : "accumulatedTitle aTitleDown"}
                 onClick={this.balanceHandler}>
                <div styleName="titleLeft">账户余额￥9,888.12</div>
                <div styleName="titleRight"></div>
            </div>
            {balance_control && balance_text()}
        </div>
    }
}

export default Overview