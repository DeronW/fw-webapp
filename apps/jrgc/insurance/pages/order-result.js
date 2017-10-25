import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'

import styles from '../css/order-result.css'

const OrderResult = inject('current_order')(observer(CSSModules((props) => (
    <div>
        <Header title="交易结果" history={props.history} show_back={false}
            sub_title="查看订单" sub_link="/orders" />
        <div styleName={props.current_order.state === '1' ? 'success' : 'fail'}>
            <div styleName="status-tip">订单状态：支付{props.current_order.state === '1' ? '成功' : '失败'}</div>
        </div>
    </div>
), styles, { allowMultiple: true, errorWhenNotFound: false})))

export default OrderResult
