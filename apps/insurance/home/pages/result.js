import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("result") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Result extends Component {
    static onEnter() {
        document.title = "交易结果";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "交易结果",
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
                            <div styleName="expand-title">{this.state.title}</div>
                            <a styleName="to-order-list" href="#/order-list">我的订单</a>
                        </div>
                        {/*内容*/}
                        <div styleName="content">
                            {/*交易状态*/}
                            <div styleName="result-status">
                                <span>订单状态：<span>已付款</span></span>
                                {/*右边图片*/}
                                <div styleName="result-logo">
                                    <img src={require("../images/QR-code.png")} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
    }
}