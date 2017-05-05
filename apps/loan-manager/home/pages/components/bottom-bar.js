import React from 'react'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'

import styles from '../../less/bottom-bar.less'

@CSSModules(styles)
class BottomBar extends React.Component {
    render() {
        return <div styleName="bottom-bar">
            <NavLink styleName="btn" to="/statis/register" activeStyle={{
                fontWeight: 'bold',
                color: '#58a1fa'
            }}>注册</NavLink>
            <NavLink styleName="btn" to="/statis/apply">借款</NavLink>
            <NavLink styleName="btn" to="/statis/chart">统计</NavLink>
        </div>
    }
}

export default BottomBar
