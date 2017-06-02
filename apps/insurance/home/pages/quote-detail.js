import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("quote_detail") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class QuoteDetail extends Component {
    static onEnter() {
        document.title = "保费明细";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "保费明细",
        }
    }
    backwards() {
        history.go(-1);
    }
    render(){
        return <div styleName="insurance-wrapper">
                        {/*头部*/}
                        <div styleName="head">
                            <div styleName="return-btn" onClick={this.backwards}>
                                <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                            </div>
                            <div styleName="close">
                                <img src={require('../images/false.jpg')} alt=""/>
                            </div>
                            <div styleName="title">{this.state.title}</div>
                        </div>
                        {/*内容*/}
                        <div styleName="content">
                            {/*标题*/}
                            <p styleName="quote-detail-title"><b styleName="quote-detail-brand">PICC</b>人保车险</p>
                            {/*交强险 车船税*/}
                            <div styleName="insurance-duty">
                                <div styleName="top-line">
                                     <span styleName="top-item-text">交强险+车船税</span>
                                    <span styleName="top-item-money">1402.22元</span>
                                </div>
                                {/*分割线*/}
                                <div styleName="line"></div>
                                <div styleName="center-lines">
                                    {/*交强险*/}
                                    <div styleName="line-item">
                                        <span styleName="item-text">交强险</span>
                                        <span styleName="item-money">547.02元</span>
                                    </div>
                                    {/*车船税*/}
                                    <div styleName="line-item">
                                        <span styleName="item-text">车船税</span>
                                        <span styleName="item-money">828.20元</span>
                                    </div>
                                </div>
                            </div>
                            {/*商业险*/}
                            <div styleName="insurance-duty">
                                <div styleName="top-line">
                                     <span styleName="top-item-text">商业险（优惠20%）</span>
                                    <span styleName="top-item-money">3872.24元</span>
                                </div>
                                {/*分割线*/}
                                <div styleName="line"></div>
                                <div styleName="center-lines">
                                    {/*交强险*/}
                                    <div styleName="line-item">
                                        <span styleName="item-text">车损险</span>
                                        <span styleName="item-money">1796.65元</span>
                                    </div>
                                    {/*车船税*/}
                                    <div styleName="line-item">
                                        <span styleName="item-text">...</span>
                                        <span styleName="item-money">...</span>
                                    </div>
                                    <div styleName="line-item">
                                        <span styleName="item-text">...</span>
                                        <span styleName="item-money">...</span>
                                    </div>
                                    <div styleName="line-item">
                                        <span styleName="item-text">...</span>
                                        <span styleName="item-money">...</span>
                                    </div>
                                    <div styleName="line-item">
                                        <span styleName="item-text">...</span>
                                        <span styleName="item-money">...</span>
                                    </div>
                                    <div styleName="line-item">
                                        <span styleName="item-text">...</span>
                                        <span styleName="item-money">...</span>
                                    </div>
                                </div>
                            </div>
                            {/*总计报价 工场优惠 实际结算价*/}
                            <div styleName="insurance-duty">
                                <div styleName="center-lines">
                                    {/*总计报价*/}
                                    <div styleName="line-item">
                                        <span styleName="item-text">总计报价：</span>
                                        <span styleName="item-money">5274.96元</span>
                                    </div>
                                    {/*工场优惠*/}
                                    <div styleName="line-item">
                                        <span styleName="item-text">工场优惠</span>
                                        <span styleName="item-money">-774元</span>
                                    </div>
                                    {/*实际结算价*/}
                                    <div styleName="line-item">
                                        <span styleName="item-text">实际结算价：</span>
                                        <span styleName="item-money total-sum">4500.96元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    }
}