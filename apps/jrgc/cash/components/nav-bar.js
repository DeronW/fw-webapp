import React from 'react'
import CSSModules from 'react-css-modules'
import { NavLink } from 'react-router-dom'

import styles from '../css/components/nav-bar.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class NavBar extends React.Component {

    render() {
        return <div styleName="placeholder">
            <div styleName="nav-bar">
                <NavLink exact styleName="nav-item-home" activeClassName={styles['nav-item-active-home']} to="/">首页</NavLink>
                <NavLink exact styleName="nav-item-bills" activeClassName={styles['nav-item-active-bills']} to="/bills">账单</NavLink>
                <NavLink exact styleName="nav-item-user" activeClassName={styles['nav-item-active-user']} to="/user">我的</NavLink>
            </div>
        </div>
    }
}

export default NavBar