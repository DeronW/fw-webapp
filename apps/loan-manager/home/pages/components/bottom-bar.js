import React from 'react'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'

import styles from '../../css/bottom-bar.css'

@CSSModules(styles)
class BottomBar extends React.Component {
    render() {
        let actS = {
            color: '#58a1fa',
            filter: 'grayscale(0)'
        }
        return <div styleName="bottom-bar">
            <NavLink styleName="btn" to="/statis/register" activeStyle={actS}>
                <i styleName="icon-register"></i>
                注册
            </NavLink>
            <NavLink styleName="btn" to="/statis/apply" activeStyle={actS}>
                <i styleName="icon-apply"></i>
                借款
            </NavLink>
            <NavLink styleName="btn" to="/statis/chart" activeStyle={actS}>
                <i styleName="icon-chart"></i>
                统计
                </NavLink>
        </div>
    }
}

export default BottomBar
