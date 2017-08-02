import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/header.css'
import { Theme } from '../helpers'
import {Browser} from '../helpers/'

const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})(props => {
    if (!Theme.get('header') && props.enable != 'force') return null;

    let goBack = props.goBack || (props.history && props.history.goBack)

    return <div styleName={Browser.inIOSApp ?
    "header-placeholder iosapp-header-placeholder" : "header-placeholder"} >
        <div styleName={Browser.inIOSApp ? "header iosapp-header" : "header"}>
            { !props.hideGoback && <a styleName={Browser.inIOSApp ? "iosapp-btn-back" : "btn-back"} onClick={goBack}></a> }
            { props.title }
        </div>
    </div>
})



export default Header
