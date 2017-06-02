import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("confirm") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Confirm extends Component {
    static onEnter() {
        document.title = "确认订单";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "确认订单",
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
                    </div>
                    {/*内容*/}
                    <div styleName="content">
                        {/*车辆信息 报价明细 客户信息*/}
                        <div styleName="final-info">
                            {/*车辆信息*/}
                            <div styleName="final-info-item">
                                <span styleName="info-side">
                                    <img src={require("../images/car.png")} alt=""/>
                                    车辆信息
                                </span>
                                <a href="#/car-info" styleName="view-details">
                                    <span styleName="view-detail-text">查看详情</span>
                                    <img src={require("../images/back.png")} alt=""/>
                                </a>
                            </div>
                            {/*分割线*/}
                            <div styleName="line"></div>
                            {/*报价明细*/}
                            <div styleName="final-info-item">
                                <span styleName="info-side">
                                    <img src={require("../images/detail.png")} alt=""/>
                                    车辆信息
                                </span>
                                <a href="#/quote-detail" styleName="view-details">
                                    <span styleName="view-detail-text">查看详情</span>
                                    <img src={require("../images/back.png")} alt=""/>
                                </a>
                            </div>
                            {/*分割线*/}
                            <div styleName="line"></div>
                            {/*客户信息*/}
                            <div styleName="final-info-item">
                                <span styleName="info-side">
                                    <img src={require("../images/person.png")} alt=""/>
                                    车辆信息
                                </span>
                                <a href="#/user-info" styleName="view-details">
                                    <span styleName="view-detail-text">查看详情</span>
                                    <img src={require("../images/back.png")} alt=""/>
                                </a>
                            </div>
                        </div>
                        {/*PICC 人保车险*/}
                        <div styleName="PICC">
                            {/*标题*/}
                            <p styleName="PICC-title"><b styleName="PICC-self">PICC</b>人保车险</p>
                            {/*分割线*/}
                            <div styleName="line"></div>
                            {/*保险公司报价 工厂优惠额度 实际结算金额*/}
                            {/*保险公司报价*/}
                            <div styleName="PICC-sum">
                                <span styleName="sun-item">保险公司报价（元）</span>
                                <span styleName="item-money">2555.84</span>
                            </div>
                            {/*工厂优惠额度*/}
                            <div styleName="PICC-sum">
                                <span styleName="sun-item">工厂优惠额度（元）</span>
                                <span styleName="item-money">168</span>
                            </div>
                            {/*实际结算金额*/}
                            <div styleName="PICC-sum">
                                <span styleName="sun-item">实际结算金额（元）</span>
                                <span styleName="item-money">2387.84</span>
                            </div>

                        </div>
                        {/*确认提交按钮*/}
                        <a styleName="next" href="#/payment">
                            确认提交
                        </a>
                    </div>
               </div>
    }
}