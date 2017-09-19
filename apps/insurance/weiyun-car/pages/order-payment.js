import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header.js'

import styles from '../css/order-payment.css'
import styles_icon_circle from '../css/icons/circle.css'


@inject('quotations', 'current_order')
@observer
@CSSModules(styles)
class MainPanel extends React.Component {

    render() {
        let { quotations, current_order, history } = this.props;

        let price = quotations.getDetailForSelected(current_order.selectedFirm).actualPrice;

        return <div styleName="order-Payment">
            <Header title="结算" history={history} />
            <div styleName="payment-panel">
                <div styleName="payment-panel-text">支付金额(元)</div>
                <div styleName="payment-panel-money">{price}</div>
            </div>
            <div styleName="payment-way-choose">选择支付方式</div>
            <div styleName="payment-wap-alipay">
                <img styleName="alipay-img" src={require('../images/order-payment/alipay.jpg')} alt="" />
                <div styleName="alipay">
                    <div styleName="alipay-title">支付宝</div>
                    <div styleName="alipay-explain">推荐安装支付宝5.0及以上版本的用户使用</div>
                </div>
                <div className={styles_icon_circle.checked}></div>
            </div>
            <div styleName="payment-btn" onClick={() => current_order.toPay(history)}>支付</div>
        </div>
    }
}

export default MainPanel
