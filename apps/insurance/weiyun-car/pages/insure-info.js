import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'
import BottomButton from '../components/bottom-button'
import styles from '../css/insure-info.css'

@inject('customer')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class UploadImg extends React.Component {
    
    state = {
        tips: null,
        img_data: null
    }

    changeHandler = event => {

    }
    render(){
        return <div styleName="input-image">
            <img src="" alt=""/>
        </div>
    }
}

@inject('customer')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false}) 
class InsureInfo extends React.Component {
    changeHandler = (type, content) => e => {
        this.props.customer.setFormData(type, content, e.target.value)
    }

    render() {
        let { customer, history } = this.props;
        let {holder} = customer;

        let inputPanel = (type, title, content) => {
            return <div styleName="input-panel">
                {title}
                <input type="text" placeholder="请输入" value={holder[content]}
                       onChange={this.changeHandler(type,content)}/>

                <div styleName="input-line"></div>
            </div>
        }
        return <div>
            <Header title="投保信息" history={history}/>

            <div styleName="insure-title">投保人信息</div>
            {inputPanel("holder", "投保人姓名", "name")}
            {inputPanel("holder", "投保人手机", "mobile")}
            {inputPanel("holder", "身份证号", "cardId")}
            {inputPanel("holder", "邮箱", "email")}
            <div styleName="picture-panel">
                <div styleName="picture-panel-title">上传身份证照片</div>
                <div styleName="picture-panel-desc">按保监局要求上传身份证正反面照片</div>
                <UploadImg />
                <UploadImg />
            </div>
        </div>
    }
}
export default InsureInfo