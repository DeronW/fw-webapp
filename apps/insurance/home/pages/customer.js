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
        return <div styleName="insurance-applicant-wrapper">
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
                                {/*上传身份证照片和行驶证照片*/}
                                <div styleName="applicant-photo-upload">
                                    {/*上传身份证照片*/}
                                    <div styleName="upload-ID-photo">
                                        <p styleName="photo-title">上传身份证照片</p>
                                        <p>（按保监局要求需上传身份证正反面照片）</p>
                                        <div styleName="photos">
                                            {/*添加身份证正面照片*/}
                                            <dl styleName="photo-item-front">
                                                <dt styleName="photo-self"><img src={require("../images/upload.png")} alt=""/></dt>
                                                <dd styleName="photo-tip">请添加身份证正面照片</dd>
                                            </dl>
                                            {/*添加身份证反面照片*/}
                                            <dl styleName="photo-item-end">
                                                <dt styleName="photo-self"><img src={require("../images/upload.png")} alt=""/></dt>
                                                <dd styleName="photo-tip">请添加身份证反面照片</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    {/*分割线*/}
                                    <div styleName="between-line"></div>
                                    {/*投保人信息与被保险人信息是否一致*/}
                                    <div styleName="check">
                                        <label htmlFor="check">投保人信息与被保险人信息是否一致</label>
                                        <input type="checkbox" id="check" styleName="check-checkbox"/>
                                    </div>
                                    {/*上传行驶证照片*/}
                                    <div styleName="upload-ID-photo">
                                        <p styleName="photo-title">上传行驶证照片</p>
                                        <p>（按保监局要求需上传行驶证正反面照片）</p>
                                        <div styleName="photos">
                                            {/*添加行驶证正面照片*/}
                                            <dl styleName="photo-item-front">
                                                <dt styleName="photo-self"><img src={require("../images/upload.png")} alt=""/></dt>
                                                <dd styleName="photo-tip">请添加身份证正面照片</dd>
                                            </dl>
                                            {/*添加行驶证反面照片*/}
                                            <dl styleName="photo-item-end">
                                                <dt styleName="photo-self"><img src={require("../images/upload.png")} alt=""/></dt>
                                                <dd styleName="photo-tip">请添加身份证反面照片</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                 {/*确认提交按钮*/}
                                <a styleName="next" href="#/confirm">
                                    确认提交
                                </a>
                            </div>
                    </div>
               </div>
    }
}