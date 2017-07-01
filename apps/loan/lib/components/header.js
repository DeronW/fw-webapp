import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/header.css'
import { Theme } from '../helpers'

const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})(props => {
    if (!Theme.get('header')) return null;
    let goBack = props.goBack || (props.history && props.history.goBack)

    return <div styleName="header-placeholder">
        <div styleName="header">
            <a styleName="btn-back" onClick={goBack}>
                <div styleName="arm-up"></div>
                <div styleName="arm-down"></div>
            </a>
            {props.title}
        </div>
    </div>
})



export default Header
