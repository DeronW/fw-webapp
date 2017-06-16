import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'
import BottomButton from '../components/bottom-button.js'

import styles from '../css/customer.css'
import styles_icon_circle from '../css/icons/circle.css'

@inject('customer')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Customer extends React.Component {

    changeHandler = (type, k) => (e) => {
        this.props.customer.setFormData(type, k, e.target.value);
    }

    cardIdInputHandler = (type) => e => {
        let v = e.target.value;
        v = v.replace(/[^\d+|^x|^X]/g, '');
        this.props.customer.setFormData(type, 'cardId', v);
    }

    fileChangeHandler = name => event => {
        let target = event.target,
            fpath = event.target.value,
            ext = fpath.split('.').pop().toLowerCase();

        let fr = new FileReader()
        fr.readAsDataURL(target.files[0])
        fr.onload = ofrEvent => {
            console.log('read a file', ofrEvent)
            console.log(ofrEvent.target.result)
        };
    }

    render() {
        let { customer } = this.props;
        return (
            <div styleName="fake-body">
                <Header title="投保人信息" history={this.props.history} />
                <div styleName="customer-container">
                    <div styleName="customer-grp">
                        <div styleName="info-label">投保人信息</div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">投保人姓名</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                value={customer.holder.name}
                                onChange={this.changeHandler('holder', 'name')} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">投保人手机</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                type="tel" maxLength="11"
                                value={customer.holder.mobile}
                                onChange={this.changeHandler('holder', 'mobile')} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">身份证号</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                value={customer.holder.cardId}
                                onChange={this.cardIdInputHandler('holder')} />
                        </div>
                        <div styleName="info-item">
                            <div styleName="info-item-type">邮箱</div>
                            <input styleName="info-item-input" placeholder="请输入"
                                value={customer.holder.email}
                                onChange={this.changeHandler('holder', 'email')} />
                        </div>
                        <div styleName="upload-img-item">
                            <div styleName="img-upload-label">上传身份证照片</div>
                            <div styleName="img-upload-tip">按保监局要求上传身份证正反面照片</div>
                            <div styleName="upload-img-container">
                                <div styleName="upload-img-left" onClick={() => { customer.triggerUploadImg() }}>
                                    {customer.holder.image1 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer.holder.image1}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br />身份证正面照片</div>
                                    }

                                    <input type="file" onChange={this.fileChangeHandler('s1')} />
                                </div>
                                <div styleName="upload-img-right" onClick={() => { customer.triggerUploadImg() }}>
                                    {customer.holder.image2 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer.holder.image2}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br />身份证反面照片</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div styleName="same-person-check" onClick={customer.toggleSamePerson}>
                            <i className={customer.isSame ?
                                styles_icon_circle.checked :
                                styles_icon_circle.unchecked}></i>
                            投保人信息与被保人信息一致
                        </div>
                    </div>
                    {!customer.isSame &&
                        <div styleName="customer-grp">
                            <div styleName="info-label">被保人信息</div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">被保人姓名</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    value={customer.recognizee.name}
                                    onChange={this.changeHandler('recognizee', 'name')} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">被保人手机</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    type="tel" maxLength="11"
                                    value={customer.recognizee.mobile}
                                    onChange={this.changeHandler('recognizee', 'mobile')} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">身份证号</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    value={customer.recognizee.cardId}
                                    onChange={this.cardIdInputHandler('recognizee')} />
                            </div>
                            <div styleName="info-item">
                                <div styleName="info-item-type">邮箱</div>
                                <input styleName="info-item-input" placeholder="请输入"
                                    value={customer.recognizee.email}
                                    onChange={this.changeHandler('recognizee', 'email')} />
                            </div>
                            <div styleName="upload-img-item">
                                <div styleName="img-upload-label">上传身份证照片</div>
                                <div styleName="img-upload-tip">按保监局要求上传身份证正反面照片</div>
                                <div styleName="upload-img-container">
                                    <div styleName="upload-img-left" onClick={() => { customer.triggerUploadImg() }}>
                                        {customer.recognizee.image1 ?
                                            <div styleName="upload-img-display" style={{ background: `url(${customer.recognizee.image1}) #fff no-repeat center` }}></div>
                                            :
                                            <div styleName="upload-img-tip">请添加<br />身份证正面照片</div>
                                        }
                                    </div>
                                    <div styleName="upload-img-right" onClick={() => { customer.triggerUploadImg() }}>
                                        {customer.recognizee.image2 ?
                                            <div styleName="upload-img-display" style={{ background: `url(${customer.recognizee.image2}) #fff no-repeat center` }}></div>
                                            :
                                            <div styleName="upload-img-tip">请添加<br />身份证反面照片</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div styleName="customer-grp">
                        <div styleName="info-label">上传驾驶证照片</div>
                        <div styleName="upload-img-item">
                            <div styleName="img-upload-tip">按保监局要求上传驾驶证正反面照片</div>
                            <div styleName="upload-img-container">
                                <div styleName="upload-img-left" onClick={() => { customer.triggerUploadImg() }}>
                                    {customer.vehicleLicenseImage1 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer.vehicleLicenseImage1}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br />驾驶证正面照片</div>
                                    }
                                </div>
                                <div styleName="upload-img-right" onClick={() => { customer.triggerUploadImg() }}>
                                    {customer.vehicleLicenseImage2 ?
                                        <div styleName="upload-img-display" style={{ background: `url(${customer.vehicleLicenseImage2}) #fff no-repeat center` }}></div>
                                        :
                                        <div styleName="upload-img-tip">请添加<br />驾驶证反面照片</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomButton active={customer.valid} title="确认提交"
                    onClick={() => customer.submit(history)} />
            </div>
        )
    }
}

export default Customer
