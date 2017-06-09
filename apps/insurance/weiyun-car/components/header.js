import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/components/header.css'
import NativeBridge from '../helpers/native-bridge.js'

/*
 parameters
 <Header title={} />
 */

const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})((props) => (
    <div styleName="header-placeholder">
        <div styleName="header">
            <a styleName="btn btn-back" onClick={props.history.goBack}> </a>
            <a onClick={NativeBridge.close} styleName="btn btn-close"> </a>
            {props.title}
            {props.sub_title && <a onClick="" styleName="sub-title">{props.sub_title}</a>}
        </div>
    </div>
))

export default Header
