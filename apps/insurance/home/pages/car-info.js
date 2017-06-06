import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'

import styles from '../css/car-info.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class CarInfo extends React.Component {
    render() {
        return (
            <div styleName="fake-body">
                <Header title="车险" history={this.props.history} />
                <div className="cnt-container">
                    <div styleName="banner"></div>

                </div>
            </div>
        )
    }
}

export default CarInfo
