import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Components } from 'fw-javascripts'

import { Header } from '../../lib/components'

import styles from '../css/idcard-ocr.css'

@inject('idcard_ocr')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OcrItem extends React.Component {
    render() {
        let { idcard_ocr,
            field, name, disabled, placeholder } = this.props;
        return <div styleName="ocr-item">
            <div styleName="ocr-item-name">{name}</div>
            <input styleName="ocr-item-value"
                disabled={disabled}
                placeholder={placeholder || ''}
                onChange={idcard_ocr.handleItemEdit(field)}
                value={idcard_ocr.data[field]}/>
        </div>
    }
}


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class IdcardOcr extends React.Component {

    state = {
        extValid: false,
        disableEdit: false
    }

    handleImgInput = e => {
        const fileObj = e.target,
            ext = fileObj.value.split('.').pop().toLowerCase();
        if (ext !== 'png' && ext !== 'jpg') {
            Components.showToast('图片格式不正确');
        } else {
            this.setState({ extValid: true })
        }

        const imgFile = fileObj.files[0];
        let fr = new FileReader(),
            imgData;
        fr.onload = e => {
            imgData = e.target.result;
            console.log(imgData);
        };
        fr.readAsDataURL(imgFile);
    }

    render() {
        let { disableEdit } = this.state;
        return <div styleName="bg">
            <Header title="身份证识别" />

            <div styleName="capture-container">
                <div styleName="capture-title">请分别拍摄身份证正反面，系统自动识别</div>

                <div styleName="capture-card-portrait">
                    <div styleName="img-input-container">
                        <img src={require("../images/idcard-ocr/idcard-portrait-bg.png")} />
                        <input type="file" capture="camera" accept="image/*"
                        onChange={this.handleImgInput} />
                    </div>
                    <div styleName="capture-tip">拍摄人像面</div>
                </div>

                <div styleName="capture-card-emblem">
                    <div styleName="img-input-container">
                        <img src={require("../images/idcard-ocr/idcard-portrait-bg.png")} />
                        <input type="file" capture="camera" accept="image/*"
                        onChange={this.handleImgInput} />
                    </div>
                    <div styleName="capture-tip">拍摄国徽面</div>
                </div>
            </div>

            <div styleName="edit-tip">
                <span styleName="edit-tip-text">请核对信息，内容有误请修改</span>
                <span styleName="edit-btn">编辑</span>
            </div>

            <div styleName="ocr-item-grp">
                <OcrItem field="name" name="姓名" disabled={disableEdit} placeholder="请点击上方按钮拍照识别" />
                <OcrItem field="idNo" name="身份证号" disabled={disableEdit} />
                <OcrItem field="birth" name="出生年月" disabled={disableEdit} />
                <OcrItem field="race" name="民族" disabled={disableEdit} />
                <OcrItem field="address" name="住址" disabled={disableEdit} />
                <OcrItem field="issuedBy" name="签发机关" disabled={disableEdit} placeholder="请点击上方按钮拍照识别" />
                <OcrItem field="validDate" name="有效期" disabled={disableEdit} />
            </div>

            <div styleName="submit-btn-container">
                <div styleName="submit-btn">提交</div>
            </div>
        </div>
    }

}


export default IdcardOcr
