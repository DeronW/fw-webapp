import React from 'react'
import { render } from 'react-dom'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../../css/bottom-nav.css'

@CSSModules(styles)
class BottomNav extends React.Component{
    render(){
        let actS = {
            color: '#58a1fa'
        };
        return <div styleName="bottom-nav">
            <NavLink styleName="btn" to="/home" activeStyle={actS}>
                <span styleName="icon1"></span>
                借款
            </NavLink>
            <NavLink styleName="btn" to="/bill" activeStyle={actS}>

                账单
            </NavLink>
            <NavLink styleName="btn" to="/invite" activeStyle={actS}>

                邀友
            </NavLink>
            <NavLink styleName="btn" to="/market" activeStyle={actS}>

                发现
            </NavLink>
            <NavLink styleName="btn" to="/mine" activeStyle={actS}>
                我的
            </NavLink>
        </div>
    }
}

export default BottomNav



