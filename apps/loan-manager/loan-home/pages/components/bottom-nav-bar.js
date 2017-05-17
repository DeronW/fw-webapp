import React from 'react'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../../css/bottom-nav-bar.css'
import { Browser } from 'fw-javascripts'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class BottomNavBar extends React.Component {

    render() {

        if (Browser.inApp) return null

        return (
            <div styleName="bottom-nav-bar">
                <NavLink styleName="nav-li" to="/loan">
                    <i className="nav-icon nav-icon-loan"></i> {/* due to <NavLink>'s activeClassName is originally global, we have to make this className global too */}
                    借钱
                </NavLink>
                <NavLink styleName="nav-li" to="/bill">
                    <i className="nav-icon nav-icon-bill"></i>
                    账单
                </NavLink>
                <NavLink styleName="nav-li" to="/promote">
                    <i className="nav-icon nav-icon-promote"></i>
                    邀友
                </NavLink>
                <NavLink styleName="nav-li" to="/market">
                    <i className="nav-icon nav-icon-market"></i>
                    超市
                </NavLink>
                <NavLink styleName="nav-li" to="/user">
                    <i className="nav-icon nav-icon-user"></i>
                    我的
                </NavLink>
                <div styleName="egg"></div>
            </div>
        )
    }
}

export default BottomNavBar
