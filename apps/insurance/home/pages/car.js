import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'


@inject("car") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Car extends Component {
    static onEnter() {
        document.title = "完善车辆信息";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "完善车辆信息",
            chooseDate:"请选择"
        }
    }
    backwards() {
        history.go(-1);
    }
    render(){
        let {chooseDate} = this.state;
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
                    {/*需完善的车辆信息*/}
                    <div styleName="car-necessary-info">
                        {/*品牌型号*/}
                        <div styleName="brand">
                            <div styleName="sub-brand">
                                <span styleName="left-text">品牌型号</span>
                                <input type="text" styleName="fill-car-info"/>
                            </div>
                        </div>
                        {/*发动机号*/}
                        <div styleName="engine-num">
                            <div styleName="sub-engine-num">
                                <span styleName="left-text">发动机号</span>
                                <input type="text" styleName="fill-car-info"/>
                            </div>
                        </div>
                        {/*车架号*/}
                        <div styleName="chassis-num">
                            <div styleName="sub-chassis-num">
                                <span styleName="left-text">车架号</span>
                                <input type="text" styleName="fill-car-info"/>
                            </div>
                        </div>
                        {/*注册日期*/}
                        <div styleName="register-date">
                            <div styleName="sub-register-date">
                                <span styleName="left-text">注册日期</span>
                                <select name="" id="" styleName="car-info-select" value={chooseDate}>
                                    <option value="">请选择</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/*下面温馨提示*/}
                    <p styleName="car-info-fill-notice">请根据行驶证信息正确填写</p>
                    {/*确认提交按钮*/}
                    <a styleName="next" href="#/insurance">
                        确认提交
                    </a>
                </div>
               </div>
    }
}