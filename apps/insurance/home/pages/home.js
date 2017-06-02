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
        document.title = "车险";
    }
    constructor(props) {
        super(props);
        this.state = {
            title:"车险",
            place: "",
            region: "",
            carNum: "",
            name: "",
            IDNum: "",
            company: "",
            chooseRegion:"请选择"
        }
    }
    render(){
        const {chooseRegion} = this.state;
        return <div>
           <div styleName="insurance-wrapper">
                {/*头部*/}
                <div styleName="head">
                    <div styleName="return-btn">
                        <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                    </div>
                    <div styleName="close">
                        <img src={require('../images/false.jpg')} alt=""/>
                    </div>
                    <div styleName="title" >{this.state.title}</div>
                    <a styleName="to-order-list" href="#/order-list">我的订单</a>
                </div>
               {/*内容*/} 
                <div styleName="content">
                    {/*banner图片*/}
                    <div styleName="banner">
                        <img src={require('../images/banner.png')} styleName="banner-picture" alt=""/>
                    </div>
                    {/*投保地区*/}
                    <div styleName="insurance-region">
                        <span styleName="first-left-text">投保地区</span>
                        <select name="" id="" styleName="choose-insurance-region" value={chooseRegion}>
                            <option value="">请选择</option>
                        </select>
                    </div>
                    {/*基本信息*/}
                    <div styleName="info">
                        {/*车牌号码*/}
                        <div styleName="car-num">
                            <div styleName="sub-car-num">
                                <span styleName="left-text">车牌号码</span>
                                <select name="" id="" styleName="choose-car-num" value={chooseRegion}>
                                    <option value="">请选择</option>
                                </select>
                                <input type="text" styleName="fill-home-info"/>
                            </div>
                        </div>
                        {/*车主姓名*/}
                        <div styleName="name">
                            <div styleName="sub-name">
                                <span styleName="left-text">车主姓名</span>
                                <input type="text" styleName="fill-home-info"/>
                            </div>
                        </div>
                        {/*身份证号*/}
                        <div styleName="id-num">
                            <div styleName="sub-id-num">
                                <span styleName="left-text">身份证号</span>
                                <input type="text" styleName="fill-home-info"/>
                            </div>
                        </div>
                        {/*投保公司*/}
                        <div styleName="company">
                            <div styleName="sub-company">
                                <span styleName="left-text">投保公司</span>
                            </div>
                            <select name="" id="" styleName="choose-company" value={chooseRegion}>
                                <option value="">请选择</option>
                            </select>
                        </div>
                    </div>
                    {/*下一步按钮*/}
                    <a styleName="next" href="#/car">
                        下一步
                    </a>
                </div>
            </div>
        </div>
    }
}