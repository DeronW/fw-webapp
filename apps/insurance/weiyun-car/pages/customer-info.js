import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { BrowserFactory } from 'fw-javascripts'

import Header from '../components/header'
import BottomButton from '../components/bottom-button.js'

import styles from '../css/customer-info.css'

@inject('customer_info')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class CustomerInfo extends React.Component {

    changeHandler = (type, k) => (e) => {
        this.props.customer_info.setFormData(type, k, e.target.value);
    }

    cardIdInputHandler = (type) => e => {
        let v = e.target.value;
        v = v.replace(/[^\d+|^x|^X]/g, '');
        this.props.customer_info.setFormData(type, 'cardId', v);
    }

    render() {
        let { customer_info } = this.props;
        return (
            <div styleName="fake-body">
                <Header title="投保人信息" history={this.props.history} />
                <div styleName="customer-info-container">
                    <div styleName="customer-info-grp">
                        <div styleName="info-label">投保人信息</div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">投保人姓名</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                value={customer_info.holder.name}
                                onChange={this.changeHandler('holder', 'name')} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">投保人手机</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                type="tel" maxLength="11"
                                value={customer_info.holder.mobile}
                                onChange={this.changeHandler('holder', 'mobile')} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">身份证号</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                value={customer_info.holder.cardId}
                                onChange={this.cardIdInputHandler('holder')} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">邮箱</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                value={customer_info.holder.email}
                                onChange={this.changeHandler('holder', 'email')} />
                        </div>
                        <div styleName="upload-img-item">
                            <div styleName="img-upload-label">上传身份证照片</div>
                            <div styleName="img-upload-tip">按保监局要求上传身份证正反面照片</div>
                            <div styleName="upload-img-container">
                                <div styleName="upload-img-left" onClick={() => { customer_info.triggerUploadImg() }}>
                                    { customer_info.holder.image1 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer_info.holder.image1}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br/>身份证正面照片</div>
                                    }
                                </div>
                                <div styleName="upload-img-right" onClick={() => { customer_info.triggerUploadImg() }}>
                                    { customer_info.holder.image2 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer_info.holder.image2}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br/>身份证反面照片</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div styleName="same-person-check" onClick={customer_info.toggleSamePerson}>
                            <div styleName={`fake-check-icon${customer_info.isSame ? ' checked' : ''}`}></div>
                            投保人信息与被保人信息一致
                        </div>
                    </div>
                    {!customer_info.isSame &&
                        <div styleName="customer-info-grp">
                            <div styleName="info-label">被保人信息</div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">被保人姓名</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    value={customer_info.recognizee.name}
                                    onChange={this.changeHandler('recognizee', 'name')} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">被保人手机</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    type="tel" maxLength="11"
                                    value={customer_info.recognizee.mobile}
                                    onChange={this.changeHandler('recognizee', 'mobile')} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">身份证号</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    value={customer_info.recognizee.cardId}
                                    onChange={this.cardIdInputHandler('recognizee')} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">邮箱</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    value={customer_info.recognizee.email}
                                    onChange={this.changeHandler('recognizee', 'email')}/>
                            </div>
                            <div styleName="upload-img-item">
                                <div styleName="img-upload-label">上传身份证照片</div>
                                <div styleName="img-upload-tip">按保监局要求上传身份证正反面照片</div>
                                <div styleName="upload-img-container">
                                    <div styleName="upload-img-left" onClick={() => { customer_info.triggerUploadImg() }}>
                                        { customer_info.recognizee.image1 ?
                                            <div styleName="upload-img-display" style={{ background: `url(${customer_info.recognizee.image1}) #fff no-repeat center` }}></div>
                                            :
                                            <div styleName="upload-img-tip">请添加<br/>身份证正面照片</div>
                                        }
                                    </div>
                                    <div styleName="upload-img-right" onClick={() => { customer_info.triggerUploadImg() }}>
                                        { customer_info.recognizee.image2 ?
                                            <div styleName="upload-img-display" style={{ background: `url(${customer_info.recognizee.image2}) #fff no-repeat center` }}></div>
                                            :
                                            <div styleName="upload-img-tip">请添加<br/>身份证反面照片</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div styleName="customer-info-grp">
                        <div styleName="info-label">上传驾驶证照片</div>
                        <div styleName="upload-img-item">
                            <div styleName="img-upload-tip">按保监局要求上传驾驶证正反面照片</div>
                            <div styleName="upload-img-container">
                                <div styleName="upload-img-left" onClick={() => { customer_info.triggerUploadImg() }}>
                                    { customer_info.vehicleLicenseImage1 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer_info.vehicleLicenseImage1}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br/>驾驶证正面照片</div>
                                    }
                                </div>
                                <div styleName="upload-img-right" onClick={() => { customer_info.triggerUploadImg() }}>
                                    { customer_info.vehicleLicenseImage2 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer_info.vehicleLicenseImage2}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br/>驾驶证反面照片</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomButton active={customer_info.valid} title="确认提交"
                    onClick={() => customer_info.submit(history)} />
            </div>
        )
    }
}

export default CustomerInfo
