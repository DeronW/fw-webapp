import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/components/header.css'
import NativeBridge from '../helpers/native-bridge.js'

/*
 parameters
 <Header title={} history={} show_back={} sub_title={} sub_link={} />
 */

const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})(props => (
    <div styleName="header-placeholder">
        <div styleName="header">
            <a styleName="btn" onClick={props.history.goBack}> </a>
            {props.title}
            {props.sub_title &&
                <Link to={props.sub_link} styleName="sub-title">{props.sub_title}</Link>
            }
        </div>
    </div>
))
export default Header
