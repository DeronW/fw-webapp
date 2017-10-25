import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import Header from '../components/header'

import styles from '../css/components/car-image.css'

const CarImage = inject('basic', 'car')(observer(CSSModules((props) => {
    let { basic, car } = props;

    let renderAsPage = props.history !== undefined; // 为router的直接component时，渲染为页面

    return (
        <div>
            { renderAsPage &&
                <Header title="车辆信息" show_close={false} history={props.history} />
            }
            <div styleName="car-info-container">
                <div styleName="car-info">
                    <div styleName="car-info-item">
                        车牌号码
                        <span>{`${basic.data.carNoArea}${basic.data.licenseNo}`}</span>
                    </div>
                    <div styleName="car-info-item">
                        车主信息
                        <span>{car.carOwnersName}</span>
                    </div>
                    <div styleName="car-info-item">
                        车辆型号
                        <span>{car.moldName}</span>
                    </div>
                    <div styleName="car-info-item">
                        车架号
                        <span>{car.carVin}</span>
                    </div>
                    <div styleName="car-info-item">
                        发动机号
                        <span>{car.engineNo}</span>
                    </div>
                    <div styleName="car-info-item-expire">
                        <div styleName="expire-items">
                            交强险到期日:
                            <span>{car.forceExpireDate}</span>
                        </div>
                        <div styleName="expire-items">
                            商业险到期日:
                            <span>{car.businessExpireDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}, styles)))

export default CarImage
