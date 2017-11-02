import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import { Event,Utils } from 'fw-javascripts'

import {Header} from '../../components'
import styles from '../../css/investor/item-detial.css'

@inject('investor_account')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class itemDetial extends React.Component {
    state = {
        tab: '未回',
    }

    componentDidMount(){
        let {fetchPayment,resetPaymentPageNo} = this.props.investor_account
        resetPaymentPageNo()
        fetchPayment()
        Event.touchBottom(fetchPayment)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    switchTab = tab => {
        if (tab == this.state.tab) return
        this.setState({tab: tab})
        let t
        if(tab == "未回"){
            t = 0
        }else{
            t = 1
        }
        this.props.investor_account.resetPaymentPageNo()
        this.props.investor_account.setPaymentType(t)
    }

    render() {
        let {history} = this.props
        let {tab} = this.state
        let tabs = ['未回', '已回']

        let { payments,type,totalCount } = this.props.investor_account.data.detail
        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "type typeActive" : "type"}
                        onClick={() => this.switchTab(item)}>{item}
            </div>
        }
        let recordFn = (item,index) => {
            return <div styleName="record" key={index}>
                <div styleName="title">
                    <span>{item.prdName}<i></i></span>
                    <div styleName="end"></div>
                </div>
                <div styleName="item">
                    <span>投标日期</span>
                    <span>{item.orderTime}</span>
                </div>
                <div styleName="item">
                    <span>计划回款日期</span>
                    <span>{item.repayPerDate}</span>
                </div>
                {tab=="已回"&&<div styleName="item">
                    <span>实际回款日期</span>
                    <span>{item.paidTime}</span>
                </div>}
                <div styleName="item">
                    <span>本金</span>
                    <span>¥{item.principal}</span>
                </div>
                <div styleName="item">
                    <span>利息</span>
                    <span>¥{item.interest}</span>
                </div>
                {tab=="已回"&&<div styleName="item">
                    <span>违约金</span>
                    <span>¥{item.prepaymentPenalty}</span>
                </div>}
                <div styleName="item">
                    <span>总计金额</span>
                    <span styleName="red">¥{item.princAndIntest}</span>
                </div>
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')}/>
        </div>
        return <div styleName="bg">
            <Header title="TA的回款明细" history={history}/>
            <div styleName="types">
                {tabs.map(tabFn)}
            </div>
            <div styleName="number">共<span>{totalCount}</span>笔记录</div>
            <div styleName="records">
                {payments[type].list.length>0?payments[type].list.map(recordFn):empty}
                {payments[type].list.length>0 && <div styleName="load">已经全部加载完毕</div>}
            </div>
        </div>
    }
}

export default itemDetial