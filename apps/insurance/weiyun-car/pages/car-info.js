import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'

import InputField from '../components/input-field'

import styles from '../css/car-info.css'

@inject('car')@observer@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class CarInfo extends React.Component {
    render() {
        return (
            <div styleName="fake-body">
                <Header title="车险" history={this.props.history} />
                <div className="cnt-container">
                    <div styleName="banner"></div>
                    <InputField {...this.props.car.area} handleChange={this.props.car.handleChange}/>
                </div>
            </div>
        )
    }
}

export default CarInfo
