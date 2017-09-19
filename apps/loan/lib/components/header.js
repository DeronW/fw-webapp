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

    let sn_a = "header-placeholder", sn_b = "header", sn_c = "btn-back";
    if (Browser.inIOSApp) {
        sn_a += ' iosapp-header-placeholder'
        sn_b += ' iosapp-header'
        sn_c += ' iosapp-btn-back'
    }

    return <div styleName={sn_a} >
        <div styleName={sn_b}>
            {!props.noBack &&
                <a styleName={sn_c} onClick={() => goBack(props)}></a>}
            {props.title}
        </div>
    </div>
})

Header.defaultProps = {
    noBack: false,
    goBack: null,
    history: null,
    title: ''
}

export default Header
