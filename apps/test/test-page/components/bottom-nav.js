import React from 'react'
import { render } from 'react-dom'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/components/bottom-nav.css'

@CSSModules(styles)
class BottomNav extends React.Component{
    render(){
        return <div styleName="bottom-nav-bar">
            <NavLink styleName="nav-li" to="/home">
                <i className="nav-icon nav-icon-loan"></i>
                {/* due to <NavLink>'s activeClassName is originally global, we have to make this className global too */}
                借钱
            </NavLink>
            <NavLink styleName="nav-li" to="/bill">
                <i className="nav-icon nav-icon-bill"></i>
                账单
            </NavLink>
            <NavLink styleName="nav-li" to="/invite">
                <i className="nav-icon nav-icon-promote"></i>
                邀友
            </NavLink>
            <NavLink styleName="nav-li" to="/market">
                <i className="nav-icon nav-icon-market"></i>
                超市
            </NavLink>
            <NavLink styleName="nav-li" to="/mine">
                <i className="nav-icon nav-icon-user"></i>
                我的
            </NavLink>
            <div styleName="egg"></div>
        </div>

    }
}

export default BottomNav



