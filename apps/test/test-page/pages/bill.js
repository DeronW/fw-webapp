import React from 'react'
import {render} from 'react-dom'
import BottomNav from '../components/bottom-nav'
import CSSModules from 'react-css-modules'
import styles from '../css/bill.css'
import mobx from 'mobx'
import { observer, inject } from 'mobx-react'
import * as $FW from 'fw-components'
import { BrowserFactory } from 'fw-javascripts'
import { NativeBridgeFactory } from 'fw-javascripts'






@inject('bill') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
export default class Bill extends React.Component {
    render(){
        return (
            <div>
                <BottomNav />
            </div>
        )
    }
}


import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect, Link } from 'react-router-dom'

import Header from '../components/header'

import styles from '../css/orders.css'

@inject('orders')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Orders extends React.Component {

    componentDidMount() {
        document.title = '我的订单'
    }

    render() {

        let { orders } = this.props;

        let order_item = order => {

            return <div key={order.id} styleName="order-item">
                <div styleName="order-item-id">
                    订单号: {order.id}
                    <span styleName="order-status-paid"> 已支付 </span>
                </div>
                <div styleName="order-item-cnt">
                    <span styleName="order-prefix">续保</span>
                    <span styleName="order-licenses">{order.licenseNo}</span>
                    <span styleName="order-price">¥{order.price}</span>
                </div>
                <div styleName="pay-row">
                    <div styleName="pay-split-line"></div>
                    <Link styleName="btn-pay" to="/">立即支付</Link>
                </div>
            </div>
        }

        let Empty = <div>
            EMPTY
        </div>

        let tab = (type, title) => {
            return <a styleName={
                orders.current_type == type ? "nav-bar-item active" : 'nav-bar-item'}
                      onClick={() => orders.switch_type(type)}> {title} </a>
        }

        return <div>
            <Header title="我的订单" history={this.props.history} />

            <div styleName="nav-bar">
                {tab('all', '全部订单')}
                {tab('paid', '已支付')}
                {tab('unpaid', '未支付')}
                {tab('completed', '已完成')}
                <div styleName="bottom-line"></div>
            </div>

            {orders.current_list.map(order_item)}
            {orders.current_list.length === 0 && Empty}
        </div>
    }
}

export default Orders
