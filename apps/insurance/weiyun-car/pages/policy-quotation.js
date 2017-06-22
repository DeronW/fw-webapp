import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { BrowserFactory } from 'fw-javascripts'

import Header from '../components/header'
import BottomButton from '../components/bottom-button'

import styles from '../css/policy-quotation.css'
import styles_icon_circle from '../css/icons/circle.css'

@inject('quotations', 'current_order')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PolicyQuotation extends React.Component {

    render() {

        let { quotations, current_order, history } = this.props,
            quotationAbstract = quotations.abstract;

        let gen_quotation_item = (itemId, itemName) => (
            <div styleName="quotation-item">
                <div styleName="check-box" onClick={() => { current_order.selectFirm(itemId) }}>
                    <i className={current_order.selectedFirm === itemId ?
                        styles_icon_circle.checked :
                        styles_icon_circle.unchecked}></i>
                </div>
                <div styleName="quotation-entry" onClick={() => { history.push(`quotation-detail?selectedFirm=${itemId}`) }}>
                    <div styleName={`firm-name-${itemId}`}>{itemName}</div>
                    <div styleName="price-container">
                        <div styleName="discount-price">￥{quotationAbstract[itemId].actualPrice}</div>
                        <div styleName="origin-price">官网报价￥{quotationAbstract[itemId].originPrice}</div>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                <Header title="保费报价" history={history} />
                <div styleName="quotation-container">
                    { gen_quotation_item('2', '人保车险') }
                    { gen_quotation_item('1', '太平洋车险') }
                    { gen_quotation_item('0', '平安车险') }
                </div>
                <BottomButton active={current_order.selectedFirm !== ''} title={'确认提交'}
                    onClick={() => { current_order.submitSelectedFirm(history)} } />
            </div>
        )
    }
}

export default PolicyQuotation
