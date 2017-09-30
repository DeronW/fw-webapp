import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/p2p-item.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class p2pItem extends React.Component {
    state = {
        tab: 'Ta的项目'
    }
    gotoHandler = (link) => {
        let { history } = this.props
        history.push(link)
    }
    switchTab = tab => {
        if (tab == this.state.tab) return
        this.setState({ tab: tab })
    }
    render() {
        let { history } = this.props
        let { tab } = this.state
        let tabs = ['Ta的项目', '批量项目', '转入项目']

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                onClick={() => this.switchTab(item)}>{item}
            </div>
        }
        let t = () => {
            if (tab == '批量项目') {
                return <div styleName="collection" onClick={()=>this.gotoHandler('/investor-item-collection')}>
                    <div styleName="title">
                        <span>闪信贷28天项目集001</span>
                        <div styleName="end">已回款</div>
                    </div>
                    <div styleName="item">
                        <span>项目周期</span>
                        <span>28天</span>
                    </div>
                    <div styleName="item">
                        <span>预期年化收益率</span>
                        <span styleName="bold">0.4%</span>
                    </div>
                    <div styleName="item">
                        <span>出借金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>交易时间</span>
                        <span>2017-01-22</span>
                    </div>
                </div>
            } else {
                return <div styleName="record">
                    <div styleName="title">
                        <span>微金计划-T00010006</span>
                        <div styleName="end">已回款</div>
                    </div>
                    <div styleName="item">
                        <span>预期年化</span>
                        <span styleName="bold">8.5%</span>
                    </div>
                    <div styleName="item">
                        <span>年化加息奖励</span>
                        <span styleName="bold">8.5%</span>
                    </div>
                    <div styleName="item">
                        <span>起息日</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>投资金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>交易日期</span>
                        <span>2017-01-22</span>
                    </div>
                </div>
            }
        }
        let recordFn = (item, index) => {
            return <div key={index}>{t(item)}</div>
        }
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tabFn)}
                </div>
            </div>
            <div styleName="earnings">
                <div styleName="text">累计收益</div>
                <div styleName="money">¥9,888.12</div>
                <div styleName="capital">待收本金：¥1,028,000.00</div>
                <div styleName="detail" onClick={() => this.gotoHandler('/investor-item-detial')}>
                    <span>查看回款明细</span>
                    <img src={require('../../images/investor/zx-item/arrow.png')} />
                </div>
                <div styleName="interest">待收利息：¥10,015.56</div>
            </div>
            <div styleName="number">共<span>5</span>笔记录</div>
            <div styleName="records">
                {[1].map(recordFn)}
                {/*<div styleName="record">
                    <div styleName="title">
                        <span>微金计划-T00010006</span>
                        <div styleName="end">已回款</div>
                    </div>
                    <div styleName="item">
                        <span>预期年化</span>
                        <span styleName="bold">8.5%</span>
                    </div>
                    <div styleName="item">
                        <span>年化加息奖励</span>
                        <span styleName="bold">8.5%</span>
                    </div>
                    <div styleName="item">
                        <span>起息日</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>投资金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>交易日期</span>
                        <span>2017-01-22</span>
                    </div>
                </div>
                <div styleName="collection">
                    <div styleName="title">
                        <span>闪信贷28天项目集001</span>
                        <div styleName="end">已回款</div>
                    </div>
                    <div styleName="item">
                        <span>项目周期</span>
                        <span>28天</span>
                    </div>
                    <div styleName="item">
                        <span>预期年化收益率</span>
                        <span styleName="bold">0.4%</span>
                    </div>
                    <div styleName="item">
                        <span>出借金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>交易时间</span>
                        <span>2017-01-22</span>
                    </div>
                </div>*/}
                <div styleName="load">已经全部加载完毕</div>
            </div>
            {/*<div styleName="no-data">
                <img src={require('../../images/investor/zx-item/no-data.png')}/>
            </div>*/}
        </div>
    }
}
export default p2pItem