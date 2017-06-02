import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'
@inject("insurance") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Insurance extends Component {
    static onEnter() {
        document.title = "险种明细";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "险种明细",
            doInsurance:"投保",
            choose:""
        }
    }
    backwards() {
        history.go(-1);
    }
    render() {
        let {doInsurance,choose} = this.state;
        return <div styleName="insurance-types-wrapper">
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
                    {/*insurance banner图*/}
                    <div styleName="banner">
                            <img src={require('../images/overlook.png')} styleName="banner-picture" alt=""/>
                    </div>
                    {/*投保方案，交强险、车船险*/}
                    <div styleName="insurance-types">
                        {/*投保方案*/}
                        <div styleName="insurance-plan">
                            <span styleName="plan"><img src={require("../images/circle.png")} alt=""/>投保方案</span>
                            <span styleName="right-text">默认为去年投保方案</span>
                        </div>
                        {/*分割线*/}
                        <div styleName="gap-line"></div>
                         {/*交强险、车船险*/}
                        <div styleName="types">
                            <span styleName="type-text">交强险+车船险</span>
                            <span styleName="right-text">必选险种</span>
                        </div>
                    </div>
                    {/*基本险*/}
                    <div styleName="basic-insurance">
                        <div styleName="type-title">基本险</div>
                        <div styleName="basic-insurance-details">
                            {/*车辆损失险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>车辆损失险</span>
                                    <label htmlFor="car" styleName="label">
                                        <input type="checkbox" id="car" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={doInsurance}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*第三者责任险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>第三者责任险</span>
                                    <label htmlFor="responsibility" styleName="label">
                                        <input type="checkbox" id="responsibility" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={choose}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*司机座位险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>司机座位险</span>
                                    <label htmlFor="driver" styleName="label">
                                        <input type="checkbox" id="driver" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={choose}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*乘客座位险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>乘客座位险</span>
                                    <label htmlFor="passenger" styleName="label">
                                        <input type="checkbox" id="passenger" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={choose}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*盗抢险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>盗抢险</span>
                                    <label htmlFor="rob" styleName="label">
                                        <input type="checkbox" id="rob" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={choose}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*附加险*/}
                    <div styleName="additional-insurance">
                        <div styleName="type-title">附加险</div>
                        <div styleName="basic-insurance-details">
                            {/*划痕险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>划痕险</span>
                                    <label htmlFor="scratch" styleName="label">
                                        <input type="checkbox" id="scratch" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={doInsurance}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*玻璃单独破碎险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>玻璃单独破碎险</span>
                                    <select name="" id="" styleName="car-info-select" value={doInsurance}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*自然损失险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>自然损失险</span>
                                    <label htmlFor="nature" styleName="label">
                                        <input type="checkbox" id="nature" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={doInsurance}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*涉水形式损失险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>涉水形式损失险</span>
                                    <label htmlFor="flood" styleName="label">
                                        <input type="checkbox" id="flood" styleName="checkbox"/>
                                        不计免赔
                                    </label>
                                    <select name="" id="" styleName="car-info-select" value={doInsurance}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            {/*第三方特约险*/}
                            <div styleName="insurance-item">
                                <div styleName="sub-insurance-item">
                                    <span>第三方特约险</span>
                                    <select name="" id="" styleName="car-info-select" value={doInsurance}>
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*查询保费按钮*/}
                    <a styleName="next" href="#/quote">
                        查询保费
                    </a>
               </div>
            </div>
    }
}