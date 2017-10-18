import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/zx-item.css'

@inject('investor_account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class zxItem extends React.Component {
    state = {
        type: 'Ta的项目',
    }
    componentDidMount() {
        let { fetchInvestInfoZX, fetchProjectZX, fetchTransferProjectZX, resetPageNoZX } = this.props.investor_account
        resetPageNoZX()
        fetchInvestInfoZX()
        fetchProjectZX()
    }
    gotoHandler = (params) => {
        let { history } = this.props
        history.push('/investor-item-detial')
    }

    switchType = type => {
        if (type == this.props.investor_account.data_zx.project.type) return
        this.props.investor_account.setTypeZX(type)
        console.log(type)
        if(type=="Ta的项目"){
            this.props.investor_account.setTabZX('100')
        }else if(type=="转入项目"){
            this.props.investor_account.setTabZX('')
        }
        this.props.investor_account.fetchProjectZX()
    }

    switchTab = tab => {
        this.props.investor_account.setTabZX(tab)
    }
    render() {
        let { history } = this.props
        let { type } = this.props.investor_account.data_zx.project

        let { info,tab,transfer_tab,record,list } = this.props.investor_account.data_zx.project
        let types = type == 'Ta的项目' ? ['100', '3', '4'] : ['', '5', '6']

        let typeFn = (item, index) => {
            return <div key={index} styleName={item == type ? "tab tabActive" : "tab"}
                onClick={() => this.switchType(item)}>{item}
            </div>
        }
        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "type typeActive" : "type"}
                onClick={() => this.switchTab(item)}>{record[item].name}
            </div>
        }

        let zx_item = (item,index) => {
            if(type == 'Ta的项目'){
                return <div styleName="record">
                    <div styleName="title">
                        <span>{item.prdName}</span>
                        <div styleName="end">{item.status}</div>
                    </div>
                    <div styleName="item">
                        <span>预期年化利率</span>
                        <span styleName="bold">{item.annualRate}</span>
                    </div>
                    <div styleName="item">
                        <span>年化加息奖励</span>
                        <span styleName="bold">{item.gradeIncreases}</span>
                    </div>
                    <div styleName="item">
                        <span>起息日</span>
                        <span>{item.effactiveDate}</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日</span>
                        <span>{item.repayPerDate}</span>
                    </div>
                    <div styleName="item">
                        <span>投资金额</span>
                        <span styleName="red">¥{item.investAmt}</span>
                    </div>
                    <div styleName="item">
                        <span>交易日期</span>
                        <span>{item.applyDate}</span>
                    </div>
                </div>
            }else if(type == '转入项目'){
                <div styleName="record">
                    <div styleName="title">
                        <span>{item.name}</span>
                        <div styleName="end">{item.status}</div>
                    </div>
                    <div styleName="item">
                        <span>预期年化利率</span>
                        <span styleName="bold">{item.transfereeYearRate}</span>
                    </div>
                    <div styleName="item">
                        <span>起息日</span>
                        <span>{item.startInervestTime}</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日</span>
                        <span>{item.repayPerDate}</span>
                    </div>
                    <div styleName="item">
                        <span>实付金额</span>
                        <span styleName="red">¥{item.contributionAmt}</span>
                    </div>
                    <div styleName="item">
                        <span>交易日期</span>
                        <span>{item.lastDays}</span>
                    </div>
                </div>
            }
        }
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {['Ta的项目', '转入项目'].map(typeFn)}
                </div>
            </div>
            <div styleName="earnings">
                <div styleName="text">累计收益</div>
                <div styleName="money">¥{info.realInvest}</div>
                <div styleName="capital">待收本金：¥{info.waitPrincipal}</div>
                <div styleName="detail" onClick={() => this.gotoHandler()}>
                    <span>查看回款明细</span>
                    <img src={require('../../images/investor/zx-item/arrow.png')} />
                </div>
                <div styleName="interest">待收利息：¥{info.waitInvest}</div>
            </div>
            <div styleName="types">
                {types.map(tabFn)}
            </div>
            <div styleName="number">共<span>5</span>笔记录</div>
            {/*<div styleName="records">

                <div styleName="load">已经全部加载完毕</div>
            </div>*/}
            <div styleName="no-data">
                <img src={require('../../images/investor/zx-item/no-data.png')} />
            </div>
        </div>
    }
}
export default zxItem