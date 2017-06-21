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

    state = { selected: '' }; // 人保2  太平洋1  平安0

    selectFirm = (firmNo) => {
        let selected = this.state.selected === firmNo ? '' : firmNo;
        this.setState({ selected: selected });
    }

    render() {

        let { quotations, current_order, history } = this.props;

        let gen_quotation_item = (itemId, itemName) => (
            <div styleName="quotation-item" onClick={() => { this.selectFirm(itemId) }}>
                <div styleName="check-box">
                    <i className={this.state.selected === itemId ?
                        styles_icon_circle.checked :
                        styles_icon_circle.unchecked}></i>
                </div>
                <div styleName="quotation-entry" onClick={() => { history.push(`policy-quotation/${itemId}`) }}>
                    <div styleName={`firm-name-${itemId}`}>{itemName}</div>
                    <div styleName="price-container">
                        <div styleName="discount-price">￥{quotations[itemId].actualPrice}</div>
                        <div styleName="origin-price">官网报价{quotations[itemId].originPrice}</div>
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
                <BottomButton active={this.state.selected !== ''} title={'确认提交'}
                    onClick={() => { current_order.selectFirm(history, this.state.selected)} } />
            </div>
        )
    }
}

export default PolicyQuotation
