import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { BrowserFactory } from 'fw-javascripts'

import Header from '../components/header'
import Select from '../components/select'

import styles from '../css/basic-info-plus.css'

@inject('basic_info_plus') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class BasicInfoPlus extends React.Component {

    changeHandler = field => e => this.props.basic_info_plus.setFormData(field, e.target.value)

    render() {
        let { basic_info_plus } = this.props;
        let inputFieldName = {
            'moldName': '品牌型号',
            'engineNo': '发动机号',
            'carVin': '车架号',
            'registerDate': '注册日期'
        }
        let gen_input_field = (fieldName) =>
            <div key={fieldName} styleName="input-field">
                <div styleName="input-field-name">{inputFieldName[fieldName]}</div>
                <div styleName="float-right-els">
                    <input styleName="input-area" style={{ color: basic_info_plus[fieldName] ? "#666" : "#999" }}
                        placeholder={`请输入${inputFieldName[fieldName]}`}
                        value={basic_info_plus[fieldName]}
                        onChange={this.changeHandler(fieldName)}
                        type={fieldName === "registerDate" ? "date" : "text"}/>
                </div>
            </div>
        return (
            <div styleName="fake-body">
                <Header title="完善车辆信息" history={this.props.history} />
                <div styleName="cnt-container">
                    <div styleName="input-field-grp">
                        { ['moldName', 'engineNo', 'carVin', 'registerDate'].map(gen_input_field) }
                    </div>
                </div>
                <div styleName="next-btn-area">
                    <div styleName={basic_info_plus.valid ? "next-btn" : "next-btn btn-disabled"}
                        onClick={() => { basic_info_plus.logData('car') }}>下一步</div>
                </div>
            </div>
        )
    }
}

export default BasicInfoPlus
