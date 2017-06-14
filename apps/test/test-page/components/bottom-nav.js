import React from 'react'
import { render } from 'react-dom'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../../css/bottom-nav.css'

@CSSModules(styles)
class BottomNav extends React.Component{
    render(){
        let actS1 = {
            color: '#58a1fa'
        }
        return <div styleName="bottom-nav">
            <NavLink styleName="btn" to="/home" activeStyle={actS1}>
                <span styleName="icon1"></span>
                借款
            </NavLink>
            <NavLink styleName="btn" to="/bill" activeStyle={actS2}>
                <span styleName="icon2"></span>
                账单
            </NavLink>
            <NavLink styleName="btn" to="/invite" activeStyle={actS3}>
                <span styleName="icon3"></span>
                邀友
            </NavLink>
            <NavLink styleName="btn" to="/market" activeStyle={actS4}>
                <span styleName="icon4"></span>
                超市
            </NavLink>
            <NavLink styleName="btn" to="/mine" activeStyle={actS5}>
                <span styleName="icon5"></span>
                我的
            </NavLink>
        </div>
    }
}

export default BottomNav



