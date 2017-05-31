import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("customer") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Customer extends Component {
    static onEnter() {
        document.title = "投保人信息";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "投保人信息",
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
                    <div styleName="applicant-info">
                        {/*基本信息*/}
                        <div styleName="applicant-basic-info">
                            {/*投保人姓名*/}
                            <div styleName="applicant-info-item">
                                <div styleName="sub-applicant-info-item">
                                    <span styleName="left-text">投保人姓名</span>
                                    <input type="text" styleName="fill-car-info"/>
                                </div>
                            </div>
                            {/*投保人手机*/}
                            <div styleName="applicant-info-item">
                                <div styleName="sub-applicant-info-item">
                                    <span styleName="left-text">投保人手机</span>
                                    <input type="text" styleName="fill-car-info"/>
                                </div>
                            </div>
                            {/*身份证号*/}
                            <div styleName="applicant-info-item">
                                <div styleName="sub-applicant-info-item">
                                    <span styleName="left-text">身份证号</span>
                                    <input type="text" styleName="fill-car-info"/>
                                </div>
                            </div>
                            {/*邮箱*/}
                            <div styleName="applicant-info-item">
                                <div styleName="sub-applicant-info-item">
                                    <span styleName="left-text">邮箱</span>
                                    <input type="text" styleName="fill-car-info"/>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
               </div>
    }
}