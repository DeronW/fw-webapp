import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/header.css'
import { Theme } from '../helpers'
import { Browser, NativeBridge } from '../helpers/'


function goBack(props) {
    let old_pop = window.onpopstate

    let moved = false
    window.onpopstate = () => moved = true

    if (props.goBack) {
        props.goBack()
    } else {
        props.history && props.history.goBack()
    }

    setTimeout(() => {
        window.onpopstate = old_pop
        !moved && NativeBridge.close()
    }, 100)
}

const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})(props => {

    if (!Theme.get('header') && props.enable != 'force') {
        return null
    } else {
        NativeBridge.trigger('hide_header')
    }

    return <div styleName={Browser.inIOSApp ?
        "header-placeholder iosapp-header-placeholder" : "header-placeholder"} >
        <div styleName={Browser.inIOSApp ? "header iosapp-header" : "header"}>
            {!props.hideGoback &&
                <a styleName={Browser.inIOSApp ? "iosapp-btn-back" : "btn-back"}
                    onClick={goBack}></a>}
            {props.title}
        </div>
    </div>
})



export default Header
