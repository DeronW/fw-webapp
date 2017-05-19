import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import * as $FWC from 'fw-components'

@inject("cash") @observer @CSSModules(styles)
export default class Cash extends React.Component {
    static onEnter() {
        document.title = "提现";
    }

    state = {
        title:"提现",
        inputValue:""
    }
    componentDidMount(){
        
    }
    render(){
        return <div>
            <div styleName="cash-wrapper">
                {/*头部*/}
                <div styleName="head">
                    <div styleName="return-btn">
                        <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                    </div>
                    <div styleName="title" >{this.state.title}</div>
                    <span styleName="to-cash-records">提现记录</span>
                </div>
               {/*内容*/}
                <div styleName="content">
                     {/*卡号信息*/}
                    <div styleName="bank-info">
                        {/*左边银行logo*/}
                        <div styleName="bank-logo">
                            <img styleName="logo" src={require("../images/ico-zhaoshang.jpg")} alt=""/>
                        </div>
                        {/*中间银卡号信息*/}
                        <div styleName="bank-detail">
                            <div styleName="bank-name">工商银行</div>
                            <div styleName="bank-num">123456789012345678</div>
                        </div>
                        {/*右边快捷logo*/}
                        <div styleName="fast-payment">
                            <img src={require('../images/ico-kuaijie.png')} alt=""/>
                        </div>
                    </div>
                    {/*绑定卡温馨小提示*/}
                    <div styleName="notice">
                        <div styleName="text">如果您绑定的银行卡暂不支持手机快捷支付请联系客服<a href="tel:400-0322-988" styleName="call-num">400-0322-988</a>
                        </div>
                    </div>
                    {/*可提现金金额*/}
                    <div styleName="aviliable-money">
                        <span styleName="plain-text">可提现金额(元)：<b styleName="amount">0</b></span>
                    </div>
                    {/*提现输入框*/}
                    <div styleName="money-cover">
                        <div styleName="sub-cover">
                            <div styleName="input-side">
                                <input type="text" styleName="input-money"/>
                            </div>
                            <div styleName="click-side">
                                <span styleName="draw-money">全提</span>
                            </div>
                        </div>
                        
                    </div>
                    {/*提现方式*/}
                    {/*<div styleName="draw-money-method">
                        <div styleName="draw-title">提现方式</div>
                    </div>*/}
                </div>
            </div>
        </div>
    }
}