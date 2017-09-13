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
class UploadImg extends React.Component {

    state = {
        tips: null,
        img_data: this.props.src || null
    }

    changeHandler = event => {
        let { customer, imgId } = this.props;

        let target = event.target
        var fr = new FileReader();
        let ext = target.value.split('.').pop().toLowerCase()

        if (ext != 'png' && ext != 'jpg') {
            this.setState({ tips: '图片格式不正确', img_data: null })
        } else {
            fr.readAsDataURL(target.files[0])
            fr.onload = fre => {
                customer.uploadImg(imgId, fre.target.result);
                this.setState({ tips: null, img_data: fre.target.result });
            }
        }
    }

    render() {
        let { placeholder, renderAsDisplay } = this.props
        let { img_data, tips } = this.state

        if (renderAsDisplay) img_data = `http://it.99weiyun.com.cn/wybb_uploads/${img_data}`

        return <div styleName="field-image">
            <img src={img_data} />
            <input type="file" onChange={this.changeHandler} disabled={renderAsDisplay} />
            <br /> <br />
            <div styleName="">请添加</div>
            <div>{placeholder}</div>
            {tips && <div style={{ color: '#fd4d4c' }}>{tips}</div>}
        </div>
    }
}


@inject('customer')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Customer extends React.Component {

    changeHandler = (type, k) => e => {
        this.props.customer.setFormData(type, k, e.target.value);
    }

    render() {
        let { customer, history, location } = this.props,
            renderAsDisplay = location.pathname.indexOf('order-confirm') > -1;

        let hold_input_text = (title, name) => {
            return <div styleName="field-text">{title}
                <input placeholder="请输入" type="text" disabled={renderAsDisplay}
                    value={customer.holder[name]}
                    onChange={this.changeHandler('holder', name)} />
                <div styleName="v-line"></div>
            </div>
        }

        let rec_input_text = (title, name) => {
            if (customer.isSame) return null;

            return <div styleName="field-text">{title}
                <input placeholder="请输入" type="text" disabled={renderAsDisplay}
                    value={customer.recognizee[name]}
                    onChange={this.changeHandler('recognizee', name)} />
            </div>
        }

        return <div>
            <Header title="投保人信息" history={history} />

            <div styleName="panel-title">投保人信息</div>
            {hold_input_text('投保人姓名', 'name')}
            {hold_input_text('投保人手机', 'mobile')}
            {hold_input_text('身份证号', 'cardId')}
            {hold_input_text('邮箱', 'email')}
            <div styleName="picture-panel">
                <div styleName="picture-panel-title">上传身份证照片</div>
                <div styleName="picture-panel-desc">按保监局要求上传身份证正反面照片</div>
                <UploadImg placeholder="身份证正面照片" imgId="img1" src={customer.holder.image1} renderAsDisplay={renderAsDisplay} />
                <UploadImg placeholder="身份证反面照片" imgId="img2" src={customer.holder.image2} renderAsDisplay={renderAsDisplay} />
            </div>

            { !renderAsDisplay &&
                <div styleName="field-check" onClick={customer.toggleSamePerson}>
                    <i className={customer.isSame ?
                        styles_icon_circle.checked :
                        styles_icon_circle.unchecked}></i>
                    <span>投保人信息与被保人信息一致</span>
                </div>
            }

            {!customer.isSame && <div styleName="panel-title">被保人信息</div>}
            {rec_input_text('被保人姓名', 'name')}
            {rec_input_text('被保人手机', 'mobile')}
            {rec_input_text('身份证号', 'cardId')}
            {rec_input_text('邮箱', 'email')}
            {!customer.isSame &&
                <div styleName="picture-panel">
                    <div styleName="picture-panel-title">上传身份证照片</div>
                    <div styleName="picture-panel-desc">按保监局要求上传身份证正反面照片</div>
                    <UploadImg placeholder="身份证反面照片" imgId="img3" src={customer.recognizee.image1} renderAsDisplay={renderAsDisplay} />
                    <UploadImg placeholder="身份证反面照片" imgId="img4" src={customer.recognizee.image2} renderAsDisplay={renderAsDisplay} />
                </div>
            }

            <div styleName="picture-panel">
                <div styleName="picture-panel-title">上传驾驶证照片</div>
                <div styleName="picture-panel-desc">按保监局要求上传驾驶证正反面照片</div>
                <UploadImg placeholder="驾驶证正面照片" imgId="img7" src={customer.vehicleLicenseImage1} renderAsDisplay={renderAsDisplay} />
                <UploadImg placeholder="驾驶证反面照片" imgId="img8" src={customer.vehicleLicenseImage2} renderAsDisplay={renderAsDisplay} />
            </div>

            { !renderAsDisplay &&
                <BottomButton active={customer.valid} title="确认提交"
                    onClick={() => customer.submit(history)} />
            }
        </div>
    }
}

export default Customer