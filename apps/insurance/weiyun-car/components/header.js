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
})((props) => (
    <div styleName="header-placeholder">
        <div styleName="header">
            {props.show_back &&
                <a styleName="btn btn-back" onClick={props.history.goBack}> </a>
            }
            <a onClick={NativeBridge.close} styleName="btn btn-close"> </a>
            {props.title}
            {props.sub_title &&
                <Link to={props.sub_link} styleName="sub-title">{props.sub_title}</Link>
            }
        </div>
    </div>
))

Header.defaultProps = {
  show_back: true
};

export default Header
