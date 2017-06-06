import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/header.css'

/*
 parameters
 <Header title={} history={history prop from router} />
 */

const Header = CSSModules(styles)((props) => (
    <div styleName="header">
        <div styleName="back-btn" onClick={props.history.goBack}></div>
        <Link to="/" styleName="close-btn"></Link>
        { props.title }
    </div>
))

export default Header
