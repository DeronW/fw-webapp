import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'

import Header from '../components/header'
import BottomButton from '../components/bottom-button'

import styles from '../css/order-confirm.css'


@inject('quotations', 'current_order')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class OrderConfirm extends React.Component {

    render() {

        let { quotations, current_order, history } = this.props,
            selectedFirm = current_order.selectedFirm,
            orderPrice = quotations.getDetailForSelected(selectedFirm);

        return <div styleName="confirm-box">

            <Header title="确认订单" history={history}/>

            <div styleName="confirm-info">
                <div styleName="info-item">
                    <div styleName="item-left">车辆信息</div>
                    <div styleName="item-right" onClick={() => { history.push('/order-confirm/car') }}>查看详情</div>
                </div>
                <div styleName="info-item">
                    <div styleName="item-left">报价明细</div>
                    <div styleName="item-right" onClick={() => { history.push('/order-confirm/quotation') }}>查看详情</div>
                </div>
                <div styleName="info-item item-last">
                    <div styleName="item-left">客户信息</div>
                    <div styleName="item-right" onClick={() => { history.push('/order-confirm/customer') }}>查看详情</div>
                </div>
            </div>
            <div styleName="amount-info">
                <div styleName={`amount-title-${selectedFirm}`}></div>
                <div styleName="amount-content">
                    <div styleName="amount-item">
                        <div styleName="item-left">保险公司报价</div>
                        <div styleName="amount-item-right">￥{orderPrice.originPrice}</div>
                    </div>
                    <div styleName="amount-item">
                        <div styleName="item-left">工场优惠额度</div>
                        <div styleName="amount-item-right">
                            ￥{orderPrice.discount}</div>
                    </div>
                    <div styleName="amount-item item-last">
                        <div styleName="item-left">实际结算金额</div>
                        <div styleName="amount-item-right color-red">
                            ￥{orderPrice.actualPrice}</div>
                    </div>
                </div>
            </div>

            <BottomButton active={true} title={'确认提交'}
                onClick={() => { current_order.submitOrder(history) } } />
        </div>
    }
}

export default OrderConfirm
