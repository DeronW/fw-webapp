import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("home") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Home extends Component {
    static onEnter() {
        document.title = "我的订单";
    }
    constructor(props) {
        super(props);
        this.state = {
            title:"我的订单"
        }
    }
    backwards(){
        history.go(-1);
    }
    render(){
        let tabs_pannel = ["全部订单","已支付","未支付","已完成"];
        let tab_li = (item,index) => {
            return <li key={index}><div styleName="tab-text">{item}</div></li>
        }
        let list_li = (item,index) =>{
            return <li key={index}>
                    <div styleName="order-list-item">
                        <p styleName="order-number-line"><span>订单号：100101001010</span>已支付<span></span></p>
                        <p styleName="money-line"><span>续保.京JV7587</span><span>4500.00元</span></p>
                    </div>
                </li>
        }
        return <div>
            <div styleName="insurance-wrapper">
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
                    {/*全部订单 已支付 未支付 已完成切换头部*/}
                    <ul styleName="tabs">
                            {tabs_pannel.map(tab_li)}
                    </ul>
                    {/*具体订单块*/}
                    <ul styleName="order-list-block">
                        {/*先写成静态的*/}
                        {/*已支付*/}
                        <li>
                            <div styleName="order-list-item">
                                <p styleName="order-number-line"><span>订单号：100101001010</span><span styleName="isPay">已支付</span></p>
                                <p styleName="money-line"><span>续保.京JV7587</span><span styleName="money">4500.00元</span></p>
                            </div>
                        </li>
                        {/*未支付*/}
                        <li>
                            <div styleName="order-list-item-unpay">
                                <p styleName="order-number-line"><span>订单号：100101001010</span><span styleName="isPay">未支付</span></p>
                                <p styleName="money-line"><span>续保.京JV7587</span><span styleName="money">4500.00元</span></p>
                                <div styleName="line"></div>
                                <div styleName="pay">支付</div>
                            </div>
                        </li>
                    </ul>
               </div>

            </div>
        </div>
    }
}