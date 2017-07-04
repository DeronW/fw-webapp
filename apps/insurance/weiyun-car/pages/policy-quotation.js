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

    componentDidMount() {
        this.props.quotations.fetchQuotations();
    }

    handleClickOnItem = (source, hasDetail) => {
        let { quotations, history } = this.props;
        hasDetail ?
            history.push(`quotation-detail?selectedFirm=${source}`)
            :
            quotations.fetchQuotations(source);
    }

    render() {
        let { quotations, current_order, history } = this.props,
            quotationsDetail = quotations.detail;

        let gen_quotation_item = (source, sourceName) => {
            let selectedDetail = quotationsDetail[source],
                hasDetail = !(Object.keys(selectedDetail).length === 0 && selectedDetail.constructor === Object),
                selectState = !hasDetail ?
                                'disabled' :
                                current_order.selectedFirm === source ?
                                    'checked' :
                                    'unchecked';
            return (
                <div styleName="quotation-item">
                    <div styleName="check-box" onClick={() => { current_order.selectFirm(source, hasDetail) }}>
                        <i className={styles_icon_circle[selectState]}></i>
                    </div>
                    <div styleName="quotation-entry" onClick={() => { this.handleClickOnItem(source, hasDetail) }}>
                        <div styleName={`firm-name-${source}`}>{sourceName}</div>
                        <div styleName="price-container">
                            <div styleName="discount-price">{hasDetail ? `￥${selectedDetail.actualPrice}` : '暂无报价'}</div>
                            <div styleName="origin-price">{hasDetail ? `官网报价￥${selectedDetail.originPrice}` : '点击获取'}</div>
                        </div>
                    </div>
                </div>
            )
        }

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
