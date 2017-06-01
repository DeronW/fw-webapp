import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("payment") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Payment extends Component {
    static onEnter() {
        document.title = "结算";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "结算",
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
                        {/*支付金额*/}
                        <div styleName="payment-sum">
                                <span styleName="payment-item">
                                    支付金额（元）
                                    <span styleName="item-money">4500.96</span>
                                </span>
                        </div>
                        {/*支付方式*/}
                        <div styleName="payment-method">
                                {/*logo*/}
                                <div styleName="payment-logo">
                                    <img src={require("../images/payment.png")} alt=""/>
                                </div>
                                {/*描述*/}
                                <div styleName="payment-des">
                                    <label htmlFor="payment-method-selected">
                                        <p styleName="payment-method-title">支付宝</p>
                                        <p styleName="sub-payment-method-title">推荐安装支付宝5.0及以上版本的用户使用</p>
                                    </label>
                                    <input type="radio" id="payment-method-selected" styleName="payment-radio"/>
                                </div>
                        </div>
                        {/*支付按钮*/}
                        <a styleName="next" href="#/result">
                             支付
                        </a>
                    </div>
                </div>
    }
}