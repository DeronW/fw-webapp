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
        let {fetchZXPayment,resetZXPaymentPageNo,fetchPaymentP2P,resetP2PPaymentPageNo} = this.props.investor_account
        if(Utils.hashQuery.type === "zx"){
            resetZXPaymentPageNo()
            fetchZXPayment()
            Event.touchBottom(fetchZXPayment)
        }else{
            resetP2PPaymentPageNo()
            fetchPaymentP2P()
            Event.touchBottom(fetchPaymentP2P)
        }
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
        if(Utils.hashQuery.type === "zx"){
            this.props.investor_account.resetZXPaymentPageNo()
            this.props.investor_account.setZXPaymentType(t)
        }else{
            this.props.investor_account.resetP2PPaymentPageNo()
            this.props.investor_account.setP2PPaymentType(t)
        }

    }

    render() {
        let {history} = this.props
        let {tab} = this.state
        let tabs = ['未回', '已回']
        let { payments,type,totalCount } = this.props.investor_account.data_zx.detail

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "type typeActive" : "type"}
                        onClick={() => this.switchTab(item)}>{item}
            </div>
        }
        let recordFn = (item,index) => {
            return <div styleName="record">
                <div styleName="title">
                    <span>{item.prdName}<i></i></span>
                    <div styleName="end">{item.state}</div>
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
                <div styleName="item">
                    <span>违约金</span>
                    <span>¥{item.prepaymentPenalty}</span>
                </div>
                <div styleName="item">
                    <span>总计金额</span>
                    <span styleName="red">¥{item.princAndIntest}</span>
                </div>
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')}/>
        </div>
        return <div>
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