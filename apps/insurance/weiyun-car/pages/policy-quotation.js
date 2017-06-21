import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { BrowserFactory } from 'fw-javascripts'

import Header from '../components/header'

import styles from '../css/policy-quotation.css'
import styles_icon_circle from '../css/icons/circle.css'

@inject('quotations')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PolicyQuotation extends React.Component {

    state = { selected: null }; // 人保2  太平洋1  平安0

    selectFirm = (firmNo) => {
        let selected = this.state.selected === firmNo ? null : firmNo;
        this.setState({ selected: selected });
    }

    submitHandler = () => {
        this.props.history.replace('/customer')
    }

    render() {

        let { selected } = this.state;
        let { quotations, history } = this.props;

        return (
            <div>
                <Header title="保费报价" history={this.props.history} />

                <div styleName="quotation-container">
                    <div styleName="quotation-item" onClick={() => { this.selectFirm(2) }}>
                        <div styleName="check-box">
                            <i className={selected === 2 ?
                                styles_icon_circle.checked :
                                styles_icon_circle.unchecked}></i>
                        </div>
                        <div styleName="quotation-entry" onClick={() => { history.push('policy-quotation/2') }}>
                            <div styleName="firm-name renbao">人保车险</div>
                            <div styleName="price-container">
                                <div styleName="discount-price">￥{quotations['2'].actualPrice}</div>
                                <div styleName="origin-price">官网报价{quotations['2'].originPrice}</div>
                            </div>
                        </div>
                    </div>
                    <div styleName="quotation-item">
                        <div styleName="check-box" onClick={() => { this.selectFirm(1) }}>
                            <i className={selected === 1 ?
                                styles_icon_circle.checked :
                                styles_icon_circle.unchecked}></i>
                        </div>
                        <div styleName="quotation-entry" onClick={() => { history.push('policy-quotation/1') }}>
                            <div styleName="firm-name taipingyang">太平洋车险</div>
                            <div styleName="price-container">
                                <div styleName="discount-price">￥{quotations['1'].actualPrice}</div>
                                <div styleName="origin-price">官网报价{quotations['1'].originPrice}</div>
                            </div>
                        </div>
                    </div>
                    <div styleName="quotation-item">
                        <div styleName="check-box" onClick={() => { this.selectFirm(0) }}>
                            <i className={selected === 0 ?
                                styles_icon_circle.checked :
                                styles_icon_circle.unchecked}></i>
                        </div>
                        <div styleName="quotation-entry" onClick={() => { history.push('policy-quotation/0') }}>
                            <div styleName="firm-name pingan">平安车险</div>
                            <div styleName="price-container">
                                <div styleName="discount-price">￥{quotations['0'].actualPrice}</div>
                                <div styleName="origin-price">官网报价{quotations['0'].originPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <a styleName="next-btn" onClick={this.submitHandler}>下一步</a>
            </div>
        )
    }
}

export default PolicyQuotation
