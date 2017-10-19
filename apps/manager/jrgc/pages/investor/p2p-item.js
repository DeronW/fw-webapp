import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/p2p-item.css'

@inject('investor_account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class p2pItem extends React.Component {
    state = {
        tab: 'Ta的项目',
        type: '未起息'
    }
    componentDidMount() {
        let { fetchInvestInfoP2P, resetCategoryPageNo, fetchPrdInvestP2P } = this.props.investor_account
        fetchInvestInfoP2P()
        resetCategoryPageNo()
        fetchPrdInvestP2P()
    }
    gotoHandler = (link) => {
        let { history } = this.props
        history.push(link)
    }
    switchTab = tab => {
        if (tab == this.state.tab) return
        this.setState({ tab: tab })
        if (tab == 'Ta的项目') {
            this.setState({ type: '未起息' })
            this.props.investor_account.setProjectCategory2P('100')
        } else if (tab == '转入项目') {
            this.setState({ type: '全部' })
            this.props.investor_account.setProjectCategory2P('')
        }
        this.props.investor_account.resetCategoryPageNo()
        this.props.investor_account.setProjectTabP2P(tab)
    }
    switchType = (type) => {
        let { tab } = this.state
        if (type == this.state.type) return
        this.setState({ type: type })
        let t
        if (tab == 'Ta的项目') {
            if (type == "未起息") {
                t = '100'
            } else if (type == "回款中") {
                t = '3'
            } else {
                t = '4'
            }
        } else if (tab == '转入项目') {
            if (type == "全部") {
                t = ''
            } else if (type == "回款中") {
                t = '5'
            } else {
                t = '6'
            }
        }
        this.props.investor_account.resetCategoryPageNo()
        this.props.investor_account.setProjectCategory2P(t)
    }
    render() {
        let { history } = this.props
        let { tab, type } = this.state
        let { custId } = this.props.investor_account
        let { info, totalCount, records } = this.props.investor_account.data_p2p.project

        let tabs = ['Ta的项目', '批量项目', '转入项目']
        let types = tab == 'Ta的项目' ? ['未起息', '回款中', '已回款'] : ['全部', '回款中', '已回款']

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                onClick={() => this.switchTab(item)}>{item}
            </div>
        }
        let typeFn = (item, index) => {
            return <div key={index} styleName={item == type ? "type typeActive" : "type"}
                onClick={() => this.switchType(item)}>{item}
            </div>
        }
        let t = () => {
            if (tab == '批量项目') {
                return <div styleName="collection" onClick={() => this.gotoHandler(`/investor-item-collection?colPrdClaimId=${item.colId}&batchOrderId=${item.id}`)}>
                    <div styleName="title">
                        <span>{item.collName}</span>
                        <div styleName="end">{item.status}</div>
                    </div>
                    <div styleName="item">
                        <span>项目周期</span>
                        <span>{item.collPeriod}天</span>
                    </div>
                    <div styleName="item">
                        <span>预期年化收益率</span>
                        <span styleName="bold">{item.collRate}</span>
                    </div>
                    <div styleName="item">
                        <span>出借金额</span>
                        <span styleName="red">¥{item.investSuccessTotal}</span>
                    </div>
                    <div styleName="item">
                        <span>交易时间</span>
                        <span>{item.investTime}</span>
                    </div>
                </div>
            } else if (tab == 'Ta的项目') {
                return <div styleName="record">
                    <div styleName="title">
                        <span>{item.prdClaimsId}</span>
                        <div styleName="end">{item.status}</div>
                    </div>
                    <div styleName="item">
                        <span>预期年化利率</span>
                        <span styleName="bold">{item.annualRate}</span>
                    </div>
                    {item.gradeIncreases && <div styleName="item">
                        <span>年化加息奖励</span>
                        <span styleName="bold">{item.gradeIncreases}</span>
                    </div>}
                    <div styleName="item">
                        <span>起息日</span>
                        <span>{item.effactiveDate || '--'}</span>
                    </div>
                    <div styleName="item">
                        <span>实际回款日</span>
                        <span>{item.repayPerDate || '--'}</span>
                    </div>
                    <div styleName="item">
                        <span>出借金额</span>
                        <span styleName="red">¥{item.investAmt}</span>
                    </div>
                    <div styleName="item">
                        <span>交易日期</span>
                        <span>{item.applyDate}</span>
                    </div>
                </div>
            } else {
                return <div styleName="record">
                    <div styleName="title">
                        <span>{item.name}</span>
                        <div styleName="end">{item.status}</div>
                    </div>
                    <div styleName="item">
                        <span>预期年化利率</span>
                        <span styleName="bold">{item.annualRate}</span>
                    </div>
                    <div styleName="item">
                        <span>年化加息奖励</span>
                        <span styleName="bold">{item.addInterestRate}</span>
                    </div>
                    <div styleName="item">
                        <span>起息日</span>
                        <span>{item.startInervestTime || '--'}</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日</span>
                        <span>{item.repayPerDate || '--'}</span>
                    </div>
                    <div styleName="item">
                        <span>实付金额</span>
                        <span styleName="red">¥{item.totalInvestAmt}</span>
                    </div>
                    <div styleName="item">
                        <span>交易日期</span>
                        <span>{item.createdTime}</span>
                    </div>
                </div>
            }
        }
        let recordFn = (item, index) => {
            return <div key={index}>{t(item)}</div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tabFn)}
                </div>
            </div>
            <div styleName="earnings">
                <div styleName="text">累计收益</div>
                <div styleName="money">¥{info.realInvest}</div>
                <div styleName="capital">待收本金：¥{info.waitPrincipal}</div>
                <div styleName="detail" onClick={() => this.gotoHandler(`/investor-item-detial?custId=${custId}&type=p2p`)}>
                    <span>查看回款明细</span>
                    <img src={require('../../images/investor/zx-item/arrow.png')} />
                </div>
                <div styleName="interest">待收利息：¥{info.waitInvest}</div>
            </div>
            {tab !== '批量项目' && <div styleName="types">
                {types.map(typeFn)}
            </div>}
            <div styleName="number">共<span>{totalCount}</span>笔记录</div>
            <div styleName="records">
                {records && records.length > 0 ? records.map(recordFn) : empty}
                {records.length > 0 && <div styleName="load">已经全部加载完毕</div>}
            </div>
        </div>
    }
}
export default p2pItem