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
        const { idcard_ocr,
            field, name, onEdit, placeholder } = this.props;
        return <div styleName="ocr-item">
            <div styleName="ocr-item-name">{name}</div>
            <input styleName="ocr-item-value"
                disabled={!onEdit}
                placeholder={placeholder || ''}
                onChange={idcard_ocr.handleItemEdit(field)}
                value={idcard_ocr.data[field]}/>
        </div>
    }
}

@inject('idcard_ocr')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class IdcardOcr extends React.Component {

    state = {
        onEdit: false
    }

    handleImgInput = imgType => e => {
        const fileObj = e.target,
            ext = fileObj.value.split('.').pop().toLowerCase();
        if (!fileObj.value) return // 放弃上传
        if (ext !== 'png' && ext !== 'jpg') return Components.showToast('图片格式不正确');

        const imgFile = fileObj.files[0];
        let fr = new FileReader(),
            imgData;
        fr.onload = e => {
            imgData = e.target.result;
            this.props.idcard_ocr.uploadIdcardImg(imgType, imgData);
        };
        fr.readAsDataURL(imgFile);
    }

    enableEdit = () => {
        if (!this.props.idcard_ocr.ocrDone) return
        this.setState({ onEdit: true })
    }

    render() {
        const { onEdit } = this.state,
            { idcard_ocr } = this.props;
        return <div styleName="bg">
            <Header title="身份证识别" />

            <div styleName="capture-container">
                <div styleName="capture-title">请分别拍摄身份证正反面，系统自动识别</div>

                <div styleName="capture-card-portrait">
                    <div styleName="img-input-container">
                        <img src={idcard_ocr.data.idcardPortraitImg || require("../images/idcard-ocr/idcard-portrait-bg.png")} />
                        <input type="file" capture="camera" accept="image/*"
                        onChange={this.handleImgInput('portrait')} />
                    </div>
                    <div styleName="capture-tip">拍摄人像面</div>
                </div>

                <div styleName="capture-card-emblem">
                    <div styleName="img-input-container">
                        <img src={idcard_ocr.data.idcardEmblemImg || require("../images/idcard-ocr/idcard-emblem-bg.png")} />
                        <input type="file" capture="camera" accept="image/*"
                        onChange={this.handleImgInput('emblem')} />
                    </div>
                    <div styleName="capture-tip">拍摄国徽面</div>
                </div>
            </div>

            <div styleName="edit-tip">
                <span styleName="edit-tip-text">请核对信息，内容有误请修改</span>
                <span styleName={idcard_ocr.ocrDone ? "edit-btn" : "edit-btn-disabled"}
                    onClick={this.enableEdit}>编辑</span>
            </div>

            <div styleName="ocr-item-grp">
                <OcrItem field="name" name="姓名" onEdit={onEdit} placeholder="请点击上方按钮拍照识别" />
                <OcrItem field="idNo" name="身份证号" onEdit={onEdit} />
                <OcrItem field="birth" name="出生年月" onEdit={onEdit} />
                <OcrItem field="race" name="民族" onEdit={onEdit} />
                <OcrItem field="address" name="住址" onEdit={onEdit} />
                <OcrItem field="issuedBy" name="签发机关" onEdit={onEdit} placeholder="请点击上方按钮拍照识别" />
                <OcrItem field="validDate" name="有效期" onEdit={onEdit} />
            </div>

            <div styleName="submit-btn-container">
                <div styleName={idcard_ocr.ocrDone ? "submit-btn": "submit-btn-disabled"}
                    onClick={idcard_ocr.submit}>提交</div>
            </div>
        </div>
    }

}


export default IdcardOcr
