import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import Header from '../components/header'
import styles from '../css/order-confirm.css'

@inject('order_confirm')
@observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class OrderConfirm extends React.Component {
    render() {
        return <div styleName="confirm-box">
            <Header title="确认订单" history={this.props.history}/>
            <div styleName="confirm-info">
                <div styleName="info-item">
                    <div styleName="item-left">车辆信息</div>
                    <div styleName="item-right">查看详情</div>
                </div>
                <div styleName="info-item">
                    <div styleName="item-left">报价明细</div>
                    <div styleName="item-right">查看详情</div>
                </div>
                <div styleName="info-item item-last">
                    <div styleName="item-left">客户信息</div>
                    <div styleName="item-right">查看详情</div>
                </div>
            </div>
            <div styleName="amount-info">
                <div styleName="amount-title">
                    <img src={require('../images/order-confirm/logo-renbao.png')} styleName="amount-pic"/>
                    人保车险
                </div>
                <div styleName="amount-content">
                    <div styleName="amount-item">
                        <div styleName="item-left">保险公司报价</div>
                        <div styleName="amount-item-right">￥{(this.props.order_confirm.offer_money).toFixed(2)}</div>
                    </div>
                    <div styleName="amount-item">
                        <div styleName="item-left">工场优惠额度</div>
                        <div styleName="amount-item-right">
                            ￥{(this.props.order_confirm.preferential_amount).toFixed(2)}</div>
                    </div>
                    <div styleName="amount-item item-last">
                        <div styleName="item-left">实际结算金额</div>
                        <div styleName="amount-item-right color-red">
                            ￥{(this.props.order_confirm.settlement_amount).toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div styleName="confirm-btn">
                确认提交
            </div>
        </div>
    }
}

export default OrderConfirm
