import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/components/header.css'
import { Browser, NativeBridge } from '../helpers/'

/*
 parameters
 <Header title={} history={} show_back={} sub_title={} sub_link={} />
 */

function goBack(props) {
    let old_pop = window.onpopstate

    let moved = false
    window.onpopstate = () => moved = true

    props.history && props.history.goBack()

    setTimeout(() => {
        window.onpopstate = old_pop
        !moved && NativeBridge.close()
    }, 100)
}

const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})(props => (
    <div styleName={Browser.inIOSApp ?
        "header-placeholder iosapp-header-placeholder" : "header-placeholder"} >
        <div styleName={Browser.inIOSApp ? "header iosapp-header" : "header"}>
            {props.show_back &&
                <a styleName="btn btn-back" onClick={() => goBack(props)}></a>
            }
            {props.show_close &&
                <a onClick={NativeBridge.close} styleName="btn btn-close"></a>
            }
            {props.title}
            {props.sub_title &&
                <Link to={props.sub_link} styleName="sub-title">{props.sub_title}</Link>
            }
        </div>
    </div >
))

Header.defaultProps = {
    show_back: true,
    show_close: true
}

export default Header
