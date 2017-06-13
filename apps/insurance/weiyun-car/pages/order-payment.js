import React from 'react'
import CSSModules from 'react-css-modules'
import {observer,inject} from 'mobx-react'

import Header from '../components/header.js'
import styles from '../css/order-payment.css'


// @inject('') @observer @CSSModules(styles)
@inject('order_payment')
@observer
@CSSModules(styles)
class MainPanel extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        let { order_payment, history } = this.props;
        return <div styleName="order-Payment">
            <Header title="结算" history={history}/>
            <div styleName="payment-panel">
                <div styleName="payment-panel-text">支付金额(元)</div>
                <div styleName="payment-panel-money">{(order_payment.money).toFixed(2)}</div>
            </div>
            <div styleName="payment-way-choose">选择支付方式</div>
            <div styleName="payment-wap-alipay">
                <img src={require('../images/order-payment/alipay.jpg')} alt=""/>
                <div styleName="alipay">
                    <div styleName="alipay-title">支付宝</div>
                    <div styleName="alipay-explain">推荐安装支付宝5.0及以上版本的用户使用</div>
                </div>
                <div styleName="checked-btn"></div>
            </div>
        </div>
    }
}

export default MainPanel
