import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect, Link } from 'react-router-dom'

import { Event } from 'fw-javascripts'

import Header from '../components/header'

import styles from '../css/orders.css'

@inject('orders')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Orders extends React.Component {

    componentDidMount() {
        document.title = '我的订单';

        let { orders } = this.props;

        Event.touchBottom(orders.fetch_orders);
        orders.fetch_orders();
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    render() {

        let { orders } = this.props;

        let order_item = order => {

            let type_name = orders.get_type_name(order.orderState)

            return <div key={order.orderNum} styleName="order-item">
                <div styleName="order-item-id">
                    订单号: {order.orderNum}
                    <span styleName="order-status-paid">{type_name}</span>
                </div>
                <div styleName="order-item-cnt">
                    <span styleName="order-prefix">续保</span>
                    <span styleName="order-licenses">{order.carNum}</span>
                    <span styleName="order-price">¥{order.insuranceAmount}</span>
                </div>
                { type_name == '待付款' &&
                    <div styleName="pay-row">
                        <div styleName="pay-split-line"></div>
                        <a styleName="btn-pay" href={order.payUrl}>立即支付</a>
                    </div>
                }
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
