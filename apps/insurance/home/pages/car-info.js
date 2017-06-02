import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'


import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("car_info") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class CarInfo extends Component {
    static onEnter() {
        document.title = "车辆信息";
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "车辆信息",
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
                                {/*车辆订单*/}
                                {/*banner图*/}
                                <div styleName="banner">
                                    <img src={require('../images/overlook.png')} styleName="banner-picture" alt=""/>
                                </div>
                            </div>
                        </div>
    }
}