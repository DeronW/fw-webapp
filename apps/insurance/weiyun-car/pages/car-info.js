import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'

import InputField from '../components/input-field'

import styles from '../css/car-info.css'

class Model {
    carInfo = {
        cityCode: {
            name: '投保地区',
            value: '',
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
            subField: {
                '1': 'carNoArea',
                '2':
            }
            value: {
                '1': '',
                '2':
            }
        }
    }
}

@inject('currentOrder')@observer@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class CarInfo extends React.Component {
    render() {
        return (
            <div styleName="fake-body">
                <Header title="车险" history={this.props.history} />
                <div className="cnt-container">
                    <div><img src={require('../images/car-info/banner.png')}/></div>
                    <InputField {...this.props.car.area} handleChange={this.props.car.handleChange}/>
                </div>
            </div>
        )
    }
}

export default CarInfo
