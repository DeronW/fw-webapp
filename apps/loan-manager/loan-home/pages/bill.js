import React from 'react'
import { NavLink } from 'react-router-dom'

import CSSModules from 'react-css-modules'
import styles from '../css/bill.css'

import { observer, inject } from 'mobx-react'

import { Event } from 'fw-javascripts'

// import Nav from './components/nav'
import BottomNavBar from './components/bottom-nav-bar'


@inject('bill') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Bill extends React.Component {
    constructor({ match, bill }) {
        super({ match, bill });
        this.billType = match.params.billType;
        this.billList = bill.billList;
    }

    componentDidMount() {
        this.props.bill.fetchBillItems(this.billType)(null);
        Event.touchBottom(this.props.bill.fetchBillItems(this.billType));
    }

    render() {
        let billList = this.billList[this.billType].list.slice();

        let btn_tab = (type) => {
            return (
                <NavLink key={type} styleName="ui-tab-li" to={`/bill/${type}`}>
                    <span styleName="text">{this.billList[type].typeName}</span>
                </NavLink>
            )
        }

        let order_item = (order, index) => {

            let link = order.productId == 1 ?
            `/bill/${this.billType}/fxh/${order.loanGid}` :
            `/bill/${this.billType}/dumaio/${order.uuid}`;

            return <NavLink styleName="list_li" key={`${order.orderGid}${index}`} to={link}
                onClick={() => {console.log('1');
                    this.props.bill.fetchBillItems(this.billType)(null);
                Event.touchBottom(this.props.bill.fetchBillItems(this.billType));}}>
                <div styleName="list-img"><img src={order.productLogo} /></div>
                <div styleName="list-content">
                    <div styleName="apply-num">借款金额:{order.loanAmtStr}元</div>
                    <div styleName="apply-duration">借款期限:{order.termNumStr}</div>
                </div>
                <div styleName="apply-status-wrap">
                    <div styleName="apply-status">
                        <span styleName={`bill-${this.billType}-color`}>
                            {this.billList[this.billType].typeName}</span></div>
                    <div styleName="apply-time">{order.loanTimeStr}</div>
                </div>
            </NavLink>
        }

        let empty = <span styleName="no-data"></span>

        return <div styleName="billContent">
            <div styleName="bill-header">
                {['applying', 'repayable', 'rejected', 'fulfilled'].map(btn_tab)}
            </div>
            <div styleName="billContainer">
                {billList.map(order_item)}
                {billList.length === 0 && empty}
            </div>
        </div>
    }
}

export default Bill
