import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'
import BottomButton from '../components/bottom-button'
import styles from '../css/insure-info.css'
import styles_icon_circle from '../css/icons/circle.css'

@inject('customer')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class InsureInfo extends React.Component {
    changeHandler = (type, content) => e => {
        this.props.customer.setFormData(type, content, e.target.value)
    }

    render() {
        let { customer, history } = this.props;
        let { holder } = customer;

        let showPanel = (type, title, content) => {
            if (type == 'recognizee' && customer.isSame) return null
            return <div styleName="show-panel">
                {title}
                <div styleName="panel-text">{holder[content]}</div>
                <div styleName="panel-line"></div>
            </div>
        }
        let style = {
        }
        let panelImage = (type, name) => {
            if (name) {
                return <div styleName="panel-image" style={{ backgroundImage: `url(${customer[type][name]})` }}></div>
            } else {
                return <div styleName="panel-image" style={{ backgroundImage: `url(${customer[type]})` }}></div>
            }
        }
        return <div>
            <Header title="投保信息" history={history} />

            <div styleName="insure-title">投保人信息</div>
            {showPanel("holder", "投保人姓名", "name")}
            {showPanel("holder", "投保人手机", "mobile")}
            {showPanel("holder", "身份证号", "cardId")}
            {showPanel("holder", "邮箱", "email")}
            <div styleName="picture-panel">
                <div styleName="picture-panel-title">上传身份证照片</div>
                <div styleName="picture-panel-desc">按保监局要求上传身份证正反面照片</div>
                {panelImage("holder", "image1")}
                {panelImage("holder", "image2")}
            </div>
            <div styleName="panel-check">
                <i className={customer.isSame ?
                    styles_icon_circle.checked :
                    styles_icon_circle.unchecked}></i>
                <span>投保人信息与被保人信息一致</span>
            </div>

            {!customer.isSame && <div styleName="insure-title">被保人信息</div>}
            {showPanel('recognizee', '被保人姓名', 'name')}
            {showPanel('recognizee', '被保人手机', 'mobile')}
            {showPanel('recognizee', '身份证号', 'cardId')}
            {showPanel('recognizee', '邮箱', 'email')}
            {!customer.isSame && <div styleName="picture-panel">
                <div styleName="picture-panel-title">上传身份证照片</div>
                <div styleName="picture-panel-desc">按保监局要求上传身份证正反面照片</div>
                {panelImage("vehicleLicenseImage1")}
                {panelImage("vehicleLicenseImage2")}
            </div>}
            <div styleName="picture-panel">
                <div styleName="picture-panel-title">上传身份证照片</div>
                <div styleName="picture-panel-desc">按保监局要求上传身份证正反面照片</div>
                {panelImage("recognizee", "image1")}
                {panelImage("recognizee", "image2")}
            </div>
            <BottomButton active={customer.valid} title="确认提交"
                onClick={() => customer.submit(history)} />
        </div>
    }
}
export default InsureInfo