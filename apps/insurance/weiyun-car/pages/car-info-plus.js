import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { BrowserFactory } from 'fw-javascripts'

import Header from '../components/header'
import Select from '../components/select'

import styles from '../css/car-info-plus.css'

@inject('currentOrder') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class CarInfoPlus extends React.Component {
    render() {
        let inputFieldName = {
            'moldName': '品牌型号',
            'engineNo': '发动机号',
            'carVin': '车架号',
            'registerDate': '注册日期'
        }
        let currentOrder = this.props.currentOrder;
        let gen_input_field = (field) =>
            <div key={field} styleName="input-field">
                <div styleName="input-field-name">{inputFieldName[field]}</div>
                <div styleName="float-right-els">
                    <input styleName="input-area" style={{ color: currentOrder.car[field] ? "#666" : "#999" }}
                        placeholder={`请输入${inputFieldName[field]}`}
                        value={currentOrder.car[field]}
                        onChange={currentOrder.setData('car', field)}
                        type={field === "registerDate" ? "date" : "text"}/>
                </div>
            </div>
        return (
            <div styleName="fake-body">
                <Header title="完善车辆信息" history={this.props.history} />
                <div styleName="cnt-container">
                    <div styleName="input-field-grp">
                        { ['moldName', 'engineNo', 'carVin', 'registerDate'].map(gen_input_field) }
                        {/* <div styleName="input-field">
                            <div styleName="input-field-name">注册日期</div>
                            <div styleName="float-right-els">
                                <div styleName="date-mask">{currentOrder.car.registerDate}</div>
                                <input styleName="input-area date-input" style={{ color: currentOrder.carregisterDate ? "#666" : "#999" }}
                                    placeholder="请选择"
                                    value={currentOrder.car.registerDate}
                                    onChange={currentOrder.setData('car', 'registerDate')}
                                    type="date" />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div styleName="next-btn-area">
                    <div styleName="next-btn" onClick={() => { currentOrder.logData('car') }}>下一步</div>
                </div>
            </div>
        )
    }
}

export default CarInfoPlus
