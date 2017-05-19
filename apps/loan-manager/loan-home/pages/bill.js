import React from 'react'
import { NavLink } from 'react-router-dom'

import CSSModules from 'react-css-modules'
import styles from '../css/bill.css'

import { observer, inject } from 'mobx-react'

import { Event } from 'fw-javascripts'

// import Nav from './components/nav'
import Header from './components/header'
import BottomNavBar from './components/bottom-nav-bar'


@inject('bill') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Bill extends React.Component {

    componentDidMount() {
        Event.cancelTouchBottom();
        this.props.bill.fetchBillItems(this.props.match.params.billType)(null);
        Event.touchBottom(this.props.bill.fetchBillItems(this.props.match.params.billType));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.billType !== prevProps.match.params.billType) {
            Event.cancelTouchBottom();
            Event.cancelTouchBottom();
            if (!this.props.bill.billList[this.props.match.params.billType].list.slice().length) {
                this.props.bill.fetchBillItems(this.props.match.params.billType)(null);
            }
            Event.touchBottom(this.props.bill.fetchBillItems(this.props.match.params.billType));
        }
    }

    render() {
        let billType = this.props.match.params.billType,
            billList = this.props.bill.billList[billType].list.slice();


        let btn_tab = (type) => {
            return (
                <NavLink key={type} className="ui-tab-li" to={`/bill/${type}`}>
                    <span className="text">{this.props.bill.billList[type].typeName}</span>
                </NavLink>
            )
        }

        let order_item = (order, index) => {

            let link = order.productId == 1 ?
            `/bill/${billType}/fxh/${order.loanGid}` :
            `/bill/${billType}/dumaio/${order.uuid}`;

            return <NavLink styleName="list_li" key={`${order.orderGid}${index}`} to={link}> {/* delete index in production */}
                <div styleName="list-img"><img src={order.productLogo} /></div>
                <div styleName="list-content">
                    <div styleName="apply-num">借款金额:{order.loanAmtStr}元</div>
                    <div styleName="apply-duration">借款期限:{order.termNumStr}</div>
                </div>
                <div styleName="apply-status-wrap">
                    <div styleName="apply-status">
                        <span styleName={`bill-${this.props.bill.billList[billType].typeNo}-color`}>
                            {this.props.bill.billList[billType].typeName}</span></div>
                    <div styleName="apply-time">{order.loanTimeStr}</div>
                </div>
            </NavLink>
        }

        let empty = <span styleName="no-data"></span>

        return (
            <div>
                <Header title={"借款账单"} show_back={false} />
                <div styleName="billContent">
                    <div styleName="bill-header">
                        {['applying', 'repayable', 'rejected', 'fulfilled'].map(btn_tab)}
                    </div>
                    <div styleName="billContainer">
                        {billList.map(order_item)}
                        {billList.length === 0 && empty}
                    </div>
                </div>
                <BottomNavBar />
            </div>
        )
    }
}

export default Bill
