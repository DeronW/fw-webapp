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
                <div>
                    订单号: {order.id}
                    <div> 已支付 </div>
                </div>
                <div>
                    <div>续保</div>
                    {order.licenseNo}
                    <div>¥{order.price}</div>
                </div>
                <div>
                    <Link to="/">立即支付</Link>
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
            </div>

            {orders.current_list.map(order_item)}
            {orders.current_list.length === 0 && Empty}
        </div>
    }
}

export default Orders
