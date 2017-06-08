import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'
import Select from '../components/select'

import styles from '../css/car-info.css'

@inject('currentOrder') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class CarInfo extends React.Component {

    model = {
        cityCode: {
            name: '投保地区',
            placeholder: '请选择',
            options: [
                {
                    name: '北京',
                    value: 1
                },{
                    name: '重庆',
                    value: 2
                },{
                    name: '天津',
                    value: 3
                },{
                    name: '成都',
                    value: 4
                },{
                    name: '昆明',
                    value: 5
                }
            ]
        },
        plate: {
            name: '车牌号码',
            subField: [
                {
                    fieldName: 'carNoArea',
                    placeholder: '请选择',
                    options: [{
                        name: '京',
                        value: '京'
                    },{
                        name: '渝',
                        value: '渝'
                    },{
                        name: '津',
                        value: '津'
                    },{
                        name: '川',
                        value: '川'
                    },{
                        name: '云',
                        value: '云'
                    }]
                },
                {
                    fieldName: 'licenseNo',
                    placeholder: '请输入'
                }
            ]
        },
        carOwnersName: {
            name: '车主姓名',
            placeholder: '请输入'
        },
        idCard: {
            name: '身份证号',
            placeholder: '请输入'
        },
        intentionCompanyCode: {
            name: '投保公司',
            placeholder: '请选择',
            options: [
                {
                    name: '平安保险',
                    value: 0
                },{
                    name: '太平洋保险',
                    value: 1
                },{
                    name: '人保',
                    value: 2
                }
            ]
        },
    };

    render() {
        let gen_input_field = (fieldName) => {
            let field = this.model[fieldName];
            let valueInStore = this.props.currentOrder.car[field];
            console.log(this.props.currentOrder.car);
            return (
                <div key={fieldName} styleName="input-field">
                    <div styleName="input-field-name">{field.name}</div>
                    <div styleName="float-right-els" style={{ color: this.props.currentOrder.car[field] ? "#666" : "#999" }}>
                        { field.options ?
                            <Select placeholder={field.placeholder} value={this.props.currentOrder.car[field]} options={field.options} handleChange={this.props.currentOrder.setData('car', fieldName)} /> :
                            <input styleName="input-area" placeholder={field.placeholder} value={this.props.currentOrder.car[field]} onChange={this.props.currentOrder.setData('car', fieldName)} />
                        }
                    </div>
                </div>
            )
        }
        let gen_plate_input_field = (fieldName) => {
            let field = this.model[fieldName];
            let valueInStore = [this.props.currentOrder.car[field.subField[0]], this.props.currentOrder.car[field.subField[1]]];
            return (
                <div key={fieldName} styleName="input-field">
                    <div styleName="input-field-name">{field.name}</div>
                    <div styleName="float-right-els">
                        <Select style={{ float: "left", color: this.props.currentOrder.car[field.subField[0]] ? "#666" : "#999" }} placeholder={field.subField[0].placeholder} value={valueInStore[0]} options={field.subField[0].options} handleChange={this.props.currentOrder.setData('car', field.subField[0].fieldName)} />
                        <input style={{ width: "150px", float: "right", color: this.props.currentOrder.car[field.subField[1]] ? "#666" : "#999" }} styleName="input-area" placeholder={field.subField[1].placeholder} value={valueInStore[1]} onChange={this.props.currentOrder.setData('car', field.subField[1].fieldName)} />
                    </div>
                </div>
            )
        }
        return (
            <div styleName="fake-body">
                <Header title="车险" history={this.props.history} />
                <div styleName="cnt-container">
                    <div><img src={require('../images/car-info/banner.png')}/></div>
                    <div styleName="input-field-grp">
                        { ['cityCode'].map(gen_input_field) }
                        { ['plate'].map(gen_plate_input_field) }
                    </div>
                    <div styleName="input-field-grp">
                        { ['carOwnersName', 'idCard', 'intentionCompanyCode'].map(gen_input_field) }
                    </div>
                </div>
            </div>
        )
    }
}

export default CarInfo
