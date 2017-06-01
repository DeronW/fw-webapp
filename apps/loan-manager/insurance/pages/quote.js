import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("quote") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Quote extends Component {
    static onEnter() {
        document.title = "完善车辆信息";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "保费报价",
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
                    <div styleName="insurance-quote-list">
                        {/*平安保险*/}
                        <div styleName="insurance-quote">
                            {/*左边单选按钮*/}
                            <div styleName="radio-block">
                                <input type="radio" styleName="radio"/>
                            </div>
                            {/*中间主要内容部分*/}
                            <div styleName="quote-center">
                                <div styleName="quote"><b styleName="quote-to">平安车险</b><span styleName="official-quote">官网报价<span styleName="quote-num">3900.00元</span></span></div>
                                <div styleName="middle-line"></div>
                                <div styleName="fund-line"><span>工场优惠价</span><b styleName="fund">3094.14元</b></div>
                            </div>
                            {/*右边向右图标*/}
                            <a styleName="forwards" href="#/quote-detail">
                                <img src={require('../images/back.png')}  alt="" />
                            </a>
                        </div>
                        {/*太平洋车险*/}
                        <div styleName="insurance-quote">
                            {/*左边单选按钮*/}
                            <div styleName="radio-block">
                                <input type="radio" styleName="radio"/>
                            </div>
                            {/*中间主要内容部分*/}
                            <div styleName="quote-center">
                                <div styleName="quote"><b styleName="quote-to">太平洋车险</b><span styleName="official-quote">官网报价<span styleName="quote-num">3867.14元</span></span></div>
                                <div styleName="middle-line"></div>
                                <div styleName="fund-line"><span>工场优惠价</span><b styleName="fund">3094.14元</b></div>
                            </div>
                            {/*右边向右图标*/}
                            <a styleName="forwards" href="#/quote-detail">
                                <img src={require('../images/back.png')}  alt="" />
                            </a>
                        </div>
                        {/*人保车险*/}
                        <div styleName="insurance-quote">
                            {/*左边单选按钮*/}
                            <div styleName="radio-block">
                                <input type="radio" styleName="radio"/>
                            </div>
                            {/*中间主要内容部分*/}
                            <div styleName="quote-center">
                                <div styleName="quote"><b styleName="quote-to">人保车险</b><span styleName="official-quote">官网报价<span styleName="quote-num">3867.14元</span></span></div>
                                <div styleName="middle-line"></div>
                                <div styleName="fund-line"><span>工场优惠价</span><b styleName="fund">3094.14元</b></div>
                            </div>
                            {/*右边向右图标*/}
                            <a styleName="forwards" href="#/quote-detail">
                                <img src={require('../images/back.png')}  alt="" />
                            </a>
                        </div>
                    </div>
                    {/*确认提交按钮*/}
                    <a styleName="next" href="#/customer">
                        确认提交
                    </a>
                </div>
               </div>
    }
}