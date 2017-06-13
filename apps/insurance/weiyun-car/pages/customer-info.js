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
                            <input styleName="info-item-input" placeholder="请输入" value={customer_info.holder.Name} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">投保人手机</div>
                            <input styleName="info-item-input" placeholder="请输入" value={customer_info.holder.Mobile} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">身份证号</div>
                            <input styleName="info-item-input" placeholder="请输入" value={customer_info.holder.CardId} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">邮箱</div>
                            <input styleName="info-item-input" placeholder="请输入" value={customer_info.holder.Email} />
                        </div>
                        <div styleName="upload-img-item">
                            <div styleName="img-upload-label">上传身份证照片</div>
                            <div styleName="img-upload-tip">按保监局要求上传身份证正反面照片</div>
                            <div styleName="upload-img-container">
                                {customer_info.holder.Image1 ?
                                    <div styleName="upload-img-left" style={{ background: `url(${customer_info.holder.Image1}) #fff no-repeat center` }}></div>
                                    :
                                    <div styleName="upload-img-left">请添加<br />身份证正面照片</div>
                                }
                                {customer_info.holder.Image2 ?
                                    <div styleName="upload-img-right" style={{ background: `url(${customer_info.holder.Image2}) #fff no-repeat center` }}></div>
                                    :
                                    <div styleName="upload-img-right">请添加<br />身份证反面照片</div>
                                }
                            </div>
                        </div>
                        <div styleName="same-person-check">
                            <div styleName="fake-check-icon"></div>
                            投保人信息与被保人信息一致
                        </div>
                    </div>
                    {!customer_info.isSame &&
                        <div styleName="customer-info-grp">
                            <div styleName="info-label">被保人信息</div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">被保人姓名</div>
                                <input styleName="info-item-input" placeholder="请输入" value={customer_info.recognizee.Name} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">被保人手机</div>
                                <input styleName="info-item-input" placeholder="请输入" value={customer_info.recognizee.Mobile} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">身份证号</div>
                                <input styleName="info-item-input" placeholder="请输入" value={customer_info.recognizee.CardId} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">邮箱</div>
                                <input styleName="info-item-input" placeholder="请输入" value={customer_info.recognizee.Email} />
                            </div>
                            <div styleName="upload-img-item">
                                <div styleName="img-upload-label">上传身份证照片</div>
                                <div styleName="img-upload-tip">按保监局要求上传身份证正反面照片</div>
                                <div styleName="upload-img-container">
                                    {customer_info.recognizee.Image1 ?
                                        <div styleName="upload-img-left" style={{ background: `url(${customer_info.recognizee.Image1}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-left">请添加<br />身份证正面照片</div>
                                    }
                                    {customer_info.recognizee.Image2 ?
                                        <div styleName="upload-img-right" style={{ background: `url(${customer_info.recognizee.Image2}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-right">请添加<br />身份证反面照片</div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div styleName="customer-info-grp">
                        <div styleName="info-label">被保人信息</div>
                        <div styleName="upload-img-item">
                            <div styleName="img-upload-tip">按保监局要求上传身份证正反面照片</div>
                            <div styleName="upload-img-container">
                                {customer_info.vehicleLicenseImage1 ?
                                    <div styleName="upload-img-left" style={{ background: `url(${customer_info.vehicleLicenseImage1}) #fff no-repeat center` }}></div>
                                    :
                                    <div styleName="upload-img-left">请添加<br />行驶证正面照片</div>
                                }
                                {customer_info.vehicleLicenseImage2 ?
                                    <div styleName="upload-img-right" style={{ background: `url(${customer_info.vehicleLicenseImage2}) #fff no-repeat center` }}></div>
                                    :
                                    <div styleName="upload-img-right">请添加<br />行驶证反面照片</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <BottomButton active={true} title="确认提交"
                    onClick={() => customer_info.submit(history)} />
            </div>
        )
    }
}

export default CustomerInfo
