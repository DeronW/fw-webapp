import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/header.css'


const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})((props) => (
    <div styleName="header-placeholder">
        <div styleName="header">
            <a styleName="btn-back" onClick={props.history.goBack}>
                <div styleName="arm-up"></div>
                <div styleName="arm-down"></div>
            </a>
            {props.title}
        </div>
    </div>
))

export default Header
