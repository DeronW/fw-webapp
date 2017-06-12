import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import Header from '../components/header'

import styles from '../css/car-info.css'

@inject('car_info')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class CarInfo extends React.Component {

    componentDidMount() {
        document.title = '车辆基本信息'
    }

    changeHandler = field => e => this.props.car_info.setFormData(field, e.target.value)

    render() {
        let { car_info, history } = this.props;

        return <div>
            <Header title="完善车辆信息" history={history} />

            <div styleName="input-field">
                <span styleName="input-field-name">品牌型号</span>
                <input styleName="input-field-value" placeholder='品牌型号'
                    value={car_info.moldName} onChange={this.changeHandler('moldName')} />
            </div>
            <div styleName="input-field">
                <span styleName="input-field-name">发动机号</span>
                <input styleName="input-field-value" placeholder='发动机号'
                    value={car_info.engineNo} onChange={this.changeHandler('engineNo')} />
            </div>
            <div styleName="input-field">
                <span styleName="input-field-name">车架号</span>
                <input styleName="input-field-value" placeholder='车架号'
                    value={car_info.carVin} onChange={this.changeHandler('carVin')} />
            </div>
            <div styleName="input-field">
                <span styleName="input-field-name">注册日期     </span>
                <input styleName="input-field-value" placeholder='注册日期' type="date"
                    value={car_info.registerDate}
                    onChange={this.changeHandler('registerDate')} />
            </div>

            <div styleName="submit-panel">
                <a styleName={car_info.valid ? "submit-active" : 'submit-disabled'}
                    onClick={() => car_info.submit(history)}>下一步</a>
            </div>
        </div>
    }
}

export default CarInfo
